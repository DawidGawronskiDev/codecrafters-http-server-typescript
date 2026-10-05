import { HttpResponse } from "../model/HttpResponse";
import { httpRequestParser } from "../model/HttpRequestParser";
import { config } from "../config";

export const endpoints: Map<string, Function> = new Map([
  [
    "/",
    (_: string, res: HttpResponse) => {
      res.setStatusCode(200);

      res.setHeader("Host", "localhost:4221");
      res.setHeader("User-Agent", "curl/7.64.1");
      res.setHeader("Accept", "*/*");
    },
  ],
  [
    "/echo",
    (req: string, res: HttpResponse) => {
      const httpRequest = httpRequestParser.parse(req);
      const message = httpRequest.getBody();

      res.setStatusCode(200);

      res.setHeader("Content-Type", "text/plain");
      res.setHeader(
        "Content-Length",
        Buffer.from(message).byteLength.toString(),
      );
      res.setBody(message);
    },
  ],
  [
    "/user-agent",
    (req: string, res: HttpResponse) => {
      const httpRequest = httpRequestParser.parse(req);
      const userAgent = httpRequest.getHeader("User-Agent");
      if (!userAgent) {
        res.setStatusCode(400);
        return;
      }
      res.setStatusCode(200);
      res.setHeader("Content-Type", "text/plain");
      res.setHeader(
        "Content-Length",
        Buffer.from(userAgent).byteLength.toString(),
      );
      res.setBody(userAgent);
    },
  ],
  [
    "/files",
    (req: string, res: HttpResponse) => {
      if (!config.directory) {
        res.setStatusCode(400);
        return;
      }

      const httpRequest = httpRequestParser.parse(req);
      const path = httpRequest.getPath();

      const parts = path.split("/");
      const file = parts.slice(parts.lastIndexOf("/") + 1);

      console.log(file);
    },
  ],
]);
