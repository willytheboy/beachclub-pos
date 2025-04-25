
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PrintState {
  ready: boolean;
}

const initialState: PrintState = {
  ready: false,
};

const printSlice = createSlice({
  name: 'print',
  initialState,
  reducers: {
    setReady(state, action: PayloadAction<boolean>>) {
      state.ready = action.payload;
    },
  },
});

export const { setReady } = printSlice.actions;
export default printSlice.reducer;
