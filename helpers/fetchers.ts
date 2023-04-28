import axios from "@/axios";
import { IAuthResponse, ICatalog, VacancyResponse } from "@/types";

export async function getAuthorization() {
  try {
    const authResponse = await axios.get<IAuthResponse>("/oauth2/password", {
      params: {
        login: "sergei.stralenia@gmail.com",
        password: "paralect123",
        client_secret: "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
        client_id: 2356,
        hr: 0,
      },
    });

    const accessToken = `${authResponse.data.token_type} ${authResponse.data.access_token}`;

    return accessToken;
  } catch (error) {
    console.log(error);
  }
}

export async function getVacancies({ page = 1, count = 4, accessToken = "" }) {
  try {
    const vacanciesResponse = await axios.get<VacancyResponse>("/vacancies", {
      params: { page, count },
      headers: { Authorization: accessToken },
    });

    return vacanciesResponse.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getCatalog({ accessToken = "" }) {
  try {
    const catalotResponse = await axios.get<ICatalog[]>("/catalogues", {
      headers: {
        Authorization: accessToken,
      },
    });

    return catalotResponse.data;
  } catch (error) {
    console.log(error);
  }
}
