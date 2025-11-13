
import { DefaultTheme } from '@react-navigation/native';

export const sunlightPalette = {
  ...DefaultTheme.colors,
  primary: '#ffffff',
  text: '#000000',
  background: '#f2f2f2',
  card: '#ffffff',
  border: '#cccccc',
  notification: '#ff453a',
};

export const normalPalette = {
  ...DefaultTheme.colors,
  primary: '#004a77',
  text: '#ffffff',
  background: '#ffffff',
  card: '#ffffff',
  border: '#cccccc',
  notification: '#ff453a',
};

export const AppTheme = {
  ...DefaultTheme,
  colors: sunlightPalette, // will be toggled in slice
};
