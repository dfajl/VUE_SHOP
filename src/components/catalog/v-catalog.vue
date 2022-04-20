<template >
    <div class="v-catalog">

        <router-link :to="{name: 'cart', params: {cart_data: CART}}"> 
            <div class="v-catalog__link_to_cart"> Cart: {{CART.length}} </div>
        </router-link>
       <!--  это и есть наша ссылка на другую страницу (на корзину) -->
        
        <h1> Catalog </h1> 
        <div class="filters">
            <v-select
                :selected="selected"
                :options="CATEGORIES"
                @select="sortByCategories"
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
                >
                <input 
                    type="range" 
                    min="0" 
                    max="9000" 
                    step="100"
                    v-model.number="maxPrice"
                    @change="setRangeSlider"
                >
            </div>
            <div class="range-values">
                <p> Min: {{minPrice}} </p>
                <p> Max: {{maxPrice}} </p>
            </div>
        </div>

        
            
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
                minPrice: 0,
                maxPrice: 9000
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
            // this.sortedProducts = [];
            // this.sortedProducts = this.PRODUCTS.filter((item)=> {
            //    return item.category === option.name 
            // })
            this.sortedProducts = [...this.PRODUCTS];
            this.sortedProducts = this.sortedProducts.filter((item)=> {
                return (
                    item.price >= this.minPrice && item.price <= this.maxPrice 
                )
                /*  т.е в этом методе я клонирую мой геттер PRODUCTS в sortedProducts. и при каждом срабатывании метода @change в инпутах
                type="range" я фильтрую продукты в соответсвии с ценой */   
            });
            if (option) {
                this.sortedProducts = this.sortedProducts.filter((item)=> {
                    return item.category === option.name; 
                });
                this.selected = option.name;
                /* if (option.name === 'Все') {
                    this.sortedProducts = this.sortedProducts.filter((item)=> {
                        return (
                            item.price >= this.minPrice && 
                            item.price <= this.maxPrice 
                        ) 
                    });
                }  */
            } 
                
            
            
        },
            setRangeSlider() {
                if (this.minPrice > this.maxPrice) {
                    let temp = this.maxPrice;
                    this.maxPrice = this.minPrice;
                    this.minPrice = temp;
                    // это сделалось для того, чтобы при перемещении ползунка максимальная цена не могла стать меньше минимальной
                }
                this.sortByCategories();
            }

        },
        mounted() { // хук, когда отрендерился весь html и появились реактивные связки
            this.GET_PRODUCTS_FROM_API() 
            //метод  GET_PRODUCTS_FROM_API() будет вызван, когда компонент полностью загрузится
            .then((products)=> {
                if (products.data) {
                    console.log('Data arrived!');
                    this.sortByCategories();
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
            svg, input[type=range] {
                position: absolute;
                left: 0;
                bottom: 0;
            }
            input[type=range]::-webkit-slider-thumb {
                z-index: 2;
                position: relative;
                top: 2px;
                left: -7px;
            }
        }
    }
    
</style>