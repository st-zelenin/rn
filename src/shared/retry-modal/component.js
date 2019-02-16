import React, { Component } from 'react';
import {
  Text, View, Modal, Vibration,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import Button from '../button';
import { captureWarning } from '../../core/sentry';

class RetryModal extends Component {
  static propTypes = {
    isVisible: PropTypes.bool,
    onRetryClick: PropTypes.func.isRequired,
    onCancelClick: PropTypes.func.isRequired,
  };

  static defaultProps = {
    isVisible: false,
  };

  vibrateDuration = 2000;

  componentDidMount() {
    const { isVisible } = this.props;
    if (isVisible) {
      this.vibrateAndCapture();
    }
  }

  componentDidUpdate({ isVisible: prevIsVisible }) {
    const { isVisible } = this.props;
    if (!prevIsVisible && isVisible) {
      this.vibrateAndCapture();
    }
  }

  vibrateAndCapture = () => {
    Vibration.vibrate(this.vibrateDuration);
    captureWarning('retry_modal');
  }

  render() {
    const { isVisible, onRetryClick, onCancelClick } = this.props;
    if (!isVisible) {
      return null;
    }

    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={isVisible}
        onRequestClose={onCancelClick}
      >
        <View style={styles.root}>
          <View style={styles.contentContainer}>

            <Text style={styles.message}>Something went wrong. Do you want to retry?</Text>

            <View style={styles.buttons}>
              <Button
                text="Retry"
                onPress={onRetryClick}
              />
              <Button
                text="Cancel"
                onPress={onCancelClick}
              />
            </View>

          </View>
        </View>
      </Modal>
    );
  }
}

export default RetryModal;
