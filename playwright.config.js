import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: {
    timeout: 5000
  },
  fullyParallel: false,
  retries: 0,
  reporter: 'list',
  use: {
    baseURL: 'http://localhost:5173',
    channel: 'msedge',
    headless: true,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'desktop',
      use: {
        viewport: { width: 1440, height: 900 }
      },
    },
    {
      name: 'mobile',
      use: {
        viewport: { width: 375, height: 812 },
        isMobile: true
      },
    }
  ],
  webServer: {
    command: 'npm run preview -- --port 5173',
    url: 'http://localhost:5173',
    reuseExistingServer: true,
  },
});
