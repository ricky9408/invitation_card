#!/bin/sh
set -eu

cd "$(dirname "$0")/.."

project_name="${PAGES_PROJECT_NAME:-wedding-invitation}"

pnpm run validate:app
pnpm run build:pages
pnpm exec wrangler pages deploy dist --project-name "$project_name"
