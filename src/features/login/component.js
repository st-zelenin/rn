import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Animated, Easing, LayoutAnimation, Text, TextInput, TouchableOpacity, View,
} from 'react-native';

import { UnauthorizedError } from '../../core/errors';
import { ROUTES } from '../../core/navigation';
import IconSet, { ICON_TYPE } from '../../shared/icons';
import RetryModal from '../../shared/retry-modal';
import { ERROR_ANIMATION_CONFIG } from './constants';
import styles from './styles';
import { getLoginButtonConfig, signIn } from './utils';

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

  loginButtonAnimation = new Animated.Value(0);

  handleError = (message) => {
    this.setState(({ error }) => {
      if (!message && !error) {
        return null;
      }

      LayoutAnimation.configureNext(ERROR_ANIMATION_CONFIG);
      this.animateLoginButton();
      return { error: message };
    });
  };

  animateLoginButton = () => {
    this.loginButtonAnimation.setValue(0);
    Animated.timing(this.loginButtonAnimation, {
      toValue: 1,
      duration: 300,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }

  handleLoginClick = async () => {
    const { email, password } = this.state;

    if (!email || !password) {
      this.handleError('email and password are required');
      return;
    }

    try {
      this.setState({ loading: true }, this.animateLoginButton);

      /* eslint-disable-next-line no-unused-vars */
      const token = await signIn(email, password);

      const { navigation } = this.props;
      navigation.navigate(ROUTES.PRODUCT_LIST);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        this.handleError(error.message);
      } else {
        this.setState({ isModalVisible: true }, this.animateLoginButton);
      }
    } finally {
      this.setState({ loading: false });
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

    const scale = this.loginButtonAnimation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    });

    const { backgroundColor, buttonText } = getLoginButtonConfig(error, loading);

    return (
      <View style={styles.container}>

        <View style={styles.loginHeader}>
          {
            error
              ? <IconSet name={ICON_TYPE.FROWN} style={styles.frown} />
              : <IconSet name={ICON_TYPE.SMILE} style={styles.smile} />
          }
          <Text style={styles.appTitle}>Friday's shop</Text>
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

          <TouchableOpacity
            onPress={this.handleLoginClick}
            style={styles.button}
          >
            <Animated.View
              style={{
                ...styles.buttonAnimation,
                backgroundColor,
                transform: [{ scale }],
              }}
            >
            </Animated.View>

            <Text style={styles.buttonText}>
              {buttonText}
            </Text>
          </TouchableOpacity>

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
