import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import AuthLoading from '../../features/auth-loading';
import Cart from '../../features/cart';
import Login from '../../features/login';
import ProductDetails from '../../features/product-details';
import ProductList from '../../features/product-list';
import ProductLocation from '../../features/product-location';
import { ROUTES, STACKS } from './constants';

const AppStack = createStackNavigator({
  [ROUTES.PRODUCT_LIST]: { screen: ProductList },
  [ROUTES.PRODUCT_DETAILS]: { screen: ProductDetails },
  [ROUTES.PRODUCT_LOCATION]: { screen: ProductLocation },
  [ROUTES.CART]: { screen: Cart },
});

const AuthStack = createStackNavigator({
  [ROUTES.LOG_IN]: { screen: Login },
});

const NavigationContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading,
    [STACKS.APP_STACK]: AppStack,
    [STACKS.AUTH_STACK]: AuthStack,
  },
  { initialRouteName: 'AuthLoading' },
));

export default NavigationContainer;
