module.exports = {
	url: "http://books.toscrape.com/catalogue/the-requiem-red_995/index.html",
	selectors: {
		tittle: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > h1",
		price: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > p.price_color"
	}
}