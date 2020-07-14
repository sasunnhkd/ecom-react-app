import axios from 'axios'

export const PRODUCT_DETAIL_REQUEST = 'PRODUCT_DETAIL_REQUEST'
export const PRODUCT_DETAIL_SUCCESS = 'PRODUCT_DETAIL_SUCCESS'
export const PRODUCT_DETAIL_FAILURE = 'PRODUCT_DETAIL_FAILURE'

export function productDetailRequestAction() {
    return {
        type: PRODUCT_DETAIL_REQUEST
    }
}
export function productDetailSucess(data) {
    return {
        type: PRODUCT_DETAIL_SUCCESS,
        data
    }
}
export function productDetailFailure(error) {
    return {
        type: PRODUCT_DETAIL_FAILURE,
        error
    }
}

export function getProductDetailAction(id){

    return async (dispatch) => {
        dispatch(productDetailRequestAction());
    try {
        const result = await axios({
            method: 'GET',
            url: `https://min-shop.herokuapp.com/rest/product/${id}`
        });
        dispatch(productDetailSucess(result.data))
    } catch(error){
        dispatch(productDetailFailure(error))
    }
    }
}