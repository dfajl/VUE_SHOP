<template>
	<div class="v-catalog-item" @click="productClick">
		<v-popup
			v-if="isInfoPopupVisible"
			@close="closeInfoPopup"
			btnTitle="Add to cart"
			:popupTitle="product_data.name"
			@addToCart="addToCart"
		>
			<img
				:src="require('../../assets/images/' + product_data.image)"
				class="v-catalog-item__image"
				alt="img"
			/>
			<div>
				<p class="v-catalog-item__name">
					{{ product_data.name }}
				</p>
				<p class="v-catalog-item__price">
					Price: {{ product_data.price | toFix | formattedPrice }}
				</p>
				<!-- обрати внимание, что функция в фильтрах первым аргументом всешда принимает значение перед вертикальной чертой, в данном случае это product_data.price -->
				<p class="v-catalog-item__price">
					Категория: {{ product_data.category }}
				</p>
			</div>
		</v-popup>

		<img
			:src="require('../../assets/images/' + product_data.image)"
			class="v-catalog-item__image"
			alt="img"
		/>
		<p class="v-catalog-item__name">{{ product_data.name }}</p>
		<p class="v-catalog-item__price">
			Price: {{ product_data.price | toFix | formattedPrice }}
		</p>
		<button class="v-catalog-item__show-info" @click.stop="shopPopupInfo">
			Show info
		</button>
		<button class="v-catalog-item__btn btn" @click.stop="addToCart">
			Add to cart
		</button>
		<!-- обрати внимание, здесь я повесил на кнопки атрибуты stop, чтобы клик  не всплывал выше и не инициировал переход на другую страницу (чтобы не вызывать метод productClick на карточке товара). на попапе тоже надо сделать такие же вещи-->
	</div>
</template>

<script>
import vPopup from '../popup/v-popup.vue';
import toFix from '../../filters/toFix';
import formattedPrice from '../../filters/price-format';
/* эта директива означает, что мы импортируем сюда какой-либо файл и указываем путь до него */

export default {
	name: 'v-catalog-item',
	components: {
		vPopup,
	},
	props: {
		product_data: {
			// это название элемента, который приходит из родителя
			type: Object,
			default() {
				// дефолтное состояние до получения данных
				return {};
			},
		},
	},
	data() {
		return {
			isInfoPopupVisible: false,
		};
	},
	filters: {
		toFix,
		formattedPrice,
	},
	methods: {
		// sendDataToParent () {
		//     this.$emit('sendArticle', this.product_data.article)
		// }
		shopPopupInfo() {
			this.isInfoPopupVisible = true;
		},
		closeInfoPopup() {
			this.isInfoPopupVisible = false;
		},
		addToCart() {
			this.$emit('addToCart', this.product_data);
		},
		productClick() {
			this.$emit('productClick', this.product_data);
			console.log(this.product_data);
			/* console.log(event.target);
			console.log(x); // просто тренируюсь с параметрами функции */
		},
	},
	mounted() {
		this.$set(this.product_data, 'quantity', 1);
		//так я добавляю еще одно поле в объект cart_item_data в момент полной загрузки компонента в хуке mounted. this.cart_item_data - место добавления поля, 'quantity' - ключ, 1 - значение. обязательно делать через $set, иначе поле не будет реактивным
	},
};
</script>

<style lang="scss">
.btn {
	background-color: rgb(90, 90, 160);
	transition: 0.2s linear;
	&:hover {
		background-color: rgb(124, 38, 38);
	}
}
.v-catalog-item {
	flex-basis: 25%;
	// сколько будет занимать флекс-ребенок от общей ширины
	box-shadow: 0 0 8px 0 #e0e0e0;
	padding: $padding * 2;
	margin-bottom: $margin * 2;
	/* transition: 0.4s linear ;
	cursor: pointer;
	&:hover {
		transform: translate(0, -6px);
		box-shadow: 0 30px 30px rgba($color: #000000, $alpha: 0.4);
	} 
	c анимацией четко выглядит. но почему-то лагает люто*/
	&__image {
		width: 100px;
	}
	&__show-info {
		border-radius: 4px;
		color: #c85353;
		margin-right: 20px;
		cursor: pointer;
		transition: 0.2s linear;
		&:hover {
			background-color: rgb(124, 38, 38);
		}
	}
}
</style>
