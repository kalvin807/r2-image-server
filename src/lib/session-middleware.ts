import { Elysia } from 'elysia';
import { auth } from './auth';

export interface UserSession {
  session: {
    id: string;
    userId: string;
    expiresAt: Date;
  } | null;
  user: {
    id: string;
    email: string;
    name: string;
    image?: string;
    emailVerified: boolean;
  } | null;
}

/**
 * Session middleware that injects user session into request context
 *
 * Usage in routes:
 * ```ts
 * app.get('/protected', ({ session }) => {
 *   if (!session.user) {
 *     throw new Error('Unauthorized');
 *   }
 *   return { user: session.user };
 * });
 * ```
 */
export const sessionMiddleware = new Elysia({ name: 'session' })
  .derive(async ({ request, headers }): Promise<{ session: UserSession }> => {
    // Try to get session from Better Auth
    const sessionData = await auth.api.getSession({
      headers: headers as any,
    });

    if (!sessionData) {
      return {
        session: {
          session: null,
          user: null,
        },
      };
    }

    return {
      session: {
        session: sessionData.session,
        user: sessionData.user,
      },
    };
  });

/**
 * Guard middleware that requires authentication
 * Throws 401 error if user is not authenticated
 */
export const authGuard = new Elysia({ name: 'auth-guard' })
  .use(sessionMiddleware)
  .onBeforeHandle(({ session, set }) => {
    if (!session.user) {
      set.status = 401;
      return {
        error: 'Unauthorized',
        message: 'You must be logged in to access this resource',
      };
    }
  });
