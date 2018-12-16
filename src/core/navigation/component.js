import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from '../../features/login';
import ProductList from '../../features/product-list';
import ProductDetails from '../../features/product-details';
import ProductLocation from '../../features/product-location';
import { ROUTES } from './constants';

const NavigationContainer = createStackNavigator({
  [ROUTES.LOG_IN]: { screen: Login },
  [ROUTES.PRODUCT_LIST]: { screen: ProductList },
  [ROUTES.PRODUCT_DETAILS]: { screen: ProductDetails },
  [ROUTES.PRODUCT_LOCATION]: { screen: ProductLocation },
});

export default createAppContainer(NavigationContainer);
