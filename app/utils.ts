import { httpMethods, type HttpMethod } from "./lib/methods";

export const isValidHttpMethod = (method: string): method is HttpMethod =>
  (httpMethods as readonly string[]).includes(method);

export const isValidHttpStatusCode = (code: number): boolean => {
  const regEx = /^[1-5][0-9][0-9]$/;

  return regEx.test(code.toString());
};
