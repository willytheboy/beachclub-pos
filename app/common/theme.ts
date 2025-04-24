
import { DefaultTheme } from '@react-navigation/native';

export const sunlightPalette = {
  primary: '#ffffff',
  text: '#000000',
  background: '#f2f2f2',
  card: '#ffffff',
  border: '#cccccc',
};

export const normalPalette = {
  primary: '#004a77',
  text: '#ffffff',
  background: '#ffffff',
  card: '#ffffff',
  border: '#cccccc',
};

export const AppTheme = {
  ...DefaultTheme,
  colors: sunlightPalette, // will be toggled in slice
};
