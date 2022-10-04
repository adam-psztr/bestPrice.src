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
	
	let productCount = 1;
	let sellerCount = 1;
	let queryContent = {};
	let productPriceArray = [];
	
	for (const el of config) {

		console.log(`product(${productCount}/${config.length}): ${el.mainProductName} ${el.subProductName} -----v`);

		let date = Date.now();
		
		queryContent[el.product] = {
			queryDate: date,
			mainProductName: el.mainProductName,
			subProductName: el.subProductName,
			productSellers: []
		};

		let sellerPriceArray = [];
		
		for (const seller of el.sellers) {
			
			let title, price;
			let sellerwebpage = "";
			let errorMessage = "";
			
			try {
				await page.goto(seller.url);
			} catch (error) {
				errorMessage += "wrong url";
				sellerwebpage = "x";
			};
						
			try {
				await page.waitForSelector(seller.selectors.title);
				title = await page.$eval(seller.selectors.title, (el) => el.innerText);
				title = title.trim().replace(/[\n]/g, " ").replace(/[\xa0]/g, " ");
			} catch (error) {
				errorMessage == "" ? errorMessage = "wrong title selector" : errorMessage += " * wrong title selector";
				title = "x";
			};
			
			try {
				await page.waitForSelector(seller.selectors.price);
				price = await page.$eval(seller.selectors.price, (el) => el.innerText);
				price = price.trim().replace(/[^0-9]/g, "");
			} catch (error) {
				errorMessage == "" ? errorMessage = "wrong price selector" : errorMessage += " * wrong price selector";
				price = "0";
			};
			
			queryContent[el.product]["productSellers"].push({
				productSeller: sellerwebpage=="" ? seller.seller : sellerwebpage,
				productName: title,
				productPrice: price,
				productLink: seller.url
			});

			sellerPriceArray.push(price);
			
			console.log(errorMessage == "" ? ` > seller(${sellerCount}/${el.sellers.length}): ${seller.seller} >> OK` : `!> seller(${sellerCount}/${el.sellers.length}): ${seller.seller} >> ` + errorMessage);
			sellerCount++;
		}

		sellerPriceArray.sort();

		let productSellersArray = queryContent[el.product]["productSellers"];
		let temporaryProductSellersArray = [];

		while (productSellersArray.length>0) {
			let firstSeEl = productSellersArray.shift();
			temporaryProductSellersArray[sellerPriceArray.indexOf(firstSeEl.productPrice)] = firstSeEl;
		};

		queryContent[el.product]["productSellers"] = temporaryProductSellersArray;

		productPriceArray.push(sellerPriceArray[0]);

		sellerCount = 1;
		productCount++;
	}

	productPriceArray.sort();

	let temporaryProductsArray = [];

	let queryContentKeys = Object.keys(queryContent);

	while (queryContentKeys.length>0) {
		let firstPrEl = queryContentKeys.shift();
		temporaryProductsArray[productPriceArray.indexOf(queryContent[firstPrEl]["productSellers"][0].productPrice)] = firstPrEl;
	};

	queryContent.sortArray = {
		ascendingByPrice: [...temporaryProductsArray],
		descendingByPrice: [...temporaryProductsArray].reverse(),
		ascendingAccordingToAbc: [...temporaryProductsArray].sort((a, b) => a.localeCompare(b)),
		descendingAccordingToAbc: [...temporaryProductsArray].sort((a, b) => a.localeCompare(b)).reverse()
	};

	jsonContent["queries"] = (queryContent);
	jsonContent = JSON.stringify(jsonContent);

	const logger = fs.createWriteStream("products.json");
	logger.write(jsonContent);
	
	// close browser
	await browser.close();
})().catch(err=> {
	console.log(err);
	process.exit(1);
});