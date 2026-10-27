import { createReadStream, existsSync, realpathSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, isAbsolute, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = resolve(fileURLToPath(new URL("../dist/", import.meta.url)));
const host = process.env.HOST ?? "127.0.0.1";
const port = Number(process.env.PORT ?? "4173");

const mimeTypes = {
  ".css": "text/css; charset=utf-8",
  ".gif": "image/gif",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".map": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".JPG": "image/jpeg",
};

if (!existsSync(rootDir)) {
  console.error(`Missing dist/ directory at ${rootDir}. Run: pnpm run build:pages`);
  process.exit(1);
}

const realRootDir = realpathSync(rootDir);

function containedPath(root, candidate) {
  const pathFromRoot = relative(root, candidate);
  if (isAbsolute(pathFromRoot) || pathFromRoot === ".." || pathFromRoot.startsWith(".." + sep)) {
    return null;
  }
  return candidate;
}

function resolveRequestPath(urlPath) {
  try {
    const decoded = decodeURIComponent((urlPath ?? "/").split("?")[0] ?? "/");
    const relativePath = decoded === "/" ? "index.html" : decoded.replace(/^\/+/, "");
    const candidate = containedPath(rootDir, resolve(rootDir, relativePath));

    if (!candidate) return null;

    let filePath = containedPath(realRootDir, realpathSync(candidate));
    let typePath = candidate;
    if (!filePath) return null;
    let info = statSync(filePath);
    if (info.isDirectory()) {
      typePath = join(candidate, "index.html");
      filePath = containedPath(realRootDir, realpathSync(join(filePath, "index.html")));
      if (!filePath) return null;
      info = statSync(filePath);
    }

    return info.isFile() ? { filePath, typePath } : null;
  } catch {
    return null;
  }
}

const server = createServer((request, response) => {
  const target = resolveRequestPath(request.url);

  if (!target) {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  const contentType = mimeTypes[extname(target.typePath).toLowerCase()] ?? "application/octet-stream";
  response.writeHead(200, { "Content-Type": contentType });
  const stream = createReadStream(target.filePath);
  stream.on("error", () => response.destroy());
  response.on("close", () => stream.destroy());
  stream.pipe(response);
});

server.listen(port, host, () => {
  console.log(`Serving dist/ at http://${host}:${port}`);
});
