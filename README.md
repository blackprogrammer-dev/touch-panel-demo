# Touch Panel Demo

A small touch-screen control panel for a smart home, built with React and TypeScript. It is a portfolio demo sized for a 10.1" 1280×800 display: swipe between pages, a draggable arc slider and toggles, all running on mock data.

**Live demo:** https://touch-panel-demo.pages.dev

![Screenshot](docs/screenshot.png)

## What it shows

- Page navigation by swipe. Tapping a menu button animates the same way, so it feels like a swipe rather than an instant switch.
- Gestures that do not fight each other: dragging the arc slider never starts a page swipe, and vertical scroll stays available.
- A custom arc slider (SVG + pointer events) with keyboard support and large touch targets.
- Toggles sized for fingers.
- A single data layer (`src/data/useDevices.ts`). Components only talk to this hook, so the mock source can later be replaced with Home Assistant (REST/WebSocket) without touching the UI.
- Lightweight visuals: semi-transparent panels and transform/opacity animations only, to stay smooth on low-power hardware.

## Tech stack

React, TypeScript, Vite, Tailwind CSS 4, Framer Motion, @use-gesture/react.

## Run locally

```bash
pnpm install
pnpm dev
```

Open the address shown in the terminal. To try it on a phone on the same Wi-Fi: `pnpm dev --host`.

Build for production: `pnpm build` (output in `dist`).

## Project structure

```
src/
  App.tsx                    page container, swipe and navigation
  components/ArcSlider.tsx   draggable arc slider
  components/Toggle.tsx      on/off switch
  data/useDevices.ts         mock data layer (swap for Home Assistant later)
```

## Status and roadmap

This is a first iteration with two pages (Light, Climate).

Not done yet:
- Status screen and a chart with period selection
- Loading, error and offline states
- Home Assistant integration (REST + WebSocket)
- Kiosk mode and testing on real Raspberry Pi hardware

## Notes

The design is original and uses mock data only. No accounts, keys or personal data are involved.