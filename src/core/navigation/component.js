import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from '../../features/login';
import ProductList from '../../features/product-list';
import ProductDetails from '../../features/product-details';

const NavigationContainer = createStackNavigator({
  Login: { screen: Login },
  ProductList: { screen: ProductList },
  ProductDetails: { screen: ProductDetails },
});

export default createAppContainer(NavigationContainer);
