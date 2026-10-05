import { config } from "./config";
import { server } from "./server";

const { port, host } = config;
server.listen(4221, "127.0.0.1");
