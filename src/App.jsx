import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout';
import Content from './components/Content';
import Sidebar from './components/Sidebar';
import ProductItem from './components/ProductItem';
import dataProducts from './product.json';

// ///////////////////
// 1. Lay duoc su kien click cua icon add to cart
// 2. Tao 1 array ( productsInCart) cho nhung sp trong cart
// 3. Dua sp ma cac ban dang click ra ngoai de add vao productsInCart
// 4. Boi vi productsInCart se thay doi nen minh se tao productsInCart bang cach dung useState
// 4. Truyen productsInCart vao cart de lay danh sach sp va hien thi trong Cart
//////



// function Image(props) {
//   return <img src={props.imgURL}/>
// }

// function SaleTag(props) {
//   return <span className="sale-tag">{props.txtDisplay}</span>
// }

// function Category(props) {
// return <div className="category">{props.categoryName}</div>
// }

// function ProductName(props) {
// return <div className="product-name">{props.productName}</div>
// }

// function Price(props) {
//   var saleOrNot = (props.priceAtt == 'sale') ? "sale-price" : "price"
// return <div className={saleOrNot}>{props.price}</div>
// }

// function ProductBlock(props) {
//   return <div className="product-block" id={props.data.id}>
//     <Image imgURL={props.data.imgURL}/>
//     <SaleTag txtDisplay="SALE" />
//     <Category categoryName={props.data.category}/>
//     <ProductName productName={props.data.title} />
//     <Price priceAtt="nosale" price={props.data.price} />
//     <Price priceAtt="sale" price={props.data.discountedPrice} />
//   </div>
// }


// function App() {
//   return (
//     <Layout>
//       <div className="products">
//         {
//           products.map(elm => {
//             return <ProductBlock data={elm} />
//           })
//         }
//       </div>
//     </Layout>
//   );
// }

function App() {
    const [productsInCart,setProductsInCart] = useState([]);
    const [products, setProducts] = useState(dataProducts.data);
    const onSelectProduct = (propsOfProductItem) => {
      const newProductInCart = [...productsInCart, propsOfProductItem];
      setProductsInCart(newProductInCart);
      
    };
    const sortAZ = () => {
      const newProductSort = [...products].sort((a,b) => a.name.localeCompare(b.name));
      setProducts(newProductSort)
    }
    const searchProduct = (searchKeyword) => {
      const newFilteredProduct = [...products].filter(product => product.name.indexOf(searchKeyword) > -1);
      setProducts(newFilteredProduct)
    }
    return (
      <Layout productsInCart={productsInCart}>
        <Content>
        {
          products.map(elm => {
            return <ProductItem {...elm} onSelectProduct={onSelectProduct} />
          })
        }
          
        </Content>
        <Sidebar sortAZ={sortAZ} onSubmitSearch={searchProduct}/>
      </Layout>
    );
  }

export default App;
