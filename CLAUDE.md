# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Monorepo Structure

pnpm workspaces monorepo with four packages:

- `pwa/` — the main user-facing PWA (React + Vite + TypeScript), deployed to GitHub Pages
- `controller/` — controller app for managing the PWA remotely (scaffold)
- `server/` — WebSocket server for communication between controller and PWA (scaffold)
- `shared/` — shared types and constants used by all packages (scaffold)

## Commands

```bash
pnpm install              # Install all workspace dependencies
pnpm dev:pwa              # Start PWA dev server (HTTPS, requires .cert/ for camera)
pnpm build:pwa            # Production build PWA → pwa/dist/
pnpm deploy               # Build + deploy PWA to GitHub Pages
pnpm dev:controller       # Start controller dev server (port 5174)
pnpm build:controller     # Production build controller
```

No linting or test commands are configured.

## PWA Architecture

**React + Vite + TypeScript PWA** deployed to GitHub Pages at `https://jmrkp.github.io/ard-fake-streaming-app/`. The app runs in fullscreen mode and should feel as native as possible - without any OS details (iOS, Android).

The app is a fake ARD (German broadcaster) live-streaming prototype with three routes (defined in `pwa/src/app/routes.ts`):
- `/` → `Home.tsx` — landing/mode selection
- `/sender` → `SenderMode.tsx` — streamer view: camera access, 3-minute countdown timer, simulated viewer metrics (view count, Peak-O-Meter 0–100%)
- `/viewer` → `ViewerMode.tsx` — viewer view: simulated stream with mock chat

**Key technical notes:**
- Camera (`getUserMedia`) requires HTTPS. Works on localhost and on GitHub Pages (served over HTTPS). The dev server has self-signed certs in `.cert/` (gitignored, at repo root) but accessing it from other devices on the local network does not work due to self-signed certificate limitations — use the GitHub Pages URL for mobile testing.
- The production base path is `/ard-fake-streaming-app/` (set in `pwa/vite.config.ts`), required for GitHub Pages routing.
- Tailwind CSS v4 via `@tailwindcss/vite` — no `tailwind.config.js`. Design tokens live in `pwa/src/styles/theme.css` as CSS custom properties (OKLch color space). Do not add a `tailwind.config.js`.
- UI components are shadcn/ui (Radix UI primitives) in `pwa/src/app/components/ui/`. Add new shadcn components with the shadcn CLI rather than writing from scratch.
- Path alias `@` → `./src` (within each app).
