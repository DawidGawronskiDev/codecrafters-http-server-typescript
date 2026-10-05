import fs from "fs";

import { HttpResponse } from "../model/HttpResponse";
import type { HttpRequest } from "../model/HttpRequest";
import { config } from "../config";

export const endpoints: Map<
  string,
  (req: HttpRequest, res: HttpResponse) => void
> = new Map([
  [
    "/",
    (_: HttpRequest, res: HttpResponse) => {
      res.setStatusCode(200);
    },
  ],
  [
    "/echo",
    (req: HttpRequest, res: HttpResponse) => {
      const path = req.getPath();

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
    (req: HttpRequest, res: HttpResponse) => {
      const userAgent = req.getHeader("User-Agent");
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
    (req: HttpRequest, res: HttpResponse) => {
      if (!config.directory) {
        res.setStatusCode(400);
        return;
      }

      const method = req.getMethod();

      switch (method) {
        case "GET":
          {
            const path = req.getPath();
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
            const path = req.getPath();
            const file = path.slice(path.lastIndexOf("/") + 1);

            const body = req.getBody();
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
