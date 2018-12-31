import { StyleSheet } from 'react-native';

import { primaryColors } from '../styles';

export default StyleSheet.create({
  button: {
    backgroundColor: primaryColors.white,
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
