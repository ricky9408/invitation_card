import { createHash } from "node:crypto";
import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { build } from "esbuild";

const files = ["index.html", "styles.css", "_headers", "assets", "favicon.svg"];
const outDir = new URL("../dist/", import.meta.url);

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });

await build({
  entryPoints: [new URL("../src/app.ts", import.meta.url).pathname],
  outfile: new URL("../dist/app.js", import.meta.url).pathname,
  bundle: true,
  format: "esm",
  target: "es2024",
  minify: true,
  sourcemap: false,
});

for (const file of files) {
  await cp(new URL(`../${file}`, import.meta.url), new URL(`../dist/${file}`, import.meta.url), {
    recursive: true,
  });
}

function shortHash(content) {
  return createHash("sha256").update(content).digest("hex").slice(0, 10);
}

const distIndex = new URL("../dist/index.html", import.meta.url);
const distCss = new URL("../dist/styles.css", import.meta.url);
const distJs = new URL("../dist/app.js", import.meta.url);

const [html, css, js] = await Promise.all([
  readFile(distIndex, "utf8"),
  readFile(distCss),
  readFile(distJs),
]);

const cssV = shortHash(css);
const jsV = shortHash(js);

const updatedHtml = html
  .replace(
    /href="styles\.css(?:\?[^"]*)?"/,
    `href="styles.css?v=${cssV}"`,
  )
  .replace(
    /src="\/src\/app\.ts(?:\?[^"]*)?"/,
    `src="app.js?v=${jsV}"`,
  );

await writeFile(distIndex, updatedHtml, "utf8");

console.log(
  `Cloudflare Pages assets written to dist/ (styles.css?v=${cssV}, app.js?v=${jsV}).`,
);
