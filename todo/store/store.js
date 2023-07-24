import { configureStore } from "@reduxjs/toolkit";
import { notesSlice } from "./notesSlice";
import { searchbarSlice } from "./searchbarSlice";
const store = configureStore({
  reducer: {
    notesReducer: notesSlice.reducer,
    searchbarReducer: searchbarSlice.reducer,
  },
});
export default store;
