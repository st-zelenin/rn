import LottieView from 'lottie-react-native';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  LayoutAnimation, NativeModules, Text, TextInput, View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import { UnauthorizedError } from '../../core/errors';
import { ROUTES } from '../../core/navigation';
import { captureBreadcrumb, setUserContext } from '../../core/sentry';
import Button from '../../shared/button';
import RetryModal from '../../shared/retry-modal';
import { ERROR_ANIMATION_CONFIG } from './constants';
import shoppingBagErrorAnimation from './shopping-bag-error.animation.json';
import shoppingBagAnimation from './shopping-bag.animation.json';
import styles from './styles';
import { getGreetingMessage, getLoginButtonConfig, signIn } from './utils';


export default class Login extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static navigationOptions = {
    title: 'Login',
  };

  state = {
    email: '',
    password: '',
    error: '',
    isModalVisible: false,
  };

  constructor(props) {
    super(props);

    const systemName = DeviceInfo.getSystemName();
    const isTablet = DeviceInfo.isTablet();
    this.greeting = getGreetingMessage(systemName, isTablet);
  }

  componentDidMount() {
    this.okAnimation.play();
    captureBreadcrumb('login screen');
  }

  handleError = (message) => {
    this.setState(({ error }) => {
      if (!message && !error) {
        return null;
      }

      LayoutAnimation.configureNext(ERROR_ANIMATION_CONFIG);

      return { error: message };
    }, () => {
      if (!message) {
        this.okAnimation.play();
      } else {
        this.errorAnimation.play();
      }
    });
  };

  handleLoginClick = async () => {
    const { email, password } = this.state;
    let isLoginSuccessfull = false;

    if (!email || !password) {
      this.handleError('email and password are required');
      return;
    }

    try {
      this.setState({ loading: true });

      /* eslint-disable-next-line no-unused-vars */
      const token = await signIn(email, password);
      await NativeModules.RNCustomAsyncStorage.setItem('RNHW:token', token);
      setUserContext({ email });

      isLoginSuccessfull = true;
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        this.handleError(error.message);
      } else {
        this.setState({ isModalVisible: true });
      }
    } finally {
      this.setState({ loading: false });
    }

    if (isLoginSuccessfull) {
      const { navigation } = this.props;
      navigation.navigate(ROUTES.PRODUCT_LIST);
    }
  };

  handleEmailChange = (email) => {
    this.handleError();
    this.setState({ email });
  };

  handlePasswordChange = (password) => {
    this.handleError();
    this.setState({ password });
  };

  handleModalClose = () => {
    this.setState({ isModalVisible: false });
  }

  handleRetry = () => {
    this.setState(
      { isModalVisible: false },
      this.handleLoginClick,
    );
  }

  render() {
    const { error, isModalVisible, loading } = this.state;

    const { buttonText } = getLoginButtonConfig(error, loading);

    return (
      <View style={styles.container}>

        <View style={styles.loginHeader}>
          {
            error
              ? (
                <LottieView
                  ref={(animation) => { this.errorAnimation = animation; }}
                  source={shoppingBagErrorAnimation}
                  loop={false}
                />
              )
              : (
                <LottieView
                  ref={(animation) => { this.okAnimation = animation; }}
                  source={shoppingBagAnimation}
                />
              )
          }
          <Text style={styles.appTitle}>Friday's shop</Text>
          <Text style={styles.greeting}>{this.greeting}</Text>
        </View>

        <View style={styles.loginForm}>
          <TextInput
            style={styles.textInput}
            onChangeText={this.handleEmailChange}
            placeholder="email..."
            textContentType="emailAddress"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={this.handlePasswordChange}
            placeholder="password..."
            textContentType="password"
            secureTextEntry={true}
          />
          {error ? <Text style={styles.error}>{error}</Text> : null}

          <Button
            onPress={this.handleLoginClick}
            text={buttonText}
            loading={loading}
            error={!!error || isModalVisible}
          />

        </View>

        <RetryModal
          isVisible={isModalVisible}
          onRetryClick={this.handleRetry}
          onCancelClick={this.handleModalClose}
        />

      </View>
    );
  }
}
