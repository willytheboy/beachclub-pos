
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MenuState {
  ready: boolean;
}

const initialState: MenuState = {
  ready: false,
};

const menuSlice = createSlice<MenuState>({
  name: 'menu',
  initialState,
  reducers: {
    setReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload;
    },
  },
});

export const { setReady } = menuSlice.actions;
export default menuSlice.reducer;
