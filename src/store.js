import { createStore, combineReducers, applyMiddleware } from 'redux'
import ProductReducer, {todos} from './pages/Main/Main.reducer'
import ProductDetailReducer from './pages/ProductDetail/ProductDetail.reducer'
import LoginReducer from './pages/Login/Login.reducer'
import RegisterReducer from './pages/Register/Register.reducer'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(
  combineReducers({
    ProductReducer,
    ProductDetailReducer,
    LoginReducer,
    RegisterReducer,
    todos
  }),
  {},
  composeWithDevTools(
    applyMiddleware(
      thunk
    )
  )
)

export default store