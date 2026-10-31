import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { cp, mkdir, mkdtemp, rm, symlink, writeFile } from "node:fs/promises";
import { request as httpRequest } from "node:http";
import { createServer } from "node:net";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";

const source = fileURLToPath(new URL("../scripts/serve-dist.mjs", import.meta.url));

async function fixture(t, linkedRoot = false) {
  const root = await mkdtemp(join(tmpdir(), "invitation-preview-"));
  let child;
  let reservation;
  t.after(async () => {
    try {
      if (reservation?.listening) {
        await new Promise((resolve, reject) => reservation.close(error => error ? reject(error) : resolve()));
      }
      if (child && child.exitCode === null && child.signalCode === null) {
        child.kill("SIGTERM");
        await once(child, "exit");
      }
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  });
  await mkdir(join(root, "scripts"));
  await cp(source, join(root, "scripts/serve-dist.mjs"));
  const dist = join(root, linkedRoot ? "output" : "dist");
  await mkdir(dist);
  if (linkedRoot) await symlink(dist, join(root, "dist"), "dir");
  await mkdir(join(dist, "nested"));
  await mkdir(join(dist, "ordinary"));
  await mkdir(join(root, "outside"));
  await mkdir(join(root, "dist-sibling"));
  await writeFile(join(dist, "index.html"), "inside root");
  await writeFile(join(dist, "ordinary/index.html"), "inside directory");
  await writeFile(join(dist, "styles.css"), "body { color: teal; }");
  await writeFile(join(dist, "photo.JPG"), "inside image");
  await writeFile(join(dist, "literal%name.txt"), "inside encoded name");
  await writeFile(join(dist, "image-data.txt"), "<svg></svg>");
  await writeFile(join(root, "outside.txt"), "outside file");
  await writeFile(join(root, "outside/index.html"), "outside directory");
  await writeFile(join(root, "dist-sibling/outside.txt"), "outside sibling");
  await symlink(join(root, "outside.txt"), join(dist, "leak.txt"));
  await symlink(join(root, "outside"), join(dist, "escape-dir"), "dir");
  await symlink(join(root, "outside.txt"), join(dist, "nested/index.html"));
  await symlink(join(dist, "styles.css"), join(dist, "alias.css"));
  await symlink(join(dist, "image-data.txt"), join(dist, "picture.svg"));

  reservation = createServer();
  reservation.listen(0, "127.0.0.1");
  await once(reservation, "listening");
  const { port } = reservation.address();
  await new Promise((resolve, reject) => reservation.close(error => error ? reject(error) : resolve()));
  child = spawn(process.execPath, [join(root, "scripts/serve-dist.mjs")], {
    env: { ...process.env, HOST: "127.0.0.1", PORT: String(port) },
    stdio: ["ignore", "pipe", "pipe"],
  });
  let stderr = "";
  child.stderr.on("data", bytes => { stderr += bytes; });
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error(`Preview startup timed out: ${stderr}`)), 5000);
    child.once("error", error => { clearTimeout(timeout); reject(error); });
    child.once("exit", code => { clearTimeout(timeout); reject(new Error(`Preview exited ${code}: ${stderr}`)); });
    child.stdout.on("data", bytes => {
      if (bytes.toString().includes("Serving dist/")) { clearTimeout(timeout); resolve(); }
    });
  });
  return path => new Promise((resolve, reject) => {
    const request = httpRequest({ hostname: "127.0.0.1", port, path }, response => {
      let body = "";
      response.setEncoding("utf8");
      response.on("data", bytes => { body += bytes; });
      response.on("end", () => resolve({ status: response.statusCode, headers: response.headers, body }));
    });
    request.on("error", error => reject(new Error(`${error.message}; preview stderr: ${stderr}`)));
    request.end();
  });
}

test("serves root, query-bearing assets, encoded names and in-root links", async t => {
  const get = await fixture(t);
  assert.equal((await get("/")).body, "inside root");
  assert.equal((await get("/styles.css?v=1")).body, "body { color: teal; }");
  assert.equal((await get("/ordinary/?v=1")).body, "inside directory");
  assert.equal((await get("/literal%25name.txt")).body, "inside encoded name");
  assert.equal((await get("/alias.css")).status, 200);
  assert.match((await get("/photo.JPG")).headers["content-type"], /^image\/jpeg/);
  assert.match((await get("/picture.svg")).headers["content-type"], /^image\/svg\+xml/);
  assert.equal((await get("/missing.txt")).status, 404);
});

test("rejects direct, encoded and prefix-sibling traversal", async t => {
  const get = await fixture(t);
  for (const path of ["/../outside.txt", "/%2e%2e%2foutside.txt", "/../dist-sibling/outside.txt", "/%252e%252e%252foutside.txt", "/%00"]) {
    assert.equal((await get(path)).status, 404, path);
  }
});

for (const path of ["/%", "/%E0%A4%A"]) {
  test(`rejects malformed encoding without stopping preview: ${path}`, async t => {
    const get = await fixture(t);
    assert.equal((await get(path)).status, 404);
    assert.equal((await get("/")).status, 200);
  });
}

for (const path of ["/leak.txt", "/escape-dir/", "/nested/"]) {
  test(`rejects an outward symlink at the final target: ${path}`, async t => {
    const get = await fixture(t);
    assert.equal((await get(path)).status, 404);
    assert.equal((await get("/")).body, "inside root");
  });
}

test("supports a symlinked dist root while enforcing its real boundary", async t => {
  const get = await fixture(t, true);
  assert.equal((await get("/")).body, "inside root");
  assert.equal((await get("/alias.css")).status, 200);
  assert.equal((await get("/leak.txt")).status, 404);
});
