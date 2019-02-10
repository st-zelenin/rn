import React from 'react';

const CartContext = React.createContext({
  add: () => { },
  remove: () => { },
  products: [],
});

export default CartContext;
