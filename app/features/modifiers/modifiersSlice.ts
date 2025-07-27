
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModifiersState {
  ready: boolean;
}

const initialState: ModifiersState = {
  ready: false,
};

const modifiersSlice = createSlice({
  name: 'modifiers',
  initialState,
  reducers: {
    setReady(state: ModifiersState, action: PayloadAction<boolean>) {
      state.ready = action.payload;
    },
  },
});

export const { setReady } = modifiersSlice.actions;
export default modifiersSlice.reducer;
