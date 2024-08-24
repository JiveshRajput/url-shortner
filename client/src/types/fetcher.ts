export enum API_METHODS {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface IResponse extends Response {
  request: Request;
}

export interface IFetchInterceptor {
  request: (options: RequestInit) => Promise<typeof options> | typeof options;
  response: (response: Response, request: Request) => Promise<typeof response> | typeof response;
}
