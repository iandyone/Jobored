import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "@/types";

type ISalary = number | string;

interface filtersState {
  categories: ICategory[];
  category: string;
  from: ISalary;
  to: ISalary;
  title: string;
}

const initialState: filtersState = {
  categories: [],
  category: "",
  from: "",
  to: "",
  title: "",
};

const filterSlice = createSlice({
  initialState,
  name: "filters",
  reducers: {
    setCategory(state, action: PayloadAction<string>) {
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
  },
});

export default filterSlice.reducer;
export const { setCategory, setCatalog, setMaxSalaryValue, setMinSalaryValue, resetFilters, setTitle } = filterSlice.actions;
