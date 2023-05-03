import { VacancyResponse } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const vacanciesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://startup-summer-2023-proxy.onrender.com/2.0",
  }),

  reducerPath: "vacanciesApi",
  tagTypes: ["vacancies"],
  endpoints: (build) => {
    return {
      fetchVacancies: build.query<VacancyResponse, number>({
        query: (page = 1) => {
          return {
            url: "/vacancies",
            params: {
              page: page,
              count: 4
            },
            headers: {
              Authorization: localStorage.getItem("access") || "",
              "X-Api-App-Id": "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
              "x-secret-key": "GEU4nvd3rej*jeh.eqp",
            },
          };
        },
      }),
    };
  },
});
