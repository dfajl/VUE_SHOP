<template>
	<div class="v-main-wrapper">
		<v-header />
		<!-- компонет <v-header /> будет отображаться во всех дочерних компонентах. это логично, просто я немного затроил -->
		<keep-alive>
			<!-- keep-alive - пока не особо понял, но суть в том что этот элемент позволяет сохранять состоя
            ние компонентов при изменении URL-->
			<router-view></router-view>
			<!-- <router-view> в этой области показываются компоненты в зависимости от URL-->
		</keep-alive>

		<!-- <v-catalog/>
        <v-cart
            v-if="CART.length"
            :cart_data="CART" 
        /> -->
	</div>
</template>
<!-- :cart_data="CART" - передал данные из стора (CART) в дочерний компонент (v-cart)  -->
<script>
// import vCatalog from './v-catalog.vue'
// import vCart from './v-cart.vue'
// import {mapGetters} from 'vuex' // чтобы поймать корзину в компоненте
import vHeader from './layouts/v-header.vue';

export default {
	name: 'v-main-wrapper', // имя компонента
	components: {
		// vCatalog, vCart
		vHeader,
	},

	props: {}, // это неперсональные данные компонента. то что прилетает из родителя
	data() {
		// это персональные данные компонента
		return {};
	},
	computed: {
		// вычисляемые свойства
		// ...mapGetters([
		//     // c помощью этого св-ва я могу обращаться в данном компоненте к корзине через CART
		//     'CART'
		// ])
	},
	methods: {},
	watch: {},
	mounted() {
		console.log('компонент полностью загрузился');
	},
};
</script>

<style>
.v-main-wrapper {
	margin: 0 auto;
}
</style>
