# Invoke AI image generation helper for Betul Cecen portfolio
# Usage: powershell -File scripts/generate.ps1
# Reads prompts.json, submits batches to Invoke AI Z-Image Turbo, downloads images to public/generated/

param(
  [string]$PromptsFile = "$PSScriptRoot\prompts.json",
  [string]$OutputDir   = "$PSScriptRoot\..\public\generated",
  [string]$BoardIdFile = "$PSScriptRoot\..\.invoke-board-id.txt",
  [string]$ApiBase     = "http://localhost:9090"
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path $OutputDir)) { New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null }
$BoardId = (Get-Content $BoardIdFile -Raw).Trim()
$prompts = Get-Content $PromptsFile -Raw | ConvertFrom-Json

# Z-Image Turbo model identifiers captured from a known-good completed graph
$ZIMAGE_MODEL = @{
  key  = "d3cfc9fd-dd36-4529-8025-0fd97d31c382"
  hash = "blake3:b523ea0e82bf4fa14271227a2f8cc8d068776642fb29994083e01c2479a1a1d6"
  name = "Z-Image Turbo (quantized)"
  base = "z-image"
  type = "main"
  submodel_type = $null
}
$VAE = @{
  key  = "0327ac04-671b-41d2-ad03-48d380ef6cc0"
  hash = "blake3:ce21cb76364aa6e2421311cf4a4b5eb052a76c4f1cd207b50703d8978198a068"
  name = "FLUX.1-schnell_ae"
  base = "flux"
  type = "vae"
  submodel_type = $null
}
$ENCODER = @{
  key  = "6c6a9060-4dce-4f40-a54d-554c87ca4b93"
  hash = "blake3:88c0dd9c5328b0dab205fd92c8532c0a0781598080910262447d85f01d30e30f"
  name = "Z-Image Qwen3 Text Encoder (quantized)"
  base = "any"
  type = "qwen3_encoder"
  submodel_type = $null
}

function New-ZImageGraph {
  param([string]$Prompt, [int]$Width, [int]$Height, [int]$Seed, [int]$Steps = 8, [string]$BoardId)
  return @{
    id    = [guid]::NewGuid().ToString()
    nodes = @{
      model_loader = @{
        id = "model_loader"; is_intermediate = $false; use_cache = $true
        model = $ZIMAGE_MODEL; vae_model = $VAE; qwen3_encoder_model = $ENCODER
        qwen3_source_model = $null
        type = "z_image_model_loader"
      }
      text_encoder = @{
        id = "text_encoder"; is_intermediate = $false; use_cache = $true
        prompt = $Prompt; qwen3_encoder = $null; mask = $null
        type = "z_image_text_encoder"
      }
      denoise = @{
        id = "denoise"; is_intermediate = $false; use_cache = $true
        latents = $null; denoise_mask = $null
        denoising_start = 0.0; denoising_end = 1.0; add_noise = $true
        transformer = $null; positive_conditioning = $null; negative_conditioning = $null
        guidance_scale = 1.0
        width = $Width; height = $Height; steps = $Steps; seed = $Seed
        control = $null; vae = $null; scheduler = "euler"
        type = "z_image_denoise"
      }
      decode = @{
        id = "decode"; is_intermediate = $false
        board = @{ board_id = $BoardId }
        metadata = $null; use_cache = $true; latents = $null; vae = $null
        type = "z_image_l2i"
      }
    }
    edges = @(
      @{ source = @{ node_id = "model_loader"; field = "transformer" };   destination = @{ node_id = "denoise"; field = "transformer" } }
      @{ source = @{ node_id = "model_loader"; field = "qwen3_encoder" }; destination = @{ node_id = "text_encoder"; field = "qwen3_encoder" } }
      @{ source = @{ node_id = "text_encoder"; field = "conditioning" };  destination = @{ node_id = "denoise"; field = "positive_conditioning" } }
      @{ source = @{ node_id = "denoise"; field = "latents" };            destination = @{ node_id = "decode"; field = "latents" } }
      @{ source = @{ node_id = "model_loader"; field = "vae" };           destination = @{ node_id = "decode"; field = "vae" } }
    )
  }
}

function Submit-Prompt {
  param($PromptEntry, [string]$BoardId)
  $graph = New-ZImageGraph -Prompt $PromptEntry.prompt -Width $PromptEntry.width -Height $PromptEntry.height -Seed $PromptEntry.seed -Steps ($(if ($PromptEntry.steps) { $PromptEntry.steps } else { 8 })) -BoardId $BoardId
  $batch = @{
    batch = @{
      batch_id = [guid]::NewGuid().ToString()
      origin   = "betul-script"
      destination = "betul-script"
      graph = $graph
      runs  = 1
    }
    prepend = $false
  }
  $json = $batch | ConvertTo-Json -Depth 20 -Compress
  $resp = Invoke-RestMethod -Uri "$ApiBase/api/v1/queue/default/enqueue_batch" -Method Post -Body $json -ContentType "application/json" -TimeoutSec 30
  return @{ name = $PromptEntry.name; batch_id = $resp.batch.batch_id; item_ids = $resp.item_ids }
}

# Submit all
Write-Output "Submitting $($prompts.Count) prompts to board $BoardId..."
$submissions = @()
foreach ($p in $prompts) {
  $sub = Submit-Prompt -PromptEntry $p -BoardId $BoardId
  $submissions += $sub
  Write-Output "  queued [$($sub.name)] -> batch=$($sub.batch_id) item=$($sub.item_ids -join ',')"
}

# Poll until all done
Write-Output ""; Write-Output "Polling queue..."
$allItemIds = $submissions | ForEach-Object { $_.item_ids } | ForEach-Object { $_ }
$pollStart = Get-Date
while ($true) {
  $body = @{ item_ids = @($allItemIds) } | ConvertTo-Json
  $items = Invoke-RestMethod -Uri "$ApiBase/api/v1/queue/default/items_by_ids" -Method Post -Body $body -ContentType "application/json" -TimeoutSec 15
  $done = ($items | Where-Object { $_.status -in @("completed", "failed", "canceled") }).Count
  $failed = ($items | Where-Object { $_.status -eq "failed" }).Count
  $elapsed = [int]((Get-Date) - $pollStart).TotalSeconds
  Write-Output "  [$elapsed s] $done/$($items.Count) done (failed=$failed)"
  if ($done -eq $items.Count) { break }
  Start-Sleep -Seconds 3
}

# Pull board image list and download each newest image per prompt name
Write-Output ""; Write-Output "Downloading images..."
$imageNames = Invoke-RestMethod -Uri "$ApiBase/api/v1/boards/$BoardId/image_names" -TimeoutSec 15
Write-Output "Board has $($imageNames.Count) image(s) total"

# Get full image metadata so we can match by created_at vs our submission order
$body = @{ image_names = @($imageNames) } | ConvertTo-Json
$imgs = Invoke-RestMethod -Uri "$ApiBase/api/v1/images/images_by_names" -Method Post -Body $body -ContentType "application/json" -TimeoutSec 30
# Sort newest first, take the most recent N matching our submission count
$recent = $imgs | Sort-Object created_at -Descending | Select-Object -First $submissions.Count
# Map back in order: most recent image == last submitted prompt (because queue is FIFO and we sort desc)
$ordered = $recent | Sort-Object created_at
for ($i = 0; $i -lt $submissions.Count; $i++) {
  $name = $submissions[$i].name
  $img  = $ordered[$i]
  if (-not $img) { Write-Output "  MISSING image for $name"; continue }
  $outPath = Join-Path $OutputDir "$name.png"
  Invoke-WebRequest -Uri "$ApiBase/api/v1/images/i/$($img.image_name)/full" -OutFile $outPath -TimeoutSec 60
  Write-Output "  saved $name.png  <- $($img.image_name)  ($($img.width)x$($img.height))"
}
Write-Output "Done."
