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

test("server-renders the complete Trine professional portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Trine — Product, AI, Operations, UX &amp; Creative Work \| Steven Adkins<\/title>/i);
  assert.match(html, /Ideas into useful experiences\./);
  assert.match(html, /Created and operated by Steven Adkins/);
  assert.match(html, /Professional profile/);
  assert.match(html, /Product ↔ Experience ↔ Execution/);
  assert.match(html, /Move · focus · swipe/);
  assert.match(html, /Working agreement/);
  assert.match(html, /Tell me what you’re building\./);
  assert.match(html, /Stevenadkins917@gmail\.com/);
  assert.match(html, /@tr1negod/);
  assert.match(html, /wxid_1d9o3v999oi712/);
  assert.match(html, /wechat-steven-adkins\.jpg/);
  assert.match(html, /https:\/\/github\.com\/trinegod/);
  assert.match(html, /https:\/\/wa\.me\/19162875897/);
  assert.match(html, /https:\/\/nodeine\.vercel\.app/);
  assert.match(html, /NODEINE — Live Project/);
  assert.match(html, /Steven’s résumé/);
  assert.match(html, /ONE CLEAR POINT/);
  assert.doesNotMatch(html, /120°/);
  assert.match(html, /简体中文/);
  assert.match(html, /og-trinefield-v7\.png/);
  assert.doesNotMatch(html, /China-based|Shenzhen|Latin America|cross-border|Three regions/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("server-renders the printable introduction route", async () => {
  const response = await render("/introduction");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Product, AI, operations, CX, UX\/content &amp; creative work/);
  assert.match(html, /Print \/ Save as PDF/);
  assert.match(html, /Potential collaboration/);
  assert.match(html, /Specialties/);
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
  const [english, spanish, chinese, resume, page, cinematicStage, packageJson, resumePdf] = await Promise.all([
    readFile(new URL("../src/content/translations/en.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/content/translations/es.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/content/translations/zh-CN.ts", import.meta.url), "utf8"),
    readFile(new URL("../src/content/resume.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../src/components/CinematicStage.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../public/steven-adkins-master-resume.pdf", import.meta.url)),
  ]);

  assert.match(english, /Product, AI, Operations, UX & Creative Work/);
  assert.match(spanish, /Producto, IA, Operaciones, UX y Creatividad/);
  assert.match(chinese, /产品、AI、运营、UX 与创意工作/);
  assert.match(chinese, /提交本表单不会建立正式的雇佣/);
  assert.match(resume, /Currículum profesional|Currículum maestro/);
  assert.match(resume, /职业概述/);
  assert.match(page, /copy\.form\.fields/);
  assert.match(page, /unoptimized/);
  assert.match(cinematicStage, /trine-environment\.webp/);
  assert.match(cinematicStage, /prefers-reduced-motion/);
  assert.match(cinematicStage, /ScrollTrigger/);
  assert.match(cinematicStage, /getContext\("webgl2"/);
  assert.match(cinematicStage, /WebGLBoundary/);
  assert.match(cinematicStage, /rendererMode === "webgl"/);
  assert.match(cinematicStage, /octahedronGeometry args=\{\[0\.25, 0\]\}/);
  assert.match(cinematicStage, /dpr=\{1\}/);
  assert.match(cinematicStage, /faceOnYaw/);
  assert.equal(resumePdf.subarray(0, 4).toString(), "%PDF");
  assert.match(packageJson, /@react-three\/fiber/);
  assert.match(packageJson, /"three"/);
  assert.match(packageJson, /"gsap"/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
});
