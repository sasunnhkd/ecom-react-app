import React, { useState, useContext, useEffect } from "react";
import Layout from '../../components/Layout'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {registerAction} from './Register.action.js'
import store from '../../store'

function Register(props) {

  const InCart = store.getState().todos.inCart;
  const [registerInfo,setRegisterInfo] = useState({
    email: "",
    password: "",
    username: ""
  });
  const inputEmail = (event) => {
    setRegisterInfo({
      ...registerInfo,
      email: event.target.value
    })
  };
  const inputPw = (event) => {
    setRegisterInfo({
      ...registerInfo,
      password: event.target.value
    })
  };
  const inputFName = (event) => {
    setRegisterInfo({
      ...registerInfo,
      username: event.target.value
    })
  };
  const submitRegister = (event) => {
    event.preventDefault();
    setRegisterInfo(props.registerData(registerInfo))
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
                  <h1>Register</h1>
                  <ul className="breadcrumb-menu">
                    <li><a href="index.html">home</a></li>
                    <li><span>Register</span></li>
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
                  <h3 className="text-center mb-60">Signup From Here</h3>
                  <form action="#">
                    <label htmlFor="name">Username <span>**</span></label>
                    <input id="name" type="text" placeholder="Enter Username or Email address..." onChange={inputFName}/>
                    <label htmlFor="email-id">Email Address <span>**</span></label>
                    <input id="email-id" type="text" placeholder="Enter Username or Email address..." onChange={inputEmail}/>
                    <label htmlFor="pass">Password <span>**</span></label>
                    <input id="pass" type="password" placeholder="Enter password..." onChange={inputPw}/>
                    <div className="mt-10" />
                    <button className="btn theme-btn-2 w-100" onClick={submitRegister}>Register Now</button>
                    <div className="or-divide"><span>or</span></div>
                    <Link className="btn theme-btn w-100" to={`/login`}>login Now</Link>
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

const mapStateToProps = (state) => {
  return {
    registerData: state.RegisterReducer.data,
    loading: state.RegisterReducer.loading
  }
} 

const mapDispatchToProps = {
  registerData: registerAction
}

export default connect(mapStateToProps,mapDispatchToProps)(Register)