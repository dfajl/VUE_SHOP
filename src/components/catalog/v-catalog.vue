<template>
	<div class="v-catalog">
		<v-notification
			:messages="messages"
			:sortedProducts="sortedProducts"
			:timeout="3000"
		/>

		<router-link :to="{ name: 'cart', params: { cart_data: CART } }">
			<div class="v-catalog__link_to_cart">Cart: {{ CART.length }}</div>
		</router-link>
		<!--  это и есть наша ссылка на другую страницу (на корзину) -->

		<h1>Catalog</h1>
		<div class="filters">
			<v-select
				:selected="selected"
				:options="CATEGORIES"
				@select="chooseCategory"
				:isExpanded="IS_DESKTOP"
			/>
			<div class="range-slider">
				<input
					type="range"
					min="0"
					max="9000"
					step="100"
					v-model.number="minPrice"
					@change="setRangeSlider"
				/>
				<input
					type="range"
					min="0"
					max="9000"
					step="100"
					v-model.number="maxPrice"
					@change="setRangeSlider"
				/>
			</div>
			<div class="range-values">
				<p>Min: {{ minPrice }}</p>
				<p>Max: {{ maxPrice }}</p>
			</div>
		</div>

		<div class="v-catalog__list">
			<v-catalog-item
				v-for="product in sortedProducts"
				:key="product.article"
				:product_data="product"
				@addToCart="addToCart"
				@productClick="productClick"
			/>
			<!-- :product_data="product" - динамически связываю каждый элемент (item) в компоненте v-catalog-item c данными из data в родительском компоненте -->
		</div>
	</div>
</template>

<script>
import vCatalogItem from './v-catalog-item.vue';
import { mapActions, mapGetters } from 'vuex';
import vSelect from '../v-select.vue';
import vNotification from '../notifications/v-notification.vue';

export default {
	name: 'v-catalog',
	components: {
		vCatalogItem, // ребенок по отношению к "v-catalog"
		vSelect,
		vNotification,
	},
	props: {},
	data() {
		return {
			selected: 'Choose the category: ',
			sortedProducts: [],
			minPrice: 0,
			maxPrice: 9000,
			categoryCounter: 0,
			messages: [],
		};
	},
	computed: {
		//чтобы в цикле v-for не писать this.$store.state.products, мы вписываем сюда геттер из стора
		...mapGetters([
			'PRODUCTS',
			'CART',
			'CATEGORIES',
			'IS_DESKTOP',
			'SEARCH_VALUE',
			// это геттер нужен, чтобы был доступ к данным: Cart: {{CART.length}}
		]),
	},
	methods: {
		...mapActions([
			// это делается для того, чтобы к методу можно было бы обратиться через this
			'GET_PRODUCTS_FROM_API',
			'ADD_TO_CART',
		]),
		addToCart(data) {
			this.ADD_TO_CART(data).then(() => {
				// т.к. экшен - это тот же промис, то для его обработки можно сипользовать then
				let timestamp = Date.now().toLocaleString();
				this.messages.unshift({
					// добавляю элементы в начало массива
					name: `Товар ${data.name} добавлен в корзину`,
					id: timestamp,
					icon: 'check_circle',
				});
			});
		},
		chooseCategory(option) {
			this.categoryCounter++;
			this.selected = option.name;
			this.sortedProducts = this.sortedProducts.filter((item) => {
				return (
					item.category === option.name &&
					item.price >= this.minPrice &&
					item.price <= this.maxPrice
				);
			});
			if (option.name === 'Все') {
				return (this.sortedProducts = this.PRODUCTS.filter((item) => {
					return (
						item.price >= this.minPrice &&
						item.price <= this.maxPrice
					);
				}));
			} else if (this.categoryCounter > 1) {
				this.sortedProducts = this.PRODUCTS.filter((item) => {
					return (
						item.category === option.name &&
						item.price >= this.minPrice &&
						item.price <= this.maxPrice
					);
				});
			}
		},
		sortByCategories() {
			this.sortedProducts = [...this.PRODUCTS];
			this.sortedProducts = this.sortedProducts.filter((item) => {
				return (
					item.price >= this.minPrice && item.price <= this.maxPrice
				);
				/*  т.е в этом методе я клонирую мой геттер PRODUCTS в sortedProducts. и при каждом срабатывании метода @change в инпутах
                    type="range" я фильтрую продукты в соответсвии с ценой */
			});
		},
		setRangeSlider() {
			if (this.minPrice > this.maxPrice) {
				let temp = this.maxPrice;
				this.maxPrice = this.minPrice;
				this.minPrice = temp;
				// это сделалось для того, чтобы при перемещении ползунка максимальная цена не могла стать меньше минимальной
			}
			this.sortByCategories();
		},
		sortProductsBySearchValue(value) {
			// value - это значение this.SEARCH_VALUE
			this.sortedProducts = [...this.PRODUCTS];
			// таким образом я обнуляю каждый раз исходный массив карточек товара
			// еще я заметил, что можно и не делать через спред-оператор, а просто передать геттер this.PRODUCTS
			if (value) {
				this.sortedProducts = this.sortedProducts.filter((item) => {
					return item.name
						.toLowerCase()
						.includes(value.toLowerCase());
				});
			}
			// плюс в видео он делает проверку перед вызовом фильтра на пустое значение пареметра value. эта проверка делается для того, чтобы при очистки инпута при вызове метода clearSearchField() мой вотчер SEARCH_VALUE не передавал пустую строку в includes(value.toLowerCase()), что поможет избежать ошибку в консоли
		},
		productClick(product) {
			//console.log(product);
			this.$router.push({
				name: 'product', // имя маршрута. это поле должно совпадать с полями name и route в router.js
				query: {
					product: product.article, // так я заполнил поле query - route. здесь вместо product может быть любое имя
				},
			});
		},
	},
	watch: {
		SEARCH_VALUE() {
			this.sortProductsBySearchValue(this.SEARCH_VALUE);
			// как только мой геттер SEARCH_VALUE изменяется, я вызываю метод sortProductsBySearchValue и передаю ему этот самый измененный this.SEARCH_VALUE
		},
	},
	mounted() {
		// хук, когда отрендерился весь html и появились реактивные связки
		this.GET_PRODUCTS_FROM_API()
			//метод  GET_PRODUCTS_FROM_API() будет вызван, когда компонент полностью загрузится
			.then((products) => {
				if (products.data) {
					console.log('Data arrived!');
					this.sortByCategories();

					// не совсем понял, зачем вызывать этот метод в момент полной отрисовки компонента
					this.sortProductsBySearchValue(this.SEARCH_VALUE);
				}
			});
	},
};
</script>

<style lang="scss">
.v-catalog {
	h1 {
		display: block;
		margin-top: 100px;
	}
	&__list {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
	}
	&__link_to_cart {
		color: black;
		background-color: rgb(90, 90, 160);
		position: absolute;
		top: 90px;
		right: 10px;
		padding: $padding * 2;
		border: 2px solid rgb(12, 12, 12);
		transition: 0.3s linear;
		&:hover {
			background-color: rgba($color: #6e0505, $alpha: 5);
		}
	}
	.filters {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.range-slider {
		width: 200px;
		margin: auto 16px;
		/*auto означает, что верхний и нижний отстуаы будут рассчитаны автоматически браузером, а справа и слева по 16 пискелей  */
		text-align: center;
		position: relative;
		svg,
		input[type='range'] {
			position: absolute;
			left: 0;
			bottom: 0;
		}
		input[type='range']::-webkit-slider-thumb {
			z-index: 2;
			position: relative;
			top: 2px;
			left: -7px;
		}
	}
}
</style>
