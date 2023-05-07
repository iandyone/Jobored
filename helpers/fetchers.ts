import { IAuthResponse, ICatalog, IVacancy, VacanciesResponse } from "@/types";
import $axios from "@/axios";

const login = process.env.NEXT_PUBLIC_LOGIN;
const password = process.env.NEXT_PUBLIC_PASSWORD;
const client_id = process.env.NEXT_PUBLIC_CLIEND_ID;
const client_secret = process.env.NEXT_PUBLIC_X_API_APP_ID;
const vacanciesPerPage = process.env.NEXT_PUBLIC_VACANCIES_PER_PAGE

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

export async function getVacancies({ page = 1, count = vacanciesPerPage}) {
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
          return { key: category.key, title: category.title_trimmed };
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
