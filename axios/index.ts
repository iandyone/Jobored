import { updateAuthTokens } from "@/helpers/fetchers";
import axios from "axios";

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
    if (err.response.status === 401 && err.config && !originalRequest._isRetry) {
      originalRequest._isRetry = true;
      try {
        const tokens = await updateAuthTokens();
        localStorage.setItem("access", tokens?.accessToken!);
        localStorage.setItem("refresh", tokens?.refreshToken!);
        await $axios.request(originalRequest);
      } catch (error) {
        console.log(error);
      }
    }
    throw err;
  }
);

export default $axios;
