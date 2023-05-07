import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory, IFilter } from "@/types";

type ISalary = number | string;

interface filtersState {
  categories: ICategory[];
  category: ICategory;
  from: ISalary;
  to: ISalary;
  title: string;
  activeFilters: IFilter;
}

const initialState: filtersState = {
  categories: [],
  category: { key: 0, title: "" },
  from: "",
  to: "",
  title: "",
  activeFilters: {},
};

const filterSlice = createSlice({
  initialState,
  name: "filters",
  reducers: {
    setCategory(state, action: PayloadAction<ICategory>) {
      state.category = action.payload;
    },

    setMinSalaryValue(state, action: PayloadAction<ISalary>) {
      state.from = action.payload;
    },

    setMaxSalaryValue(state, action: PayloadAction<ISalary>) {
      state.to = action.payload;
    },

    setCatalog(state, action: PayloadAction<ICategory[]>) {
      state.categories = action.payload;
    },

    resetFilters(state) {
      state.category = initialState.category;
      state.from = initialState.from;
      state.to = initialState.to;
    },

    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },

    setFilters(state) {
      const filters = {} as IFilter;

      if (state.title) {
        filters.keyword = state.title;
      }

      if (state.from) {
        filters.payment_from = +state.from;
      }

      if (state.to) {
        filters.payment_to = +state.to;
      }

      if (state.from && state.to) {
        filters.no_agreement = 1;
      }

      filters.catalogues = state.category.key;
      filters.published = 1;

      state.activeFilters = filters;
    },
  },
});

export default filterSlice.reducer;
export const { setCategory, setCatalog, setMaxSalaryValue, setMinSalaryValue, resetFilters, setTitle, setFilters } = filterSlice.actions;
