import React from 'react';
import {
  TouchableHighlight, Text, View, NetInfo,
} from 'react-native';

import IconSet, { ICON_TYPE } from '../../shared/icons';
import styles from './styles';

class ConnectionWatcher extends React.Component {
  state = {
    isConnected: true,
  };

  async componentDidMount() {
    const isConnected = await NetInfo.isConnected.fetch();

    this.setState({ isConnected }, () => {
      NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);
    });
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
  }

  handleConnectionChange = isConnected => this.setState({ isConnected });


  handleClosePress = () => {
    this.setState({ isConnected: true });
  }

  render() {
    const { isConnected } = this.state;

    if (isConnected) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            Internet connection is not available.
          </Text>
          <Text style={styles.text}>
            Please switch-on wifi or cellular data connection.
          </Text>
        </View>
        <TouchableHighlight style={styles.close} onPress={this.handleClosePress}>
          <IconSet name={ICON_TYPE.TIMES} style={styles.closeIcon} />
        </TouchableHighlight>
      </View>
    );
  }
}

export default ConnectionWatcher;
