export interface ICatalog {
  title: string;
  title_rus: string;
  title_trimmed: string;
  url_rus: string
  positions: IPosition[];
  key: number
}

export interface IPosition {
  id_parent: number;
  key: number;
  title: string;
  title_rus: string;
  url_rus: string;
}

export interface IAuthResponse {
  access_token: string,
  refresh_token: string,
  token_type: string
}



export interface IVacancy {
  id: number;
  profession: string;
  firm_name: string;
  town: {
    title: string;
    id: number;
  };
  catalogues: {
    0: {
      title: string;
    }
  };
  type_of_work: {
    id: number;
    title: string;
  };
  payment_to: number;
  payment_from: number;
  currency: string;
}

