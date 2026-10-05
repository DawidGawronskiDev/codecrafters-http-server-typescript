import { HttpRequest } from "../model/HttpRequest";

export const parseHttpRequest = (req: string): HttpRequest => {
  const httpRequest = new HttpRequest();

  const headEnd = req.indexOf("\r\n\r\n");
  const head = headEnd === -1 ? req : req.slice(0, headEnd);
  const body = headEnd === -1 ? "" : req.slice(headEnd + 4);

  const splittedRequest = head.split("\r\n");

  /**
   * Parse status line
   */

  const statusLines = splittedRequest[0].split(" ");

  httpRequest.setMethod(statusLines[0]);
  httpRequest.setPath(statusLines[1]);
  httpRequest.setVersion(statusLines[2].split("/")[1]);

  /**
   * Parse headers
   */

  splittedRequest
    .slice(1)
    .filter((l) => l.length > 0)
    .map((l) => httpRequest.setHeader(l.split(": ")[0], l.split(": ")[1]));

  httpRequest.setBody(body);

  return httpRequest;
};
