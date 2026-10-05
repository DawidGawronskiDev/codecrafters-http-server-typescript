import * as net from "net";
import { HttpResponse } from "./model/HttpResponse";
import { endpoints } from "./lib/endpoints";
import { config } from "./config";
import { parseHttpRequest } from "./lib/parse";

const argvs = process.argv.slice(2);

if (argvs.includes("--directory")) {
  const directoryIdx = argvs.indexOf("--directory");
  config.directory = argvs[directoryIdx + 1];
}

export const server = net.createServer((socket) => {
  socket.on("close", () => {
    socket.end();
  });

  socket.on("data", (data) => {
    const httpRequest = parseHttpRequest(data.toString());
    const httpResponse: HttpResponse = new HttpResponse();

    const path = httpRequest.getPath();

    const endpoint = [...endpoints].find(
      ([prefix]) => path === prefix || path.startsWith(`${prefix}/`),
    )?.[1];

    if (endpoint) {
      endpoint(httpRequest, httpResponse);
    } else {
      httpResponse.setStatusCode(404);
    }

    socket.write(httpResponse.toString());
  });
});
