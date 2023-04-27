import axios from "axios";

export default axios.create({
  baseURL: "https://startup-summer-2023-proxy.onrender.com/2.0",
  headers: {
    "X-Api-App-Id": "v3.r.137440105.399b9c5f19384345afe0ad0339e619e71c66af1d.800f8642a38256679e908c370c44267f705c2909",
  },
});
