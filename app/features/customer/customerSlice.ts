
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CustomerState {
  ready: boolean;
}

const initialState: CustomerState = {
  ready: false,
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setReady(state: CustomerState, action: PayloadAction<boolean>) {
      state.ready = action.payload;
    },
  },
});

export const { setReady } = customerSlice.actions;
export default customerSlice.reducer;
