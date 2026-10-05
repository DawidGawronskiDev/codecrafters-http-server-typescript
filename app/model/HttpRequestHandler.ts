class HttpRequestHandler {
  public handle = (request: string) => {
    const splittedRequest = request.split("\r\n");
    console.log(splittedRequest);
  };
}

export const httpRequestHandler = new HttpRequestHandler();
