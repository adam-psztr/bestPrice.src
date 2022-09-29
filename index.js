const puppeteer = require('puppeteer');
const randomUserAgent = require("random-useragent");
const fs = require("fs");
const config = require("./config");

(async () => {

	//open browser
  const browser = await puppeteer.launch({headless: true});
	const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
	await page.setViewport({width: 1920, height: 1080});
	await page.setUserAgent(randomUserAgent.getRandom());
	
	let count = 0;

	const targetPriceStr = "!!!!!";
	
	for (const el of config) {

		const logger = fs.createWriteStream(el.fileName, {flags: "a"});
		logger.write(el.category + "\n");

		for (const pruduct of el.products) {
			count++;
			console.log(count);

			let date = new Date();
			date = date.toLocaleDateString("hu", {
				day: "numeric",
				month: "short",
				year: "numeric"
			});

			//navigate to URL
			await page.goto(pruduct.url);
			// await page.screenshot({path: 'example.png'});
		
			//read price and title
			await page.waitForSelector(pruduct.selectors.tittle);
			let tittle = await page.$eval(pruduct.selectors.tittle, (el) => el.innerHTML);
			tittle = tittle.trim();
		
			await page.waitForSelector(pruduct.selectors.price);
			let price = await page.$eval(pruduct.selectors.price, (el) => el.innerHTML);
			price = price.trim().replace(/[^0-9]/g, "");
			price = parseInt(price)/100;

			const result = `${date} - ${tittle} - ${price} ${price < el.targetPrice ? targetPriceStr : ""}`;

			logger.write(result + "\n");
		}
	}

	// close browser
  await browser.close();
})().catch(err=> {
	console.log(err);
	process.exit(1);
});