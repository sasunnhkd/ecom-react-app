const initState = {
    data: null,
    loading: false,
    error: null
}
  
function LoginReducer(state = initState, action) {
switch(action.type) {
    case 'LOGIN_REQUEST':
    return {
        ...state,
        loading: true
    }

    case 'LOGIN_SUCCESS':
    return {
        ...state,
        loading: false,
        data: action.data
    }

    case 'LOGIN_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.error
    }

    default:
    return state
}
}

export default LoginReducer