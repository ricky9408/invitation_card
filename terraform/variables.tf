variable "cloudflare_api_token" {
  description = "Cloudflare API token with permissions for Pages, DNS, and zone reads."
  type        = string
  sensitive   = true
}

variable "cloudflare_account_id" {
  description = "Cloudflare account ID."
  type        = string
}

variable "cloudflare_zone_id" {
  description = "Cloudflare zone ID for sanghyuk-lee.com."
  type        = string
}

variable "zone_name" {
  description = "Root domain managed in Cloudflare."
  type        = string
  default     = "sanghyuk-lee.com"
}

variable "subdomain" {
  description = "Invitation subdomain. Use an empty string for the zone apex."
  type        = string
  default     = "wedding"
}

variable "pages_project_name" {
  description = "Cloudflare Pages project name."
  type        = string
  default     = "wedding-invitation"
}

variable "production_branch" {
  description = "Production branch for Git-connected Cloudflare Pages deployments."
  type        = string
  default     = "main"
}

variable "deploy_assets_with_terraform" {
  description = "When true, terraform apply also runs pnpm run deploy:cloudflare via local-exec after creating Cloudflare resources."
  type        = bool
  default     = false
}
