// Writes redirects-map.csv from redirects.mjs. Run: npm run redirects:csv
import fs from "node:fs";
import { redirectRules } from "../redirects.mjs";

const q = (v) => `"${String(v).replace(/"/g, '""')}"`;
const lines = ["old_url,new_url,reason"];
for (const r of redirectRules) {
  lines.push([q(r.source + (r.source.includes(":") || r.source.includes(".") ? "" : "/")), q(r.destination), q(r.reason)].join(","));
}
fs.writeFileSync(new URL("../redirects-map.csv", import.meta.url), lines.join("\n") + "\n");
console.log(`redirects-map.csv: ${redirectRules.length} rules`);
