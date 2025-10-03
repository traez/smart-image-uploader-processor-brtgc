//src\lib\turso.ts
import { createClient } from "@libsql/client";

export const turso = createClient({
  url: process.env.TURSO_DATABASE_URL!, // from .env
  authToken: process.env.TURSO_AUTH_TOKEN, // from .env
});
