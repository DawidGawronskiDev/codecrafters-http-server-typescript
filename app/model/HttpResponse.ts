import type { HttpMethod } from "../lib/methods";
import { statusCodes, type StatusCode } from "../lib/statusCodes";
import { isValidHttpMethod, isValidHttpStatusCode } from "../utils";

export class HttpResponse {
  private method: HttpMethod = "GET";
  private version: string = "1.1";
  private statusCode: StatusCode = 200;
  private headers: Map<string, string> = new Map();

  constructor() {}

  getMethod = () => {
    return this.method;
  };

  /** @throws {TypeError} if method is not a valid HTTP method */
  setMethod = (method: HttpMethod) => {
    if (!isValidHttpMethod(method)) {
      throw new TypeError(`Invalid HTTP method: ${method}`);
    }

    this.method = method;
  };

  getVersion = () => {
    return this.version;
  };

  setVersion = (version: string) => {
    // TODO: Validation required. See: https://datatracker.ietf.org/doc/html/rfc7230#section-2.6
    this.version = version;
  };

  getStatusCode = () => {
    return this.statusCode;
  };

  /** @throws {RangeError} if statusCode is not a valid HTTP status code */
  setStatusCode = (statusCode: StatusCode) => {
    if (!isValidHttpStatusCode(statusCode)) {
      throw new RangeError(`Invalid HTTP status code: ${statusCode}`);
    }

    this.statusCode = statusCode;
  };

  getReasonPhrase = () => statusCodes[this.statusCode];

  getHeaders = (): Map<string, string> => {
    return this.headers;
  };

  setHeaders = (headers: Map<string, string>) => {
    // TODO: Validation requried. See: https://datatracker.ietf.org/doc/html/rfc7230#section-3.2
    this.headers = headers;
  };

  getHeader = (k: string) => {
    return this.headers.get(k);
  };

  setHeader = (k: string, v: string) => {
    // TODO: Validation requried. See: https://datatracker.ietf.org/doc/html/rfc7230#section-3.2
    this.headers.set(k, v);
  };

  toString = (): string => {
    const statusLineBlock = `HTTP/${this.version} ${this.statusCode} ${this.getReasonPhrase()}`;
    const headersSection = `${[...this.headers].map(([k, v]) => `${k}: ${v}\r\n`).join("")}`;

    return `${statusLineBlock}\r\n${headersSection}\r\n`;
  };
}

const main = () => {
  const response: HttpResponse = new HttpResponse();
  response.setHeader("Host", "localhost:4221");
  response.setHeader("User-Agent", "curl/7.64.1");
  response.setHeader("Accpet", "*/*");
  console.log(response.toString());
};

main();
