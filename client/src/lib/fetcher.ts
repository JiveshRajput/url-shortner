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
      let request: Request, requestClone: Request, response: Response;

      // creating full url
      const fullUrl: string = `${this.baseUrl}${url}`;

      // request interceptor
      options = await this.interceptor.request({
        ...options,
        headers: { ...this.headers, ...options.headers },
      });

      // if request body is not available assign `object` to it.
      if (!options.body) {
        options.body = {} as BodyInit;
      }

      if (!options && !body) {
        request = new Request(fullUrl, { method });
        requestClone = request.clone();
        response = await fetch(request);
      } else {
        const { body: optionBody, ...extraOptions } = options;
        let payload: RequestInit = {
          ...extraOptions,
          method,
        };
        const payloadBody: object = getRequestBody(body, optionBody as object);

        if (Object.keys(payloadBody).length >= 1 && method !== API_METHODS.GET) {
          payload.body = JSON.stringify(payloadBody);
        }

        request = new Request(fullUrl, payload);
        requestClone = request.clone();
        response = await fetch(request);
      }

      // response interceptor
      response = await this.interceptor.response(response, requestClone);

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

export const getRequestBody = (body: object, optionsBody: object) => {
  return Object.values(body).length >= 1 || Object.values(optionsBody).length >= 1
    ? {
        ...body,
        ...(optionsBody ? (optionsBody as object) : {}),
      }
    : {};
};
