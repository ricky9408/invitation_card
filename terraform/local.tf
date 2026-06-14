locals {
  invitation_domain = var.subdomain == "" ? var.zone_name : "${var.subdomain}.${var.zone_name}"
  deploy_hash = sha256(join("", [
    filesha256("${path.module}/../index.html"),
    filesha256("${path.module}/../styles.css"),
    filesha256("${path.module}/../_headers"),
    filesha256("${path.module}/../src/app.ts"),
    filesha256("${path.module}/../assets/wedding-placeholder.jpg"),
    filesha256("${path.module}/../functions/api/rsvp.ts"),
    filesha256("${path.module}/../scripts/build-pages.mjs"),
    filesha256("${path.module}/../tsconfig.json"),
    filesha256("${path.module}/../tsconfig.app.json"),
    filesha256("${path.module}/../tsconfig.functions.json"),
    filesha256("${path.module}/../package.json"),
    filesha256("${path.module}/../pnpm-lock.yaml"),
  ]))
}
