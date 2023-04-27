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