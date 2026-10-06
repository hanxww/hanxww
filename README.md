# HANXW — Digital Experience

Creative developer portfolio with interactive WebGL, generative art and Telegram contact.

## Development

Node.js 22 and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

## Railway

The Dockerfile builds a standalone Next.js application. Railway reads railway.toml and checks `/` before promoting deployments. The application listens on `0.0.0.0` using the Railway `PORT` variable (default 3000).

Set `NEXT_PUBLIC_SITE_URL` to the public Railway origin for social metadata. No database or API keys are required.

The original profile on the repository main branch is preserved.
