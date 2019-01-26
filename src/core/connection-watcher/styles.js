import { StyleSheet } from 'react-native';

import { primaryColors, secondaryColors } from '../../shared/styles';

export default StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 25,
    paddingBottom: 5,
    backgroundColor: secondaryColors.coral,
    flexDirection: 'row',
  },
  textContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    paddingLeft: 20,
  },
  text: {
    color: primaryColors.white,
    fontSize: 10,
  },
  close: {
    paddingRight: 5,
  },
  closeIcon: {
    color: primaryColors.white,
    fontSize: 10,
  },
});
