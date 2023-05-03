import { configureStore } from "@reduxjs/toolkit";
import { vacanciesApi } from "./api/vacancies-api";
import filtersReducer from "./slices/filter-slice";

const store = configureStore({
  reducer: {
    filters: filtersReducer,
    [vacanciesApi.reducerPath]: vacanciesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(vacanciesApi.middleware);
}
});

export type StoreType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

export default store;
