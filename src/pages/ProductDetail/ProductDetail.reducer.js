import * as actionTypes from './ProductDetail.action'

const initState = {
    data: null,
    loading: false,
    error: null
}
  
function ProductDetailReducer(state = initState, action) {
switch(action.type) {
    case actionTypes.PRODUCT_DETAIL_REQUEST:
    return {
        ...state,
        loading: true
    }

    case actionTypes.PRODUCT_DETAIL_SUCCESS:
    return {
        ...state,
        loading: false,
        data: action.data
    }

    case actionTypes.PRODUCT_DETAIL_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
    }

    default:
    return state
}
}

export default ProductDetailReducer