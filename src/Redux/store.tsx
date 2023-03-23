import { configureStore } from '@reduxjs/toolkit';
import searchResultReducer from './searchSlice'

const store = configureStore({
    reducer: searchResultReducer,
  });

export default store;
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;