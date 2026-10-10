import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const source = fs.readFileSync(new URL("../lib/analytics-bootstrap.ts", import.meta.url), "utf8");
const module = { exports: {} };
vm.runInNewContext(ts.transpile(source, { module: ts.ModuleKind.CommonJS }), { exports: module.exports });
const { ga4Bootstrap } = module.exports;

for (const [stored, permission] of [
  [null, "denied"],
  ["declined", "denied"],
  ["invalid-json", "denied"],
  ['{"accepted":false}', "denied"],
  ["accepted", "granted"],
  ['{"accepted":true,"version":"1"}', "granted"],
]) {
  const window = { location: { pathname: "/fr" } };
  vm.runInNewContext(ga4Bootstrap("G-TEST", "d1gegp-cw.myshopify.com"), {
    window,
    localStorage: { getItem: () => stored },
  });
  const calls = Array.from(window.dataLayer, (args) => Array.from(args));
  assert.equal(calls[0][0], "consent");
  assert.equal(calls[0][1], "default");
  assert.equal(calls[0][2].analytics_storage, permission);
  assert.equal(calls[2][0], "config");
  assert.equal(calls[2][2].page_path, "/fr");
  assert.ok(calls[2][2].linker.domains.includes("checkout.whiskcam.com"));
}

const blockedStorageWindow = { location: { pathname: "/" } };
vm.runInNewContext(ga4Bootstrap("G-TEST"), {
  window: blockedStorageWindow,
  localStorage: { getItem: () => { throw new Error("Storage blocked"); } },
});
assert.equal(blockedStorageWindow.dataLayer[0][2].analytics_storage, "denied");
assert.equal(blockedStorageWindow.dataLayer[2][0], "config");
console.log("Analytics consent: 7 initialization scenarios passed; no network or production events sent.");
