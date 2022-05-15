<template>
	<div class="v-main-page">
		<h1>Online shop</h1>
		<router-link :to="{ name: 'catalog' }">
			<a>GO TO CATALOG</a>
		</router-link>
	</div>
</template>

<script>
// import vCatalog from './v-catalog.vue'
// import vCart from './v-cart.vue'
// import {mapGetters} from 'vuex' // чтобы поймать корзину в компоненте

export default {
	name: 'v-main-page',
	props: {},
	data() {
		return {};
	},
	computed: {},
	methods: {},
	watch: {},
	mounted() {},
};
</script>

<style lang="scss" scoped>
h1 {
	margin-top: 100px;
}
a {
	font-size: 30px;
	text-decoration: none;
	transition: 0.3s linear;
	&:hover {
		font-size: 35px;
	}
}
</style>
