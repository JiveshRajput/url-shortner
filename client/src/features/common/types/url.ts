export interface IShortUrl {
  _id: string;
  fullUrl: string;
  clicks: number;
  shortUrl: string;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
  __v: number;
}

export enum EUrlStatus {
  ACTIVE = 'Active',
  IN_ACTIVE = 'Inactive',
}
