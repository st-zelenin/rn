import React, { Component } from 'react';
import { Text, View, Modal } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import Button from '../button';

class ModalComponent extends Component {
  static propTypes = {
    onClose: PropTypes.func,
    cancelBtnText: PropTypes.string,
    okBtnText: PropTypes.string,
  };

  static defaultProps = {
    onClose: () => { },
    cancelBtnText: 'Cancel',
    okBtnText: 'Ok',
  };

  state = {
    isVisible: false,
  };

  handleClose = () => this.setState({ isVisible: false });

  handleOpen = () => this.setState({ isVisible: true });

  handleOkPress = () => {
    const { onClose } = this.props;
    onClose();

    this.handleClose();
  }

  render() {
    const { isVisible } = this.state;
    const { onClose, okBtnText, cancelBtnText } = this.props;

    return (
      <Modal
        animationType="none"
        transparent={true}
        visible={isVisible}
        onRequestClose={this.handleClose}
      >
        <View style={styles.root}>
          <View style={styles.contentContainer}>
            <Text style={styles.sss}>hello</Text>
            <Button
              text={okBtnText}
              onPress={onClose}
            />
            <Button
              text={cancelBtnText}
              onPress={this.handleClose}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

export default ModalComponent;
