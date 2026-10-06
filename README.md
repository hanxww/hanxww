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

## Languages and appearance

Routes: `/en`, `/ru`, and `/{locale}/work/{slug}`. The root selects a language from the preference cookie or browser language. Manual preferences persist locally; direct locale links remain shareable. DAY/NIGHT respects the system until a manual selection is made. Dictionaries are in `locales/`; translated study data lives in `lib/project-content.ts`.

## Interactions

- Ctrl/Cmd + K opens the command palette.
- G H / G W / G A / G L navigates home, work, about, and Lab.
- Type HANXW outside an input to open the hidden developer terminal.
- Lab has field/orbit/wave modes, energy, pause/reset, and fullscreen where supported.
- Core and H use a compact GLSL raymarcher. Optimized theme-specific illustrations preserve the composition if WebGL is unavailable.
- All Telegram links point to https://t.me/hanxw. Sound is opt-in.

## Content integrity

The three studies are functioning experiments created for this portfolio, not client projects. No clients, metrics, availability, or experience claims are fabricated. Add real project content in `lib/projects.ts` and its locale overlay when supplied.

## Verification

TypeScript checked with `pnpm typecheck`; production build and health check verified on Railway. RU/EN home and case routes, localized HTML metadata, 404 status, sitemap, theme persistence, keyboard palette, and Lab state preservation were checked. Full device and Safari testing remains a separate validation step; do not treat the available desktop browser checks as an exhaustive viewport or performance audit.
