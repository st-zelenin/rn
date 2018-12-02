import React, { Component } from 'react';
import { Font } from 'expo';

import Login from './features/login';
import ProductList from './features/product-list';
import ProductDetails from './features/product-details';

export default class App extends Component {
  state = {
    isLoggedIn: false,
    product: undefined,
  };

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
  }

  handleLogin = () => this.setState({ isLoggedIn: true });

  handleProductDetailsOpen = product => this.setState({ product });

  handleAllProductsClick = () => this.setState({ product: undefined });

  render() {
    const { isLoggedIn, fontsLoaded, product } = this.state;

    if (!fontsLoaded) {
      return null;
    }

    if (!isLoggedIn) {
      return <Login onLogin={this.handleLogin} />;
    }

    if (product) {
      return <ProductDetails onAllProductsClick={this.handleAllProductsClick} product={product} />;
    }

    return <ProductList onProductDetailsOpen={this.handleProductDetailsOpen} />;
  }
}
