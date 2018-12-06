import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import { products } from './constants';
import styles from './styles';
import IconSet, { ICON_TYPE } from '../../shared/icons';

// eslint-disable-next-line react/prefer-stateless-function
export default class ProductList extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  handleProductDetailsOpen = (product) => {
    const { navigation } = this.props;
    navigation.navigate('ProductDetails', { product });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Products</Text>
        <View style={styles.productsTable}>
          {
            products.map(product => (
              <View key={product.id} style={styles.productsTableRow}>
                <IconSet name={product.icon} style={styles.productIcon} />
                <Text style={styles.productName}>{product.name}</Text>
                <TouchableHighlight
                  onPress={() => this.handleProductDetailsOpen(product)}
                  style={styles.goToDetailsButton}
                >
                  <IconSet name={ICON_TYPE.ARROW_RIGHT} style={styles.goToDetailsButtonIcon} />
                </TouchableHighlight>
              </View>
            ))
          }
        </View>
      </View>
    );
  }
}
