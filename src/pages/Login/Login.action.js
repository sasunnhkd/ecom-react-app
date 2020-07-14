import axios from 'axios'

const LOGIN_REQUEST = 'LOGIN_REQUEST'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGIN_FAILURE = 'LOGIN_FAILURE'

export function loginRequestAction() {
    return {
        type: LOGIN_REQUEST
    }
}
export function loginSucess(token) {
    return {
        type: LOGIN_SUCCESS,
        data: token
    }
}
export function loginFailure(error) {
    return {
        type: LOGIN_FAILURE,
        error: error
    }
}

export function loginAction(){

    return async (dispatch) => {
        dispatch(loginRequestAction());
    try {
        const result = await axios({
            method: 'POST',
            url: 'https://min-shop.herokuapp.com/rest/user/signIn',
            data
        });
        dispatch(loginSucess(result.data.data))
        localStorage.setItem('token',result.data.accessToken);
        if (history.location.state.pathname){
            history.push(this.location.state.pathname)
        } else {
            history.push('/')
        }
    } catch (error) {
        dispatch(error.response.data.message)
    }
    }
}