import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import Button from '../../shared/button';
import styles from './styles';

export default class Login extends Component {
  static propTypes = {
    onLogin: PropTypes.func.isRequired,
  }

  state = {
    email: '',
    password: '',
  };

  handleLoginClick = () => {
    const { email, password } = this.state;

    if (!email || !password) {
      return;
    }

    const { onLogin } = this.props;
    onLogin();
  };

  handleEmailChange = email => this.setState({ email });

  handlePasswordChange = password => this.setState({ password });

  render() {
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

          <Button text="login" onPress={this.handleLoginClick} />

        </View>

      </View>
    );
  }
}
