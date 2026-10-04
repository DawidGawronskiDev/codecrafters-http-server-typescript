import type { HttpMethod } from "../lib/methods";
import type { StatusCode } from "../lib/statusCodes";
import { HttpResponse } from "../model/HttpResponse";

export class HttpResponseBuilder {
  private httpResponse: HttpResponse;

  constructor() {
    this.httpResponse = new HttpResponse();
  }

  public withMethod = (method: HttpMethod): this => {
    this.httpResponse.setMethod(method);
    return this;
  };

  public withVersion = (version: string): this => {
    this.httpResponse.setVersion(version);
    return this;
  };

  public withStatusCode = (statusCode: StatusCode): this => {
    this.httpResponse.setStatusCode(statusCode);
    return this;
  };

  public build = (): HttpResponse => {
    return this.httpResponse;
  };
}
