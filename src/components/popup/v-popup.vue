<template>
	<div class="v-popup_wrapper" ref="v-popup_wrapper">
		<!-- ref="v-popup_wrapper" - это ссылка на элемент темплейта -->
		<div class="v-popup">
			<div class="v-popup__header">
				<span> {{ popupTitle }} </span>
				<span>
					<i class="material-icons" @click.stop="closePopup">
						close
					</i>
				</span>
			</div>

			<div class="v-popup__content">
				<slot> </slot>
			</div>

			<div class="v-popup__footer">
				<button class="submit_btn" @click.stop="addToCArt">
					{{ btnTitle }}
				</button>
				<button class="close_modal" @click.stop="closePopup">
					Close
				</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'v-popup',
	props: {
		btnTitle: {
			type: String,
			default: 'Ok',
		},
		popupTitle: {
			type: String,
			default: 'Popup name',
		},
	},
	data() {
		return {};
	},
	methods: {
		closePopup() {
			this.$emit('close');
		},
		addToCArt() {
			this.$emit('addToCart');
			/* просто эмитим событие наверх. параметры не нужны, т.к мы просто генерирем событие клика по определенной кнопке. далее мы слушаем это событие в родителе (v-catalog-item). и уже оттуда эмитим наверх через метод addToCart this.product_data. а это не что иное, как определенный товар целиком. и уже из v-catalog мы кладем товар в корзину */
		},
	},
	mounted() {
		document.addEventListener('click', (event) => {
			if (event.target == this.$refs['v-popup_wrapper']) {
				this.closePopup();
			}
		});
	},
};
</script>

<style lang="scss">
.v-popup_wrapper {
	background: rgba(47, 48, 47, 0.86);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5; /* чтобы ползунки не вылезали на диапозоне */
	height: 100%;
	width: 100%;
	.v-popup {
		z-index: 2;
		color: black;
		position: fixed;
		/* элемент будет позиционироваться всегда относительно окна просмотра. и ему похер на позиционирование ближайшего родителя  */
		width: 400px;
		padding: 6px;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		box-shadow: 0 0 8px 0 #e0e0e0;
		background-color: rgba(255, 255, 255, 0.701);
		.submit_btn,
		.close_modal {
			cursor: pointer;
		}
		&__header,
		&__footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.submit_btn {
				padding: 8px;
				color: #fff;
				background: #2d2d2d;
			}
			.close_modal {
				background: red;
				padding: 8px;
				color: #fff;
			}
			.material-icons {
				color: red;
				cursor: pointer;
			}
		}
		&__content {
			margin-bottom: 5px;
			display: flex;
			justify-content: space-around;
			align-items: center;
		}
	}
}
</style>
