# 09 - Agent Readiness Audit (emSphere)

Date: 2026-10-23. Standards facts checked 2026-09-23 (vendor-matrix).

## Method and limits
- Tooling (lighthouse_agentic.py, agentic_check.py, agent_ux_check.py) REFUSES 127.0.0.1 (SSRF guard / PSI needs public host). So:
  - **Lighthouse Agentic Browsing: not run (unavailable)**. Re-run against https://www.emsphere.com once deployed.
  - **Agent-UX 0-100 heuristic: unavailable** (render blocked). Findings below come from static review of `out/*.html` and source (accessibility-tree proxy, not a score).
  - robots/llms/markdown/.well-known judged from `public/` and `out/` file listings; no live header checks.
- No UA-matrix testing done (not authorized).

## Findings

### Critical
**C1. Both lead forms fake success; no lead is ever sent.** (Classic-SEO/lead-gen issue, also breaks agents.)
- `components/ContactForm.jsx` handleSubmit: `setTimeout(...)` then "Thank You... we have received your inquiry". No fetch, no action, no mailto.
- `components/DemoRequestForm.jsx` line 15: `DEMO_FORM_ENDPOINT = ""`, so the else-branch just waits 700ms and shows "sent". Used on CLMS and other product pages.
- Agents (and humans) are told the request succeeded when nothing was transmitted.
- Fix: wire to a real endpoint (Formspree/Web3Forms/serverless/CRM) before launch; on failure show the existing `role="alert"`. Static export cannot host an API route, so use an external endpoint.

### High
None specific to agents beyond C1.

### Medium
**M1. Home page has no `<main>` landmark and three `<h1>`s** (`app/page.jsx` ~2552, hero slider renders one h1 per slide; comment at ~2870 confirms no main). Agents/AT use landmarks and a single h1 to orient. Fix: wrap content in `<main id=...>`; render h1 only for the active slide (others h2/div) or keep one static h1. Also helps classic SEO.
**M2. Form labelling is good on /contact-us but `noValidate` + custom errors need to stay exposed.** Verified: 7 `<label for>` on contact-us, `autoComplete` tokens (name, email, tel-national, organization), `aria-invalid`, `aria-describedby`, `role=status/alert` in DemoRequestForm, form `aria-label="Request for demo"`. Gaps: contact form fields use `required` but verify errors are announced; placeholders-only hints are fine. Honeypot `name="website"` is `aria-hidden` + tabindex -1 (good, but an agent filling every field could trip it; leave it, it is hidden from the a11y tree).
**M3. robots.txt has no explicit AI-bot policy and no Content-Signal.** `public/robots.txt` is `User-agent: *` / `Allow: /` with a non-standard `Host:` line and a sitemap. Effect: all training, search and user-triggered agents are allowed by default.
- Training (GPTBot, Google-Extended, CCBot, ClaudeBot etc.): allowed (implicit)
- Search (OAI-SearchBot, Googlebot, PerplexityBot): allowed (implicit)
- User-triggered (ChatGPT-User, Claude-User, Perplexity-User): allowed (implicit)
- Content-Signal (draft/proposal, Cloudflare, checked 2026-09-23): absent.
Fix: decide business policy. For B2B lead gen, allow search and user-triggered; training is a choice. Optionally add `Content-Signal: search=yes, ai-input=yes, ai-train=no` under `User-agent: *` (draft; harmless to crawlers that ignore it) or per-bot Disallow groups. Remove `Host:` (Yandex-only, ignored by Google).

### Low
- **L1. No llms.txt** (not in `public/` or `out/`). Lighthouse checks it; Google Search ignores it. Opportunity: a short `/llms.txt` listing products (CLMS, HRMS, payroll, VMS, canteen, workforce), contact, sitemap. No ranking/citation promise.
- **L2. No Markdown delivery** (no `.md`, no alternate link). Static export cannot do Accept negotiation; could emit `.md` siblings at build. Opportunity only.
- **L3. No /.well-known files** (`public/.well-known` absent). ai-catalog.json (ARD, draft), agent-card, OAuth, API catalog are all not applicable: emSphere exposes no public API/MCP. Do not publish empty ones.
- **L4. No WebMCP markup** (draft proposal). Opportunity: once the demo form has a real endpoint, `toolname`/`tooldescription` attributes on the request-demo form could let in-browser agents submit it. Not needed now.
- **L5. 204 of 295 `<img>` on home have `alt=""`.** Many may be decorative (logos/icons), but client logos and product screenshots should carry meaningful alt text; check `TrustedLogos`/`TestimonialsSlider`.

### Passing / positives
- Content is server-rendered static HTML (full text in `out/*.html`; 230-550 KB per page), so non-JS agents can read it.
- One `<h1>` and one `<main>` on contact-us, CLMS, HRMS pages; canonical present on all four; JSON-LD present on home (1) and CLMS/HRMS (2); contact-us has none (consider ContactPage/Organization from `lib/schema.js`).
- Contact details are plain `mailto:`/`tel:` links, so an agent can fall back to email/phone (sales@emsphere.com).
- Sitemap referenced; no soft-404 probe possible locally (`out/404.html` exists).
- Demo forms: labels, autocomplete, aria-invalid, live regions: well above typical.

## Per-page accessibility-tree notes (static)
| Page | h1 | main | forms | labels | JSON-LD |
|---|---|---|---|---|---|
| / | 3 (slider) | none | 0 | - | 1 |
| /contract-labour-management-system-software/ | 1 | 1 | 1 demo form | 4 of 5 fields (+honeypot) | 2 |
| /human-resource-management-system/ | 1 | 1 | 0 inline (check CTA) | - | 2 |
| /contact-us/ | 1 | 1 | 1 | 7 labels / 4 inputs counted + selects/textarea | 0 |

## Priority summary
1. C1 make forms really submit (do before launch regardless of agents).
2. M1 add main + single h1 on home.
3. M3 explicit robots policy (+ optional Content-Signal draft).
4. L1 llms.txt, L2 Markdown, L4 WebMCP: optional opportunities.

## Standards status (as of 2026-09-23 vendor-matrix)
WebMCP: draft/proposal. Content-Signal: proposal. ai-catalog.json (ARD 1.0): draft. Web Bot Auth: draft. llms.txt: community spec, ignored by Google Search.
