import React, { Component } from 'react';
import {
  Text, View, TouchableHighlight, BackHandler,
} from 'react-native';
import PropTypes from 'prop-types';

import { products } from './constants';
import styles from './styles';
import IconSet, { ICON_TYPE } from '../../shared/icons';
import { ROUTES } from '../../core/navigation';

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
