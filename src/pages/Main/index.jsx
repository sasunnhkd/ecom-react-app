import React, { useState, useEffect } from "react";
import "./Main.css";
import Layout from "../../components/Layout";
import Content from "../../components/Content";
import ProductItem from "../../components/ProductItem";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";
import {connect} from 'react-redux'
import {getProductsAction, onAddToCart} from './Main.action'
import store from "../../store";


function Main(props) {
  
    const InCart = store.getState().todos.inCart;
    const [productsInCart,setProductsInCart] = useState(InCart);
    const [products, setProducts] = useState([]);
    const { getProducts, addToCart } = props;

    const onSelectProduct = (propsOfProductItem) => {
      
      const existingProduct = productsInCart.findIndex(p => p.name == propsOfProductItem.name);
      if (existingProduct > -1){
        const newProductInCart = [...productsInCart];
        newProductInCart[existingProduct].addQty(1);
        setProductsInCart(newProductInCart);
        props.addToCart(newProductInCart)
      } else {
        const newProductInCart = [
          ...productsInCart,
          {
            ...propsOfProductItem,
            quantity: 1,
            addQty(qty) {
              this.quantity += qty
            }
          }
        ];
        setProductsInCart(newProductInCart);
        props.addToCart(newProductInCart)
      }
    }; 

    const sortAZ = () => {
      const newProductSort = [...products].sort((a,b) => a.name.localeCompare(b.name));
      setProducts(newProductSort)
    }
    const sortZA = () => {
      const newProductSort = [...products].sort((a,b) => b.name.localeCompare(a.name));
      setProducts(newProductSort)
    }
    const sortPriceAsc = () => {
      const newProductSort = [...products].sort((a,b) => a.finalPrice - b.finalPrice);
      setProducts(newProductSort)
    }
    const sortPriceDesc = () => {
      const newProductSort = [...products].sort((a,b) => b.finalPrice - a.finalPrice);
      setProducts(newProductSort)
    }
    const sortTop = () => {
      const newProductSort = [...products].sort((a,b) => b.orderCount - a.orderCount);
      setProducts(newProductSort)
    }
    const sortAll = {
      sortAZ,
      sortZA,
      sortPriceAsc,
      sortPriceDesc,
      sortTop
    }
    const searchProduct = (searchKeyword) => {
      if (searchKeyword == ""){
        setProducts(props.productListA);
        setCurrentPage(1)
      } else {
        searchKeyword = searchKeyword.toLowerCase();
        const newFilteredProduct = [...props.productListA].filter(product => product.name.toLowerCase().indexOf(searchKeyword) > -1);
        setProducts(newFilteredProduct);
        setCurrentPage(1)
      }
    }
    
    const [itemPerPage] = useState(20);
    const [currentPage, setCurrentPage] = useState(1);

    const paginationIndex = {
      indexOfLastItem: function() {
        return (this.totalItems > itemPerPage) ? currentPage * itemPerPage : this.totalItems
      },
      indexOfFirstItem: function() {
        return (this.totalItems > itemPerPage) ? this.indexOfLastItem() - itemPerPage : 0
      },
      currentItems: function() {return products.slice(this.indexOfFirstItem(), this.indexOfLastItem())},
      totalItems: products.length
    }

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
      if(props.productListA) {
        setProducts(props.productListA)
      }
    },[props.productListA])

    useEffect(() => {
      props.getProducts();
    }, [])

    useEffect(() => {
    },[])

    return (
      <Layout productsInCart={productsInCart}>
        <main>
          <section className="shop-area pt-150 pb-100">
            <div className="container">
              <div className="row">
                <Content countProduct={paginationIndex}>
                {
                  // console.log(paginationIndex.currentItems())
                  paginationIndex.currentItems().map(elm => {
                    return <ProductItem {...elm} onSelectProduct={onSelectProduct} />
                  })
                }                
                </Content>
                       
                <Sidebar {...sortAll} onSubmitSearch={searchProduct}/>
              </div>
              <div className="row">
                <Pagination itemPerPage={itemPerPage}
                              totalItems={products.length}
                              paginate={paginate}
                              currentPage={currentPage}/>   
              </div>
            </div>
          </section>
        </main>
      </Layout>
    );
  }

const mapStateToProps = (state) => {
  return {
    productListA: state.ProductReducer.products,
    loading: state.ProductReducer.loading,
    inCart: state.inCart
  }
} 

const mapDispatchToProps = {
  getProducts: getProductsAction,
  addToCart: onAddToCart
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);