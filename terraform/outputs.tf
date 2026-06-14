output "pages_project_name" {
  value = cloudflare_pages_project.invitation.name
}

output "pages_default_domain" {
  value = "${cloudflare_pages_project.invitation.name}.pages.dev"
}

output "invitation_domain" {
  value = local.invitation_domain
}
