import { API_METHODS } from '@/types';
export class Fetcher {
  public baseUrl: string = '';
  public headers: HeadersInit = {};
  public interceptor: {
    request: (options: RequestInit) => typeof options;
    response: (response: Response) => typeof response;
  } = {
    request: (options: RequestInit) => options,
    response: (response: Response) => response,
  };

  constructor(options: { baseUrl?: string; headers?: HeadersInit } = {}) {
    if (options?.baseUrl) {
      this.baseUrl = options?.baseUrl;
    }
    if (options?.headers) {
      this.headers = options?.headers;
    }
  }
  get = async (url: string, body: object = {}, options: RequestInit = {}) => {
    // creating full url
    const fullUrl: string = `${this.baseUrl}${url}`;
    const method: API_METHODS = API_METHODS.GET;

    // response interceptor
    options = this.interceptor.request(options);
    let response;
    if (!options) {
      response = await fetch(fullUrl, { method });
    } else {
      response = await fetch(fullUrl, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
        body: JSON.stringify(body),
        method,
      });
    }

    // response interceptor
    response = this.interceptor.response(response);
    console.log(response);
    // return the updated response
    return response;
  };

  post = async (url: string, body: object = {}, options: RequestInit = {}) => {
    // creating full url
    const fullUrl: string = `${this.baseUrl}${url}`;
    const method: API_METHODS = API_METHODS.POST;
    // response interceptor
    options = this.interceptor.request(options);
    let response;
    if (!options) {
      response = await fetch(fullUrl, { method });
    } else {
      response = await fetch(fullUrl, {
        ...options,
        headers: {
          ...this.headers,
          ...options.headers,
        },
        body: JSON.stringify(body),
        method,
      });
    }

    // response interceptor
    response = this.interceptor.response(response);

    // return the updated response
    return response;
  };
}
