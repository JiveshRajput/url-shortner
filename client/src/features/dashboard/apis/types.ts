import { IShortUrl } from '@/features/common';
import { IResponseFormat } from '@/features/common/apis/types';

export interface IGetAllUrlsApi extends IResponseFormat {
  data: IShortUrl[];
}
