import { StyleSheet } from 'react-native';

import baseStyles, { primaryColors } from '../../shared/styles';

export default StyleSheet.create({
  ...baseStyles,
  title: {
    fontFamily: 'museo-sans',
    fontSize: 26,
    paddingVertical: 40,
    textAlign: 'center',
    backgroundColor: primaryColors.epamBlue,
    color: primaryColors.graphite,
    width: '100%',
  },
  productsTable: {
    backgroundColor: primaryColors.white,
    width: '100%',
    flex: 1,
  },
});
