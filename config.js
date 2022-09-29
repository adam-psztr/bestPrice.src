module.exports = [
	{
		category: "Fantasy",
		targetPrice: 40,
		fileName: "fantasy_book.txt",
		products: [
			{
				url: "http://books.toscrape.com/catalogue/crown-of-midnight-throne-of-glass-2_888/index.html",
				selectors: {
					tittle: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > h1",
					price: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > p.price_color"
				}
			},
			{
				url: "http://books.toscrape.com/catalogue/throne-of-glass-throne-of-glass-1_868/index.html",
				selectors: {
					tittle: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > h1",
					price: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > p.price_color"
				}
			},
			{
				url: "http://books.toscrape.com/catalogue/the-glittering-court-the-glittering-court-1_845/index.html",
				selectors: {
					tittle: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > h1",
					price: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > p.price_color"
				}
			}
		]
	},
	{
		category: "Fiction",
		targetPrice: 20,
		fileName: "fiction_book.txt",
		products: [
			{
				url: "http://books.toscrape.com/catalogue/thirst_946/index.html",
				selectors: {
					tittle: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > h1",
					price: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > p.price_color"
				}
			},
			{
				url: "http://books.toscrape.com/catalogue/tuesday-nights-in-1980_870/index.html",
				selectors: {
					tittle: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > h1",
					price: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > p.price_color"
				}
			},
			{
				url: "http://books.toscrape.com/catalogue/the-first-hostage-jb-collins-2_749/index.html",
				selectors: {
					tittle: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > h1",
					price: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > p.price_color"
				}
			}
		]
	}
]