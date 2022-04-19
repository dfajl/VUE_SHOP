import axios from 'axios'; 

export default {
    GET_PRODUCTS_FROM_API({commit}) { // commit вызывает мутацию
        return axios.get('http://localhost:3000/products')
            .then((products)=> {
                commit('SET_PRODUCTS_TO_STATE', products.data); // так я вызываю мутацию SET_PRODUCTS_TO_STATE, которая кладет products.data в массив products 
                return products;
            })
            .catch((error)=>{
                console.log(error);
                return error;
            })
            // порядок такой: получаем данные через запрос к апи, затем вызываем мутацию SET_PRODUCTS_TO_STATE, чтобы уже она в свою очередь положила данные(products.data) в state. и уже оттуда мы через геттер получаем данные в компоненте
    },
}