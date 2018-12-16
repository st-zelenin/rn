import { StyleSheet } from 'react-native';

import baseStyles, { secondaryColors } from '../../shared/styles';

export default StyleSheet.create({
  ...baseStyles,
  title: {
    flexDirection: 'row',
    width: '100%',
    padding: 15,
  },
  locationButton: {

  },
  locationIcon: {
    color: secondaryColors.coral,
    paddingRight: 15,
    fontSize: 24,
  },
  productName: {
    fontFamily: 'museo-sans',
    fontSize: 24,
  },
  description: {
    height: '50%',
    padding: 40,

  },
  descriptionText: {
    fontFamily: 'source-sans-pro',
    fontSize: 14,
  },
});
