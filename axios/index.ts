import { setRefreshToken, updateAuthTokens } from "@/helpers/fetchers";
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
    if ((err.response.status === 401 || err.response.status === 410) && err.config && !originalRequest.isRetry) {
      originalRequest.isRetry = true;
      try {
        const tokens = await updateAuthTokens();

        if (tokens) {
          setRefreshToken(tokens.refreshToken);
          localStorage.setItem("access", tokens.accessToken);
          await $axios.request(originalRequest);
        }
      } catch (error) {
        console.error(error);
      }
    }
    throw err;
  }
);

export default $axios;
