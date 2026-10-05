import * as net from "net";
import { HttpResponse } from "./model/HttpResponse";
import { config } from "./config";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server = net.createServer((socket) => {
  socket.on("close", () => {
    socket.end();
  });

  const response: HttpResponse = new HttpResponse();
  response.setVersion("1.1");
  response.setMethod("GET");
  response.setStatusCode(200);

  socket.write(response.toString());
});

server.listen(config.port, config.host);
