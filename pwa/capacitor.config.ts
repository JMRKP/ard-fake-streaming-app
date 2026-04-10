import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'de.ard.threeminutes',
  appName: '3 Minutes',
  webDir: 'dist',
  android: {
    // Enable immersive fullscreen (hides status bar + navigation bar)
    overrideUserAgent: undefined,
  },
  server: {
    // Use http so the WebView can open plain ws:// connections to the
    // local dev server without mixed-content blocks. localhost is still a
    // secure context per spec, so getUserMedia / service workers keep working.
    androidScheme: 'http',
  },
};

export default config;
