import { Elysia, t } from 'elysia';

export const healthRoutes = new Elysia({ prefix: '/health' })
  .get(
    '/',
    () => ({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    }),
    {
      detail: {
        summary: 'Health Check',
        description: 'Returns the health status of the API server',
        tags: ['Health'],
        responses: {
          200: {
            description: 'Successful health check',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status: {
                      type: 'string',
                      example: 'ok',
                      description: 'Health status of the server'
                    },
                    timestamp: {
                      type: 'string',
                      format: 'date-time',
                      description: 'Current server timestamp'
                    },
                    uptime: {
                      type: 'number',
                      description: 'Server uptime in seconds'
                    },
                    environment: {
                      type: 'string',
                      example: 'development',
                      description: 'Current environment'
                    },
                  },
                  required: ['status', 'timestamp', 'uptime', 'environment']
                }
              }
            }
          }
        }
      }
    }
  );
