import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

const Button = ({ text, onPress }) => (
  <TouchableHighlight style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>
      {text}
    </Text>
  </TouchableHighlight>
);

Button.propTypes = {
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default Button;
