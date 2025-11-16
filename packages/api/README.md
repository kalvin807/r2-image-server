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
- **Current User**: http://localhost:3000/api/me
- **Auth Endpoints**: http://localhost:3000/api/auth/*

## Authentication

The server includes Better Auth with session middleware that automatically injects user sessions into all routes.

### Available Auth Endpoints

Better Auth provides the following endpoints out of the box:

- `POST /api/auth/sign-up/email` - Register with email/password
- `POST /api/auth/sign-in/email` - Sign in with email/password
- `POST /api/auth/sign-out` - Sign out
- `GET /api/auth/session` - Get current session

### Using Session Middleware

The session middleware is automatically applied to all routes. Access session data in any route:

```typescript
import { Elysia } from 'elysia';

export const myRoutes = new Elysia()
  .get('/api/example', ({ session }) => {
    if (!session.user) {
      return { message: 'Not authenticated' };
    }

    return {
      message: 'Authenticated!',
      user: session.user,
    };
  });
```

### Creating Protected Routes

Use the `authGuard` middleware to require authentication:

```typescript
import { Elysia } from 'elysia';
import { authGuard } from '../lib/session-middleware';

export const protectedRoutes = new Elysia({ prefix: '/api/protected' })
  .use(authGuard) // Requires authentication for all routes in this group
  .get('/profile', ({ session }) => {
    // session.user is guaranteed to be non-null here
    return { user: session.user };
  });
```

### Database Schema

The authentication system uses the following tables:

- **users** - User accounts with email/password
- **sessions** - Active user sessions
- **accounts** - OAuth provider accounts (for future social login)
- **verifications** - Email verification and password reset tokens

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
│   ├── index.ts                  # Main server entry point
│   ├── db/
│   │   ├── index.ts              # Database connection
│   │   └── schema.ts             # Database schema (users, sessions, accounts, verifications)
│   ├── lib/
│   │   ├── auth.ts               # Better Auth configuration
│   │   └── session-middleware.ts # Session injection & auth guard middleware
│   └── routes/
│       ├── health.ts             # Health check endpoint
│       └── protected.ts          # Example protected routes
├── drizzle/                      # Database migrations
├── drizzle.config.ts             # Drizzle configuration (with snake_case)
├── .env.example                  # Environment variables template
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
