const fs = require("fs");
const path = require("path");
import puppeteer from "puppeteer";

function generateImgurUrl() {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const randomId =
    Array.from(
      { length: 5 },
      () => chars[Math.floor(Math.random() * chars.length)]
    ).join("") + "b";
  return `https://i.imgur.com/${randomId}.png`;
}

export async function getRandomImage(message: any) {
  // Launch Puppeteer browser
  const browser = await puppeteer.launch({ headless: false, slowMo: 50 });
  const tempDir = path.join(__dirname, "temp_images");

  // Ensure the temporary directory exists
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  try {
    for (let i = 0; i < 1; i++) {
      const imgurUrl = generateImgurUrl();
      const page = await browser.newPage();

      try {
        // Load the local HTML file
        await page.goto(`file://${path.join(__dirname, "template.html")}`);

        // Set the src attribute of the <img> tag
        await page.evaluate((url) => {
          (document.getElementById("randomImg") as HTMLImageElement).src! = url;
        }, imgurUrl);

        // Wait for the image to load, then capture a screenshot
        await page.waitForSelector("#randomImg");
        const imgElement = await page.$("#randomImg");

        const filePath = path.join(tempDir, `img_${i}.png`);
        await imgElement?.screenshot({ path: filePath });

        // Send the screenshot to Discord
        await message.channel.send({
          files: [filePath],
        });

        // Clean up the file after sending
        // fs.unlinkSync(filePath);
      } catch (err) {
        // getRandomImage(message);ž
        console.error(err);
      } finally {
        await page.close();
      }
    }
  } finally {
    // Close the browser
    await browser.close();
  }
}
