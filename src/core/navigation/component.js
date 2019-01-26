import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Login from '../../features/login';
import ProductList from '../../features/product-list';
import ProductDetails from '../../features/product-details';
import ProductLocation from '../../features/product-location';
import AuthLoading from '../../features/auth-loading';
import { ROUTES, STACKS } from './constants';

const AppStack = createStackNavigator({
  [ROUTES.PRODUCT_LIST]: { screen: ProductList },
  [ROUTES.PRODUCT_DETAILS]: { screen: ProductDetails },
  [ROUTES.PRODUCT_LOCATION]: { screen: ProductLocation },
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

export default createAppContainer(NavigationContainer);
