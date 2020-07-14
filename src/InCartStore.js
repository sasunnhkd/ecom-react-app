import React, { useState, useReducer } from 'react'

export const CartContext = React.createContext([]);

// export const CartProvider = (props) => {
//     // const [productsInCart,setProductsInCart] = useState([]);
//     console.log(props)
//     return (
//       <CartContext.Provider value={props.children.props.productsInCart}>
//         {props.children}
//       </CartContext.Provider>
//     );
//   }