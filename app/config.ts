type Config = {
  host: string;
  port: number;
  directory: string | null;
};

export const config: Config = {
  host: "127.0.0.1",
  port: 3000,
  directory: null,
};
