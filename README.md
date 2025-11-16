# API Server

A modern, type-safe API server built with ElysiaJS, Drizzle ORM, Better Auth, and PostgreSQL.

## Features

- **ElysiaJS**: Fast and type-safe web framework for Bun
- **Drizzle ORM**: Type-safe ORM for PostgreSQL
- **Better Auth**: Modern authentication library
- **100% OpenAPI**: Full OpenAPI 3.0 specification
- **Swagger UI**: Interactive API documentation
- **TypeScript**: Full type safety
- **Bun**: Fast JavaScript runtime

## Prerequisites

- [Bun](https://bun.sh) installed
- PostgreSQL database running

## Getting Started

### 1. Clone and Install

```bash
bun install
```

### 2. Environment Setup

Create a `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

Update the environment variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development
APP_URL=http://localhost:3000

# Database Configuration
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/api_db

# Better Auth Configuration
AUTH_SECRET=your-secret-key-change-this-in-production
```

### 3. Database Setup

Generate and run migrations:

```bash
# Generate migrations
bun run db:generate

# Push schema to database
bun run db:push
```

### 4. Start the Server

Development mode (with hot reload):

```bash
bun run dev
```

Production mode:

```bash
bun run start
```

## API Documentation

Once the server is running, you can access:

- **Swagger UI**: http://localhost:3000/docs
- **OpenAPI JSON**: http://localhost:3000/docs/json
- **Health Check**: http://localhost:3000/health

## Available Scripts

- `bun run dev` - Start development server with hot reload
- `bun run start` - Start production server
- `bun run db:generate` - Generate Drizzle migrations
- `bun run db:migrate` - Run Drizzle migrations
- `bun run db:push` - Push schema directly to database
- `bun run db:studio` - Open Drizzle Studio

## Project Structure

```
.
├── src/
│   ├── index.ts          # Main server entry point
│   ├── db/
│   │   ├── index.ts      # Database connection
│   │   └── schema.ts     # Database schema
│   ├── lib/
│   │   └── auth.ts       # Better Auth configuration
│   └── routes/
│       └── health.ts     # Health check endpoint
├── drizzle/              # Database migrations
├── drizzle.config.ts     # Drizzle configuration
├── package.json
└── tsconfig.json
```

## Adding New Endpoints

1. Create a new route file in `src/routes/`:

```typescript
import { Elysia, t } from 'elysia';

export const myRoutes = new Elysia({ prefix: '/api' })
  .get(
    '/example',
    () => ({ message: 'Hello World' }),
    {
      detail: {
        summary: 'Example endpoint',
        description: 'Returns a hello world message',
        tags: ['Example'],
      }
    }
  );
```

2. Import and use in `src/index.ts`:

```typescript
import { myRoutes } from './routes/my-routes';

const app = new Elysia()
  .use(swagger({ ... }))
  .use(myRoutes)
  // ... rest of your code
```

## Database Schema Changes

1. Modify `src/db/schema.ts`
2. Generate migration: `bun run db:generate`
3. Apply migration: `bun run db:push`

## Tech Stack

- **Runtime**: Bun
- **Framework**: ElysiaJS v1.4+
- **ORM**: Drizzle ORM v0.44+
- **Database**: PostgreSQL
- **Auth**: Better Auth v1.3+
- **API Docs**: @elysiajs/swagger
- **Language**: TypeScript

## License

MIT
