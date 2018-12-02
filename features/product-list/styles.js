import { StyleSheet } from 'react-native';

import baseStyles, { primaryColors, secondaryColors } from '../../styles';

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
  productsTableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: primaryColors.epamBlue,
    backgroundColor: primaryColors.white,
  },
  productName: {
    flex: 1,
    paddingLeft: 20,
    lineHeight: 30,
    fontFamily: 'source-sans-pro',
    color: secondaryColors.darkGray,
  },
  productIcon: {
    color: secondaryColors.coral,
    paddingLeft: 15,
    paddingVertical: 5,
    width: 35,
    fontSize: 18,
  },
  goToDetailsButton: {
    width: 18,
    height: 18,
    backgroundColor: secondaryColors.brightBlue,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: secondaryColors.darkBlue,
    margin: 5,
    textAlign: 'center',
    alignItems: 'center',
  },
  goToDetailsButtonIcon: {
    fontSize: 10,
    color: secondaryColors.darkBlue,
    lineHeight: 17,
  },
});
