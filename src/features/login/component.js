import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  LayoutAnimation, Text, TextInput, View,
} from 'react-native';

import { UnauthorizedError } from '../../core/errors';
import { ROUTES } from '../../core/navigation';
import Button from '../../shared/button';
import IconSet, { ICON_TYPE } from '../../shared/icons';
import RetryModal from '../../shared/retry-modal';
import { ERROR_ANIMATION_CONFIG } from './constants';
import { getLoginButtonConfig, signIn } from './utils';
import styles from './styles';

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

  handleError = (message) => {
    this.setState(({ error }) => {
      if (!message && !error) {
        return null;
      }

      LayoutAnimation.configureNext(ERROR_ANIMATION_CONFIG);
      return { error: message };
    });
  };

  handleLoginClick = async () => {
    const { email, password } = this.state;

    if (!email || !password) {
      this.handleError('email and password are required');
      return;
    }

    try {
      this.setState({ loading: true });

      /* eslint-disable-next-line no-unused-vars */
      const token = await signIn(email, password);

      const { navigation } = this.props;
      navigation.navigate(ROUTES.PRODUCT_LIST);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        this.handleError(error.message);
      } else {
        this.setState({ isModalVisible: true });
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

    const { buttonText } = getLoginButtonConfig(error, loading);

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
