<template>
	<div id="app">
		<v-main-wrapper/> 
	</div>
</template>

<script>
	import vMainWrapper from './components/v-main-wrapper';
	import {mapActions, mapGetters} from 'vuex';
	export default {
		name: 'app',
		components: {
			vMainWrapper
		},
		computed: {
			...mapGetters([
				'IS_DESKTOP',
				'IS_MOBILE'
			])
		},
		methods: {
			...mapActions([
				'SET_MOBILE',
				'SET_DESKTOP'
			])
		},
		mounted() {
			window.addEventListener('resize', ()=> {
				if (window.innerWidth > 767) {
					// this.$store.dispatch('SET_DESKTOP') 
					// это вариант вызова мутации. но привычнее через mapActions
					this.SET_DESKTOP();
					console.log(`isDesktop: ${this.IS_DESKTOP}`);
				} else {
					this.SET_MOBILE();
					console.log(`isMobile : ${this.IS_MOBILE}`);
				}
			})
		}

	}
</script>
 
<style lang="scss">
	#app {
		font-family: Avenir, Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: rgb(105, 103, 66);
		margin-top: 60px;
	}
</style>
