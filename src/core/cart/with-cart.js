import React from 'react';

import CartContext from './cart-context';

const withCart = WrappedComponent => props => (
  <CartContext.Consumer>
    {({ products, add, remove }) => (
      <WrappedComponent
        cartItems={products}
        addCartItem={add}
        removeCartItem={remove}
        {...props}
      />
    )}
  </CartContext.Consumer>
);

export default withCart;
