
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import OrdersScreen from '@/features/order/OrdersScreen';
import CustomerScreen from '@/features/customer/CustomerScreen';
import StatusScreen from '@/features/status/StatusScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Orders" component={OrdersScreen} />
      <Tab.Screen name="Customers" component={CustomerScreen} />
      <Tab.Screen name="Status" component={StatusScreen} />
    </Tab.Navigator>
  );
}
