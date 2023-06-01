import { IAuthResponse, ICatalog, IVacancy, IVacanciesResponse } from "@/types";
import $axios from "@/axios";

const login = process.env.NEXT_PUBLIC_LOGIN;
const password = process.env.NEXT_PUBLIC_PASSWORD;
const client_id = process.env.NEXT_PUBLIC_CLIEND_ID;
const client_secret = process.env.NEXT_PUBLIC_X_API_APP_ID;
const vacanciesPerPage = process.env.NEXT_PUBLIC_VACANCIES_PER_PAGE;

export async function getAuthorization() {
  try {
    const authResponse = await $axios.get<IAuthResponse>("/oauth2/password", {
      params: { login, password, client_secret, client_id, hr: 0, timeStamp: Date.now() },
      headers: { "Cache-Control": "no-cache" },
    });

    if (authResponse.status === 200) {
      const accessToken = `${authResponse.data.token_type} ${authResponse.data.access_token}`;
      const refreshToken = `${authResponse.data.token_type} ${authResponse.data.refresh_token}`;
      return { accessToken, refreshToken };
    }

    if (authResponse.status === 500) {
      return "";
    }
  } catch (error) {
    console.error(error);
    return "";
  }
}

export async function getVacancies({ page = 1, count = vacanciesPerPage }) {
  try {
    const vacanciesResponse = await $axios.get<IVacanciesResponse>("/vacancies", {
      params: { page, count },
    });

    if (vacanciesResponse.status === 200) {
      return vacanciesResponse.data;
    }

    if (vacanciesResponse.status === 500) {
      return [];
    }
  } catch (error) {
    console.error(error);
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
    console.error(error);
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
    console.error(error);
  }
}

export async function updateAuthTokens() {
  try {
    const refreshToken = getRefreshTokenFromCookie();
    const updateResponse = await $axios.get<IAuthResponse>(`/oauth2/refresh_token/`, {
      params: { client_id, client_secret, refresh_token: refreshToken },
    });

    if (updateResponse.status === 200) {
      const accessToken = `${updateResponse.data.token_type} ${updateResponse.data.access_token}`;
      const refreshToken = `${updateResponse.data.token_type} ${updateResponse.data.refresh_token}`;

      return { accessToken, refreshToken };
    }

    if (updateResponse.status === 500) {
      console.error("Возникла ошибка при обновлении токенов доступа");
    }
  } catch (error) {
    console.error(error);
  }
}

export function setRefreshToken(refreshToken: string) {
  const currentDate = Date.now();
  const refreshCookieEndDate = new Date(currentDate);

  refreshCookieEndDate.setDate(refreshCookieEndDate.getDate() + 30);
  document.cookie = `refresh=${refreshToken}; expires=${refreshCookieEndDate.toUTCString()}; secure`;
}

function getRefreshTokenFromCookie() {
  const refreshTokenCookie = document.cookie.split(`; `).find((cookie) => cookie.includes("refresh"));

  if (refreshTokenCookie) {
    const refreshTokenBody = refreshTokenCookie.split("=")[1];
    const refreshToken = refreshTokenBody.split(" ")[1];
    return refreshToken;
  }

  console.error("Ошибка - пользователь не авторизован");
}
