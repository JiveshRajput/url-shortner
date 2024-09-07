import { IShortUrl } from '@/features/common';
import { IResponseFormat } from '@/features/common/apis/types';

export interface IGetAllUrlsApi extends IResponseFormat {
  data: IShortUrl[];
}

export interface IUrlStats {
  totalLinks: number;
  activeLinks: number;
  inActiveLinks: number;
  totalClicks: number;
  recentLinks: IShortUrl[];
}

export interface IGetUrlStatsApi extends IResponseFormat {
  data: IUrlStats;
}

export interface ICreateShortUrlApi extends IResponseFormat {
  data: IShortUrl;
}
export interface ICreateShortUrlApiPayload {
  fullUrl: string;
  shortUrl?: string;
  isActive: boolean;
}
