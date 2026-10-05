type Config = {
  host: string;
  port: number;
  directory: string | null;
};

export const config: Config = {
  host: "localhost",
  port: 3000,
  directory: null,
};
