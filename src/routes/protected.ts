import { Elysia } from 'elysia';
import { authGuard } from '../lib/session-middleware';

/**
 * Example protected routes that require authentication
 */
export const protectedRoutes = new Elysia({ prefix: '/api/protected' })
  .use(authGuard)
  .get(
    '/profile',
    ({ session }) => {
      // authGuard ensures session.user is not null
      return {
        message: 'This is a protected route',
        user: session.user,
      };
    },
    {
      detail: {
        summary: 'Get user profile',
        description: 'Protected route that requires authentication',
        tags: ['Auth'],
        responses: {
          200: {
            description: 'User profile data',
          },
          401: {
            description: 'Unauthorized - user must be logged in',
          },
        },
      },
    }
  );
