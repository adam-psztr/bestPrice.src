const puppeteer = require('puppeteer');
const config = require("./config");

console.log(config);

(async () => {

	//open browser
  const browser = await puppeteer.launch({headless: false, slowMo: 300});
	const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();

	//navigate to URL
  await page.goto(config.url);
  // await page.screenshot({path: 'example.png'});

	// close browser
  await browser.close();
})().catch(err=> {
	console.log(err);
	process.exit(1);
});