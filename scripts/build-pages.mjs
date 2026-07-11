import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { build } from "esbuild";

const files = ["index.html", "styles.css", "_headers", "assets"];
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

const distIndex = new URL("../dist/index.html", import.meta.url);
const html = await readFile(distIndex, "utf8");
await writeFile(
  distIndex,
  html.replace('src="/src/app.ts"', 'src="app.js"'),
  "utf8",
);

console.log("Cloudflare Pages assets written to dist/.");
