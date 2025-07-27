
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrderScreen from '@/features/order/OrderScreen';
import CustomerScreen from '@/features/customer/CustomerScreen';
import StatusScreen from '@/features/status/StatusScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Orders" component={OrderScreen} />
      <Tab.Screen name="Customers" component={CustomerScreen} />
      <Tab.Screen name="Status" component={StatusScreen} />
    </Tab.Navigator>
  );
}
