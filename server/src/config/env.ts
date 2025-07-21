import "dotenv/config";

// Load environment variables and export them for use throughout the app
export const env = {
  POSTGRES_HOST: process.env.POSTGRES_HOST!,
  POSTGRES_USER: process.env.POSTGRES_USER!,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
  POSTGRES_DB: process.env.POSTGRES_DB!,
  POSTGRES_PORT: Number(process.env.POSTGRES_PORT ?? "5432")
} as const;
