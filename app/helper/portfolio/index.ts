'use server';

import puppeteer from 'puppeteer';

export async function portfolioImageUpload(url: string, user_id: string) {
  let browser = null;

  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    // Adjust viewport and wait for any lazy-loaded content
    await page.setViewport({ width: 1280, height: 709 });

    // Set timer for users web page contents to fully load
    // await new Promise((resolve) => setTimeout(() => resolve(''), 3000));

    // Take a screenshot
    const screenshot = await page.screenshot();

    // Close the browser
    await browser.close();
    const serializedData = JSON.stringify(Array.from(screenshot));
    return serializedData;
  } catch (error) {
    console.log(error);
  }
}
