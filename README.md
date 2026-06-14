# Wedding Invitation Prototype

Japanese-first static wedding invitation prototype inspired by the referenced BRAPLA design.

## Toolchain

This repository is managed with pnpm only.

```sh
pnpm install --frozen-lockfile
```

The editable browser source is `src/app.ts`. Cloudflare Pages assets are generated into `dist/`.

## Local Preview

Build and serve the compiled Pages output:

```sh
pnpm run build:pages
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Then open `http://127.0.0.1:4173`.

## TypeScript

```sh
pnpm run typecheck
pnpm run build:pages
```

## Visual Check

With the local server running:

```sh
pnpm run visual:check
```

Screenshots are written to `tests/artifacts/`.

## E2E Tests

```sh
pnpm run test:e2e
```

The e2e suite covers Japanese, English, and Korean guest flows on desktop and mobile.

## Deployment

This site is designed for Cloudflare Pages with a Pages Function at `/api/rsvp`.

Recommended domain:

```text
wedding.sanghyuk-lee.com
```

Terraform setup is in `terraform/`. See [terraform/README.md](terraform/README.md).

Build Pages assets:

```sh
pnpm run build:pages
```

Deploy assets manually after Terraform creates the Pages project:

```sh
pnpm run deploy:cloudflare
```

RSVP responses are appended to Google Sheets through the Cloudflare Pages Function in `functions/api/rsvp.ts`. The Google service account JSON must be stored as the Cloudflare Pages secret `GOOGLE_SERVICE_ACCOUNT_JSON`.

## Agent Validation

AI agents and humans should use the same validation scripts:

```sh
pnpm run validate:app
pnpm run validate:terraform
pnpm run validate
```

Lefthook is configured in `lefthook.yml` to run TypeScript/build/Terraform format checks before commit and the full validation before push.

## Replace Before Production

- Replace `assets/wedding-placeholder.jpg` with real couple photos.
- Replace `PARTNER` and `お名前を入力`.
- Replace venue, date, time, and map URL.
