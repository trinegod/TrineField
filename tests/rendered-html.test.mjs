import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete Trine business portal", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Trine — Cross-Border Product, Market &amp; Creative Operations \| Steven Adkins<\/title>/i);
  assert.match(html, /Three regions\. One clear operating point\./);
  assert.match(html, /Created and operated by Steven Adkins/);
  assert.match(html, /Professional profile/);
  assert.match(html, /China ↔ United States ↔ Latin America/);
  assert.match(html, /Tell me what you’re building\./);
  assert.match(html, /Stevenadkins917@gmail\.com/);
  assert.match(html, /@tr1negod/);
  assert.match(html, /wxid_1d9o3v999oi712/);
  assert.match(html, /wechat-steven-adkins\.jpg/);
  assert.match(html, /Steven résumé/);
  assert.match(html, /ONE OPERATING POINT/);
  assert.doesNotMatch(html, /120°/);
  assert.match(html, /简体中文/);
  assert.match(html, /og\.png/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("server-renders the printable introduction route", async () => {
  const response = await render("/introduction");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /A concise cross-border collaboration profile/);
  assert.match(html, /Print \/ Save as PDF/);
  assert.match(html, /Potential collaboration/);
  assert.match(html, /Sectors of interest/);
});

test("server-renders Steven Adkins's translated resume route", async () => {
  const response = await render("/resume");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Steven Adkins/);
  assert.match(html, /Professional Summary/);
  assert.match(html, /Neura Health/);
  assert.match(html, /Selected Product &amp; AI Projects/);
  assert.match(html, /steven-adkins-master-resume\.pdf/);
  assert.match(html, /Open original PDF/);
});

test("keeps all three language dictionaries complete and editable", async () => {
  const [english, spanish, chinese, resume, page, packageJson, resumePdf] = await Promise.all([
    readFile(new URL("../src/content/translations/en.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/content/translations/es.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/content/translations/zh-CN.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/content/resume.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../public/steven-adkins-master-resume.pdf", import.meta.url)),
  ]);

  assert.match(english, /Cross-Border Product, Market & Creative Operations/);
  assert.match(spanish, /Operaciones Internacionales de Producto, Mercado y Creatividad/);
  assert.match(chinese, /跨境产品、市场与创意运营/);
  assert.match(chinese, /提交本表单不会建立正式的商业/);
  assert.match(resume, /Currículum profesional|Currículum maestro/);
  assert.match(resume, /职业概述/);
  assert.match(page, /copy\.form\.fields/);
  assert.equal(resumePdf.subarray(0, 4).toString(), "%PDF");
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
