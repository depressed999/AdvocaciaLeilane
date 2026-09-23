import { chromium } from 'playwright';
import fs from 'fs';

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          window.scrollTo(0, 0); // scroll back to top
          setTimeout(resolve, 300);
        }
      }, 80);
    });
  });
}

async function main() {
  fs.mkdirSync('public/screenshots', { recursive: true });
  
  const browser = await chromium.launch({ 
    channel: 'msedge',
    headless: true 
  });

  // 1. Desktop Viewport
  const pageDesktop = await browser.newPage({
    viewport: { width: 1440, height: 900 }
  });
  await pageDesktop.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await autoScroll(pageDesktop);
  await pageDesktop.screenshot({ path: 'public/screenshots/desktop_hero.png' });
  await pageDesktop.screenshot({ path: 'public/screenshots/desktop_full.png', fullPage: true });
  console.log('Saved desktop screenshots');

  // 2. Mobile Viewport (iPhone 14 / 375x812)
  const pageMobile = await browser.newPage({
    viewport: { width: 375, height: 812 },
    isMobile: true
  });
  await pageMobile.goto('http://localhost:5173/', { waitUntil: 'networkidle' });
  await autoScroll(pageMobile);
  await pageMobile.screenshot({ path: 'public/screenshots/mobile_hero.png' });
  await pageMobile.screenshot({ path: 'public/screenshots/mobile_full.png', fullPage: true });

  // Test opening mobile hamburger menu
  await pageMobile.click('#menuToggle');
  await pageMobile.waitForTimeout(400);
  await pageMobile.screenshot({ path: 'public/screenshots/mobile_menu_open.png' });
  console.log('Saved mobile screenshots');

  await browser.close();
  console.log('All screenshots captured successfully!');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
