import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "./slices/filter-slice";
import { vacanciesApi } from "./api/vacancies-api";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [vacanciesApi.reducerPath]: vacanciesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(vacanciesApi.middleware);
}
});

export default store;

export type StoreType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;
