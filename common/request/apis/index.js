import xshop from './xshop'
import xshopcoupon from './xshopcoupon'
const modules = {
	xshop,
	xshopcoupon
}
// console.log(modules);
function parseUrl() {
	let res = {}
	for (let key in modules) {
		
		let item = modules[key];
		
		for (let k in item) {
			// console.log(item[k].uri);
			res[k] = item[k]
			res[k].uri = key + '/' + item[k].uri
		}
	}
	// console.log(res);
	return res
}

// http://47.56.173.44/shopdemo/public/index.php/addons/xshop/nav
// http://47.56.173.44/shopdemo/public/index.php/addons/xshop/cart/clear
// http://47.56.173.44/shopdemo/public/index.php/addons/xshop/cart/delete

// http://47.56.173.44/shopdemo/public/index.php/addons/xshopcoupon/coupon/getProductCoupon
// http://47.56.173.44/shopdemo/public/index.php/addons/xshopcoupon/coupon/addCoupon

export default parseUrl()