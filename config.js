module.exports = [
	{
		product: "iphone-14-pro",
		productName: "iPhone 14 PRO MAX 128 GB",
		sellers: [
			{
				seller: "apple",
				url: "https://www.apple.com/hu/shop/buy-iphone/iphone-14-pro",
				selectors: {
					tittle: "span > span.form-selector-left-col.column.large-6 > span.form-selector-title",
					price: "#root > div.rf-bfe > div.rf-bfe-header-wrapper > div > div.rf-bfe-header-price-wrapper > div > div > div.rc-price > div > span > span > span"
				}
			},
			{
				seller: "istyle",
				url: "https://istyle.hu/iphone-14-pro.html?config_size=3574&color=3592&config_model=1322",
				selectors: {
					tittle: "#col-info-main > div > div.page-title-wrapper.product > h1 > span",
					price: "#product-options-wrapper > div > div > div.swatch-attribute.config_model.show_discount_badge.show_price > div > div.swatch-option.selected > span.price"
				}
			},
			{
				seller: "mediamarkt",
				url: "https://www.mediamarkt.hu/hu/product/_apple-iphone-14-pro-128-gb-asztrofekete-kártyafüggetlen-okostelefon-1396917.html",
				selectors: {
					tittle: "#product-details > div.details > h1",
					price: "#product-details > div.details > div.product-attributes.js-product-attributes > div.product-attributes__group.product-attributes__group--colors > div.product-attributes__color-item.product-attributes__color-item--active > span"
				}
			}
		]
	},
	{
		product: "Fiction",
		productName: "proba",
		sellers: [
			{
				seller: "proba1",
				url: "http://books.toscrape.com/catalogue/thirst_946/index.html",
				selectors: {
					tittle: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > h1",
					price: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > p.price_color"
				}
			},
			{
				seller: "proba2",
				url: "http://books.toscrape.com/catalogue/tuesday-nights-in-1980_870/index.html",
				selectors: {
					tittle: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > h1",
					price: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > p.price_color"
				}
			},
			{
				seller: "proba3",
				url: "http://books.toscrape.com/catalogue/the-first-hostage-jb-collins-2_749/index.html",
				selectors: {
					tittle: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > h1",
					price: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > p.price_color"
				}
			}
		]
	}
]