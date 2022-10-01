const puppeteer = require('puppeteer');
const randomUserAgent = require("random-useragent");
const fs = require("fs");
const config = require("./config");

(async () => {

	let jsonContent;

	fs.readFile('products.json', 'utf8', function readFileCallback(err, data){
    if (err){
        console.log(err);
    } else {
    jsonContent = JSON.parse(data);
	}});
	
	//open browser
  const browser = await puppeteer.launch({headless: true});
	const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
	await page.setViewport({width: 1920, height: 1080});
	await page.setUserAgent(randomUserAgent.getRandom());
	
	let count = 0;
	let innerCount = 0;
	let queryContent = {};
	
	for (const el of config) {
		
		let date = Date.now();

		queryContent["queryDate"] = date;

		queryContent[el.product] = {
			productName: el.productName,
			productSellers: []
		};
		
		for (const seller of el.sellers) {
			
			let tittle, price;
			let sellerwebpage = "";
			
			try {
				await page.goto(seller.url);
			} catch (error) {
				sellerwebpage = "hibás elérési útvonal";
			};
						
			try {
				await page.waitForSelector(seller.selectors.tittle);
				tittle = await page.$eval(seller.selectors.tittle, (el) => el.innerText);
				tittle = tittle.trim().replace(/[\n]/g, " ").replace(/[\xa0]/g, " ");
			} catch (error) {
				tittle = "sikertelen lekérdezés";
			};

			try {
				await page.waitForSelector(seller.selectors.price);
				price = await page.$eval(seller.selectors.price, (el) => el.innerText);
				price = price.trim().replace(/[^0-9]/g, "");
			} catch (error) {
				price = "sikertelen lekérdezés";
			};
			
			queryContent[el.product]["productSellers"].push({
				productSeller: sellerwebpage=="" ? seller.seller : sellerwebpage,
				productName: tittle,
				productPrice: price,
				productLink: seller.url
			});
			
			count++;
			innerCount++;
			console.log(count);
		}

		count+=10-innerCount;
	}
	
	jsonContent["queries"].push(queryContent);
	jsonContent = JSON.stringify(jsonContent);

	const logger = fs.createWriteStream("products.json");
	logger.write(jsonContent);
	
	// close browser
	await browser.close();
})().catch(err=> {
	console.log(err);
	process.exit(1);
});