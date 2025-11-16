import { pgTable, text, timestamp, boolean } from 'drizzle-orm/pg-core';

// Better Auth tables will be added here
// For now, we're keeping it minimal as requested

// Example table (you can remove this if not needed)
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  email: text('email').notNull().unique(),
  emailVerified: boolean('email_verified').notNull().default(false),
  name: text('name'),
  image: text('image'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
