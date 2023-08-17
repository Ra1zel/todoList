import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchbarFocused: false,
};
export const searchbarSlice = createSlice({
  name: "searchbarSlice",
  initialState,
  reducers: {
    setState: (state, action) => {
      state.isSearchbarFocused = action.payload.value;
    },
  },
});
