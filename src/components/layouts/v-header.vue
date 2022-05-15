<template>
	<div class="v-header">
		<router-link :to="{ name: 'mainPage' }">
			<img src="../../assets/images/logo.png" alt="" />
		</router-link>

		<div class="search-wrapper">
			<input
				class="search-field"
				type="text"
				v-model="searchValue"
				placeholder="Input the name of a product"
			/>
			<button class="search_btn">
				<i class="material-icons" @click="search(searchValue)">
					search
				</i>
			</button>
			<button class="search_btn">
				<i class="material-icons" @click="clearSearchField()">
					cancel
				</i>
			</button>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	name: 'v-header',

	props: {},
	data() {
		return {
			searchValue: '',
		};
	},
	computed: {
		...mapGetters(['SEARCH_VALUE']),
	},
	methods: {
		...mapActions(['GET_SEARCH_VALUE_TO_VUEX']),
		search(value) {
			this.GET_SEARCH_VALUE_TO_VUEX(value);

			if (this.$route.path !== '/catalog') {
				this.$router.push('/catalog');
			}
			// так по клику на иконку я перехожу в каталог. но делаю это с проверкой на путь. то есть, если мы уже в каталоге, то мы никуда не переходим, если же мы в другом path, то осуществляем переход в каталог. это делается, чтобы избежать в консоли предупреждения о дублировании путей. но и с этим предупреждением все работает, так как мне главное - передать данные, а не осуществить переход. либо оборачиваешь саму иконку в router-link. тогда предупреждения не будет вообще
		},
		clearSearchField() {
			this.searchValue = '';
			this.GET_SEARCH_VALUE_TO_VUEX();
			if (this.$route.path !== '/catalog') {
				this.$router.push('/catalog');
			}
		},
	},
	watch: {},
	mounted() {},
};
</script>

<style lang="scss">
.v-header {
	z-index: 15;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	border-radius: 4px;
	padding: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	background-color: rgba(90, 90, 160, 0.813);
	img {
		width: 70px;
	}
	.search-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: relative;
		right: 100px;
		.search-field {
			height: 30px;
			width: 200px;
			transition: 0.5s linear;
			color: black;
			font-size: 16px;
			background: #e7e7e7;
			cursor: pointer;
			&:hover {
				background-color: grey;
			}
		}
		.search_btn {
			margin-left: 10px;
			background: transparent;
			border: none;
			i {
				transition: 0.2s linear;
				&:hover {
					color: rgb(174, 6, 6);
					font-size: 30px;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
