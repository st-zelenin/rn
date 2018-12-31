import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import {
  Animated, Easing, Text, TouchableOpacity,
} from 'react-native';

import { secondaryColors } from '../styles';
import styles from './styles';

class Button extends PureComponent {
  static propTypes = {
    loading: PropTypes.bool,
    error: PropTypes.bool,
    text: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
  };

  static defaultProps = {
    loading: false,
    error: false,
  }

  animation = new Animated.Value(0);

  componentDidUpdate(prevProps) {
    const { loading, error } = this.props;
    if (prevProps.loading !== loading || prevProps.error !== error) {
      this.animate();
    }
  }

  animate = () => {
    this.animation.setValue(0);
    Animated.timing(this.animation, {
      toValue: 1,
      duration: 300,
      easing: Easing.bounce,
      useNativeDriver: true,
    }).start();
  }

  render() {
    const {
      text, onPress, error, loading,
    } = this.props;

    let backgroundColor = secondaryColors.brightBlue;
    if (error) {
      backgroundColor = secondaryColors.coral;
    } else if (loading) {
      backgroundColor = secondaryColors.lightGray;
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        style={styles.button}
      >
        <Animated.View
          style={{
            ...styles.buttonAnimation,
            backgroundColor,
            transform: [{ scale: this.animation }],
          }}
        >
        </Animated.View>

        <Text style={styles.buttonText}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default Button;
