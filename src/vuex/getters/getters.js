export default {
	SEARCH_VALUE(state) {
		return state.searchValue;
	},
	PRODUCTS(state) {
		// этот геттер возвращает то, что лежит в state. более того, по мере изменения нашего state, данные будут реактивно изменятся благодаря этому геттеру
		return state.products;
	},
	CART(state) {
		return state.cart;
	},
	CATEGORIES(state) {
		return state.categories;
	},
	IS_MOBILE(state) {
		return state.isMobile;
	},
	IS_DESKTOP(state) {
		return state.isDesktop;
	},
};
