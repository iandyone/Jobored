import axios from "axios";

const $axios = axios.create({
  baseURL: "https://startup-summer-2023-proxy.onrender.com/2.0",
});

$axios.interceptors.request.use((config) => {
  config.headers["X-Api-App-Id"] = "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948";
  config.headers["x-secret-key"] = "GEU4nvd3rej*jeh.eqp";
  return config;
});

export default $axios ;
