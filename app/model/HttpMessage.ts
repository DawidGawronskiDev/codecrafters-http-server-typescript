import type { HttpMethod } from "../lib/methods";
import { statusCodes, type StatusCode } from "../lib/statusCodes";
import { isValidHttpMethod, isValidHttpStatusCode } from "../utils";

export class HttpMessage {
  protected method: HttpMethod = "GET";
  protected version: string = "1.1";
  protected statusCode: StatusCode = 200;
  protected headers: Map<string, string> = new Map();
  protected body: String = "";

  constructor() {}

  getMethod = () => {
    return this.method;
  };

  /** @throws {TypeError} if method is not a valid HTTP method */
  setMethod = (method: string) => {
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

  getBody = () => {
    return this.body;
  };

  setBody = (body: string) => {
    // TODO: Validation requried.
    this.body = body;
  };
}
