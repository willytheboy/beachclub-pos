
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InvoiceState {
  ready: boolean;
}

const initialState: InvoiceState = {
  ready: false,
};

const invoiceSlice = createSlice<InvoiceState>({
  name: 'invoice',
  initialState,
  reducers: {
    setReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload;
    },
  },
});

export const { setReady } = invoiceSlice.actions;
export default invoiceSlice.reducer;
