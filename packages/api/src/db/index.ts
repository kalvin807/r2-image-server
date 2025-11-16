import postgres from 'postgres';
import { drizzle } from 'drizzle-orm/postgres-js';
import * as schema from './schema';

// Database connection URL
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/api_db';

// Create postgres connection
const client = postgres(connectionString);

// Create drizzle instance
export const db = drizzle(client, { schema });
