import { StyleSheet } from 'react-native';

export const primaryColors = {
  epamBlue: 'rgb(118, 205, 216)',
  limeGreen: 'rgb(206, 219, 86)',
  graphite: 'rgb(34, 34, 34)',
  white: 'rgb(255, 255, 255)',
};

export const secondaryColors = {
  coral: 'rgb(211, 93, 71)',
  brightBlue: 'rgb(0, 138, 207)',
  sharpBlue: 'rgb(57, 194, 215)',
  darkBlue: 'rgb(38, 56, 82)',
  lightGray: 'rgb(204, 204, 204)',
  darkGray: 'rgb(70, 69, 71)',
};

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: primaryColors.white,
  },
});
