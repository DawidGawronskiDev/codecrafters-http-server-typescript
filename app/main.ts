import * as net from "net";
import { HttpResponse } from "./model/HttpResponse";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  socket.on("close", () => {
    socket.end();
  });

  const response: HttpResponse = new HttpResponse();

  // Set status line
  response.setVersion("1.1");
  response.setMethod("GET");
  response.setStatusCode(200);

  // Set headers
  response.setHeader("Host", "localhost:4221");
  response.setHeader("User-Agent", "curl/7.64.1");
  response.setHeader("Accpet", "*/*");

  socket.write(response.toString());
});

server.listen(4221, "localhost");
