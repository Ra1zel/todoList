import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./reducer";
const store = configureStore({ reducer: notesReducer });
export default store;
