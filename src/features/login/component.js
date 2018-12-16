import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import Button from '../../shared/button';
import styles from './styles';
import { signIn } from './utils';
import { ROUTES } from '../../core/navigation';
import RetryModal from '../../shared/retry-modal';
import { UnauthorizedError } from '../../core/errors';

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

  handleLoginClick = async () => {
    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: 'email and password are required' });
      return;
    }

    try {
      /* eslint-disable-next-line no-unused-vars */
      const token = await signIn(email, password);

      const { navigation } = this.props;
      navigation.navigate(ROUTES.PRODUCT_LIST);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        this.setState({ error: error.message });
      } else {
        this.setState({ isModalVisible: true });
      }
    }
  };

  handleEmailChange = email => this.setState({ email });

  handlePasswordChange = password => this.setState({ password });

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
    const { error, isModalVisible } = this.state;

    return (
      <View style={styles.container}>

        <View style={styles.loginHeader}>
          <Text style={styles.smile}>&#xf118;</Text>
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

          <Button text="login" onPress={this.handleLoginClick} />

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
