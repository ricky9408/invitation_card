# Cloudflare Terraform Deployment

This Terraform configuration manages:

- Cloudflare Pages project
- Custom Pages domain
- Cloudflare DNS record for the invitation subdomain

RSVP is handled by a Google Form link in the static site. Terraform does not manage Google credentials or Sheets integration.

## Terraform

Create `terraform.tfvars` locally:

```hcl
cloudflare_api_token  = "..."
cloudflare_account_id = "..."
cloudflare_zone_id    = "..."

zone_name = "sanghyuk-lee.com"
subdomain = "wedding"

# Optional: make terraform apply also run pnpm run deploy:cloudflare.
deploy_assets_with_terraform = false
```

Then run:

```sh
make init
make plan
make apply
```

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
