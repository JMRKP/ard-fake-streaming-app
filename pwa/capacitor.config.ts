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
    // Allow inline media playback without user gesture
    androidScheme: 'https',
  },
};

export default config;
