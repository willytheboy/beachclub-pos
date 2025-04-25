
import { configureStore } from '@reduxjs/toolkit';
import menuReducer from '@/features/menu/menuSlice';
import orderReducer from '@/features/order/orderSlice';
import customerReducer from '@/features/customer/customerSlice';
import statusReducer from '@/features/status/statusSlice';
import modifiersReducer from '@/features/modifiers/modifiersSlice';
import printReducer from '@/features/print/printSlice';
import offlineQueueReducer from '@/features/offlineQueue/offlineQueueSlice';
import invoiceReducer from '@/features/invoice/invoiceSlice';

export default configureStore({
  reducer: {
    menu: menuReducer,
    order: orderReducer,
    customer: customerReducer,
    status: statusReducer,
    modifiers: modifiersReducer,
    print: printReducer,
    offlineQueue: offlineQueueReducer,
    invoice: invoiceReducer,
  },
});
