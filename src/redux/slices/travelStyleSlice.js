import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  travelStyle: 'Cultural Immersion',
};

const travelStyleSlice = createSlice({
  name: 'travelStyle',
  initialState,
  reducers: {
    setTravelStyle: (state, action) => {
      state.travelStyle = action.payload;
    },
  },
});

export const { setTravelStyle } = travelStyleSlice.actions;
export default travelStyleSlice.reducer;
