import React, { Component } from 'react';
import {
  Text, View, TouchableHighlight, BackHandler, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';
import { loadProducts, extendProducts } from './utils';
import IconSet, { ICON_TYPE } from '../../shared/icons';
import { ROUTES } from '../../core/navigation';
import RetryModal from '../../shared/retry-modal';

export default class ProductList extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = {
    title: 'Products',
    headerLeft: null,
  };

  constructor(props) {
    super(props);

    const { navigation } = this.props;
    this.didFocusSubscription = navigation.addListener(
      'didFocus',
      () => BackHandler.addEventListener('hardwareBackPress', this.handleBackPress),
    );

    this.state = {
      isModalVisible: false,
      isLoading: false,
      products: [],
      chunkNumber: 1,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;

    this.willBlurSubscription = navigation.addListener(
      'willBlur',
      () => BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress),
    );

    this.setState(
      { isLoading: true },
      this.loadNextChunk,
    );
  }

  componentWillUnmount() {
    if (this.didFocusSubscription) this.didFocusSubscription.remove();
    if (this.willBlurSubscription) this.willBlurSubscription.remove();
  }

  loadNextChunk = async () => {
    const { chunkNumber, products: loadedProducts } = this.state;
    try {
      const chunk = await loadProducts(chunkNumber);
      this.setState(({ products }) => {
        if (chunk.total_count > loadedProducts.length) {
          const extendedProducts = extendProducts(chunk.items);
          return { products: products.concat(extendedProducts) };
        }

        return null;
      });
    } catch {
      this.setState({ isModalVisible: true });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleBackPress = () => true;

  handleProductDetailsOpen = (product) => {
    const { navigation } = this.props;
    navigation.navigate(ROUTES.PRODUCT_DETAILS, { product });
  }

  handleModalClose = () => {
    this.setState({ isModalVisible: false });
  }

  handleRetry = () => {
    this.setState(
      { isModalVisible: false, isLoading: true },
      this.loadNextChunk,
    );
  }

  keyExtractor = ({ id }) => id.toString();

  handleEndReached = () => {
    // work-around, see: https://github.com/facebook/react-native/issues/14015#issuecomment-310675650
    if (!this.onEndReachedCalledDuringMomentum) {
      this.setState(
        ({ chunkNumber }) => ({ chunkNumber: chunkNumber + 1, isLoading: true }),
        this.loadNextChunk,
      );
      this.onEndReachedCalledDuringMomentum = true;
    }
  }

  handleRefresh = () => this.setState(
    { chunkNumber: 1, isLoading: true, products: [] },
    this.loadNextChunk,
  );

  render() {
    const { isModalVisible, products, isLoading } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>Products</Text>
        <View style={styles.productsTable}>
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <View style={styles.productsTableRow}>
                {/* <IconSet name={product.icon} style={styles.productIcon} /> */}
                <Text style={styles.icon}>{item.id}</Text>
                <Text style={styles.productName}>{item.name}</Text>
                <TouchableHighlight
                  onPress={() => this.handleProductDetailsOpen(item)}
                  style={styles.goToDetailsButton}
                >
                  <IconSet name={ICON_TYPE.ARROW_RIGHT} style={styles.goToDetailsButtonIcon} />
                </TouchableHighlight>
              </View>
            )}
            keyExtractor={this.keyExtractor}
            onEndReached={this.handleEndReached}
            onEndReachedThreshold={0.5}

            // work-around, see: https://github.com/facebook/react-native/issues/14015#issuecomment-310675650
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}

            // adds `pull-to-refresh`
            onRefresh={this.handleRefresh}
            refreshing={isLoading}
          />
        </View>

        <RetryModal
          isVisible={isModalVisible}
          onRetryClick={this.handleRetry}
          onCancelClick={this.handleModalClose}
        />
      </View>
    );
  }
}
