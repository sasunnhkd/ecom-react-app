import axios from 'axios'

export const PRODUCT_LIST_REQUEST = 'PRODUCT_LIST_REQUEST'
export const PRODUCT_LIST_SUCCESS = 'PRODUCT_LIST_SUCCESS'
export const PRODUCT_LIST_FAILURE = 'PRODUCT_LIST_FAILURE'

export function productListRequestAction() {
    return {
        type: PRODUCT_LIST_REQUEST
    }
}
export function productListSucess(data) {
    return {
        type: PRODUCT_LIST_SUCCESS,
        data
    }
}
export function productListFailure(error) {
    return {
        type: PRODUCT_LIST_FAILURE,
        error
    }
}

export function getProductsAction(){

    return async (dispatch) => {
        dispatch(productListRequestAction());
    try {
        const result = await axios({
            method: 'GET',
            url: 'https://min-shop.herokuapp.com/rest/product'
        });
        dispatch(productListSucess(result.data.data))
    } catch(error){
        dispatch(productListFailure(error))
    }
    }
}

/*
 * action types
 */

export const ADD_TO_CART = 'ADD_TO_CART'
/*
 * action creators
 */

export function addToCart(data) {
  return { type: ADD_TO_CART, inCart: data }
}

export function onAddToCart(data) {
    return (dispatch) => {
        dispatch(addToCart(data))
    }
}

