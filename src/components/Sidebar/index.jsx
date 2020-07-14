import React, { useState } from "react";

function Sidebar(props){
    const [searchValue,setSearchValue] = useState('');
    const searchValueInput = event => {
        setSearchValue(event.target.value);
    };
    const submitSearchValue = event => {
        event.preventDefault();
        props.onSubmitSearch(searchValue)
    }
    return (
        <>
        <div className="col-xl-3 col-lg-4">
            <div className="sidebar-shop">
                <div className="shop-widget">
                    <h3 className="shop-title">Search by</h3>
                    <form action="#" className="shop-search" onSubmit={submitSearchValue}>
                        <input type="text" placeholder="Your keyword...." onChange={searchValueInput}/>
                        <button><i className="fa fa-search" /></button>
                    </form>
                </div>
                <div className="shop-widget">
                    <h3 className="shop-title">SHOP BY</h3>
                    <ul className="shop-link">
                        <li><a href="#" onClick={props.sortAZ}>Name: A-Z</a></li>
                        <li><a href="#" onClick={props.sortZA}>Name: Z-A</a></li>
                        <li><a href="#" onClick={props.sortPriceDesc}>Price: High to Low</a></li>
                        <li><a href="#" onClick={props.sortPriceAsc}>Price: Low to High</a></li>
                        <li><a href="#" onClick={props.sortTop}>Product: Top Sales</a></li>
                    </ul>
                </div>
                <div className="shop-widget">
                    <h3 className="shop-title">Recent Product</h3>
                    <ul className="shop-sidebar-product">
                        <li>
                            <div className="side-pro-img">
                                <a href="#"><img src="./assets/shop-rsp3.jpg" alt="" /></a>
                            </div>
                            <div className="side-pro-content">
                                <div className="side-pro-rating">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                </div>
                                <h5><a href="#">Raglan Baseball-Style</a></h5>
                                <div className="side-pro-price">
                                    <span>$119.00 USD</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="side-pro-img">
                                <a href="#"><img src="./assets/shop-rsp2.jpg" alt="" /></a>
                            </div>
                            <div className="side-pro-content">
                                <div className="side-pro-rating">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                </div>
                                <h5><a href="#">Raglan Baseball-Style</a></h5>
                                <div className="side-pro-price">
                                    <span>$119.00 USD</span>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="side-pro-img">
                                <a href="#"><img src="./assets/shop-rsp4.jpg" alt="" /></a>
                            </div>
                            <div className="side-pro-content">
                                <div className="side-pro-rating">
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                    <i className="fas fa-star" />
                                </div>
                                <h5><a href="#">Raglan Baseball-Style</a></h5>
                                <div className="side-pro-price">
                                    <span>$119.00 USD</span>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="shop-widget">
                    <div className="shop-sidebar-banner">
                        <a href="#"><img src="./assets/shop-banner.jpg" alt="" /></a>
                    </div>
                </div>
            </div>
        </div>
        </>
)
}

export default Sidebar