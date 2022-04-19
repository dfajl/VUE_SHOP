<template >
    <div class="v-catalog">

        <router-link :to="{name: 'cart', params: {cart_data: CART}}"> 
            <div class="v-catalog__link_to_cart"> Cart: {{CART.length}} </div>
        </router-link>
       <!--  это и есть наша ссылка на другую страницу (на корзину) -->
        
        <h1> Catalog </h1> 
        <v-select
            :selected="selected"
            :options="CATEGORIES"
            @select="sortByCategories"
            :isExpanded="IS_DESKTOP"
        />
            
        <div class="v-catalog__list">

            <v-catalog-item
                v-for="product in fiteredProducts" 
                :key="product.article"
                :product_data="product"
                @addToCart='addToCart'
            /> 
            <!-- :product_data="product" - динамически связываю каждый элемент (item) в компоненте v-catalog-item c данными из data в родительском компоненте -->

        </div> 
    </div>
</template>  

<script>
    import vCatalogItem from './v-catalog-item.vue';
    import {mapActions, mapGetters} from 'vuex';
    import vSelect from '../v-select.vue';
    

    export default {
        name: 'v-catalog',
        components: {
            vCatalogItem, // ребенок по отношению к "v-catalog"
            vSelect
        },
        props: {

        },
        data() {
            return {
                selected: 'Choose the category: ',
                sortedProducts: [],
            }
        },
        computed: { //чтобы в цикле v-for не писать this.$store.state.products, мы вписываем сюда геттер из стора
            ...mapGetters([
                'PRODUCTS',
                'CART',
                'CATEGORIES',
                'IS_DESKTOP'
                 // это геттер нужен, чтобы был доступ к данным: Cart: {{CART.length}}
            ]),
            fiteredProducts () {
                if (this.sortedProducts.length) {
                    return this.sortedProducts;
                } else {
                    return this.PRODUCTS;
                }
            }
        },
        methods: {
            ...mapActions([ // это делается для того, чтобы к методу можно было бы обратиться через this
                'GET_PRODUCTS_FROM_API',
                'ADD_TO_CART'
            ]),
            // ...mapMutations([
            //     'SORT_BY_CATEGORIES'
            // ]),
            addToCart(data) {
                this.ADD_TO_CART(data);
                console.log(data);
            },
            sortByCategories(option) {
                // this.SORT_BY_CATEGORIES(option);
                this.sortedProducts = [];
                this.sortedProducts = this.PRODUCTS.filter((item)=> {
                   return item.category === option.name 
                })
            }
        },
        mounted() { // хук, когда отрендерился весь html и появились реактивные связки
            this.GET_PRODUCTS_FROM_API() 
            //метод  GET_PRODUCTS_FROM_API() будет вызван, когда компонент полностью загрузится
                .then((products)=> {
                    if (products.data) {
                        console.log('Data arrived!')
                    }
                })
        }
    }
</script>

<style lang="scss">
    .v-catalog {
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
            top: 10px;
            right: 10px;
            padding: $padding*2;
            border: 2px solid rgb(12, 12, 12);
            transition: 0.3s linear;
            &:hover{
                background-color: rgba($color: #6e0505, $alpha: 5.0);
            }
        }
    }
    
</style>