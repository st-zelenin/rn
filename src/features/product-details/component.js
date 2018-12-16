import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { getDescription } from './utils';
import IconSet, { ICON_TYPE } from '../../shared/icons';
import Button from '../../shared/button';
import { ROUTES } from '../../core/navigation';

export default class ProductDetails extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static navigationOptions =
    ({ navigation }) => ({ title: `${navigation.state.params.product.name} Details` });

  get product() {
    const { navigation } = this.props;
    return navigation.getParam('product', {});
  }

  handleGoBackClick = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  handleLocationPress = () => {
    const { navigation } = this.props;
    navigation.navigate(ROUTES.PRODUCT_LOCATION, { product: this.product });
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

          <Button text="All Products" onPress={this.handleGoBackClick} />

        </View>
      </View>
    );
  }
}
