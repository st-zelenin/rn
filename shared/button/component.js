import React from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const Button = ({ text, onPress }) => (
  <TouchableHighlight onPress={onPress}>
    <View style={styles.button}>
      <Text style={styles.buttonText}>
        {text}
      </Text>
    </View>
  </TouchableHighlight>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;
