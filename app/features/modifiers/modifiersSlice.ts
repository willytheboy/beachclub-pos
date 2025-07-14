
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModifiersState {
  ready: boolean;
}

const initialState: ModifiersState = {
  ready: false,
};

const modifiersSlice = createSlice<ModifiersState>({
  name: 'modifiers',
  initialState,
  reducers: {
    setReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload;
    },
  },
});

export const { setReady } = modifiersSlice.actions;
export default modifiersSlice.reducer;
