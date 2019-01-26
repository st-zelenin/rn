import React from 'react';
import {
  ActivityIndicator, AsyncStorage, StatusBar, View,
} from 'react-native';

import { STACKS } from '../../core/navigation';
import baseStyles from '../../shared/styles';

class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this.checkAuth();
  }

  checkAuth = async () => {
    const { navigation } = this.props;
    const token = await AsyncStorage.getItem('RNHW:token');

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
