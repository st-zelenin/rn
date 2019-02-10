import PropTypes from 'prop-types';
import React from 'react';
import {
  ActivityIndicator, NativeModules, StatusBar, View,
} from 'react-native';

import { STACKS } from '../../core/navigation';
import baseStyles from '../../shared/styles';

class AuthLoading extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.checkAuth();
  }

  checkAuth = async () => {
    const { navigation } = this.props;
    const token = await NativeModules.RNCustomAsyncStorage.getItem('RNHW:token');

    navigation.navigate(token ? STACKS.APP_STACK : STACKS.AUTH_STACK);
  };

  render() {
    return (
      <View style={baseStyles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AuthLoading;
