import React from "react"

function Minicart(props) {
    return (
        <>
            <li>
                <div className="cart-img">
                    <a>
                        <img src={props.imgUrl} alt="" />
                    </a>
                </div>
                <div className="cart-content">
                    <h3>
                        <a>{props.name.substring(0, 15)}...</a>
                    </h3>
                    <div className="cart-price mb-2">
                        <span className="new">{props.price.toLocaleString()}</span>
                        <span>
                            <del>{props.finalPrice.toLocaleString()}</del>
                        </span>
                    </div>
                    <span>Qty: {props.quantity}</span>
                </div>
                <div className="del-icon">
                    <a href="#">
                        <i className="far fa-trash-alt" />
                    </a>
                </div>
            </li>
        </>
    )
}

export default Minicart
