import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from '@/app/navigation/AppNavigator';
import { AppStateProvider } from '@/app/state';
import { navigationTheme } from '@/theme';

export default function App() {
  return (
    <AppStateProvider>
      <NavigationContainer theme={navigationTheme}>
        <AppNavigator />
      </NavigationContainer>
    </AppStateProvider>
  );
}
