import fs from "fs";

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
      const path = httpRequest.getPath();

      const message = path.slice(path.lastIndexOf("/") + 1);

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
      const method = httpRequest.getMethod();

      switch (method) {
        case "GET":
          {
            const path = httpRequest.getPath();
            const file = path.slice(path.lastIndexOf("/") + 1);

            let data: Buffer;
            try {
              data = fs.readFileSync(`${config.directory}/${file}`);
            } catch {
              res.setStatusCode(404);
              return;
            }

            res.setStatusCode(200);
            res.setHeader("Content-Type", "application/octet-stream");
            res.setHeader("Content-Length", data.byteLength.toString());
            res.setBody(data.toString());
          }
          break;
        case "POST":
          {
            const path = httpRequest.getPath();
            const file = path.slice(path.lastIndexOf("/") + 1);

            const body = httpRequest.getBody();
            console.log(body);
            if (!body) {
              res.setStatusCode(400);
              return;
            }

            try {
              fs.writeFileSync(`${config.directory}/${file}`, body);
            } catch {
              res.setStatusCode(500);
              return;
            }

            res.setStatusCode(201);
          }
          break;
      }
    },
  ],
]);
