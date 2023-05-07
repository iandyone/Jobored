import { IVacancy, VacanciesResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vacanciesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  reducerPath: "vacanciesApi",
  tagTypes: ["vacancies"],
  endpoints: (build) => {
    return {
      fetchVacancies: build.query<VacanciesResponse, number>({
        query: (page = 1) => {
          return {
            url: "/vacancies",
            params: {
              page: page,
              count: process.env.NEXT_PUBLIC_VACANCIES_PER_PAGE,
            },
            headers: {
              Authorization: localStorage.getItem("access") || "",
              "X-Api-App-Id": process.env.NEXT_PUBLIC_X_API_APP_ID,
              "x-secret-key": process.env.NEXT_PUBLIC_X_SECRET_KEY,
            },
          };
        },
      }),
      fetchVacancy: build.query<IVacancy, string>({
        query: (id) => {
          return {
            url: `/vacancies/${id}`,
            headers: {
              Authorization: localStorage.getItem("access") || "",
              "X-Api-App-Id": process.env.NEXT_PUBLIC_X_API_APP_ID,
              "x-secret-key": process.env.NEXT_PUBLIC_X_SECRET_KEY,
            },
          };
        },
      }),
    };
  },
});
