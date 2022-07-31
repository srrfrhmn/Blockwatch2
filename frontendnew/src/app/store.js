import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import coinReducer from '../features/coins/coinSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    coins: coinReducer,
  },
});
