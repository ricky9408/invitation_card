#!/bin/sh
set -eu

cd "$(dirname "$0")/.."

sh scripts/validate-app.sh
sh scripts/validate-terraform.sh
