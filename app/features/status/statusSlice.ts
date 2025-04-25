
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StatusState {
  ready: boolean;
}

const initialState: StatusState = {
  ready: false,
};

const statusSlice = createSlice({
  name: 'status',
  initialState,
  reducers: {
    setReady(state, action: PayloadAction<boolean>>) {
      state.ready = action.payload;
    },
  },
});

export const { setReady } = statusSlice.actions;
export default statusSlice.reducer;
