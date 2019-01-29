import { Font } from 'expo';
import React, { Component } from 'react';
import { Platform, UIManager } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import NavigationContainer from './src/core/navigation';
import ConnectionWatcher from './src/core/connection-watcher';

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
