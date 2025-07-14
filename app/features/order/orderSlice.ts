
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderState {
  ready: boolean;
}

const initialState: OrderState = {
  ready: false,
};

const orderSlice = createSlice<OrderState>({
  name: 'order',
  initialState,
  reducers: {
    setReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload;
    },
  },
});

export const { setReady } = orderSlice.actions;
export default orderSlice.reducer;
