import React, { Component } from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import IconSet from '../../shared/icons';
import Button from '../../shared/button';

// eslint-disable-next-line react/prefer-stateless-function
export default class ProductDetails extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static navigationOptions =
    ({ navigation }) => ({ title: `${navigation.state.params.product.name} Details` });

  handleGoBackClick = () => {
    const { navigation } = this.props;
    navigation.goBack();
  }

  render() {
    const { navigation } = this.props;
    const product = navigation.getParam('product', {});
    const { name, icon } = product;

    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <IconSet name={icon} style={styles.productIcon} />
          <Text style={styles.productName}>{name}</Text>

        </View>

        <View style={styles.description}>
          <Text style={styles.descriptionText}>
            {/* eslint-disable-next-line max-len */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>

          <Button text="All Products" onPress={this.handleGoBackClick} />

        </View>
      </View>
    );
  }
}
