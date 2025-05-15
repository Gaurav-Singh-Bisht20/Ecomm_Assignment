
import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import wishlistReducer from './slices/wishlistSlice'
import cartReducer from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    wishlist:wishlistReducer,
    cart:cartReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
