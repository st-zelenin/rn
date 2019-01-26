import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { MapView } from 'expo';
import { Linking } from 'react-native';

import styles from './styles';

export default class ProductLocation extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static navigationOptions =
    ({ navigation }) => ({ title: `${navigation.state.params.product.name} Location` });

  get product() {
    const { navigation } = this.props;
    return navigation.getParam('product', {});
  }

  handleMarkerPress = async () => {
    if (!this.product.phone) {
      return;
    }

    const url = `tel:${this.product.phone}`;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      Linking.openURL(url);
    }
  }

  render() {
    const { location, name } = this.product;
    const { latitude, longitude } = location;

    return (
      <MapView
        style={styles.container}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <MapView.Marker
          coordinate={location}
          title={name}
          onPress={this.handleMarkerPress}
        />
      </MapView>
    );
  }
}
