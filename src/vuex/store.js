import Vue from "vue";
import Vuex from 'vuex';


import commonActions from './actions/commonActions';
import apiRequests from './actions/api-requests';
import getters from './getters/getters';
import mutations from './mutations/mutations';

const actions = {...commonActions, ...apiRequests};
// для удобства actions были поделены на два компонента: внутренние и работающие с API. Чтобы склеить два компонента в один, я использовал рест-оператор

Vue.use(Vuex);

let store = new Vuex.Store({    
    state: { 
        // сюда будут записаны данные, которые я получу из http://localhost:3000/products
        // здесь хранятся все переменные/коллекции...
        products: [],
        cart: [],
        categories: [
            {name: 'Все', value: 'ВСЕ'},
            {name: 'Мужские', value: 'м'},
            {name: 'Женские', value: 'ж'}
        ],
        isMobile: false,
        isDesktop: true
    }, 
    mutations, // c помощью мутаций мы меняем состояния в state: {}. мутации синхронны.
    actions, //те же мутации, но асинхронные, т.е могут работать параллельно,  
    getters
});

export default store;