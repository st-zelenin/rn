import { StyleSheet } from 'react-native';

import { primaryColors, secondaryColors } from '../styles';

export default StyleSheet.create({
  button: {
    backgroundColor: secondaryColors.brightBlue,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  buttonText: {
    color: primaryColors.white,
    fontFamily: 'source-sans-pro',
    textAlign: 'center',
  },
});
