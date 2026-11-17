// Yoast-style on-page SEO + readability analysis. Pure functions, run in
// the browser on every edit, so the traffic lights update live.

export type CheckStatus = "good" | "ok" | "bad";

export type Check = {
  id: string;
  status: CheckStatus;
  text: string;
};

export type ParsedContent = {
  text: string;
  paragraphs: string[];
  headings: string[];
  images: { alt: string }[];
  links: { href: string }[];
};

export type SeoInput = {
  focusKeyphrase: string;
  seoTitle: string;
  metaDescription: string;
  slug: string;
  title: string;
  featuredImageUrl: string;
  featuredImageAlt: string;
  content: ParsedContent;
  siteHost: string;
};

// Recommended limits, same ballpark Yoast uses.
export const SEO_TITLE_MAX = 60;
export const SEO_TITLE_MIN = 30;
export const META_DESC_MAX = 156;
export const META_DESC_MIN = 120;

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function words(s: string) {
  const n = normalize(s);
  return n ? n.split(" ") : [];
}

function containsPhrase(haystack: string, phrase: string) {
  const h = ` ${normalize(haystack)} `;
  const p = normalize(phrase);
  return p.length > 0 && h.includes(` ${p} `);
}

function countPhrase(haystack: string, phrase: string) {
  const h = ` ${normalize(haystack)} `;
  const p = ` ${normalize(phrase)} `;
  if (p.trim().length === 0) return 0;
  let count = 0;
  let i = h.indexOf(p);
  while (i !== -1) {
    count++;
    i = h.indexOf(p, i + p.length - 1);
  }
  return count;
}

function splitSentences(text: string) {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => words(s).length > 0);
}

export function analyzeSeo(input: SeoInput): Check[] {
  const checks: Check[] = [];
  const kp = input.focusKeyphrase.trim();
  const seoTitle = input.seoTitle || input.title;
  const wordCount = words(input.content.text).length;

  if (!kp) {
    checks.push({
      id: "keyphrase",
      status: "bad",
      text: "No focus keyphrase set. Enter the main search phrase this post should rank for.",
    });
  } else {
    // Keyphrase in SEO title
    if (normalize(seoTitle).startsWith(normalize(kp))) {
      checks.push({ id: "kp-title", status: "good", text: "Keyphrase in SEO title: it appears at the beginning. Good job!" });
    } else if (containsPhrase(seoTitle, kp)) {
      checks.push({ id: "kp-title", status: "ok", text: "Keyphrase in SEO title: it appears, but moving it to the beginning is better." });
    } else {
      checks.push({ id: "kp-title", status: "bad", text: "Keyphrase in SEO title: not found. Add the exact keyphrase to the SEO title." });
    }

    // Keyphrase in meta description
    checks.push(
      containsPhrase(input.metaDescription, kp)
        ? { id: "kp-meta", status: "good", text: "Keyphrase in meta description: present. Well done!" }
        : { id: "kp-meta", status: "bad", text: "Keyphrase in meta description: not found. Include it in the description." },
    );

    // Keyphrase in slug (all significant words present)
    const slugWords = new Set(input.slug.split("-"));
    const kpWords = words(kp).filter((w) => w.length > 2);
    const inSlug = kpWords.length > 0 && kpWords.every((w) => slugWords.has(w));
    checks.push(
      inSlug
        ? { id: "kp-slug", status: "good", text: "Keyphrase in slug: great work!" }
        : { id: "kp-slug", status: "ok", text: "Keyphrase in slug: not all keyphrase words are in the slug." },
    );

    // Keyphrase in introduction
    const intro = input.content.paragraphs[0] ?? "";
    checks.push(
      containsPhrase(intro, kp)
        ? { id: "kp-intro", status: "good", text: "Keyphrase in introduction: well done!" }
        : { id: "kp-intro", status: "bad", text: "Keyphrase in introduction: not in the first paragraph. Mention it early." },
    );

    // Keyphrase in H1 (post title)
    checks.push(
      containsPhrase(input.title, kp)
        ? { id: "kp-h1", status: "good", text: "Keyphrase in title (H1): present." }
        : { id: "kp-h1", status: "ok", text: "Keyphrase in title (H1): not found in the on-page title." },
    );

    // Keyphrase density
    if (wordCount > 0) {
      const occurrences = countPhrase(input.content.text, kp);
      const density = ((occurrences * words(kp).length) / wordCount) * 100;
      const d = density.toFixed(1);
      if (occurrences === 0) {
        checks.push({ id: "kp-density", status: "bad", text: "Keyphrase density: the keyphrase isn't in the body text at all." });
      } else if (density < 0.5) {
        checks.push({ id: "kp-density", status: "ok", text: `Keyphrase density: ${d}% (found ${occurrences}×). A bit low, aim for 0.5–3%.` });
      } else if (density <= 3) {
        checks.push({ id: "kp-density", status: "good", text: `Keyphrase density: ${d}% (found ${occurrences}×). Great!` });
      } else {
        checks.push({ id: "kp-density", status: "bad", text: `Keyphrase density: ${d}% (found ${occurrences}×). Too high, this looks like keyword stuffing.` });
      }
    }

    // Keyphrase in subheadings
    if (input.content.headings.length > 0) {
      const hits = input.content.headings.filter((h) => containsPhrase(h, kp)).length;
      checks.push(
        hits > 0
          ? { id: "kp-subheadings", status: "good", text: `Keyphrase in subheadings: ${hits} of ${input.content.headings.length} subheadings use it.` }
          : { id: "kp-subheadings", status: "ok", text: "Keyphrase in subheadings: none of your H2/H3 subheadings mention it." },
      );
    }

    // Keyphrase in image alt text
    const alts = [input.featuredImageAlt, ...input.content.images.map((i) => i.alt)];
    if (alts.some((a) => containsPhrase(a, kp))) {
      checks.push({ id: "kp-alt", status: "good", text: "Image keyphrase: at least one image alt text contains the keyphrase." });
    } else {
      checks.push({ id: "kp-alt", status: "ok", text: "Image keyphrase: no image alt text contains the keyphrase." });
    }
  }

  // SEO title length
  const tLen = seoTitle.length;
  if (tLen === 0) {
    checks.push({ id: "title-len", status: "bad", text: "SEO title: empty." });
  } else if (tLen > SEO_TITLE_MAX) {
    checks.push({ id: "title-len", status: "bad", text: `SEO title width: ${tLen} characters, Google will cut it off after ~${SEO_TITLE_MAX}.` });
  } else if (tLen < SEO_TITLE_MIN) {
    checks.push({ id: "title-len", status: "ok", text: `SEO title width: ${tLen} characters, a bit short. Use the space for a stronger title.` });
  } else {
    checks.push({ id: "title-len", status: "good", text: `SEO title width: ${tLen} characters. Good job!` });
  }

  // Meta description length
  const mLen = input.metaDescription.length;
  if (mLen === 0) {
    checks.push({ id: "meta-len", status: "bad", text: "Meta description: none set. Google will pick a snippet itself." });
  } else if (mLen > META_DESC_MAX) {
    checks.push({ id: "meta-len", status: "bad", text: `Meta description length: ${mLen} characters, over the recommended ${META_DESC_MAX}.` });
  } else if (mLen < META_DESC_MIN) {
    checks.push({ id: "meta-len", status: "ok", text: `Meta description length: ${mLen} characters, a bit short (aim for ${META_DESC_MIN}–${META_DESC_MAX}).` });
  } else {
    checks.push({ id: "meta-len", status: "good", text: `Meta description length: ${mLen} characters. Well done!` });
  }

  // Text length
  if (wordCount >= 300) {
    checks.push({ id: "length", status: "good", text: `Text length: ${wordCount} words. Good job!` });
  } else if (wordCount >= 200) {
    checks.push({ id: "length", status: "ok", text: `Text length: ${wordCount} words, slightly below the recommended 300.` });
  } else {
    checks.push({ id: "length", status: "bad", text: `Text length: ${wordCount} words, far below the recommended minimum of 300.` });
  }

  // Featured image + alt
  if (!input.featuredImageUrl) {
    checks.push({ id: "featured", status: "bad", text: "Featured image: none. Posts without one look empty in the blog list and on social media." });
  } else if (!input.featuredImageAlt.trim()) {
    checks.push({ id: "featured", status: "ok", text: "Featured image: missing alt text. Describe the image for accessibility and image search." });
  } else {
    checks.push({ id: "featured", status: "good", text: "Featured image: set, with alt text." });
  }

  const missingAlt = input.content.images.filter((i) => !i.alt.trim()).length;
  if (missingAlt > 0) {
    checks.push({ id: "img-alt", status: "bad", text: `Image alt attributes: ${missingAlt} image(s) in the body have no alt text.` });
  }

  // Links
  const internal = input.content.links.filter((l) => isInternal(l.href, input.siteHost)).length;
  const outbound = input.content.links.filter((l) => /^https?:\/\//i.test(l.href) && !isInternal(l.href, input.siteHost)).length;
  checks.push(
    internal > 0
      ? { id: "internal", status: "good", text: `Internal links: ${internal}. Good, these help Google find your other pages.` }
      : { id: "internal", status: "bad", text: "Internal links: none. Link to a relevant product or service page." },
  );
  checks.push(
    outbound > 0
      ? { id: "outbound", status: "good", text: `Outbound links: ${outbound}. Good job!` }
      : { id: "outbound", status: "ok", text: "Outbound links: none. Consider linking to an authoritative source." },
  );

  return checks;
}

export function analyzeReadability(content: ParsedContent): Check[] {
  const checks: Check[] = [];
  const sentences = splitSentences(content.paragraphs.join(" "));

  if (sentences.length > 0) {
    const long = sentences.filter((s) => words(s).length > 20).length;
    const pct = Math.round((long / sentences.length) * 100);
    checks.push(
      pct <= 25
        ? { id: "sentence-len", status: "good", text: `Sentence length: ${pct}% of sentences have more than 20 words. Great!` }
        : { id: "sentence-len", status: pct <= 35 ? "ok" : "bad", text: `Sentence length: ${pct}% of sentences have more than 20 words (keep it under 25%). Shorten some.` },
    );
  }

  const longParas = content.paragraphs.filter((p) => words(p).length > 150).length;
  checks.push(
    longParas === 0
      ? { id: "para-len", status: "good", text: "Paragraph length: none of the paragraphs are too long. Great job!" }
      : { id: "para-len", status: "ok", text: `Paragraph length: ${longParas} paragraph(s) have more than 150 words. Split them up.` },
  );

  const wordCount = words(content.text).length;
  if (wordCount > 300) {
    const perHeading = wordCount / Math.max(1, content.headings.length);
    checks.push(
      content.headings.length > 0 && perHeading <= 300
        ? { id: "subheadings", status: "good", text: "Subheading distribution: great job!" }
        : { id: "subheadings", status: content.headings.length === 0 ? "bad" : "ok", text: "Subheading distribution: some sections run over 300 words without a subheading. Add H2/H3s." },
    );
  }

  return checks;
}

function isInternal(href: string, siteHost: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return true;
  try {
    return new URL(href).hostname.replace(/^www\./, "") === siteHost;
  } catch {
    return false;
  }
}

export function overallScore(checks: Check[]): CheckStatus {
  if (checks.length === 0) return "bad";
  const points = checks.reduce((sum, c) => sum + (c.status === "good" ? 9 : c.status === "ok" ? 6 : 3), 0);
  const avg = points / checks.length;
  return avg >= 7.5 ? "good" : avg >= 5.5 ? "ok" : "bad";
}
