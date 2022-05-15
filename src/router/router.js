import Vue from 'vue';
import Router from 'vue-router'; // это импорт модуля Router из папки node_modules

import vCatalog from '../components/catalog/v-catalog.vue';
import vCart from '../components/cart/v-cart.vue';
import vMainPage from '../components/main-page/v-main-page.vue';
import vProductPage from '../components/catalog/v-product-page.vue';

Vue.use(Router); // буквально говорю, чтобы Vue юзал роутер

let router = new Router({
	routes: [
		// routes - маршруты
		{
			path: '/',
			// это коренвой URL-адрес. т.е. изначальная страница из localhost
			name: 'mainPage',
			component: vMainPage,
			props: true, // если хотим передавать какие-либо параметры на данную страницу
		},
		{
			path: '/catalog',
			name: 'catalog', // имя роута
			component: vCatalog, // это то, какой компонент находится по данному URL-адресу
		},
		{
			path: '/product',
			name: 'product', // имя роута
			component: vProductPage, // это то, какой компонент находится по данному URL-адресу
		},
		{
			path: '/cart',
			name: 'cart',
			component: vCart,
			props: true, // если хотим передавать какие-либо параметры на данную страницу
		},
	],
});

export default router;
