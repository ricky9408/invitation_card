resource "cloudflare_pages_project" "invitation" {
  account_id        = var.cloudflare_account_id
  name              = var.pages_project_name
  production_branch = var.production_branch

  build_config = {
    build_command   = "pnpm run build:pages"
    destination_dir = "dist"
    root_dir        = ""
  }

  deployment_configs = {
    production = {
      compatibility_date = "2026-06-14"
      env_vars = {
        GOOGLE_SHEET_ID = {
          type  = "plain_text"
          value = var.google_sheet_id
        }
        GOOGLE_SHEET_RANGE = {
          type  = "plain_text"
          value = var.google_sheet_range
        }
      }
    }

    preview = {
      compatibility_date = "2026-06-14"
      env_vars = {
        GOOGLE_SHEET_ID = {
          type  = "plain_text"
          value = var.google_sheet_id
        }
        GOOGLE_SHEET_RANGE = {
          type  = "plain_text"
          value = var.google_sheet_range
        }
      }
    }
  }
}

resource "cloudflare_pages_domain" "invitation" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.invitation.name
  name         = local.invitation_domain
}

resource "cloudflare_dns_record" "invitation" {
  zone_id = var.cloudflare_zone_id
  name    = var.subdomain == "" ? "@" : var.subdomain
  type    = "CNAME"
  content = "${cloudflare_pages_project.invitation.name}.pages.dev"
  ttl     = 1
  proxied = true
}

resource "terraform_data" "pages_deploy" {
  count = var.deploy_assets_with_terraform ? 1 : 0

  triggers_replace = {
    deploy_hash = local.deploy_hash
    project     = cloudflare_pages_project.invitation.name
  }

  provisioner "local-exec" {
    working_dir = "${path.module}/.."
    command     = "pnpm run deploy:cloudflare"

    environment = {
      CLOUDFLARE_API_TOKEN = var.cloudflare_api_token
    }
  }

  depends_on = [
    cloudflare_pages_domain.invitation,
    cloudflare_dns_record.invitation,
  ]
}
