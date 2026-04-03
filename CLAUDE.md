# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install        # Install dependencies
pnpm dev            # Start dev server (HTTPS, requires .cert/ for camera)
pnpm build          # Production build → dist/
pnpm deploy         # Build + push to GitHub Pages (gh-pages branch)
```

No linting or test commands are configured.

## Architecture

**React + Vite + TypeScript PWA** deployed to GitHub Pages at `https://jmrkp.github.io/ard-fake-streaming-app/`.

The app is a fake ARD (German broadcaster) live-streaming prototype with three routes (defined in `src/app/routes.ts`):
- `/` → `Home.tsx` — landing/mode selection
- `/sender` → `SenderMode.tsx` — streamer view: camera access, 3-minute countdown timer, simulated viewer metrics (view count, Peak-O-Meter 0–100%)
- `/viewer` → `ViewerMode.tsx` — viewer view: simulated stream with mock chat

**Key technical notes:**
- Camera (`getUserMedia`) requires HTTPS. Works on localhost and on GitHub Pages (served over HTTPS). The dev server has self-signed certs in `.cert/` (gitignored) but accessing it from other devices on the local network does not work due to self-signed certificate limitations — use the GitHub Pages URL for mobile testing.
- The production base path is `/ard-fake-streaming-app/` (set in `vite.config.ts`), required for GitHub Pages routing.
- Tailwind CSS v4 via `@tailwindcss/vite` — no `tailwind.config.js`. Design tokens live in `src/styles/theme.css` as CSS custom properties (OKLch color space). Do not add a `tailwind.config.js`.
- UI components are shadcn/ui (Radix UI primitives) in `src/app/components/ui/`. Add new shadcn components with the shadcn CLI rather than writing from scratch.
- Path alias `@` → `./src`.
