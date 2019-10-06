import { envConfig } from "./env.config";
const { isProduction, isDevelopment } = envConfig;

const type = "postgres";
const host = process.env.DB_HOST || "localhost";
const port = process.env.DB_PORT || 5432;
const username = process.env.DB_USERNAME || "local";
const password = process.env.DB_PASSWORD || "local";
const database = process.env.DB_NAME || "carpool";
const entities = ["src/**/**.entity{.ts,.js}"];
const synchronize = isDevelopment;
const url = process.env.DATABASE_URL;

export const dbConfig: any = isProduction
    ? {
          type,
          url,
          synchronize,
          entities,
      }
    : {
          type,
          host,
          port,
          username,
          password,
          database,
          entities,
          synchronize,
      };
