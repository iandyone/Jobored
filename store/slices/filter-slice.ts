import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ISalary = number | string;

interface filtersState {
  category: string;
  from: ISalary;
  to: ISalary;
}

const initialState: filtersState = {
  category: "",
  from: "",
  to: "",
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

    resetFilters(state) {
      state.category = initialState.category;
      state.from = initialState.from;
      state.to = initialState.to;
    },
  },
});

export default filterSlice.reducer;
export const { setCategory, setMaxSalaryValue, setMinSalaryValue, resetFilters } = filterSlice.actions;
