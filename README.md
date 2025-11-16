# R2 Image Server

A modern monorepo for the R2 Image Server project, built with pnpm workspaces.

## Project Structure

This is a monorepo managed by pnpm with the following packages:

```
.
├── packages/
│   └── api/                  # Backend API server
│       ├── src/              # Source code
│       ├── drizzle/          # Database migrations
│       ├── package.json
│       └── README.md         # API-specific documentation
├── package.json              # Root workspace configuration
├── pnpm-workspace.yaml       # pnpm workspace definition
└── README.md                 # This file
```

## Packages

### [@r2-image-server/api](./packages/api)

ElysiaJS-based API server with:
- **ElysiaJS**: Fast and type-safe web framework for Bun
- **Drizzle ORM**: Type-safe ORM for PostgreSQL
- **Better Auth**: Modern authentication library
- **100% OpenAPI**: Full OpenAPI 3.0 specification with Swagger UI
- **TypeScript**: Full type safety

See [packages/api/README.md](./packages/api/README.md) for detailed documentation.

## Prerequisites

- [Bun](https://bun.sh) installed
- [pnpm](https://pnpm.io) installed (v9.0.0 or higher)
- PostgreSQL database running

## Quick Start

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set Up Environment

Create `.env` file in `packages/api`:

```bash
cp packages/api/.env.example packages/api/.env
```

Update the environment variables in `packages/api/.env`:

```env
PORT=3000
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/api_db
AUTH_SECRET=your-secret-key-change-this-in-production
```

### 3. Set Up Database

```bash
# Generate migrations
pnpm db:generate

# Push schema to database
pnpm db:push
```

### 4. Start Development Server

```bash
pnpm dev
```

The API server will be available at http://localhost:3000

## Available Scripts

Run these commands from the root directory:

### Development

- `pnpm dev` - Start API server in development mode with hot reload
- `pnpm start` - Start API server in production mode

### Database

- `pnpm db:generate` - Generate Drizzle migrations
- `pnpm db:migrate` - Run Drizzle migrations
- `pnpm db:push` - Push schema directly to database
- `pnpm db:studio` - Open Drizzle Studio

### Workspace Management

- `pnpm install` - Install all dependencies for all packages
- `pnpm --filter @r2-image-server/api <command>` - Run command in specific package

## Tech Stack

- **Package Manager**: pnpm with workspaces
- **Runtime**: Bun
- **Framework**: ElysiaJS
- **ORM**: Drizzle ORM
- **Database**: PostgreSQL
- **Auth**: Better Auth
- **Language**: TypeScript

## Adding New Packages

To add a new package to the monorepo:

1. Create a new directory in `packages/`:
   ```bash
   mkdir packages/new-package
   ```

2. Initialize the package:
   ```bash
   cd packages/new-package
   bun init -y
   ```

3. Update the package name in `package.json`:
   ```json
   {
     "name": "@r2-image-server/new-package",
     ...
   }
   ```

4. Install dependencies from the root:
   ```bash
   pnpm install
   ```

## API Documentation

Once the server is running, you can access:

- **Swagger UI**: http://localhost:3000/docs
- **OpenAPI JSON**: http://localhost:3000/docs/json
- **Health Check**: http://localhost:3000/health

## License

MIT
