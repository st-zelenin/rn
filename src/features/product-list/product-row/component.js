import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';

import IconSet, { ICON_TYPE } from '../../../shared/icons';
import styles from './styles';

export default class ProductRow extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    onDetailsPress: PropTypes.func.isRequired,
  }

  handleProductDetailsOpen = () => {
    const { product, onDetailsPress } = this.props;
    onDetailsPress(product);
  }

  render() {
    const { product } = this.props;
    return (
      <View style={styles.productsTableRow}>
        {/* <IconSet name={product.icon} style={styles.productIcon} /> */}
        <Text style={styles.productName}>{product.name}</Text>
        <TouchableHighlight
          onPress={this.handleProductDetailsOpen}
          style={styles.goToDetailsButton}
        >
          <IconSet name={ICON_TYPE.ARROW_RIGHT} style={styles.goToDetailsButtonIcon} />
        </TouchableHighlight>
      </View>
    );
  }
}
