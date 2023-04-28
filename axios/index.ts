import axios from "axios";

export default axios.create({
  baseURL: "https://startup-summer-2023-proxy.onrender.com/2.0",
  headers: {
    "X-Api-App-Id": "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
  },
});
