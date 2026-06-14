resource "cloudflare_pages_project" "invitation" {
  account_id        = var.cloudflare_account_id
  name              = var.pages_project_name
  production_branch = var.production_branch

  build_config {
    build_command   = "npm run build:pages"
    destination_dir = "dist"
    root_dir        = ""
  }

  deployment_configs {
    production {
      environment_variables = {
        GOOGLE_SHEET_ID    = var.google_sheet_id
        GOOGLE_SHEET_RANGE = var.google_sheet_range
      }
    }

    preview {
      environment_variables = {
        GOOGLE_SHEET_ID    = var.google_sheet_id
        GOOGLE_SHEET_RANGE = var.google_sheet_range
      }
    }
  }
}

resource "cloudflare_pages_domain" "invitation" {
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.invitation.name
  domain       = local.invitation_domain
}

resource "cloudflare_record" "invitation" {
  zone_id = var.cloudflare_zone_id
  name    = var.subdomain == "" ? "@" : var.subdomain
  type    = "CNAME"
  value   = "${cloudflare_pages_project.invitation.name}.pages.dev"
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
    command     = "npm run deploy:pages"

    environment = {
      CLOUDFLARE_API_TOKEN = var.cloudflare_api_token
    }
  }

  depends_on = [
    cloudflare_pages_domain.invitation,
    cloudflare_record.invitation,
  ]
}
