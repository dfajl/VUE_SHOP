<template >
    <div class='v-catalog-item'>
        <img 
            :src="require('../../assets/images/' + product_data.image)" 
            class="v-catalog-item__image" 
            alt="img"
        >
        <p class="v-catalog-item__name"> {{ product_data.name }} </p>
        <p class="v-catalog-item__price"> Price: {{ product_data.price }} руб. </p>
        <button 
            class="v-catalog-item__btn btn" 
            @click="addToCart"
        > Add to cart 
        </button>
    </div>
</template>

<script>
    export default {
        name: 'v-catalog-item',
        props: {
            product_data: { // это название элемента, который приходит из родителя 
                type: Object,
                default() { // дефолтное состояние до получения данных
                    return {}
                }
            }
        },
        methods: {
            // sendDataToParent () {
            //     this.$emit('sendArticle', this.product_data.article)
            // }
            addToCart() {
                this.$emit('addToCart', this.product_data)
            }
        }, 
        mounted() {
			this.$set(this.product_data, 'quantity', 1) 
			//так я добавляю еще одно поле в объект cart_item_data в момент полной загрузки компонента в хуке mounted. this.cart_item_data - место добавления поля, 'quantity' - ключ, 1 - значение. обязательно делать через $set, иначе поле не будет реактивным
		}
    }
</script>

<style lang='scss'> 
    .btn {
        background-color: rgb(90, 90, 160);
        transition: 0.2s linear;
        &:hover {
            background-color: rgb(124, 38, 38)
        }
    }
    .v-catalog-item {
        
        flex-basis: 25%; 
        // сколько будет занимать флекс-ребенок от общей ширины
        box-shadow: 0 0 8px 0 #e0e0e0;
        padding: $padding*2;
        margin-bottom: $margin*2;
        &__image {
            width: 100px;
        }
    }
    
</style>