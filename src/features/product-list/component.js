import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { BackHandler, Text, View } from 'react-native';

import { ROUTES } from '../../core/navigation';
import { products } from './constants';
import ProductRow from './product-row';
import styles from './styles';

export default class ProductList extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    title: 'Products',
    headerLeft: null,
  };

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.didFocusSubscription = navigation.addListener(
      'didFocus',
      () => BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.willBlurSubscription = navigation.addListener(
      'willBlur',
      () => BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress),
    );
  }

  componentWillUnmount() {
    if (this.didFocusSubscription) this.didFocusSubscription.remove();
    if (this.willBlurSubscription) this.willBlurSubscription.remove();
  }

  handleBackPress = () => true;

  handleProductDetailsOpen = (product) => {
    const { navigation } = this.props;
    navigation.navigate(ROUTES.PRODUCT_DETAILS, { product });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Products</Text>
        <View style={styles.productsTable}>
          {
            products.map(product => (
              <ProductRow
                key={product.id}
                product={product}
                onDetailsPress={this.handleProductDetailsOpen}
              />
            ))
          }
        </View>
      </View>
    );
  }
}
