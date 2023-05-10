import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface MenuSliceState {
  burger: boolean;
  filters: boolean;
  categories: boolean;
}

const initialState: MenuSliceState = {
  burger: false,
  filters: false,
  categories: false,
};

const MenuSlice = createSlice({
  initialState,
  name: "menu",
  reducers: {
    setBurgerMenuVisibility(state, action: PayloadAction<boolean>) {
      state.burger = action.payload;
    },
    setFiltersMenuVisibility(state, action: PayloadAction<boolean>) {
      state.filters = action.payload;
    },
    setCategoriesMenuVisibility(state, action: PayloadAction<boolean>) {
      state.categories = action.payload;
    },
    closeSidesMenu(state) {
      state.burger = false;
      state.filters = false;
      state.categories = false;
    },
  },
});

export default MenuSlice.reducer;
export const { setBurgerMenuVisibility, setFiltersMenuVisibility, setCategoriesMenuVisibility, closeSidesMenu } = MenuSlice.actions;
