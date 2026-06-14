locals {
  invitation_domain = var.subdomain == "" ? var.zone_name : "${var.subdomain}.${var.zone_name}"
  deploy_hash = sha256(join("", [
    filesha256("${path.module}/../index.html"),
    filesha256("${path.module}/../styles.css"),
    filesha256("${path.module}/../app.js"),
    filesha256("${path.module}/../assets/wedding-placeholder.jpg"),
    filesha256("${path.module}/../functions/api/rsvp.js"),
    filesha256("${path.module}/../scripts/build-pages.mjs"),
    filesha256("${path.module}/../package.json"),
  ]))
}
