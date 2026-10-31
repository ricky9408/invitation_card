#!/bin/sh
set -eu

cd "$(dirname "$0")/.."

pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run build:pages
pnpm run test:server
pnpm run security:audit
pnpm run test:e2e

visual_port="${VISUAL_CHECK_PORT:-4174}"
PORT="$visual_port" node scripts/serve-dist.mjs >/tmp/invitation-card-visual-server.log 2>&1 &
server_pid="$!"
trap 'kill "$server_pid" >/dev/null 2>&1 || true' EXIT INT TERM

sleep 1
INVITATION_URL="http://127.0.0.1:$visual_port" pnpm run visual:check
