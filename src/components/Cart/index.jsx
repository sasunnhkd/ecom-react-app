import React, {useContext} from "react"
import Minicart from '../Minicart'
import {Link} from 'react-router-dom'


function Cart(props){
        const totalPriceValue = props.data.reduce(function(acc,curr) {
          return acc + curr.finalPrice*curr.quantity
        }, 0);
        const totalInCart = props.data.reduce(function(acc,curr){
            return acc + curr.quantity
        }, 0)
    return (
        <>
<li className="d-shop-cart"><a><i className="fas fa-shopping-cart" /> <span className="cart-count">{totalInCart}</span></a>
    <ul className="minicart">
        {
            props.data.map(elm => {
                return <Minicart {...elm}/>
            })
        }
        <li>
            <div className="total-price">
                <span className="f-left">Total:</span>
    <span className="f-right">{totalPriceValue.toLocaleString()}</span>
            </div>
        </li>
        <li>
            <div className="checkout-link">
                
                <Link className="red-color" to={`/checkout`}>Checkout</Link>
            </div>
        </li>
    </ul>
</li>
</>
    )
}
export default Cart