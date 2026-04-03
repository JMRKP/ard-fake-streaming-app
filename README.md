# Interaktiver Prototyp mit Kamerazugriff

This is a code bundle for Interaktiver Prototyp mit Kamerazugriff. The original project is available at https://www.figma.com/design/FTMdQaL5Hvs1baUBfrmWQ9/Interaktiver-Prototyp-mit-Kamerazugriff.

## Running the code

```bash
pnpm install
pnpm dev
```

## Deployment

### GitHub Pages

This project is configured for automatic deployment to GitHub Pages.

**Automatic Deployment:**
- Push to the `main` branch to trigger automatic deployment
- The app will be available at: `https://jmrkp.github.io/ard-fake-streaming-app/`

**Manual Deployment:**
```bash
pnpm deploy
```

## Camera Access

This app requires camera access, which browsers only allow over secure connections (HTTPS).

- **GitHub Pages**: Camera works — served over HTTPS
- **Local development (`pnpm dev`)**: Camera works on localhost

> **Note**: Accessing the dev server from other devices on your local network (e.g. mobile) via the local IP does not work due to self-signed certificate limitations. Use the deployed GitHub Pages URL for mobile testing.
