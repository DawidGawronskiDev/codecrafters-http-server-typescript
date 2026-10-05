import { config } from "./config";
import { server } from "./server";

const { port, host } = config;
server.listen(port, host);
