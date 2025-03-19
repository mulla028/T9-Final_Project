import { configureStore } from '@reduxjs/toolkit';
import travelStyleReducer from './slices/travelStyleSlice';

const store = configureStore({
  reducer: {
    travelStyle: travelStyleReducer,
  },
});

export default store;