
  # Interaktiver Prototyp mit Kamerazugriff

  This is a code bundle for Interaktiver Prototyp mit Kamerazugriff. The original project is available at https://www.figma.com/design/FTMdQaL5Hvs1baUBfrmWQ9/Interaktiver-Prototyp-mit-Kamerazugriff.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Deployment

  ### GitHub Pages

  This project is configured for automatic deployment to GitHub Pages.

  **Automatic Deployment:**
  - Push to the `main` branch to trigger automatic deployment
  - The app will be available at: `https://jmrkp.github.io/ard-fake-streaming-app/`

  **Manual Deployment:**
  ```bash
  # Build and deploy
  npm run deploy
  # or
  pnpm deploy
  ```

  ### ⚠️ Important: Camera Functionality Limitation

  **GitHub Pages serves content over HTTP, not HTTPS.** The camera functionality will NOT work on GitHub Pages because:

  - WebRTC and `getUserMedia()` APIs require a secure context (HTTPS)
  - GitHub Pages does not support custom SSL certificates
  - Camera access is blocked in insecure contexts

  **For camera functionality, you must:**
  - Run the app locally with `npm run dev` (uses HTTPS)
  - Deploy to a platform that supports HTTPS with custom domains
  - Use services like Vercel, Netlify, or GitHub Pages with a custom domain + SSL

  ## Camera Access

  This app requires camera access, which browsers only allow over secure connections (HTTPS). When running in development:

  - On localhost: Camera access works automatically
  - Over network (mobile devices): The dev server now runs with HTTPS enabled

  **Important**: When accessing from mobile devices over your home network, your browser will show a security warning about the self-signed certificate. You need to accept this warning to allow camera access.

  ### Accepting the Certificate Warning

  **Chrome/Android:**
  1. When you see "Your connection is not private" or "NET::ERR_CERT_AUTHORITY_INVALID"
  2. Tap "Advanced"
  3. Tap "Proceed to [your-ip] (unsafe)"

  **Safari/iOS:**
  1. When you see "This Connection Is Not Private"
  2. Tap "Show Details"
  3. Tap "visit this website"
  4. Tap "Visit Website" in the warning dialog

  **Firefox:**
  1. When you see "Warning: Potential Security Risk Ahead"
  2. Click "Advanced"
  3. Click "Accept the Risk and Continue"

  ## Troubleshooting

  If camera doesn't work on mobile:
  1. Ensure you're accessing via HTTPS (the dev server now provides this)
  2. Accept the security certificate warning in your mobile browser
  3. Grant camera permissions when prompted
  