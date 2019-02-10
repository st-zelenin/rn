/* eslint-disable react/no-unused-state */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import CartContext from './cart-context';

class CartProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      add: this.handleAdd,
      remove: this.handleRemove,
      products: [],
    };
  }

  handleAdd = (product) => {
    this.setState(({ products }) => {
      const alreadyAdded = products.find(({ id }) => id === product.id);
      if (alreadyAdded) {
        alreadyAdded.count += 1;
      } else {
        products.push({ ...product, count: 1 });
      }

      return { products: [...products] };
    });
  }

  handleRemove = (productId) => {
    this.setState(({ products }) => {
      const index = products.indexOf(({ id }) => id === productId);
      if (index === -1) {
        return null;
      }

      const product = products[index];
      product.count -= 1;

      if (product.count <= 0) {
        products.splice(index, 1);
      }

      return { products: [...products] };
    });
  }

  render() {
    const { children } = this.props;
    return (
      <CartContext.Provider value={this.state}>
        {children}
      </CartContext.Provider>
    );
  }
}

export default CartProvider;
