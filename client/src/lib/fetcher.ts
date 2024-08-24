import { API_METHODS, IFetchInterceptor } from '@/types';
export class Fetcher {
  // base url
  public baseUrl: string = '';

  // common headers
  private headers: HeadersInit = {};

  // request & response interceptor
  public interceptor: IFetchInterceptor = {
    request: (options: RequestInit) => options,
    response: (response: Response) => response,
  };

  // constructor
  constructor(options: { baseUrl?: string; headers?: HeadersInit } = {}) {
    if (options?.baseUrl) {
      this.baseUrl = options?.baseUrl;
    }
    if (options?.headers) {
      this.headers = options?.headers;
    }
  }

  makeCall =
    (method: API_METHODS) =>
    async (url: string, body: object = {}, options: RequestInit = {}) => {
      // creating full url
      const fullUrl: string = `${this.baseUrl}${url}`;

      // request interceptor
      options = await this.interceptor.request({
        ...options,
        headers: { ...this.headers, ...options.headers },
      });

      let request: Request;
      let response: Response;

      if (!options && !body) {
        request = new Request(fullUrl, { method });
        response = await fetch(request);
      } else {
        const payload = {
          ...options,
          ...(Object.values(body).length >= 1 || Object.values(options.body as object).length >= 1
            ? { body: JSON.stringify({ ...body, ...(options.body as object) }) }
            : {}),
          method,
        };

        request = new Request(fullUrl, payload);
        response = await fetch(request);
      }

      // response interceptor
      response = await this.interceptor.response(response, request);

      // return the updated response
      return response;
    };

  // get call
  get = this.makeCall(API_METHODS.GET);

  // post call
  post = this.makeCall(API_METHODS.POST);

  // patch call
  patch = this.makeCall(API_METHODS.PATCH);

  // put call
  put = this.makeCall(API_METHODS.PUT);

  // delete call
  delete = this.makeCall(API_METHODS.DELETE);
}
