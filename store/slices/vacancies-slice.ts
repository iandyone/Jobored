import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IVacancy } from "@/types";

interface VacancyState {
  current: IVacancy[];
  page: number;
}

const initialState: VacancyState = {
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
  },
});

export default VacancySlice.reducer;
export const { setVacancies, setPage } = VacancySlice.actions;
