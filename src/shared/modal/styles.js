import { StyleSheet } from 'react-native';

import { secondaryColors } from '../styles';

export default StyleSheet.create({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    backgroundColor: secondaryColors.coral,
    height: 250,
    width: 260,
    opacity: 1,
  },
});
