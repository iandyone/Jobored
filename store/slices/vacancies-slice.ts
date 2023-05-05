import { IVacancy } from "@/types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface VacancyState {
  current: IVacancy[];
}

const initialState: VacancyState = {
  current: [],
};

const VacancySlice = createSlice({
  initialState,
  name: "vacancies",
  reducers: {
    setVacancies(state, action: PayloadAction<IVacancy[]>) {
      state.current = action.payload;
    },
  },
});

export default VacancySlice.reducer;
export const { setVacancies } = VacancySlice.actions;
