import { readFile, writeFile, mkdir, rm, cp } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = path.join(root, "output");
const generated = path.join(root, ".next/server/app");
const cssManifest = path.join(generated, "zh.html");

const zhFilename = "WAGMIx_繁體中文_新版.html";
const enFilename = "WAGMIx_English_Redesign.html";

function mimeFor(file) {
  const ext = path.extname(file).toLowerCase();
  return ({ ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".woff": "font/woff", ".woff2": "font/woff2" })[ext];
}

async function dataUri(file) {
  const mime = mimeFor(file);
  if (!mime) throw new Error(`Unsupported asset type: ${file}`);
  return `data:${mime};base64,${(await readFile(file)).toString("base64")}`;
}

async function compiledCss() {
  const html = await readFile(cssManifest, "utf8");
  const cssHref = html.match(/<link rel="stylesheet" href="(\/_next\/static\/chunks\/[^\"]+\.css)"/)?.[1];
  if (!cssHref) throw new Error("Cannot find the Next.js stylesheet");
  const cssPath = path.join(root, ".next", cssHref.replace(/^\/_next\//, ""));
  let css = await readFile(cssPath, "utf8");
  const urls = [...new Set([...css.matchAll(/url\((?:["']?)(\.\.\/media\/[^)'\"]+)(?:["']?)\)/g)].map((match) => match[1]))];
  for (const url of urls) {
    const file = path.join(path.dirname(cssPath), url);
    css = css.replaceAll(`url(${url})`, `url(${await dataUri(file)})`);
  }
  return css;
}

const revealScript = `<script>
(() => {
  const items = [...document.querySelectorAll('[data-reveal]')];
  if (!items.length || !('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
  items.forEach(item => observer.observe(item));
  document.documentElement.classList.add('has-reveal');
})();
</script>`;

const css = await compiledCss();
const favicon = await dataUri(path.join(root, "app/icon.svg"));
await rm(output, { recursive: true, force: true });
await mkdir(path.join(output, "legacy"), { recursive: true });
await cp(path.join(root, "public/downloads"), path.join(output, "downloads"), { recursive: true });

for (const [locale, filename] of [["zh", zhFilename], ["en", enFilename]]) {
  let html = await readFile(path.join(generated, `${locale}.html`), "utf8");
  html = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "");
  html = html.replace(/<link\b[^>]*\/>/gi, "");
  html = html.replace(/<meta name="next-size-adjust"[^>]*\/>/gi, "");
  html = html.replace("</head>", `<link rel="icon" href="${favicon}" type="image/svg+xml"/><style>${css}</style></head>`);
  html = html.replaceAll('href="/zh"', `href="${zhFilename}"`);
  html = html.replaceAll('href="/en"', `href="${enFilename}"`);
  html = html.replaceAll('href="/legacy/', 'href="legacy/');
  const imagePaths = [...new Set([...html.matchAll(/src="(\/assets\/[^\"]+)"/g)].map((match) => match[1]))];
  for (const imagePath of imagePaths) {
    html = html.replaceAll(`src="${imagePath}"`, `src="${await dataUri(path.join(root, "public", imagePath.slice(1)))}"`);
  }
  html = html.replace("</body>", `${revealScript}</body>`);
  if (html.includes('href="/_next/') || html.includes('src="/_next/') || html.includes('src="/assets/')) {
    throw new Error(`Unresolved asset in ${filename}`);
  }
  await writeFile(path.join(output, filename), html);
}

const theme = await readFile(path.join(root, "public/legacy-theme.css"), "utf8");
for (const filename of ["WAGMIx_繁體中文_V17.html", "WAGMIx_English_V17.html"]) {
  let html = await readFile(path.join(root, "public/legacy", filename), "utf8");
  html = html.replace('<link rel="stylesheet" href="/legacy-theme.css">', `<style>${theme}</style>`);
  html = html.replace('<meta name="wagmix-download-base" content="/downloads/">', '<meta name="wagmix-download-base" content="../downloads/">');
  await writeFile(path.join(output, "legacy", filename), html);
}

await writeFile(path.join(output, "README.txt"), `Open ${zhFilename} or ${enFilename} in a browser.\nKeep the legacy/ and downloads/ folders beside the HTML files so product details and PDFs work.\n`);
const archive = "WAGMIx_新版_双语完整包.zip";
const zipped = spawnSync("zip", ["-qr", archive, zhFilename, enFilename, "legacy", "downloads", "README.txt"], { cwd: output, stdio: "inherit" });
if (zipped.error) throw zipped.error;
if (zipped.status !== 0) throw new Error(`Could not create ${archive}`);
console.log(`Wrote standalone HTML delivery to ${output}`);
