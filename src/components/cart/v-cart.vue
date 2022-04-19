<template>
	<div class="v-cart">

		<router-link :to="{name: 'catalog'}"> 
            <div class="v-catalog__link_to_cart"> Back to catalog </div>
        </router-link>

		<h1> Cart </h1>
		<p v-if="!cart_data.length"> There are no products in your cart...</p>
		<v-cart-item
			v-for="(item, index) in cart_data"
			:key="item.article"
			:cart_item_data="item"
			@deleteFromCart='deleteFromCart(index)'
			@increment="increment(index)"
			@decrement="decrement(index)"
		/>
			<!-- с помощью v-for="(item, index) in cart_data" я отрисовываю каждый элемент корзины (v-cart-item) столько раз, сколько этих элементов лежит в корзине. затем я говорю, что в компонент v-cart-item будет прилетать пропс :cart_item_data="item", динамически связанный с перебираемым в данный момент элементом из массива cart_data  -->
		<div class="v-cart__total">
			<p class="total__name">Total:</p>
			<p>{{cartTotalCost}}руб</p>
		</div>	
	</div>
</template>

<script>

	import vCartItem from './v-cart-item.vue'
	import{mapActions} from 'vuex'
	
	export default {
		name: 'v-cart',
		components: {
			vCartItem
		},
		props: {
			cart_data: {
				type: Array,
				default() {
					return []
				}
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			cartTotalCost() {
				let result = [];
				for (let item of this.cart_data) {
					result.push(item.price * item.quantity)
					// в массиве result лежат занчения [цена1*кол-во1, цена2*кол-во2,...]
				}
				result = result.reduce((sum, current)=> {
					// при первом запуске sum - это  первый элемент массива (т.к. не передан initial), а current - это второй элемент
					//console.log(current);
					//console.log(sum);
					return sum + current;
				}, 0) // 0 - это initial. лучше всегда передавать его, чтобы не было ошибки Error: Reduce of empty array with no initial value
				
				return result;
			}
		},
		methods: {
			...mapActions([
				'DELETE_FROM_CART',
				'INCREMENT_CART_ITEM',
				'DECREMENT_CART_ITEM'
			]),
			increment(index) {
				this.INCREMENT_CART_ITEM(index);
			},
			decrement(index) {
				this.DECREMENT_CART_ITEM(index);
			},
			deleteFromCart(index) {
				console.log(index)
				this.DELETE_FROM_CART(index);
			}
		}
	}
</script>

<style lang="scss">
	.v-cart {
		&__total {
			margin: 0 auto;
			position: fixed;
			bottom: 0;
			right: 0;
			left: 0;
			padding: $padding*2;
			display: flex;
			justify-content: center;
			align-items: center;
			background: rgba(90, 90, 160, 0.7 );
			/* 0.7 - это насколько НЕ прозрачен элемент */
			border: 2px solid black;
			color: black;
			margin-bottom: $margin;
			height: 30px;
			font-size: 20px;
			
		} 
		.total__name {
			margin-right: $margin;
		}
	}

    
</style>