import { StyleSheet } from 'react-native';

import { primaryColors, secondaryColors } from '../styles';

export default StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    height: 120,
    width: 200,
    backgroundColor: primaryColors.white,

    elevation: 4,
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,

    alignItems: 'center',
    justifyContent: 'space-between',

    padding: 10,
  },
  message: {
    flex: 1,
    fontFamily: 'source-sans-pro',
  },
  buttons: {
    flexDirection: 'row',
  },
});
