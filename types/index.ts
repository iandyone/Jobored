export interface ICatalog {
  title: string;
  title_rus: string;
  title_trimmed: string;
  url_rus: string;
  positions: IPosition[];
  key: number;
}

export interface ICategory {
  key: number;
  title: string;
}
export interface VacanciesSearchParams {
  page: number;
  keyword?: string;
  payment_from?: number;
  payment_to?: number;
  catalogues?: number;
}

export interface IFilter {
  published?: number;
  keyword?: string;
  payment_from?: number;
  payment_to?: number;
  catalogues?: number;
  no_agreement?: number;
}

export interface IPosition {
  id_parent: number;
  key: number;
  title: string;
  title_rus: string;
  url_rus: string;
}

export interface IAuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

export interface VacanciesResponse {
  more: boolean;
  objects: IVacancy[];
  total: number;
}



export interface IVacancy {
  id: number;
  profession: string;
  firm_name: string;
  town: {
    id: number;
    title: string;
  };
  catalogues: {
    0: {
      title: string;
    };
  };
  type_of_work: {
    id: number;
    title: string;
  };
  payment_to: number;
  payment_from: number;
  currency: string;
  vacancyRichText: string;
}
