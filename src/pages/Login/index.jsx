import React, { useState } from 'react'
import Layout from '../../components/Layout'
import {Link, useHistory} from 'react-router-dom'
import axios from 'axios'
import store from '../../store'

function Login() {

  
  const InCart = store.getState().todos.inCart;

  const [error, setError] = useState('');
  const history = useHistory();

  const [loginInfo,setLoginInfo] = useState({
    email: "",
    password: ""
  });
  const inputEmail = (event) => {
    setLoginInfo({
      ...loginInfo,
      email: event.target.value
    })
  };
  const inputPw = (event) => {
    setLoginInfo({
      ...loginInfo,
      password: event.target.value
    })
  };
  const submitLogin = (event) => {
    setError('');
    event.preventDefault();
    login(loginInfo)
  }
  const login = async (data) => {
    try {
      const result = await axios({
        method: 'POST',
        url: 'https://min-shop.herokuapp.com/rest/user/signIn',
        data
      });
      localStorage.setItem('token',result.data.accessToken);
      if (history.location.state.pathname){
        // history.push(this.location.state.pathname)
      } else {
      history.push('/')
    }
    } catch (error) {
      setError(error.response.data.message)
    }
  }
  return (
    <Layout productsInCart={InCart}>
      <main>
        {/* breadcrumb-area-start */}
        <section className="breadcrumb-area" style={{backgroundImage: 'url("./assets/page-title.png")'}}>
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="breadcrumb-text text-center">
                  <h1>Login</h1>
                  <ul className="breadcrumb-menu">
                    <li><a href="index.html">home</a></li>
                    <li><span>Login</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* breadcrumb-area-end */}
        {/* login Area Strat*/}
        <section className="login-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="basic-login">
                  <h3 className="text-center mb-60">Login From Here</h3>
                  <form action="#">
                    <div className="text-danger"> {error}</div>
                    <label htmlFor="name">Email Address <span>**</span></label>
                    <input id="name" type="text" placeholder="Enter Username or Email address..." onChange={inputEmail}/>
                    <label htmlFor="pass">Password <span>**</span></label>
                    <input id="pass" type="password" placeholder="Enter password..." onChange={inputPw}/>
                    <div className="login-action mb-20 fix">
                      <span className="log-rem f-left">
                        <input id="remember" type="checkbox" />
                        <label htmlFor="remember">Remember me!</label>
                      </span>
                      <span className="forgot-login f-right">
                        <a href="#">Lost your password?</a>
                      </span>
                    </div>
                    <button className="btn theme-btn-2 w-100" onClick={submitLogin}>Login Now</button>
                    <div className="or-divide"><span>or</span></div>
                    <Link className="btn theme-btn w-100" to={`/register`}>Register Now</Link>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* login Area End*/}
      </main>
    </Layout>
  )
}

export default Login