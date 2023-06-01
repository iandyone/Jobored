import { IFilter, IVacancy, IVacanciesResponse } from "@/types";
import { axiosBaseQuery } from "@/axios";
import { createApi } from "@reduxjs/toolkit/query/react";

export const vacanciesApi = createApi({
  baseQuery: axiosBaseQuery,
  reducerPath: "vacanciesApi",
  tagTypes: ["vacancies"],
  endpoints: (build) => {
    return {
      fetchVacancies: build.query<IVacanciesResponse, IFilter>({
        query: (params) => {
          return {
            url: "/vacancies",
            params,
          };
        },
      }),

      fetchVacancy: build.query<IVacancy, string>({
        query: (id) => {
          return {
            url: `/vacancies/${id}`,
          };
        },
      }),
    };
  },
});
