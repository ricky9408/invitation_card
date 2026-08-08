locals {
  invitation_domain = var.subdomain == "" ? var.zone_name : "${var.subdomain}.${var.zone_name}"
  deploy_hash = sha256(join("", [
    filesha256("${path.module}/../index.html"),
    filesha256("${path.module}/../styles.css"),
    filesha256("${path.module}/../_headers"),
    filesha256("${path.module}/../src/app.ts"),
    filesha256("${path.module}/../assets/autumn-yellow.JPG"),
    filesha256("${path.module}/../assets/autumn-seating.JPG"),
    filesha256("${path.module}/../assets/beach-hang.JPG"),
    filesha256("${path.module}/../assets/beach-walking.JPG"),
    filesha256("${path.module}/../assets/beach-black.JPG"),
    filesha256("${path.module}/../assets/pinkwall-kiss.JPG"),
    filesha256("${path.module}/../assets/Sanghyuk_wedding.jpg"),
    filesha256("${path.module}/../assets/Miyuki_wedding.jpg"),
    filesha256("${path.module}/../scripts/build-pages.mjs"),
    filesha256("${path.module}/../tsconfig.json"),
    filesha256("${path.module}/../tsconfig.app.json"),
    filesha256("${path.module}/../package.json"),
    filesha256("${path.module}/../pnpm-lock.yaml"),
  ]))
}
