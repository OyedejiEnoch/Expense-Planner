import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "./schema"
// connection string from neon
const sql = neon( "postgresql://expense-tracker_owner:8iVDlsraXqG0@ep-rough-cell-a5si6ytr.us-east-2.aws.neon.tech/expense-tracker?sslmode=require");
export const db = drizzle(sql, {schema});