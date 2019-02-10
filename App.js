import { Font } from 'expo';
import React, { Component } from 'react';
import {
  NativeEventEmitter, NativeModules, Platform, UIManager,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import ConnectionWatcher from './src/core/connection-watcher';
import NavigationContainer from './src/core/navigation';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default class App extends Component {
  state = {
    fontsLoaded: false,
  }

  async componentDidMount() {
    await Font.loadAsync({
      /* eslint-disable global-require */
      cylburn: require('./assets/fonts/cylburn.ttf'),
      faSolid: require('./assets/fonts/fa-solid-900.ttf'),
      'museo-sans': require('./assets/fonts/MuseoSans500.otf'),
      'source-sans-pro': require('./assets/fonts/SourceSansPro-Regular.otf'),
      /* eslint-enable global-require */
    });

    this.setState({ fontsLoaded: true });
    SplashScreen.hide();
    NativeModules.RNNotifications.init();

    this.emitter = new NativeEventEmitter(NativeModules.RNNotifications);
    this.emitter.addListener('notificationClicked', (data) => {
      console.log('data');
    });
  }

  componentWillUnmount() {
    this.emitter.removeAllListeners();
  }

  render() {
    const { fontsLoaded } = this.state;

    if (!fontsLoaded) {
      return null;
    }

    return (
      <>
        <ConnectionWatcher />
        <NavigationContainer />
      </>
    );
  }
}
