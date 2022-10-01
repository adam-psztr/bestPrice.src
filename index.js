const puppeteer = require('puppeteer');
const randomUserAgent = require("random-useragent");
const fs = require("fs");
const config = require("./config");

(async () => {

	fs.readFile('products.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    obj = JSON.parse(data);
	}});

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
			
			let date = new Date();
			date = date.toLocaleDateString("hu", {
				day: "numeric",
				month: "short",
				year: "numeric"
			});
			
			//navigate to URL
			// await page.goto(pruduct.url);
			// await page.screenshot({path: pruduct.selectors.pic + 'example.png'});
			
			let tittle, price;
			let webpage = "";

			try {
				await page.goto(pruduct.url);
			} catch (error) {
				webpage = "hibás elérési útvonal";
			}

			// let tittle;
			// await new Promise((resolve, reject) => {
			// 	if(page.waitForSelector(pruduct.selectors.tittle)){
			// 		resolve(tittle = page.$eval(pruduct.selectors.tittle, (el) => el.innerText));
			// 	}else{
			// 		reject(tittle = "");
			// 	}
			// 	tittle = tittle.trim();
			// });
		
			// let price;
			// await new Promise((resolve, reject) => {
			// 	if(page.waitForSelector(pruduct.selectors.price)){
			// 		resolve(price = page.$eval(pruduct.selectors.price, (el) => el.innerText));
			// 	}else{
			// 		reject(price = "");
			// 	}
			// 	price = price.trim().replace(/[^0-9]/g, "");
			// });

			try {
				await page.waitForSelector(pruduct.selectors.tittle);
				tittle = await page.$eval(pruduct.selectors.tittle, (el) => el.innerText);
				tittle = tittle.trim();
			} catch (error) {
				tittle = "sikertelen lekérdezés";
			}
			try {
				await page.waitForSelector(pruduct.selectors.price);
				price = await page.$eval(pruduct.selectors.price, (el) => el.innerText);
				price = price.trim().replace(/[^0-9]/g, "");
			} catch (error) {
				price = "sikertelen lekérdezés";
			}

			// read price and title
			// await page.waitForSelector(pruduct.selectors.tittle);
			// let tittle = await page.$eval(pruduct.selectors.tittle, (el) => el.innerText);
			// tittle = tittle.trim();
			
			// await page.waitForSelector(pruduct.selectors.price);
			// let price = await page.$eval(pruduct.selectors.price, (el) => el.innerText);
			// price = price.trim().replace(/[^0-9]/g, "");
			
			const result = `${date} - ${webpage} ${tittle} - ${price} ${price < el.targetPrice ? targetPriceStr : ""}`;
			
			logger.write(result + "\n");

			count++;
			console.log(count);
		}
	}

	// close browser
  await browser.close();
})().catch(err=> {
	console.log(err);
	process.exit(1);
});




// const date = new Date();
// const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
// const [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];


// var date      = new Date();
// var timestamp = date.getTime();