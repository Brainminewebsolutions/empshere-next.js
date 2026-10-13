"use client";

import { useState } from "react";

/* Share links are plain URLs (work without JS); only "copy link" needs the client. */

const ICONS = {
  linkedin: (
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.75h4v11H3v-11zm6.5 0h3.84v1.5h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.67 4.8 6.14v5.42h-4v-4.8c0-1.15-.02-2.62-1.6-2.62-1.6 0-1.84 1.25-1.84 2.54v4.88h-4v-11z" />
  ),
  x: (
    <path d="M17.53 3H20.6l-6.7 7.66L21.8 21h-6.17l-4.83-6.32L5.27 21H2.2l7.17-8.2L1.8 3h6.33l4.37 5.78L17.53 3zm-1.08 16.2h1.7L7.12 4.73H5.3l11.15 14.47z" />
  ),
  facebook: (
    <path d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.87.25-1.46 1.5-1.46h1.55V4.46A20.6 20.6 0 0 0 14.3 4.3c-2.25 0-3.8 1.37-3.8 3.9v2.3H8v3h2.5V21h3z" />
  ),
  whatsapp: (
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.98L2 22l5.16-1.5A9.9 9.9 0 1 0 12.04 2zm0 18.1a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.06.89.9-2.98-.2-.31a8.2 8.2 0 1 1 6.84 3.73zm4.5-6.14c-.25-.12-1.46-.72-1.69-.8-.23-.08-.39-.12-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06a6.7 6.7 0 0 1-3.34-2.92c-.25-.43.25-.4.72-1.34.08-.16.04-.3-.02-.43-.06-.12-.55-1.32-.75-1.8-.2-.48-.4-.41-.55-.42h-.47a.9.9 0 0 0-.65.3 2.7 2.7 0 0 0-.85 2.02c0 1.19.87 2.34.99 2.5.12.16 1.7 2.6 4.13 3.65 1.53.66 2.13.72 2.9.6.46-.07 1.46-.6 1.66-1.18.2-.58.2-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
  ),
};

export default function ShareButtons({ url, title, className = "" }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);

  const links = [
    { key: "linkedin", label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
    { key: "x", label: "Share on X", href: `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
    { key: "facebook", label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}` },
    { key: "whatsapp", label: "Share on WhatsApp", href: `https://wa.me/?text=${t}%20${u}` },
  ];

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked — nothing to do
    }
  };

  const buttonClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#b37e00] shadow-[inset_0_0_0_1.5px_#EFB000] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EFB000] hover:text-white hover:shadow-[0_8px_18px_-6px_rgba(239,176,0,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efb000]";

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {links.map((link) => (
        <a
          key={link.key}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer nofollow"
          aria-label={link.label}
          title={link.label}
          className={buttonClass}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-[18px] w-[18px]">
            {ICONS[link.key]}
          </svg>
        </a>
      ))}
      <button type="button" onClick={copy} aria-label="Copy link" title="Copy link" className={buttonClass}>
        {copied ? (
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-[18px] w-[18px]">
            <path d="M4.5 10.5l3.5 3.5 7.5-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" className="h-[18px] w-[18px]">
            <path
              d="M8.5 11.5a3.5 3.5 0 0 0 5 0l2.5-2.5a3.5 3.5 0 0 0-5-5l-.75.75M11.5 8.5a3.5 3.5 0 0 0-5 0L4 11a3.5 3.5 0 0 0 5 5l.75-.75"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        )}
      </button>
      <span role="status" className="blog-label text-[13px] font-medium text-[#EFB000]">
        {copied ? "Link copied!" : ""}
      </span>
    </div>
  );
}
