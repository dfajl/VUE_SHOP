<template>
	<div class="v-product-page" v-if="product">
		<!-- обрати внимание. на данном диве висит v-if="product". потому что мой див пытается загрузиться раньше, чем произойдет запрос к апи за всеми товарами. т.е.нужно подождать. поэтому этот дивник будет рендериться только после получения ответа от апи -->
		<v-notification :messages="messages" :timeout="3000" />
		<v-popup
			v-if="isInfoPopupVisible"
			@close="closeInfoPopup"
			btnTitle="Add to cart"
			:popupTitle="product.name"
			@addToCart="addToCart"
		>
			<img
				:src="require('../../assets/images/' + product.image)"
				class="v-catalog-item__image"
				alt="img"
			/>
			<div>
				<p class="v-catalog-item__name">
					{{ product.name }}
				</p>
				<p class="v-catalog-item__price">
					Price: {{ product.price | toFix | formattedPrice }}
				</p>
				<!-- обрати внимание, что функция в фильтрах первым аргументом всешда принимает значение перед вертикальной чертой, в данном случае это product_data.price -->
				<p class="v-catalog-item__price">
					Категория: {{ product.category }}
				</p>
			</div>
		</v-popup>

		<router-link :to="{ name: 'cart', params: { cart_data: CART } }">
			<div class="v-catalog__link_to_cart">Cart: {{ CART.length }}</div>
		</router-link>

		<router-link :to="{ name: 'catalog' }">
			<div class="v-catalog__link_to_catalog">Back to catalog</div>
		</router-link>

		<p>Product's name: {{ product.name }}</p>
		<img
			:src="require('../../assets/images/' + product.image)"
			class="v-catalog-item__image"
			alt="img"
		/>
		<p>Article: {{ product.article }}</p>
		<p>Price: {{ product.price | toFix | formattedPrice }}</p>
		<button class="v-catalog-item__show-info" @click="shopPopupInfo">
			Show info
		</button>
		<button class="v-catalog-item__btn btn" @click="addToCart">
			Add to cart
		</button>
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import toFix from '../../filters/toFix';
import formattedPrice from '../../filters/price-format';
import vPopup from '../popup/v-popup.vue';
import vNotification from '../notifications/v-notification.vue';

export default {
	name: 'v-product-page',
	components: {
		vPopup,
		vNotification,
	},
	props: {},
	data() {
		return {
			isInfoPopupVisible: false,
			messages: [],
		};
	},
	filters: {
		toFix,
		formattedPrice,
	},
	computed: {
		...mapGetters(['PRODUCTS', 'CART']),
		product() {
			let result = this.PRODUCTS.find((item) => {
				return item.article === this.$route.query.product;
				// тут я говорю, что в мой объект result я положу тот item, у которого поле item.article будет полностью совпадать со строкой, которую я проношу в данный компонент из v-catalog через $router.push
			});
			return result;
		},
	},
	methods: {
		...mapActions(['GET_PRODUCTS_FROM_API', 'ADD_TO_CART']),
		// в данном компоненте нужно также сделать запрос по APi, чтобы геттер PRODUCTS был заполнен
		addToCart() {
			this.$set(this.product, 'quantity', 1);
			//так я добавляю еще одно поле в объект this.product. this.product - место добавления поля, 'quantity' - ключ, 1 - значение. обязательно делать через $set, иначе поле не будет реактивным

			this.ADD_TO_CART(this.product).then(() => {
				// т.к. экшен - это тот же промис, то для его обработки можно сипользовать then
				let timestamp = Date.now().toLocaleString();
				this.messages.unshift({
					// добавляю элементы в начало массива
					name: `Товар ${this.product.name} добавлен в корзину`,
					icon: 'check_circle',
					id: timestamp,
				});
			});
		},
		shopPopupInfo() {
			this.isInfoPopupVisible = true;
		},
		closeInfoPopup() {
			this.isInfoPopupVisible = false;
		},
	},
	watch: {},
	mounted() {
		// хук, когда отрендерился весь html и появились реактивные связки
		this.GET_PRODUCTS_FROM_API();
	},
};
</script>

<style lang="scss">
.v-product-page {
	margin-top: 200px;
	.v-catalog__link_to_catalog {
		color: black;
		background-color: rgb(90, 90, 160);
		position: absolute;
		top: 150px;
		right: 10px;
		padding: $padding * 2;
		border: 2px solid rgb(12, 12, 12);
		transition: 0.3s linear;
		&:hover {
			background-color: rgba($color: #6e0505, $alpha: 5);
		}
	}
}
</style>
