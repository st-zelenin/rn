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
            onChangeText={email => this.setState({ email })}
            placeholder="email..."
            textContentType="emailAddress"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={password => this.setState({ password })}
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
