import { ICatalog } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ISalary = number | string;

interface filtersState {
  catalog: ICatalog[];
  category: string;
  from: ISalary;
  to: ISalary;
  error: string;
}

const initialState: filtersState = {
  catalog: [],
  category: "",
  from: "",
  to: "",
  error: "",
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

    setCatalog(state, action: PayloadAction<ICatalog[]>) {
      state.catalog = action.payload;
    },

    resetFilters(state) {
      state.category = initialState.category;
      state.from = initialState.from;
      state.to = initialState.to;
    },
  },
  // extraReducers: {
  //   [fetchCatalogAsync.fulfilled.type]: (state, action: PayloadAction<ICatalog[]>) => {
  //     state.error = "";
  //     state.catalog = action.payload;
  //   },

  //   [fetchCatalogAsync.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.error = action.payload;
  //     state.catalog = [];
  //   },
  // },

});

export default filterSlice.reducer;
export const { setCategory, setCatalog, setMaxSalaryValue, setMinSalaryValue, resetFilters } = filterSlice.actions;
