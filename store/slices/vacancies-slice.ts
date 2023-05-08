import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IVacancy } from "@/types";

interface VacancyState {
  favorites: IVacancy[];
  current: IVacancy[];
  page: number;
}

const initialState: VacancyState = {
  favorites: [],
  current: [],
  page: 1,
};

const VacancySlice = createSlice({
  initialState,
  name: "vacancies",
  reducers: {
    setVacancies(state, action: PayloadAction<IVacancy[]>) {
      state.current = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setFavorites(state, action: PayloadAction<IVacancy[]>) {
      state.favorites = action.payload;
    },
  },
});

export default VacancySlice.reducer;
export const { setVacancies, setPage, setFavorites } = VacancySlice.actions;
