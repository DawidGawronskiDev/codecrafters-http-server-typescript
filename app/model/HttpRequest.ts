import { HttpMessage } from "./HttpMessage";

export class HttpRequest extends HttpMessage {
  private path: string = "/";

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
