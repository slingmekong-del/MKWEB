// Aggregates the per-product source files in content/products/*.json into the
// single src/data/products.json bundle that src/lib/products.ts imports.
// Runs automatically via the "predev" / "prebuild" npm hooks, so the CMS only
// ever edits the individual content/ files and the app always sees a fresh bundle.
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, "content", "products");
const outFile = join(root, "src", "data", "products.json");

// Category id → label, so each product only needs to store `categoryId` (picked
// in the CMS) and we derive the display label / legacy `category` field here.
const catData = JSON.parse(await readFile(join(root, "content", "categories.json"), "utf8"));
const catLabel = new Map(catData.categories.map((c) => [c.id, c.label]));

const files = (await readdir(srcDir)).filter((f) => f.endsWith(".json"));
const products = [];
for (const f of files) {
  const data = JSON.parse(await readFile(join(srcDir, f), "utf8"));
  const label = catLabel.get(data.categoryId);
  if (label) {
    data.categoryLabel = label;
    data.category = label;
  }
  // The CMS omits empty array fields when it creates a product, but the app code
  // (search indexing in lib/products, gallery/specs in [slug]/page) assumes these
  // always exist. Default them so a brand-new SKU can never crash the build.
  data.standards ??= [];
  data.syn ??= [];
  data.images ??= [];
  data.catalogImages ??= [];
  data.specs ??= [];
  data.pdf ??= null;
  data.featured ??= false;
  data.rank ??= 99;
  products.push(data);
}

// Catalogue order: by `no`, ties broken by `rank` then name.
products.sort(
  (a, b) =>
    (a.no ?? 9999) - (b.no ?? 9999) ||
    (a.rank ?? 9999) - (b.rank ?? 9999) ||
    String(a.name).localeCompare(String(b.name))
);

await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, JSON.stringify(products, null, 2) + "\n", "utf8");
console.log(`build-content: ${products.length} products → src/data/products.json`);
