import { Font } from 'expo';
import React, { Component } from 'react';
import {
  NativeEventEmitter, NativeModules, Platform, UIManager,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationActions } from 'react-navigation';

import CartProvider from './src/core/cart';
import ConnectionWatcher from './src/core/connection-watcher';
import NavigationContainer, { ROUTES } from './src/core/navigation';

const isAndroid = Platform.OS === 'android';

if (isAndroid) {
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

    if (isAndroid) {
      NativeModules.RNNotifications.init();

      this.emitter = new NativeEventEmitter(NativeModules.RNNotifications);
      this.emitter.addListener('notificationClicked', (notificationId) => {
        if (this.navigatorRef) {
          this.navigatorRef.dispatch(NavigationActions.navigate({ routeName: ROUTES.CART }));
          if (notificationId) {
            console.log(notificationId);
            NativeModules.RNNotifications.remove(notificationId);
          }
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.emitter) {
      this.emitter.removeAllListeners();
    }
  }

  render() {
    const { fontsLoaded } = this.state;

    if (!fontsLoaded) {
      return null;
    }

    return (
      <>
        <ConnectionWatcher />
        <CartProvider>
          <NavigationContainer
            ref={(ref) => { this.navigatorRef = ref; }}
          />
        </CartProvider>
      </>
    );
  }
}
