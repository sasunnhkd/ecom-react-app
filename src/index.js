import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './pages/Main';
import PageNotFound from './pages/404'
import Register from './pages/Register'
import ProductDetail from './pages/ProductDetail'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import store from './store'
import {Provider} from 'react-redux'

const Login = React.lazy(() => import('./pages/Login'));
const Checkout = React.lazy(() => import('./pages/Checkout'));



ReactDOM.render(
  
  <React.StrictMode>
    <Provider store={store}>
      <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        {/* <ThemeContextCustom> */}
          <Switch>
            <Route exact path="/" component={Main} />
            <Route exact path="/checkout" component={Checkout} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" render={() => <Register />}  />
            <Route exact path="/product-detail/:id"
              render={props => 
                (localStorage.token != undefined) 
                  ? (<ProductDetail />) 
                  : (<Redirect to={{pathname: "/login", state: { from: props.location } }}/>)
              }
            />
            {/* <Route exact 
              path="/product-detail/:id"
              render={(props) => {
              const product = dataProducts.data.find(elm => elm.id == props.match.params.id);
              console.log(product);
              if(!product) {
                return <h1>404</h1>
              } else {
                return <ProductDetail {...product}/>
              }
              }}
            /> */}
            <Route path="*" component={PageNotFound}>
            </Route>
          </Switch>
        {/* </ThemeContextCustom> */}
        </React.Suspense>
      </Router>
    </Provider> 
    {/* <ThemeContext.Provider value="#0e0e0e"> 
    <ProductDetail />
    </ThemeContext.Provider> */}
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register()