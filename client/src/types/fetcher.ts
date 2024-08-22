export enum API_METHODS {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IFetchInterceptor {
  request: (options: RequestInit) => typeof options;
  response: (response: Response) => typeof response;
}
