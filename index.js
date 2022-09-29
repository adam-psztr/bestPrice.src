const puppeteer = require('puppeteer');
const randomUserAgent = require("random-useragent");
const config = require("./config");

(async () => {

	//open browser
  const browser = await puppeteer.launch({headless: false, slowMo: 300});
	const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
	await page.setViewport({width: 1920, height: 1080});
	await page.setUserAgent(randomUserAgent.getRandom());

	//navigate to URL
  await page.goto(config.url);
  // await page.screenshot({path: 'example.png'});

	//read price and title
	await page.waitForSelector(config.selectors.tittle);
	let tittle = await page.$eval(config.selectors.tittle, (el) => el.innerHTML);
	console.log(tittle);

	await page.waitForSelector(config.selectors.price);
	let price = await page.$eval(config.selectors.price, (el) => el.innerHTML);
	console.log(price);

	// close browser
  await browser.close();
})().catch(err=> {
	console.log(err);
	process.exit(1);
});