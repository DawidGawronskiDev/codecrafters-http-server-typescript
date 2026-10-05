import { HttpMessage } from "./HttpMessage";

export class HttpRequest extends HttpMessage {
  private path: String = "/";

  constructor() {
    super();
  }

  getPath = () => {
    return this.path;
  };

  setPath = (path: string) => {
    // TODO: Validation required.
    this.path = path;
  };

  toString = (): string => {
    const statusLineBlock = `${this.method} ${this.path} HTTP/${this.version}`;
    const headersSection = `${[...this.headers].map(([k, v]) => `${k}: ${v}\r\n`).join("")}`;

    return `${statusLineBlock}\r\n${headersSection}\r\n`;
  };
}

const main = () => {
  const response: HttpRequest = new HttpRequest();
  response.setHeader("Host", "localhost:4221");
  response.setHeader("User-Agent", "curl/7.64.1");
  response.setHeader("Accpet", "*/*");
  console.log(response.toString());
};

main();
