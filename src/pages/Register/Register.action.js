import axios from 'axios'

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

export function registerRequestAction() {
    return {
        type: REGISTER_REQUEST
    }
}
export function registerSucess(token) {
    return {
        type: REGISTER_SUCCESS,
        data: token
    }
}
export function registerFailure(error) {
    return {
        type: REGISTER_FAILURE,
        error: error
    }
}
export function registerAction(data){

    return async (dispatch) => {
        dispatch(registerRequestAction());
    try {
        const result = await axios({
            method: 'POST',
            url: 'https://min-shop.herokuapp.com/rest/user/signUp',
            data
        });
        dispatch(registerSucess(result.data.data))
    } catch(error){
        dispatch(registerFailure(error))
    }
    }
}