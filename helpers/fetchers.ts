import axios from "@/axios";
import { IAuthResponse, VacancyResponse } from "@/types";

export async function getAuthorization() {
  try {
    const authResponse = await axios.get<IAuthResponse>("/oauth2/password", {
      params: {
        login: "sergei.stralenia@gmail.com",
        password: "paralect123",
        client_secret: "v3.r.137440105.399b9c5f19384345afe0ad0339e619e71c66af1d.800f8642a38256679e908c370c44267f705c2909",
        client_id: 2231,
        hr: 0,
      },
    });

    const accessToken = `${authResponse.data.token_type} ${authResponse.data.access_token}`;
    return accessToken;
  } catch (error) {
    console.log(error);
  }
}

export async function getVacancies(accessToken = "") {
  try {
    const vacanciesResponse = await axios.get<VacancyResponse>("/vacancies", {
      params: {
        page: 1,
        count: 4,
      },
      headers: {
        Authorization: accessToken,
      },
    });

    return vacanciesResponse.data;
  } catch (error) {
    console.log(error);
  }
}
