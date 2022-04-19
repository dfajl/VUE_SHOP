<template>
	
	<div class='v-cart-item'>
		<img 
			:src="require('../../assets/images/' + cart_item_data.image)"
			class="v-cart-item__image"
		>
		<div class="v-cart-item__info">
			<p> {{cart_item_data.name}} </p>
			<p> {{cart_item_data.price}} </p>
			<p> {{cart_item_data.article}} </p>
		</div>
		<div class="cart-item__quantity">
			<p> Quantity: </p>
			<p class="cart-item__space_between">
				<button 
					class="operator"
					@click="decrmentItem"
				> - </button>

				{{ cart_item_data.quantity }} 

				<button 
					class="operator"
					@click="incrementItem"
				> + </button>
			</p>
		</div>
        <button class="btn" @click="deleteFromCart"> Delete </button>
	</div>
	
</template>

<script>
	export default {
		name: 'v-cart-item',
		props: {
			cart_item_data: {
				type: Object,
				default() {
					return {}
				}
			}
		},
		data() {
			return {

			}
		},
		methods: {
			deleteFromCart() {
				this.$emit('deleteFromCart') // можно передать article. тогда из клика в буттон надо вызвать клик с cart_item_data.article. и, соответственно, в v-cart вызвать deleteFromCart(article)и далее уже передавать article в стор. но я все-таки сделаю как в видео (буду юзать index из цикла v-for) 
			},
			incrementItem() {
				this.$emit('increment')
				// почему мы эмитим эти методы в родителя v-cart: потому что там нам доступен индекс, по которому мы будем изменять количество товаров (индекс берется из цикла перебора массива v-for="(item, index) in cart_data")
			},
			decrmentItem() {
				this.$emit('decrement')
			}
		},
		computed: {},
	}
</script>

<style lang="scss">
    .v-cart-item {
		display: flex;
		flex-wrap: nowrap;
		justify-content: space-between;
		align-items: center;
		box-shadow: 0 0 8px 0 #e0e0e0;
        padding: $padding*2;
        margin-bottom: $margin*2;
		&__image {
			max-width: 90px;
		}
		.cart-item__quantity {
			.cart-item__space_between {
				display: flex;
				justify-content: space-between;
				.operator {
					cursor: pointer;
					background-color: #5a5aa0;
					margin: 0 10px;
					border-radius: $radius;
					transition: 0.3s linear;
					&:hover {
						background-color: rgba($color: #6e0505, $alpha: 5.0);
					}
				}
			}
		}
	}
	.btn {
		border-radius: $radius;
	}
	
</style>