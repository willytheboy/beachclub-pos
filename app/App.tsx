
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from '@/store';
import AppTabs from '@/navigation/AppTabs';
import { AppTheme } from '@/common/theme';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer theme={AppTheme}>
        <AppTabs />
      </NavigationContainer>
    </Provider>
  );
}
