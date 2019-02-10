import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';

import { withCart } from '../../core/cart';
import styles from './styles';

class Cart extends Component {
  static propTypes = {
    cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  static navigationOptions =
    () => ({ title: 'Cart' });

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
