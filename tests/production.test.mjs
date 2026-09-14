// Run after `yarn build`: node --test tests/production.test.mjs
import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import test from "node:test";

const read = path => readFile(new URL(`../.next/${path}`, import.meta.url), "utf8");
const manifest = JSON.parse(await read("prerender-manifest.json"));
const home = await read("server/pages/index.html");
const { pageProps } = JSON.parse(await read("server/pages/index.json"));
const escape = value => String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#x27;" }[character]));
const meta = (html, name) => html.match(new RegExp(`<meta (?:name|property)="${name}" content="([^"]*)"`))?.[1];

test("published homepage and project routes regenerate, including new project URLs", () => {
  assert.equal(manifest.routes["/"].initialRevalidateSeconds, 60);
  for (const project of pageProps.projects) {
    assert.equal(manifest.routes[`/projects/${project._id}`].initialRevalidateSeconds, 60);
  }
  assert.equal(manifest.dynamicRoutes["/projects/[id]"].fallback, null, "null denotes blocking fallback");
});

test("home metadata and contact links use the published profile", () => {
  assert.ok(meta(home, "description"));
  assert.ok(meta(home, "og:title").includes(escape(pageProps.pageInfo.name)));
  if (pageProps.pageInfo.socialImage || pageProps.pageInfo.heroImage || pageProps.pageInfo.profilePic) {
    assert.match(meta(home, "og:image"), /^https:\/\/cdn\.sanity\.io\//);
    assert.equal(meta(home, "twitter:card"), "summary_large_image");
  }
  if (pageProps.pageInfo.email?.trim()) {
    assert.ok(home.includes(`href="mailto:${encodeURIComponent(pageProps.pageInfo.email.trim())}"`));
  }
  if (pageProps.pageInfo.phoneNumber) {
    assert.ok(home.includes(`href="tel:${pageProps.pageInfo.phoneNumber.replace(/[^+\d]/g, "")}"`));
  }
});

test("project URLs return their own metadata in server-rendered HTML", async () => {
  for (const project of pageProps.projects) {
    const html = await read(`server/pages/projects/${project._id}.html`);
    assert.equal(meta(html, "og:title"), escape(`${project.title} | ${pageProps.pageInfo.name}`));
    const expected = (project.summary?.trim() || `Explore ${project.title}, a project by ${pageProps.pageInfo.name}, including its technologies and live demo.`).replace(/\s+/g, " ").trim().slice(0, 160);
    assert.equal(meta(html, "description"), escape(expected));
    assert.equal(meta(html, "twitter:description"), escape(expected));
    if (project.image?.asset) assert.match(meta(html, "og:image"), /w=1200&amp;h=630/);
  }
});

test("accessible labels, descriptive images and a static greeting are present before hydration", () => {
  assert.match(home, /<html lang="en"/);
  assert.ok(home.includes('href="#main-content"'));
  assert.match(home, /<h1[^>]*><span class="">Hi, my name is /);
  for (const image of home.matchAll(/<img\b[^>]*>/g)) assert.match(image[0], /alt="[^"]+"/);
  if (pageProps.pageInfo.email?.trim()) {
    for (const field of ["name", "email", "subject", "message"]) {
      assert.ok(home.includes(`for="contact-${field}"`));
      assert.ok(home.includes(`id="contact-${field}"`));
    }
    assert.ok(home.includes('type="email"'));
  }
});
