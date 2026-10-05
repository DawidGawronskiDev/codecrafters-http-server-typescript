import * as net from "net";
import { HttpResponse } from "./model/HttpResponse";
import { httpRequestParser } from "./model/HttpRequestParser";
import { endpoints } from "./lib/endpoints";
import { config } from "./config";

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
    const request = data.toString();
    const httpRequest = httpRequestParser.parse(request);
    const httpResponse: HttpResponse = new HttpResponse();

    const path = httpRequest.getPath();

    const endpoint = [...endpoints].find(
      ([prefix]) => path === prefix || path.startsWith(`${prefix}/`),
    )?.[1];

    if (endpoint) {
      endpoint(request, httpResponse);
    } else {
      httpResponse.setStatusCode(404);
      httpResponse.setHeader("Host", "localhost:4221");
      httpResponse.setHeader("User-Agent", "curl/7.64.1");
      httpResponse.setHeader("Accept", "*/*");
    }

    socket.write(httpResponse.toString());
  });
});
