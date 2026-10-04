import * as net from "net";
import type { HttpResponse } from "./model/HttpResponse";
import { HttpResponseBuilder } from "./builder/HttpResponseBuilder";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  socket.on("close", () => {
    socket.end();
  });

  const response: HttpResponse = new HttpResponseBuilder()
    .withVersion("1.1")
    .withMethod("GET")
    .withStatusCode(200)
    .build();

  socket.write(response.getStatusLine());
});

server.listen(4221, "localhost");
