import { setRefreshToken, updateAuthTokens } from "@/helpers/fetchers";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const $axios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

$axios.interceptors.request.use((config) => {
  config.headers["X-Api-App-Id"] = process.env.NEXT_PUBLIC_X_API_APP_ID;
  config.headers["x-secret-key"] = process.env.NEXT_PUBLIC_X_SECRET_KEY;
  return config;
});

$axios.interceptors.response.use(
  (config) => config,
  async (err) => {
    const originalRequest = err.config;
    if ((err.response.status === 401 || err.response.status === 410) && err.config && !originalRequest.isRetry) {
      originalRequest.isRetry = true;
      
      try {
        const tokens = await updateAuthTokens();

        if (tokens) {
          localStorage.setItem("access", tokens.accessToken);
          setRefreshToken(tokens.refreshToken);
          updateAxiosRequestInterceptor();
          await $axios.request(originalRequest);
        }
      } catch (error) {
        console.error(error);
      }
    }
    throw err;
  }
);

export const axiosBaseQuery = async (request: AxiosRequestConfig): Promise<any> => {
  try {
    const response = await $axios(request);
    return { data: response.data };
  } catch (error) {
    const { response } = error as AxiosError;

    if (response) {
      return { error: response.data };
    }
    throw error;
  }
};

export function updateAxiosRequestInterceptor() {
  $axios.interceptors.request.use((config) => {
    config.headers.Authorization = localStorage.getItem("access");
    return config;
  });
}

export default $axios;
