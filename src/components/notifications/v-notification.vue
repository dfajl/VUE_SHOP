<template>
	<div class="v-notification">
		<!--  transition-group специальная тема для анимирования списков во vue.js-->
		<transition-group name="v-transition-animate" class="messages_list">
			<div
				:class="message.icon"
				class="v-notification__content"
				v-for="message in messages"
				:key="message.id"
			>
				<div class="content__text">
					<span> {{ message.name }} </span>
					<i class="material-icons"> {{ message.icon }} </i>
					<!-- <span> {{ message.id }} </span> это просто для понятия, что элементы добавляются в массив в начало-->
				</div>
				<div class="content__buttons">
					<button v-if="rightButton.length">{{ rightButton }}</button>
					<button v-if="leftButton.length">{{ leftButton }}</button>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script>
export default {
	name: 'v-notification',
	props: {
		sortedProducts: {
			type: Array,
			default: () => {
				return [];
			},
		},
		messages: {
			type: Array,
			default: () => {
				return [];
			},
		},
		rightButton: {
			type: String,
			default: '',
		},
		leftButton: {
			type: String,
			default: '',
		},
		timeout: {
			type: Number,
			default: 3000,
		},
	},
	data() {
		return {
			notification: this.messages,
		};
	},
	methods: {
		hideNotification() {
			if (this.notification.length) {
				// без проверки работает некорректно
				setTimeout(() => {
					this.notification.splice(this.notification.length - 1, 1);
				}, this.timeout);
			}
		},
	},
	/* mounted() {
		this.hideNotification();
	}, */
	watch: {
		messages() {
			// при каждом изменении messages происходит данное действие
			this.hideNotification();
		},
	},
};
</script>

<style lang="scss">
.v-notification {
	position: fixed;
	top: 90px;
	right: 16px;
	z-index: 10;
	.error {
		background: red;
	}
	.warning {
		background-color: orange;
	}
	.check_circle {
		background-color: rgba(4, 131, 59, 0.734);
	}
	&__content {
		margin-bottom: 16px;
		border-radius: 4px;
		padding: 16px;
		color: aliceblue;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		background-color: rgba(4, 131, 59, 0.734);
		.content__text {
			display: flex;
			justify-content: space-around;
			align-items: center;
			& :first-child {
				margin-right: 5px;
			}
		}
	}
	.v-transition-animate {
		&-enter {
			/* начальная позиция анимации */
			transform: translateX(120px);
			/* Сдвигает элемент относительно его обычного положения по оси X */
			opacity: 0;
			/* полностью прозрачный элемент */
		}
		&-enter-active {
			transition: 0.6s all ease;
		}
		&-enter-to {
			opacity: 1;
			/* полностью непрозрачный элемент */
		}
		&-leave {
			/* стадия завершения анимации */
			height: 50px;
			opacity: 1;
		}
		&-leave-active {
			transition: 0.6s all ease;
		}
		&-leave-to {
			height: 0;
			transform: translateX(120px);
			opacity: 0;
		}
		&-move {
			/* для плавности движения вниз */
			transition: transform 0.6s ease;
		}
	}
}
</style>
