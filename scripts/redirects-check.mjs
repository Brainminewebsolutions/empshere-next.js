// Usage: node scripts/redirects-check.mjs [baseUrl]
// Each old URL must answer with ONE permanent redirect to the intended page, which returns 200.
import { redirectRules } from "../redirects.mjs";
const base = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const samples = redirectRules.map((r) => ({
  from: r.source.replace(/\/:path\*$/, "/example-item").replace(/^(\/[^:.]*[^/])$/, "$1/"),
  to: r.destination.replace(/:path\*/, ""),
}));
let failed = 0;
const rows = [];
for (const s of samples) {
  const r1 = await fetch(base + s.from, { redirect: "manual" });
  const loc = r1.headers.get("location") || "";
  const path = loc.startsWith("http") ? new URL(loc).pathname : loc;
  let final = "-";
  if (path) final = (await fetch(base + path, { redirect: "manual" })).status;
  const ok = [301, 308].includes(r1.status) && path === s.to && final === 200;
  if (!ok) failed++;
  rows.push({ from: s.from, status: r1.status, to: path, final, result: ok ? "pass" : "FAIL" });
}
console.table(rows);
process.exit(failed ? 1 : 0);
