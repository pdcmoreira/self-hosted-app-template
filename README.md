# Self Hosted App Template

A production-ready full-stack template for self-hosted applications.

## Tech Stack

-   **Backend**: Node.js, Express, TypeScript
-   **Database**: SQLite with Drizzle ORM
-   **Frontend**: Vue 3, Vite, Tailwind CSS
-   **DevOps**: Docker, Docker Compose, GitHub Actions (CI/CD)

## Features

-   **Monorepo Structure**: Managed with pnpm workspaces
-   **Type Safety**: Shared types between backend and frontend
-   **Database Migrations**: Automatic migration management with Drizzle
-   **Docker Ready**: Multi-stage builds for optimized images
-   **CI/CD**: Semantic Release and ghcr.io image publishing
-   **Developer Experience**: Concurrent dev servers, hot reload, and debug configurations

## Setup

To transform this template into your own project, run:

```bash
pnpm run setup
```

This will prompt you for your project name and details, and replace all template references in the codebase.

## Development

### Prerequisites

-   Node.js 20+
-   pnpm

### Installation

1.  Clone the repository
2.  Install dependencies:
    ```bash
    pnpm install
    ```
3.  Set up environment variables:
    ```bash
    cp .env.example .env
    ```

### Running Locally

Start both backend and frontend in development mode:

```bash
pnpm dev
```

-   Frontend: http://localhost:5173
-   Backend: http://localhost:3000

### Debugging

Use VSCode "Run and Debug" to attach to the backend process.

```bash
pnpm dev:debug
```

## Production

### Docker Compose

```yaml
version: "3.8"

services:
  app:
    image: ghcr.io/pdcmoreira/self-hosted-app-template:latest
    container_name: self-hosted-app-template
    restart: unless-stopped
    ports:
      - "3000:3000"
    volumes:
      - ./data:/app/data
    environment:
      - NODE_ENV=production
```

## Directory Structure

-   `backend/`: Express API server
-   `frontend/`: Vue 3 application
-   `shared/`: Shared TypeScript types and utilities
-   `scripts/`: Maintenance scripts