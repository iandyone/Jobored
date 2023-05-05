import { updateAuthTokens } from "@/helpers/fetchers";
import axios from "axios";

const $axios = axios.create({
  baseURL: "https://startup-summer-2023-proxy.onrender.com/2.0",
});

$axios.interceptors.request.use((config) => {
  config.headers["X-Api-App-Id"] = "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";
  config.headers["x-secret-key"] = "GEU4nvd3rej*jeh.eqp";
  return config;
});

$axios.interceptors.response.use((config) => {
    return config;
  },
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
