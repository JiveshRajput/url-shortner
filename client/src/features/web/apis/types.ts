export interface ICreateFullUrlApi {
  fullUrl: string;
  shortUrl?: string;
}

export interface IUpdateFullUrlApi {
  fullUrl?: string;
  shortUrl?: string;
  clicks?: string;
}
