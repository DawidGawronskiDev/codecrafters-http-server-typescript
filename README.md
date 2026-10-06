[![progress-banner](https://backend.codecrafters.io/progress/http-server/cae7fb7a-e746-4329-b82a-423f2645f231)](https://app.codecrafters.io/users/DawidGawronskiDev?r=2qF)

# HTTP server in TypeScript

A small HTTP/1.1 server built directly on TCP sockets (`net`), with no HTTP
library. Written for the CodeCrafters
["Build Your Own HTTP server" challenge](https://app.codecrafters.io/courses/http-server/overview).

Requests are parsed by hand from the raw socket data, routed by path prefix,
and serialized back into a response string.

## Requirements

- [Bun](https://bun.sh) 1.3+

## Running

```sh
bun install
./your_program.sh --directory /tmp/files
```

The server listens on `127.0.0.1:4221`. The `--directory` flag is optional and
only needed for the `/files` endpoints.

## Endpoints

| Method | Path                | Response                                                    |
| ------ | ------------------- | ----------------------------------------------------------- |
| GET    | `/`                 | `200 OK`, empty body                                        |
| GET    | `/echo/{text}`      | `200 OK`, `{text}` as `text/plain`                          |
| GET    | `/user-agent`       | `200 OK`, the request's `User-Agent` header as `text/plain` |
| GET    | `/files/{filename}` | `200 OK`, file contents as `application/octet-stream`       |
| POST   | `/files/{filename}` | `201 Created`, request body written to the file             |

Anything else returns `404 Not Found`. `/files` returns `400 Bad Request` when
the server was started without `--directory`, and `404` when the file does not
exist.

## Examples

```sh
curl -i http://localhost:4221/echo/hello
curl -i http://localhost:4221/user-agent
curl -i --data "some content" http://localhost:4221/files/note.txt
curl -i http://localhost:4221/files/note.txt
```

## Project structure

```
app/
├── main.ts              entry point, starts the listener
├── server.ts            TCP server, CLI flags, routing
├── config.ts            host, port, files directory
├── utils.ts             method and status code validators
├── lib/
│   ├── endpoints.ts     path prefix -> handler map
│   ├── parse.ts         raw request string -> HttpRequest
│   ├── methods.ts       HTTP method list and type
│   └── statusCodes.ts   status code -> reason phrase
└── model/
    ├── HttpMessage.ts   shared base: version, headers, body
    ├── HttpRequest.ts   adds the request path
    └── HttpResponse.ts  serializes the response
```

## Adding an endpoint

Add an entry to the map in `app/lib/endpoints.ts`. The key matches the exact
path and anything below it (`/echo` matches `/echo` and `/echo/abc`):

```ts
[
  "/ping",
  (_req, res) => {
    res.setHeader("Content-Type", "text/plain");
    res.setHeader("Content-Length", "4");
    res.setBody("pong");
  },
],
```

## Known limitations

- A request is assumed to arrive in a single TCP chunk; large bodies split
  across packets are not reassembled.
- Bodies are handled as strings, so binary files are not served byte-exact.
- No compression, no `Connection: close` handling, no HTTPS.

## Testing

```sh
codecrafters submit
```
