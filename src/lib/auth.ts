import { betterAuth } from 'better-auth';
import { db } from '../db';

export const auth = betterAuth({
  database: db as any,
  emailAndPassword: {
    enabled: true,
  },
  secret: process.env.AUTH_SECRET || 'your-secret-key-change-this-in-production',
  trustedOrigins: [process.env.APP_URL || 'http://localhost:3000'],
});
