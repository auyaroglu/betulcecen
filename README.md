# Betül Çeçen — Cinematic Portfolio

Sinematik scroll deneyimi ile kurgulanmış, İzmir merkezli grafik tasarımcı **Betül Çeçen** için tek sayfalık portfolyo.

İlham kaynağı: [danilodemarco.com](https://www.danilodemarco.com/).

## Hikâye akışı

Site, üst üste katmanlanmış **6 sahnenin** tek bir sticky stage içinde **5 farklı geçiş diliyle** birbirine bağlandığı sinematik bir kurguya sahip:

| # | Sahne | Geçiş tipi | Aktör (foreground) |
|---|---|---|---|
| I | **Uyanış** (göz) | — (giriş) | el yazılı not kâğıdı, paper card |
| II | **Atölye** (manifesto) | portal pupil | taş kabartma parçası, dikey ornament çizgi |
| III | **İzMiras** (heritage) | depth dive | antika cilt kitap, bookmark şerit |
| IV | **Hikâyeler** (kitap kapakları) | curtain rise | kaligrafik fırça darbesi |
| V | **Lezzet & Çizgi** (Arnold + Rabarba) | split center | kuş silüeti |
| VI | **Nefes** (manzara) | exhale out | — (final) |

Her geçişte arkadaki bg kendi animasyonunu yaparken önde duran "aktör" farklı bir tempo ve yörüngede kendi hareketini yapar — danilodemarco'daki "gökyüzü yayılırken bomba duruyor" katmanlı naratifin karşılığı.

## Stack

- **Vite 8** + **TypeScript** (vanilla template, no framework)
- **GSAP 3.15** + ScrollTrigger — tüm animasyonlar
- **Lenis 1.3** — smooth scroll, ScrollTrigger ile RAF köprüsü
- **SplitType 0.3** — yalnızca footer'ın char-by-char reveal'ı
- **Fraunces** italic + **Inter** — editorial typography

Tüm sahne arka planları ve foreground "aktörler" lokal **Invoke AI 6.11.1 / Z-Image Turbo** modeliyle üretildi. Pure black veya pure white arka planlı üretim + CSS `mix-blend-mode` (`screen` / `multiply`) + soft radial `mask-image` kombinasyonu ile transparan-PNG hissi yaratıldı.

## Çalıştırma

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # statik üretim → dist/
npm run preview      # build edileni önizle
```

## Görselleri yeniden üretmek (opsiyonel)

Yerel Invoke AI'ın `:9090`'da çalıştığını varsayar.

```bash
# scripts/prompts.json'u düzenle, ardından:
powershell -ExecutionPolicy Bypass -File scripts/generate.ps1
```

`public/generated/` altında dosyalar otomatik güncellenir.

## Dosya yapısı

```
src/
  main.ts       — boot, Lenis, master timeline, 5 transition fn + actor logic
  style.css     — tüm stiller, mobile @media tweaks
index.html      — 6 sahne (act-portal) + contact footer
public/
  generated/    — AI-üretilmiş tüm scene + actor görselleri
scripts/
  prompts.json  — Invoke AI prompt seti
  generate.ps1  — submit + poll + download pipeline
  sync-images.ps1 — board'daki görselleri pull etme yardımcısı
```
