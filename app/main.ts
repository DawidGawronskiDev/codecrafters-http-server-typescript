import * as net from "net";
import { HttpResponse } from "./model/HttpResponse";
import { HttpRequest } from "./model/HttpRequest";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  socket.on("close", () => {
    socket.end();
  });

  socket.on("data", (data) => {
    const request = data.toString();
    const lines = request.split("\r\n");

    const path = lines[0].split(" ")[1];

    const httpResponse: HttpResponse = new HttpResponse();

    // Set status line
    httpResponse.setVersion("1.1");
    httpResponse.setMethod("GET");

    if (path.startsWith("/echo")) {
      // TODO: Validation required. Index might be not present.
      const secondSlashIdx = path.indexOf("/", 1);
      const message = path.slice(secondSlashIdx + 1);

      console.log("*****", message);

      const buffer = Buffer.from(message);

      httpResponse.setStatusCode(200);

      httpResponse.setHeader("Content-Type", "text/plain");
      httpResponse.setHeader("Content-Length", buffer.byteLength.toString());

      httpResponse.setBody(message);

      socket.write(httpResponse.toString());
      return;
    }

    switch (path) {
      case "/":
        httpResponse.setStatusCode(200);

        httpResponse.setHeader("Host", "localhost:4221");
        httpResponse.setHeader("User-Agent", "curl/7.64.1");
        httpResponse.setHeader("Accpet", "*/*");

        break;
      default:
        httpResponse.setStatusCode(404);

        httpResponse.setHeader("Host", "localhost:4221");
        httpResponse.setHeader("User-Agent", "curl/7.64.1");
        httpResponse.setHeader("Accpet", "*/*");
    }

    socket.write(httpResponse.toString());
  });
});

server.listen(4221, "localhost");
