import "server-only";
import sanitizeHtml from "sanitize-html";

// Allow-list for post bodies. Matches what the admin editor can produce
// (and what BlogPostTemplate.module.css styles) - anything else, notably
// <script>, <iframe>, on* handlers and javascript: URLs, is stripped.
// Runs on save AND on render, so a row edited directly in the database
// can't inject script into the public site either.
const OPTIONS: sanitizeHtml.IOptions = {
  allowedTags: [
    "p", "br", "h2", "h3", "h4", "strong", "b", "em", "i", "u", "s",
    "ul", "ol", "li", "blockquote", "a", "img", "hr", "code", "pre", "span",
  ],
  allowedAttributes: {
    a: ["href", "target", "rel", "title"],
    img: ["src", "alt", "title", "width", "height", "loading"],
    span: ["style"],
  },
  // Text colour from the editor's colour picker - only a plain colour value
  // survives; every other inline style is dropped.
  allowedStyles: {
    span: {
      color: [
        /^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i,
        /^[a-z]{3,20}$/i, // named colours, e.g. "red"
        /^rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(?:,\s*(?:0|1|0?\.\d+)\s*)?\)$/i,
      ],
    },
  },
  allowedSchemes: ["https", "http", "mailto", "tel"],
  allowedSchemesByTag: { img: ["https"] },
  allowProtocolRelative: false,
  transformTags: {
    // Any link that opens a new tab gets rel=noopener (reverse-tabnabbing).
    a: (tagName, attribs) => {
      if (attribs.target === "_blank") {
        attribs.rel = "noopener noreferrer";
      } else {
        delete attribs.target;
      }
      return { tagName, attribs };
    },
    img: (tagName, attribs) => ({
      tagName,
      attribs: { ...attribs, loading: "lazy" },
    }),
  },
};

export function sanitizePostHtml(html: string): string {
  return sanitizeHtml(html, OPTIONS);
}
