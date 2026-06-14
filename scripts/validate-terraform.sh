#!/bin/sh
set -eu

cd "$(dirname "$0")/.."

terraform -chdir=terraform fmt -check -recursive
terraform -chdir=terraform init -upgrade
terraform -chdir=terraform validate
terraform -chdir=terraform plan -out=tfplan
