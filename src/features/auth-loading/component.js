import PropTypes from 'prop-types';
import React from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import * as Keychain from 'react-native-keychain';

import { STACKS } from '../../core/navigation';
import { setUserContext } from '../../core/sentry';
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
    const credentials = await Keychain.getGenericPassword();

    if (credentials) {
      // eslint-disable-next-line no-unused-vars
      const { username: email, password: token } = credentials;

      setUserContext({ email });
      navigation.navigate(STACKS.APP_STACK);
    } else {
      navigation.navigate(STACKS.AUTH_STACK);
    }
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
