import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { withCart } from '../../core/cart';
import { captureBreadcrumb } from '../../core/sentry';
import styles from './styles';

class Cart extends Component {
  static propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static navigationOptions =
    () => ({ title: 'Cart' });

  componentDidMount() {
    const { cartItems } = this.props;
    const items = cartItems.map(({ name, id }) => ({ name, id }));
    captureBreadcrumb('cart is opened', { items });
  }

  render() {
    const { cartItems } = this.props;

    return (
      <View style={styles.container}>
        {cartItems.map(({ name, id, count }) => (
          <Text key={id} style={styles.productName}>
            {`${name} / ${count}`}
          </Text>
        ))}
      </View>
    );
  }
}

export default withCart(Cart);
