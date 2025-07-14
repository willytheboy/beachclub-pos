
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OfflinequeueState {
  ready: boolean;
}

const initialState: OfflinequeueState = {
  ready: false,
};

const offlineQueueSlice = createSlice<OfflinequeueState>({
  name: 'offlineQueue',
  initialState,
  reducers: {
    setReady(state, action: PayloadAction<boolean>) {
      state.ready = action.payload;
    },
  },
});

export const { setReady } = offlineQueueSlice.actions;
export default offlineQueueSlice.reducer;
