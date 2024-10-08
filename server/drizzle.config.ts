import { defineConfig } from 'drizzle-kit'
import { env } from './src/env'

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './.migrations', // Pasta onde quero que fiquem meus migrations
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
})
