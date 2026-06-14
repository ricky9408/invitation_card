# Repository Guidelines

## Project Structure & Module Organization

This is a Cloudflare Pages wedding invitation site. Browser source lives in `src/app.ts` and is bundled to `dist/app.js` by `scripts/build-pages.mjs`. The Pages Function for RSVP submissions is `functions/api/rsvp.ts`. Static page structure and styling are in `index.html` and `styles.css`; images live in `assets/`. Playwright tests are in `tests/`, with visual-check output under `tests/artifacts/`. Terraform for Cloudflare Pages, DNS, and domain setup is in `terraform/`.

## Build, Test, and Development Commands

Use pnpm only.

```sh
pnpm install --frozen-lockfile  # install exact locked dependencies
pnpm run typecheck              # compile-check TypeScript projects
pnpm run build:pages            # write Cloudflare Pages assets to dist/
pnpm run test:e2e               # run Playwright guest-flow tests
pnpm run visual:check           # run visual smoke checks against a served URL
pnpm run validate               # full app + Terraform validation
```

For Terraform, use the root Makefile:

```sh
make init
make plan
make apply
make fmt-check
```

Terraform automatically loads `terraform/terraform.tfvars` and `terraform/*.auto.tfvars`.

## Coding Style & Naming Conventions

Use TypeScript with strict settings. Prefer explicit types for Cloudflare bindings, payloads, and DOM access. Keep browser code in `src/`; generated `dist/` files are not source. Use two-space indentation in JSON/YAML and two spaces for TypeScript blocks. Keep file names lowercase with hyphens for scripts, for example `validate-app.sh`.

## Testing Guidelines

Playwright is the main test framework. E2E specs use `*.spec.mjs` under `tests/`. Tests should cover Japanese, English, and Korean guest flows when UI text or language behavior changes. Run `pnpm run validate:app` before pushing UI or function changes. Include updated screenshots only when visual output intentionally changes.

## Commit & Pull Request Guidelines

Existing history uses short imperative commits, for example `Add makefile for tf` and `Migrate js to ts`. Keep commits focused and use similar imperative wording. Pull requests should include a short summary, validation commands run, Terraform impact if any, and screenshots for visual changes.

## Security & Configuration Tips

Never commit `terraform/*.tfvars`, Terraform state, or Cloudflare/Google secrets. Store `GOOGLE_SERVICE_ACCOUNT_JSON` as a Cloudflare Pages secret. RSVP is intentionally open to anyone with the URL, so keep payload validation, raw Google Sheets writes, and security headers intact.
