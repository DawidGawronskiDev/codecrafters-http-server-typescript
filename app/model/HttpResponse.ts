import type { HttpMethod } from "../lib/methods";
import { statusCodes, type StatusCode } from "../lib/statusCodes";
import { isValidHttpMethod, isValidHttpStatusCode } from "../utils";

export class HttpResponse {
  private method: HttpMethod = "GET";
  private version: string = "1.1";
  private statusCode: StatusCode = 200;

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

  getStatusLine = (): string => {
    return `HTTP/${this.version} ${this.statusCode} ${this.getReasonPhrase()}\r\n\r\n`;
  };
}
