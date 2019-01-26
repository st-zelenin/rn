import { StyleSheet } from 'react-native';

import { primaryColors, secondaryColors } from '../../../shared/styles';

export default StyleSheet.create({
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
    alignItems: 'center',
  },
  goToDetailsButtonIcon: {
    fontSize: 10,
    color: secondaryColors.darkBlue,
    lineHeight: 17,
  },
});
