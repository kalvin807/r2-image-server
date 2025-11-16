import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { healthRoutes } from './routes/health';
import { protectedRoutes } from './routes/protected';
import { auth } from './lib/auth';
import { sessionMiddleware } from './lib/session-middleware';

const PORT = process.env.PORT || 3000;

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: 'API Server Documentation',
          version: '1.0.0',
          description: 'ElysiaJS API Server with Drizzle ORM, Better Auth, and PostgreSQL',
        },
        tags: [
          {
            name: 'Health',
            description: 'Health check endpoints',
          },
          {
            name: 'Auth',
            description: 'Authentication endpoints',
          },
        ],
        servers: [
          {
            url: `http://localhost:${PORT}`,
            description: 'Development server',
          },
        ],
      },
      path: '/docs',
      exclude: ['/docs', '/docs/json', '/api/auth/*'],
    })
  )
  // Global session middleware - injects session into all routes
  .use(sessionMiddleware)
  // Better Auth routes - handles /api/auth/* endpoints
  .all('/api/auth/*', ({ request }) => auth.handler(request))
  // Application routes
  .use(healthRoutes)
  .use(protectedRoutes)
  // Example public route to check current user
  .get(
    '/api/me',
    ({ session }) => {
      if (!session.user) {
        return {
          authenticated: false,
          user: null,
        };
      }

      return {
        authenticated: true,
        user: session.user,
      };
    },
    {
      detail: {
        summary: 'Get current user',
        description: 'Returns the currently authenticated user or null',
        tags: ['Auth'],
      },
    }
  )
  .listen(PORT);

console.log(`🚀 Server is running at http://localhost:${PORT}`);
console.log(`📚 API Documentation available at http://localhost:${PORT}/docs`);
console.log(`📋 OpenAPI JSON available at http://localhost:${PORT}/docs/json`);
console.log(`🔐 Auth endpoints available at http://localhost:${PORT}/api/auth/*`);

export type App = typeof app;
