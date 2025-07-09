# Scripts

## setup.js

Initializes the template for a new project.

```bash
pnpm run setup
```

- Prompts for Project Name, description, and author.
- Replaces template references (`self-hosted-app-template`) across the codebase.
- Resets version to `0.0.1`.

## change-version-references.js

Synchronizes specific versions across the monorepo.
>This is used by CI/CD (`semantic-release`).

```bash
node scripts/change-version-references.js 1.2.3
```

- Updates version in all `package.json` files (root, backend, frontend, shared).
- Updates the Docker image tag in the root `README.md`.