# Cloudflare Terraform Deployment

This Terraform configuration manages:

- Cloudflare Pages project
- Custom Pages domain
- Cloudflare DNS record for the invitation subdomain
- Non-secret Google Sheets environment variables

It intentionally does **not** store `GOOGLE_SERVICE_ACCOUNT_JSON` in Terraform state. Put that value into Cloudflare Pages as a secret.

## Google Sheet

Create a spreadsheet with a sheet named `RSVP` and this first row:

```text
timestamp | language | attendance | name | message
```

Create a Google Cloud service account, enable the Google Sheets API, and share the spreadsheet with the service account email as an editor.

## Terraform

Create `terraform.tfvars` locally:

```hcl
cloudflare_api_token  = "..."
cloudflare_account_id = "..."
cloudflare_zone_id    = "..."
google_sheet_id       = "..."

zone_name = "sanghyuk-lee.com"
subdomain = "wedding"

# Optional: make terraform apply also run npm run deploy:pages.
deploy_assets_with_terraform = false
```

Then run:

```sh
terraform init -upgrade
terraform plan
terraform apply
```

## Pages Secret

After the Pages project exists, add the Google service account JSON as a Pages secret:

```sh
pnpm exec wrangler pages secret put GOOGLE_SERVICE_ACCOUNT_JSON --project-name wedding-invitation
```

Paste the full service account JSON when prompted.

## Deploy Assets

Build the static assets:

```sh
pnpm run build:pages
```

Deploy with Wrangler or connect the repository to Cloudflare Pages:

```sh
pnpm exec wrangler pages deploy dist --project-name wedding-invitation
```

If you set `deploy_assets_with_terraform = true`, `terraform apply` runs the deploy command through `local-exec` after the Pages project and domain exist. Keep it `false` if you prefer Git-connected Pages or a separate CI deployment step.
