import { MapView } from 'expo';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Linking } from 'react-native';

import { COORDINATE_ANIMATION_LENGTH, INITIAL_REGION_SETTINGS, USER_CURRENT_LOCATION } from './constants';
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

  moveToProductLocation =
    () => this.map.animateToCoordinate(this.product.location, COORDINATE_ANIMATION_LENGTH);

  setMapInstance = (el) => { this.map = el; }

  render() {
    const { location, name } = this.product;
    const { latitude, longitude } = USER_CURRENT_LOCATION;
    const { latitudeDelta, longitudeDelta } = INITIAL_REGION_SETTINGS;

    return (
      <MapView
        ref={this.setMapInstance}
        style={styles.container}
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta,
          longitudeDelta,
        }}
        onMapReady={this.moveToProductLocation}
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
