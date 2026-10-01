import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",

  initialState: [],

  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },

    appendFeed: (state, action) => {
      return [...state, ...action.payload];
    },

    removeFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload);
    },
  },
});

export const {
  addFeed,
  appendFeed,
  removeFeed,
} = feedSlice.actions;

export default feedSlice.reducer;