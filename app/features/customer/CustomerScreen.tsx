
import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createCustomer } from './service';

interface RootState {
  customer: {
    customers: any[];
  };
}

export default function CustomerScreen() {
  const dispatch = useDispatch();
  const customers = useSelector((state: RootState) => state.customer.customers);

  const handleAdd = () => {
    createCustomer(
      { name: 'New Customer', email: 'demo@example.com', phone: '+1000000000' },
      dispatch
    );
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Button title="Add Sample Customer" onPress={handleAdd} />
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginTop: 8 }}>
            <Text>{item.name} ({item.id})</Text>
            <Text>QR: {item.qrData}</Text>
          </View>
        )}
      />
    </View>
  );
}
