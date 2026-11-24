// main.ts — Fortune Cookie Wisdom for Developers (make.fun bounty entry).
//
// Reads the entry's one fortune-cookie line from fortune.txt (committed next
// to this file) and writes it, trimmed, to <output>/entry.txt, where the
// grader's sealed scorer checks it and the judge reads it. Node 22, stdlib
// only: no dependencies, no network, no secrets.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const line = readFileSync(join(here, "fortune.txt"), "utf8").trim();

// The gate accepts 1 to 120 characters of UTF-8 text, not only whitespace.
// Refuse loudly instead of writing an entry the scorer would mark invalid.
if (line.length < 1 || line.length > 120) {
  console.error(`fortune line must be 1-120 characters, got ${line.length}`);
  process.exit(1);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line, "utf8");
console.log(`wrote ${line.length} characters to ${outPath}`);
console.log(line);
