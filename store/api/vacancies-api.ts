import { IFilter, IVacancy, IVacanciesResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vacanciesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
  }),
  reducerPath: "vacanciesApi",
  tagTypes: ["vacancies"],
  endpoints: (build) => {
    return {
      fetchVacancies: build.query<IVacanciesResponse, IFilter>({
        query: (params) => {
          return {
            url: "/vacancies",
            params,
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
