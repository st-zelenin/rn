import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  NativeModules, Text, TouchableHighlight, View,
} from 'react-native';

import { withCart } from '../../core/cart';
import { ROUTES } from '../../core/navigation';
import { captureBreadcrumb, captureException } from '../../core/sentry';
import Button from '../../shared/button';
import IconSet, { ICON_TYPE } from '../../shared/icons';
import styles from './styles';
import { getDescription } from './utils';

class ProductDetails extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
    cartItems: PropTypes.arrayOf(PropTypes.object).isRequired,
    addCartItem: PropTypes.func.isRequired,
  };

  static navigationOptions =
    ({ navigation }) => ({ title: `${navigation.state.params.product.name} Details` });

  constructor(props) {
    super(props);

    this.state = {
      inCartCount: this.getInCartCount(),
      notificationId: undefined,
    };
  }

  componentDidMount() {
    const { name, id } = this.product;
    captureBreadcrumb('product opened', { product: { name, id } });
  }

  get product() {
    const { navigation } = this.props;
    return navigation.getParam('product', {});
  }

  getInCartCount = () => {
    const { cartItems } = this.props;
    return cartItems.filter(({ id }) => id === this.product.id).length;
  }

  notify = () => {
    const { inCartCount, notificationId } = this.state;
    const title = "Friday's Cart";
    const message = inCartCount === 1
      ? `1 ${this.product.name} is added to the cart`
      : `${inCartCount} ${this.product.name} are added to the cart`;

    if (notificationId) {
      NativeModules.RNNotifications.update(notificationId, title, message);
    } else {
      NativeModules.RNNotifications.notify(title, message,
        id => this.setState({ notificationId: id }));
    }

    const { name, id } = this.product;
    captureBreadcrumb('product added to cart', { product: { name, id } });
  }

  handleGoBackPress = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  handleLocationPress = () => {
    const { navigation } = this.props;
    navigation.navigate(ROUTES.PRODUCT_LOCATION, { product: this.product });
  }

  handleToCartPress = () => {
    const { addCartItem } = this.props;
    addCartItem(this.product);
    this.setState(({ inCartCount }) => ({ inCartCount: inCartCount + 1 }), this.notify);
  }

  handleTestSentryPress = () => {
    try {
      throw new Error('test error from product details');
    } catch (ex) {
      captureException(ex, { product: this.product });
    }
  }

  render() {
    const description = getDescription(this.product.custom_attributes);

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <TouchableHighlight style={styles.locationButton} onPress={this.handleLocationPress}>
            <IconSet name={ICON_TYPE.MAP} style={styles.locationIcon} />
          </TouchableHighlight>
          <Text style={styles.productName}>{this.product.name}</Text>
        </View>

        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            {description}
          </Text>

          <Button text="All Products" onPress={this.handleGoBackPress} />

          <Button text="To Cart" onPress={this.handleToCartPress} />

          <Button text="Test Sentry" onPress={this.handleTestSentryPress} />

        </View>
      </View>
    );
  }
}

export default withCart(ProductDetails);
