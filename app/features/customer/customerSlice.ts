
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  qrData: string;
}

interface CustomerState {
  ready: boolean;
  customers: Customer[];
}

const initialState: CustomerState = {
  ready: false,
  customers: [],
};

const customerSlice = createSlice<CustomerState>({
  name: 'customer',
  initialState,
  reducers: {
    setReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload;
    },
    addCustomer(state, action: PayloadAction<Customer>) {
      state.customers.push(action.payload);
    },
  },
});

export const { setReady, addCustomer } = customerSlice.actions;
export default customerSlice.reducer;
