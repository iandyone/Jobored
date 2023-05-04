import $axios from "@/axios";
import { IAuthResponse, ICatalog, IVacancy, VacancyResponse } from "@/types";

export async function getAuthorization() {
  try {
    const authResponse = await $axios.get<IAuthResponse>("/oauth2/password", {
      params: {
        login: "sergei.stralenia@gmail.com",
        password: "paralect123",
        client_secret: "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
        client_id: 2356,
        hr: 0,
      },
    });

    if (authResponse.status == 200) {
      const accessToken = `${authResponse.data.token_type} ${authResponse.data.access_token}`;
      $axios.interceptors.request.use((config) => {
        config.headers.Authorization = accessToken;
        return config;
      });

      return accessToken;
    }

    if (authResponse.status == 500) {
      return "";
    }
  } catch (error) {
    console.log(error);
    return "";
  }
}

export async function getVacancies({ page = 1, count = 4 }) {
  try {
    const vacanciesResponse = await $axios.get<VacancyResponse>("/vacancies", {
      params: { page, count },
    });

    if (vacanciesResponse.status == 200) {
      return vacanciesResponse.data;
    }

    if (vacanciesResponse.status == 500) {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getCatalog() {
  try {
    const catalotResponse = await $axios.get<ICatalog[]>("/catalogues", {});

    if (catalotResponse.status == 200) {
      const categories =
        catalotResponse.data.map((category) => {
          return { id: category.key, title: category.title_trimmed };
        }) || [];

      return categories;
    }

    if (catalotResponse.status == 500) {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}
