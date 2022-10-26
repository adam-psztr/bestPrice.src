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
  const browser = await puppeteer.launch({headless: true, executablePath: '/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome'});
	const context = await browser.createIncognitoBrowserContext();
  const page = await context.newPage();
	await page.setViewport({width: 1920, height: 1080});
	await page.setUserAgent(randomUserAgent.getRandom(function (ua) {
    return parseFloat(ua.browserVersion) >= 80;
	}));
	
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
			
			let title, price, discountPrice;
			let sellerwebpage = "";
			let errorMessage = "";
			
			try {
				await page.goto(seller.url);
			} catch (error) {
				errorMessage += "wrong url";
				sellerwebpage = "X";
			};
						
			try {
				await page.waitForSelector(seller.selectors.title);
				title = await page.$eval(seller.selectors.title, (el) => el.innerText);
				title = title.trim().replace(/[\n]/g, " ").replace(/[\xa0]/g, " ");
			} catch (error) {
				errorMessage == "" ? errorMessage = "wrong title selector" : errorMessage += " * wrong title selector";
				title = "X";
			};
			
			try {
				await page.waitForSelector(seller.selectors.price);
				price = await page.$eval(seller.selectors.price, (el) => el.innerText);
				switch(seller.seller) {
					case "kifli": price = price.match(/\d+/g)[0]; break;
					default: price =  price.trim().replace(/[^0-9]/g, "");
				}
					// price = price.match(/\d+/g)[0];
					// price = price.trim().replace(/[^0-9]/g, "");				
			} catch (error) {
				errorMessage == "" ? errorMessage = "wrong price selector" : errorMessage += " * wrong price selector";
				price = "999999999";
			};
			
			try {
				await page.waitForSelector(seller.selectors.discountPrice);
				discountPrice = await page.$eval(seller.selectors.discountPrice, (el) => el.innerText);
				switch(seller.seller) {
					case "kifli": discountPrice = discountPrice.match(/\d+/g)[0]; break;
					default: discountPrice =  discountPrice.trim().replace(/[^0-9]/g, "");
				}
				if (discountPrice == "") {
					discountPrice = "999999999";
					errorMessage == "" ? errorMessage = "OK" : errorMessage += " * no discount price";
				} 
			} catch (error) {
				errorMessage == "" ? errorMessage = "OK" : errorMessage += " * no discount price";
				discountPrice = "999999999";
			};
			
			queryContent[el.product]["productSellers"].push({
				productSeller: sellerwebpage == "" ? seller.seller : sellerwebpage,
				productName: title,
				productPrice: price,
				productDiscountPrice: discountPrice,
				productLink: seller.url
			});

			if(discountPrice != "999999999") {
				price = discountPrice;
			}

			sellerPriceArray.push(price);
			
			console.log(errorMessage == "OK" ? ` > seller(${sellerCount}/${el.sellers.length}): ${seller.seller} >> ` + errorMessage : errorMessage == ""? ` > seller(${sellerCount}/${el.sellers.length}): ${seller.seller} >> OK+` : `!> seller(${sellerCount}/${el.sellers.length}): ${seller.seller} >> ` + errorMessage);
			sellerCount++;
		}

		sellerPriceArray.sort((a, b) => a - b);

		let productSellersArray = queryContent[el.product]["productSellers"];
		let temporaryProductSellersArray = [];

		while (productSellersArray.length>0) {
			let firstSeEl = productSellersArray.shift();
			if(firstSeEl.productDiscountPrice == "999999999"){
				temporaryProductSellersArray[sellerPriceArray.indexOf(firstSeEl.productPrice)] = firstSeEl;
			}else {
				temporaryProductSellersArray[sellerPriceArray.indexOf(firstSeEl.productDiscountPrice)] = firstSeEl;
			}
		};

		queryContent[el.product]["productSellers"] = temporaryProductSellersArray;

		productPriceArray.push(sellerPriceArray[0]);

		sellerCount = 1;
		productCount++;
	}

	productPriceArray.sort((a, b) => a - b);

	let temporaryProductsArray = [];

	let queryContentKeys = Object.keys(queryContent);

	while (queryContentKeys.length>0) {
		let firstPrEl = queryContentKeys.shift();
		if(queryContent[firstPrEl]["productSellers"][0].productDiscountPrice == "999999999"){
			temporaryProductsArray[productPriceArray.indexOf(queryContent[firstPrEl]["productSellers"][0].productPrice)] = firstPrEl;
		} else {
			temporaryProductsArray[productPriceArray.indexOf(queryContent[firstPrEl]["productSellers"][0].productDiscountPrice)] = firstPrEl;
		}
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