# Moje Ikpeme Portfolio

Standalone portfolio shell built with React, TypeScript, and Vite. It is intentionally minimal while the Figma Make prototype and final media are prepared.

## Local development

```bash
npm install
npm run dev
```

Run those commands from this directory (`portfolio/`). Build for production with `npm run build`; the output is `dist/`.

## Vercel

Create the Vercel project with `portfolio/` as its **Root Directory**. Use `npm run build` as the Build Command and `dist` as the Output Directory. The app assumes Node.js with npm and uses the package-lock generated in this directory.

## Assets

Add final media under `public/assets/` using the conventions below:

- `product/stipendly/`, `product/stipendmaster/`, `product/Poket by GradientFi/`, `product/safeword/`, `product/Bare/`
- `graphic/`, `art/`, `writing/`
- `silhouettes/`

Reference or generated Figma Make files belong in `reference/figma-make/`. See that directory's README before migrating useful logic into production components.
