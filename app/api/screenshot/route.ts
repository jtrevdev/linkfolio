import puppeteer from 'puppeteer';
import { NextRequest, NextResponse } from 'next/server';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

import { storage } from '@/app/firebase/config';

export async function POST(req: NextRequest) {
  const { url, user_id, auth } = await req.json();

  // Condition checked prior to submitting
  // if (!url) {
  //   return NextResponse.json({ message: 'No url provided' }, { status: 400 });
  // }

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

    // If screenshot successful, grab download url
    console.log(Date.now());
    if (screenshot) {
      const storageRef = ref(storage, '/profile/' + user_id + '.png');

      const downloadURL = await uploadString(
        storageRef,
        screenshot.toString('base64'),
        'base64',
        {
          contentType: 'image/png',
        }
      ).then(() => {
        return getDownloadURL(storageRef);
      });

      return NextResponse.json({ downloadURL }, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: `Error screenshotting website, ${error}` },
      { status: 400 }
    );
  }
}
