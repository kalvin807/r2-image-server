import { Elysia } from 'elysia';
import { swagger } from '@elysiajs/swagger';
import { healthRoutes } from './routes/health';

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
        ],
        servers: [
          {
            url: `http://localhost:${PORT}`,
            description: 'Development server',
          },
        ],
      },
      path: '/docs',
      exclude: ['/docs', '/docs/json'],
    })
  )
  .use(healthRoutes)
  .listen(PORT);

console.log(`🚀 Server is running at http://localhost:${PORT}`);
console.log(`📚 API Documentation available at http://localhost:${PORT}/docs`);
console.log(`📋 OpenAPI JSON available at http://localhost:${PORT}/docs/json`);

export type App = typeof app;
