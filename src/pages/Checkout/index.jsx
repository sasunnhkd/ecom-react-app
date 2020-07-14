import React, { useState, useEffect } from 'react'
import Layout from '../../components/Layout'
import Province from '../../shipping/province-district.js'
import axios from 'axios'
import store from '../../store'

function Checkout(props){
    
    const [provinceState, setProvinceState] = useState('An Giang')
    const onProvinceChange = (event) => {
        setProvinceState(event.target.value);
    }
    const [districtState, setDistrictState] = useState('')
    const onDistrictChange = (event) => {
        setDistrictState(event.target.value);        
    }

    const [shippingFee, setShippingFee] = useState(0)
    const getShippingFee =  async () => {
        try {
            const result = await axios({
                method: 'GET',
                url: byPassAPI('https://services.giaohangtietkiem.vn/services/shipment/fee',
                {
                    "pick_province": "Hồ Chí Minh",
                    "pick_district": "Quận Tân Bình",
                    "province": provinceState,
                    "district": districtState,
                    "address": "",
                    "weight": 1000,
                    "value": 3000000,
                    "transport": "fly"
                }
                ),
                headers: {
                'Content-Type': 'application/json',
                'Token':''
                }  
            });
            setShippingFee(result.data.fee.fee)
        } catch (error) {
            setShippingFee(0)
        }
    }

    const InCart = store.getState().todos.inCart
    const totalInCart = InCart.reduce(function(acc,curr){
        return acc + curr.quantity
    }, 0)
    const totalCartValue = InCart.reduce(function(acc,curr) {
        return acc + curr.finalPrice*curr.quantity
      }, 0) + shippingFee

    useEffect(() => {
        if (districtState != ''){
            getShippingFee()
        }
    })

    return(
        <Layout productsInCart={InCart}>
            <div className="container">
                <div className="py-5 text-center">
                    <img className="d-block mx-auto mb-4" src="" alt="" width={72} height={72} />
                    <h2>Checkout</h2>
                </div>
                <div className="row">
                    <div className="col-md-4 order-md-2 mb-4">
                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-muted">Your cart</span>
                            <span className="badge badge-secondary badge-pill">{totalInCart}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            {
                                InCart.map(elm => {
                                    return <CartCheckout {...elm}/>
                                })
                            }
                            <li className="list-group-item d-flex justify-content-between bg-light">
                                <div className="text-success">
                                    <h6 className="my-0">Shipping Fee</h6>
                                    <small>Delivery by Giao Hang Tiet Kiem</small>
                                </div>
                                <span className="text-success">{shippingFee.toLocaleString()}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (VND)</span>
                                <strong>{totalCartValue.toLocaleString()}</strong>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-8 order-md-1">
                        <h4 className="mb-3">Shipping Detail</h4>
                        <form id="frmShipping">
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="firstName">Name</label>
                                    <input type="text" className="form-control" id="firstName" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="lastName">Phone</label>
                                    <input type="number" className="form-control" id="phone" required />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="address">Address</label>
                                <input type="text" className="form-control" id="address" placeholder="1234 Main St" required />
                            </div>
                            <div className="row">
                                <div className="col-md-5 mb-3">
                                    <label htmlFor="province">Province</label>
                                    <select className="custom-select d-block w-100" id="province" onChange={onProvinceChange}>                                    
                                        <option>Choose...</option>
                                    {   
                                        Object.entries(Province.Province).map(([name,code]) => {
                                            return <Option data={name} value={name}/>
                                        })
                                    }
                                    </select>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <label htmlFor="district">District</label>
                                    <select className="custom-select d-block w-100" id="district" onChange={onDistrictChange}>
                                        <option>Choose...</option>
                                    {   
                                        Province.District[provinceState].map( element => {
                                            return <Option data={element} value={element}/>
                                        })
                                    }
                                    </select>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            
                            <hr className="mb-4" />
                            <h4 className="mb-3">Payment</h4>
                            <div className="d-block my-3">
                                <div className="custom-control custom-radio">
                                    <input id="credit" name="paymentMethod" type="radio" className="custom-control-input" defaultChecked required />
                                    <label className="custom-control-label" htmlFor="credit">Cash On Delivery</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="debit" name="paymentMethod" type="radio" className="custom-control-input" required />
                                    <label className="custom-control-label" htmlFor="debit">Card</label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input id="paypal" name="paymentMethod" type="radio" className="custom-control-input" required />
                                    <label className="custom-control-label" htmlFor="paypal">eWallet</label>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <a className="btn theme-btn-2 btn-block" >Continue to checkout</a>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

const Option = (props) => {
    return(
        <>
        <option value={props.value}>{props.data}</option>
        </>
    )
}

const CartCheckout = (props) => {
    return(
        <>
    <li className="list-group-item d-flex justify-content-between lh-condensed">
        <div>
            <h6 className="my-0">{props.name.substring(0, 20)}...</h6>
            <small className="text-muted">x {props.quantity}</small>
        </div>
        <span className="text-muted">{props.finalPrice.toLocaleString()}</span>
    </li>
    </>
    )
}

const byPassAPI = (url,params) => {
    return `https://cors-anywhere.herokuapp.com/${url}?${serialize(params)}`;
}
const serialize = obj => {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

export default Checkout