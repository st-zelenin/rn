import { StyleSheet } from 'react-native';

import baseStyles, { primaryColors, secondaryColors } from '../../styles';

export default StyleSheet.create({
  ...baseStyles,
  loginHeader: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loginForm: {
    flex: 1,
    alignItems: 'center',
  },
  appTitle: {
    fontFamily: 'cylburn',
    fontSize: 40,
    paddingVertical: 40,
    textAlign: 'center',
  },
  smile: {
    fontFamily: 'faSolid',
    fontSize: 24,
    color: primaryColors.limeGreen,
    textAlign: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: secondaryColors.brightBlue,
    marginVertical: 10,
    paddingLeft: 5,
    fontFamily: 'source-sans-pro',
    width: 250,
    textAlign: 'center',
  },
});
