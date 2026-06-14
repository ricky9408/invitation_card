# Wedding Invitation Prototype

Japanese-first static wedding invitation prototype inspired by the referenced BRAPLA design.

## Local Preview

Open `index.html` directly, or run:

```sh
python3 -m http.server 4173
```

Then open `http://localhost:4173`.

## Visual Check

With the local server running:

```sh
npm run visual:check
```

Screenshots are written to `tests/artifacts/`.

## E2E Tests

```sh
npm run test:e2e
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
npm run build:pages
```

Deploy assets manually after Terraform creates the Pages project:

```sh
npm run deploy:pages
```

RSVP responses are appended to Google Sheets through the Cloudflare Pages Function in `functions/api/rsvp.js`. The Google service account JSON must be stored as the Cloudflare Pages secret `GOOGLE_SERVICE_ACCOUNT_JSON`.

## Replace Before Production

- Replace `assets/wedding-placeholder.jpg` with real couple photos.
- Replace `PARTNER` and `お名前を入力`.
- Replace venue, date, time, map URL, and RSVP backend.
- Add complete Korean and English copy after Japanese content is approved.
