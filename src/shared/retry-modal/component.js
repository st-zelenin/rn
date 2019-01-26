import React from 'react';
import { Text, View, Modal } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import Button from '../button';

const RetryModal = ({ isVisible, onRetryClick, onCancelClick }) => (
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

RetryModal.propTypes = {
  isVisible: PropTypes.bool,
  onRetryClick: PropTypes.func.isRequired,
  onCancelClick: PropTypes.func.isRequired,
};

RetryModal.defaultProps = {
  isVisible: false,
};

export default RetryModal;
