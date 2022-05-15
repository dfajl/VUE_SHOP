<template>
	<div class="v-select">
		<p class="title" @click.stop="areOptionsVisible = !areOptionsVisible">
			{{ selected }}
		</p>

		<div class="options" v-if="areOptionsVisible || isExpanded">
			<p
				v-for="option in options"
				:key="option.value"
				@click="selectOption(option)"
			>
				{{ option.name }}
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'v-select',
	props: {
		options: {
			type: Array,
			default() {
				// дефолтное состояние до получения данных
				return [];
			},
		},
		selected: {
			type: String,
			default: '',
		},
		isExpanded: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			areOptionsVisible: false,
		};
	},
	methods: {
		selectOption(option) {
			this.areOptionsVisible = false;
			this.$emit('select', option);
		},
		hideSelect(x) {
			console.log(this);
			console.log(x); // просто для прикола передал через bind()
			this.areOptionsVisible = false;
		},
	},
	mounted() {
		// сам обработчик события я создаю в хуке mounted, потому что иначе надо было бы создать метод клика и привязать его к элементу. но у меня ведь нет элемента Document. т.е. просто так прописать метод на документе я не могу. его надо привязать к какому-либо элементу и поместить его в methods. поэтому выход - поместить в хук жизненного цикла. иными словами, событие я привязываю не вручную, а автоматически, когда элемент отрендерится на странице

		// document.addEventListener('click', (e)=> {
		// e.target.style.backgroundColor = 'green' - так можно обратиться к целевому элементу. через this не получается
		// }, true)

		document.addEventListener('click', this.hideSelect.bind(this, 23));

		// document.addEventListener('click', this.hideSelect.bind(this), true)
		// true - стадия погружения
		// почему я ловлю обработчик на стадии погружения? ответ: когда я кликаю по < р class="title">, параметр areOptionsVisible меняется на true, но происходит всплытие события клика и срабатывает событие на документе, которое скрывает мои options. следовательно, добавивив модификатор метода @click.stop на < р class="title">, мы запрещаем всплывать событию клика. и уже тогда можем не отлавливать клик на документе только на фазе погружения, а использовать на любой фазе

		//насчет контекста: тут мы передаем контекст на вызов метода. но этого можно и не делать
	},
	beforeDestroy() {
		removeEventListener('click', this.hideSelect);
		// но далеко не факт, что надо юзать удаление обработчика, потому что скорее всего он сам удаляется при скрытии элемента со страницы
	},
};
</script>

<style lang="scss">
.v-select {
	margin-bottom: 10px;
	// position: relative;
	width: 200px;
	.title {
		cursor: pointer;
		border: 2px solid #b65252;
	}
	.options {
		p {
			&:hover {
				cursor: pointer;
				background-color: #c98383;
			}
			margin: 10px 0;
		}
		border: 2px solid #aeaeae;
		// position: absolute;
		top: 20px;
		right: 0;
		width: 100%;
	}
}
</style>
