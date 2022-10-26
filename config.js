// module.exports = [
// 	{
// 		product: "productMin",
// 		mainProductName: "mainProductName",
// 		subProductName: "subProductName"
// 		sellers: [
// 			{
// 				seller: "seller",
// 				url: "productUrl",
// 				selectors: {
// 					title: "productTitleSelector",
// 					price: "productPriceSelector"
// 					discountPrice: "productDiscountPriceSelector"
// 				}
// 			}
// 		]
// 	}
// ]

// product selector template
let pst = {
	spar: {
		title: "#product-361462004"
	}
}

module.exports = [
	{
		product: "iphone-14-pro",
		mainProductName: "iPhone 14 PRO MAX 128 GB",
		subProductName: "pink",
		sellers: [
			{
				seller: "apple",
				url: "https://www.apple.com/hu/shop/buy-iphone/iphone-14-pro",
				selectors: {
					title: "span > span.form-selector-left-col.column.large-6 > span.form-selector-title",
					price: "#root > div.rf-bfe > div.rf-bfe-header-wrapper > div > div.rf-bfe-header-price-wrapper > div > div > div.rc-price > div > span > span > span",
					discountPrice: "#root > div.rf-bfe > div.rf-bfe-header-wrapper > div > div.rf-bfe-header-price-wrapper > div > div > div.rc-price > div > span > span > span"
				}
			},
			{
				seller: "istyle",
				url: "https://istyle.hu/iphone-14-pro.html?config_size=3574&color=3592&config_model=1322",
				selectors: {
					title: "#col-info-main > div > div.page-title-wrapper.product > h1 > span",
					price: "#product-options-wrapper > div > div > div.swatch-attribute.config_model.show_discount_badge.show_price > div > div.swatch-option.selected > span.price",
					discountPrice: "#root > div.rf-bfe > div.rf-bfe-header-wrapper > div > div.rf-bfe-header-price-wrapper > div > div > div.rc-price > div > span > span > span"
				}
			},
			{
				seller: "mediamarkt",
				url: "https://www.mediamarkt.hu/hu/product/_apple-iphone-14-pro-128-gb-asztrofekete-kártyafüggetlen-okostelefon-1396917.html",
				selectors: {
					title: "#product-details > div.details > h1",
					price: "#product-details > div.details > div.product-attributes.js-product-attributes > div.product-attributes__group.product-attributes__group--colors > div.product-attributes__color-item.product-attributes__color-item--active > span",
					discountPrice: "#root > div.rf-bfe > div.rf-bfe-header-wrapper > div > div.rf-bfe-header-price-wrapper > div > div > div.rc-price > div > span > span > span"
				}
			}
		]
	},
	{
		product: "Fiction",
		mainProductName: "proba",
		subProductName: "",
		sellers: [
			{
				seller: "proba3",
				url: "http://books.toscrape.com/catalogue/the-first-hostage-jb-collins-2_749/index.html",
				selectors: {
					title: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > h1",
					price: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > p.price_color",
					discountPrice: "#root > div.rf-bfe > div.rf-bfe-header-wrapper > div > div.rf-bfe-header-price-wrapper > div > div > div.rc-price > div > span > span > span"
				}
			},
			{
				seller: "proba1",
				url: "http://books.toscrape.com/catalogue/thirst_946/index.html",
				selectors: {
					title: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > h1",
					price: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > p.price_color",
					discountPrice: "#root > div.rf-bfe > div.rf-bfe-header-wrapper > div > div.rf-bfe-header-price-wrapper > div > div > div.rc-price > div > span > span > span"
				}
			},
			{
				seller: "proba2",
				url: "http://books.toscrape.com/catalogue/tuesday-nights-in-1980_870/index.html",
				selectors: {
					title: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > h1",
					price: "#content_inner > article > div:nth-child(1) > div.col-sm-6.product_main > p.price_color",
					discountPrice: "#root > div.rf-bfe > div.rf-bfe-header-wrapper > div > div.rf-bfe-header-price-wrapper > div > div > div.rc-price > div > span > span > span"
				}
			}
		]
	},
	{
		product: "tejfol",
		mainProductName: "Mizo tejföl 20%",
		subProductName: "330 g",
		sellers: [
			{
				seller: "Tesco",
				url: "https://bevasarlas.tesco.hu/groceries/hu-HU/products/2004003218682",
				selectors: {
					title: "#main > div.main__content > div > div:nth-child(1) > div.product-details-page > div.product-overview > div:nth-child(1) > div > div.product-details-tile__main > div.product-details-tile__title-wrapper > h1",
					price: "#main > div.main__content > div > div:nth-child(1) > div.product-details-page > div.product-overview > div:nth-child(1) > div > div > div.product-controls__wrapper > form > div > div.price-details--wrapper > div.price-control-wrapper > div > div > span > span.value",
					discountPrice: "#main > div.main__content > div > div:nth-child(1) > div.product-details-page > div.product-overview > div:nth-child(1) > div > div.product-details-tile__main > div:nth-child(3) > ul > li > a > div > span.offer-text"
				}
			},
			{
				seller: "SPAR",
				url: "https://www.spar.hu/onlineshop/mizo-tejfol-20-330-g/p/361462004",
				selectors: {
					title: pst.spar.title,
					price: "#productDetailsPageCenterWrapper > div.productDetailsPanel > div.productMainDetails.cf > div.productMainDetailsPrice.productQtyFav.productInformationContainer > div.productMainDetailsPriceLabels > label.productDetailsPrice",
					discountPrice: "#productDetailsPageCenterWrapper > div.productDetailsPanel > div.productMainDetails.cf > div.productMainDetailsPrice.productQtyFav.productInformationContainer > div.productMainDetailsPriceLabels > label.productDetailsOldPrice"
				}
			},
			{
				seller: "kifli",
				url: "https://www.kifli.hu/32167-mizo-tejfol-20",
				selectors: {
					title: "#productDetail > div.sc-c64788e3-1.bShmSQ > div.sc-c64788e3-5.jDPiWs > h2 > a",
					price: "#productDetail > div.sc-c64788e3-1.bShmSQ > div.sc-c64788e3-5.jDPiWs > div:nth-child(4) > div.sc-93217d65-0.dUvcGB > div",
					discountPrice: "#productDetail > div.sc-c64788e3-1.bShmSQ > div.sc-c64788e3-5.jDPiWs > div:nth-child(4) > div.sc-93217d65-0.dUvcGB > div"
				}
			}
		]
	}
]