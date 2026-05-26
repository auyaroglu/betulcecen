# Pulls all currently-completed images from the Invoke AI board down to public/generated/,
# mapping them to prompt names by submission order (the script in generate.ps1 records IDs).
# Safe to run multiple times; will refresh files that exist.

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

# Pull board image list (returns string array of image_names, newest first)
$imageNames = Invoke-RestMethod -Uri "$ApiBase/api/v1/boards/$BoardId/image_names" -TimeoutSec 15
Write-Output "Board has $($imageNames.Count) image(s)"
if ($imageNames.Count -eq 0) { Write-Output "Nothing to download."; return }

# Hydrate with metadata so we can sort by created_at ascending (oldest first == first submitted)
$body = @{ image_names = @($imageNames) } | ConvertTo-Json
$imgs = Invoke-RestMethod -Uri "$ApiBase/api/v1/images/images_by_names" -Method Post -Body $body -ContentType "application/json" -TimeoutSec 30

# Take only the last $prompts.Count images (most recent batch)
$ordered = $imgs | Sort-Object created_at -Descending | Select-Object -First $prompts.Count | Sort-Object created_at

for ($i = 0; $i -lt [Math]::Min($prompts.Count, $ordered.Count); $i++) {
  $name = $prompts[$i].name
  $img = $ordered[$i]
  $outPath = Join-Path $OutputDir "$name.png"
  Invoke-WebRequest -Uri "$ApiBase/api/v1/images/i/$($img.image_name)/full" -OutFile $outPath -TimeoutSec 60
  Write-Output "  $name.png  <- $($img.image_name)  ($($img.width)x$($img.height))"
}
Write-Output "Synced $([Math]::Min($prompts.Count, $ordered.Count)) image(s) to $OutputDir"
