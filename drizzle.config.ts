
import { defineConfig } from 'drizzle-kit'
export default defineConfig({
 schema: "./src/utils/schema.ts",
  dialect: 'postgresql',
  dbCredentials: {
    url:"postgresql://expense-tracker_owner:8iVDlsraXqG0@ep-rough-cell-a5si6ytr.us-east-2.aws.neon.tech/expense-tracker?sslmode=require",
  },
  verbose: true,
  strict: true,

})