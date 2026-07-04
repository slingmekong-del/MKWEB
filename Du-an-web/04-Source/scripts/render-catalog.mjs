// One-off: render page 1 of each product PDF in public/catalogs to a PNG of the same name.
// Usage: node scripts/render-catalog.mjs
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createCanvas } from "@napi-rs/canvas";
import * as pdfjs from "pdfjs-dist/legacy/build/pdf.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dir = path.join(root, "public", "catalogs");
const SCALE = 2;

const files = (await readdir(dir)).filter((f) => f.toLowerCase().endsWith(".pdf"));
if (files.length === 0) {
  console.log("No PDF files found in", dir);
  process.exit(0);
}

for (const file of files) {
  const pdfPath = path.join(dir, file);
  const data = new Uint8Array(await readFile(pdfPath));
  const loadingTask = pdfjs.getDocument({ data, disableFontFace: false });
  const doc = await loadingTask.promise;
  const page = await doc.getPage(1);
  const viewport = page.getViewport({ scale: SCALE });

  const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
  const context = canvas.getContext("2d");
  // white background (PDFs are transparent)
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, canvas.width, canvas.height);

  await page.render({ canvasContext: context, viewport, canvas }).promise;

  const out = path.join(dir, file.replace(/\.pdf$/i, ".png"));
  await writeFile(out, canvas.toBuffer("image/png"));
  console.log(`✓ ${file} -> ${path.basename(out)}  (${canvas.width}x${canvas.height})`);
  await loadingTask.destroy();
}
