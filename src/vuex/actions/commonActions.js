export default {
	GET_SEARCH_VALUE_TO_VUEX({ commit }, value) {
		commit('SET_SEARCH_VALUE', value);
	},
	ADD_TO_CART({ commit }, product) {
		//commit вызывает мутацию, а product - это аргумент (это мой объект product_data, который пришел из v-catalog-item)
		commit('SET_CART', product);
	},
	DELETE_FROM_CART({ commit }, index) {
		commit('REMOVE_FROM_CART', index);
	},
	INCREMENT_CART_ITEM({ commit }, index) {
		commit('INCREMENT', index);
	},
	DECREMENT_CART_ITEM({ commit }, index) {
		commit('DECREMENT', index);
	},
	SET_MOBILE({ commit }) {
		// в видосе он сказал, что изменить данные в стейте без мутации нельзя. но мутации синхронны. поэтому, ЧТОБЫ ГАРАНТИРОВАТЬ РАБОТОСПОСОБНОСТЬ ПРИЛОЖЕНИЯ, создадим actions, которые будут вызывать мутации
		commit('SWITCH_MOBILE');
	},
	SET_DESKTOP({ commit }) {
		commit('SWITCH_DESKTOP');
	},
};
