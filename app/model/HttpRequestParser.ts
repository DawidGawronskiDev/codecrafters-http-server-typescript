import { HttpRequest } from "./HttpRequest";

class HttpRequestParser {
  public parse = (request: string): HttpRequest => {
    const httpRequest = new HttpRequest();

    const headEnd = request.indexOf("\r\n\r\n");
    const head = headEnd === -1 ? request : request.slice(0, headEnd);
    const body = headEnd === -1 ? "" : request.slice(headEnd + 4);

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
}

export const httpRequestParser = new HttpRequestParser();

const main = () => {
  const httpRequest = httpRequestParser.parse(
    "GET /user-agent HTTP/1.1\r\nHost: localhost:4221\r\nUser-Agent: foobar/1.2.3\r\nAccept: */*\r\n\r\n",
  );

  console.log(httpRequest.toString());
};

main();
