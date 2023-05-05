import $axios from "@/axios";
import { IAuthResponse, ICatalog, IVacancy, VacanciesResponse } from "@/types";

const login = "sergei.stralenia@gmail.com";
const password = "paralect123";
const client_secret = "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";
const client_id = 2356;

export async function getAuthorization() {
  try {
    const authResponse = await $axios.get<IAuthResponse>("/oauth2/password", {
      params: { login, password, client_secret, client_id, hr: 0 },
    });

    if (authResponse.status === 200) {
      const accessToken = `${authResponse.data.token_type} ${authResponse.data.access_token}`;
      const refreshToken = `${authResponse.data.token_type} ${authResponse.data.refresh_token}`;
      $axios.interceptors.request.use((config) => {
        config.headers.Authorization = accessToken;
        return config;
      });

      return { accessToken, refreshToken };
    }

    if (authResponse.status === 500) {
      return "";
    }
  } catch (error) {
    console.log(error);
    return "";
  }
}

export async function getVacancies({ page = 1, count = 4 }) {
  try {
    const vacanciesResponse = await $axios.get<VacanciesResponse>("/vacancies", {
      params: { page, count },
    });

    if (vacanciesResponse.status === 200) {
      return vacanciesResponse.data;
    }

    if (vacanciesResponse.status === 500) {
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

    if (catalotResponse.status === 200) {
      const categories =
        catalotResponse.data.map((category) => {
          return { id: category.key, title: category.title_trimmed };
        }) || [];

      return categories;
    }

    if (catalotResponse.status === 500) {
      return [];
    }
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getVacancy({ id = "" }) {
  try {
    const VacanciesResponse = await $axios.get<IVacancy>(`vacancies/${id}`);

    if (VacanciesResponse.status === 200) {
      return VacanciesResponse.data;
    }

    if (VacanciesResponse.status === 500) {
      return [];
    }
  } catch (error) {
    console.log(error);
  }
}

export async function updateAuthTokens() {
  try {
    const refreshToken = localStorage.getItem("refresh");
    const updateResponse = await $axios.get<IAuthResponse>(`/refresh_token`, {
      params: { client_id, client_secret, refresh_token: refreshToken },
    });

    if (updateResponse.status === 200) {
      const accessToken = `${updateResponse.data.token_type} ${updateResponse.data.access_token}`;
      const refreshToken = `${updateResponse.data.token_type} ${updateResponse.data.refresh_token}`;
      return {accessToken, refreshToken}
    }

    if (updateResponse.status === 500) {
      const message = "Возникла ошибка при обновлении токенов доступа";
      console.log(message);
    }
  } catch (error) {
    console.log(error);
  }
}
