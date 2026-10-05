import { HttpMessage } from "./HttpMessage";

export class HttpResponse extends HttpMessage {
  toString = (): string => {
    const statusLineBlock = `HTTP/${this.version} ${this.statusCode} ${this.getReasonPhrase()}`;
    const headersSection = `${[...this.headers].map(([k, v]) => `${k}: ${v}\r\n`).join("")}`;

    return `${statusLineBlock}\r\n${headersSection}\r\n${this.body}`;
  };
}
