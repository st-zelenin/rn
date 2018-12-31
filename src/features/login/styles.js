import { StyleSheet } from 'react-native';

import baseStyles, { primaryColors, secondaryColors } from '../../shared/styles';

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
  frown: {
    fontFamily: 'faSolid',
    fontSize: 24,
    color: secondaryColors.coral,
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
  error: {
    fontFamily: 'source-sans-pro',
    color: secondaryColors.coral,
    marginHorizontal: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: secondaryColors.brightBlue,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 2,
    marginVertical: 10,
    marginHorizontal: 5,
    width: 50,
    height: 30,
  },
  buttonText: {
    color: primaryColors.white,
    fontFamily: 'source-sans-pro',
    textAlign: 'center',
  },
  buttonAnimation: {
    position: 'absolute',
    flex: 1,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    borderRadius: 2,
  },
});
