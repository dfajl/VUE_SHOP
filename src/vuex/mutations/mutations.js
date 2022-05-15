export default {
	SET_PRODUCTS_TO_STATE: (state, products) => {
		state.products = products;
	},
	SET_CART: (state, product) => {
		if (state.cart.length) {
			// есть ли корзина (т.е., не пустая ли она?)
			let isProductExists = false;
			// это флаг, определяющий наличие определенного товара в корзине

			let mapFunction = state.cart.map((item) => {
				// просто создал переменную, чтобы посмотреть, что возвращает метод массива map()
				if (item.article === product.article) {
					// т.е идет сравнение артикула лажащего в корзине товара с артикулом товара добавляемого
					isProductExists = true;
					return item.quantity++;
				}
			});
			console.log(mapFunction); // обрати внимание: если не использовать явно return, то функция в методе map(function (item)) вернет undefined, но  достаточно тупо использовать любой перебирающий метод

			if (!isProductExists) {
				state.cart.push(product);
			}
		} else {
			state.cart.push(product);
		}
	},
	REMOVE_FROM_CART: (state, index) => {
		state.cart.splice(index, 1);
	},
	INCREMENT: (state, index) => {
		state.cart[index].quantity++;
		console.log('click');
	},
	DECREMENT: (state, index) => {
		if (state.cart[index].quantity > 1) {
			state.cart[index].quantity--;
		}
		console.log('click');
	},
	SWITCH_MOBILE: (state) => {
		state.isMobile = true;
		state.isDesktop = false;
	},
	SWITCH_DESKTOP: (state) => {
		state.isDesktop = true;
		state.isMobile = false;
	},
	SET_SEARCH_VALUE: (state, value) => {
		state.searchValue = value;
	},
};
