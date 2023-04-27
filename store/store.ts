import { configureStore } from "@reduxjs/toolkit";
import filters from "./slices/filter-slice";

const store = configureStore({
  reducer: {
    filters,
  },
});

export default store;

export type StoreType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
