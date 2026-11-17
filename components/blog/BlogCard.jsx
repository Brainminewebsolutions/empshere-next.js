import Link from "next/link";
import { formatDate, getPostHref } from "@/lib/blog-shared";
import { ArrowRightIcon, CalendarIcon, ClockIcon } from "./BlogIcons";

/* The home page "Latest Blogs" card, with real post data. The title link is
   stretched over the whole card, so there is exactly one link per post. */

export function PostImage({ post, className = "", eager = false, sizes }) {
  if (!post.featuredImage) {
    // Branded cover for the few posts that have no image in WordPress at all.
    return (
      <div
        role="img"
        aria-label={post.title}
        className={`relative isolate flex h-full w-full flex-col justify-end overflow-hidden bg-gradient-to-br from-[#f8bb18] via-[#efb000] to-[#c98f00] p-5 text-left sm:p-6 ${className}`}
      >
        <div aria-hidden="true" className="blog-hero-dots absolute inset-0 -z-10 opacity-60 invert" />
        <div aria-hidden="true" className="absolute -right-10 -top-10 -z-10 h-40 w-40 rounded-full bg-[#efb000]/35 blur-2xl" />
        <div aria-hidden="true" className="absolute -bottom-16 -left-10 -z-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
        <span className="blog-label text-[11px] font-bold uppercase tracking-[0.14em] text-[#efb000]">
          Emsphere Blog
        </span>
        <span className="mt-2 line-clamp-3 text-[18px] font-bold leading-[1.25] text-white sm:text-[20px]">{post.title}</span>
        <span aria-hidden="true" className="mt-3 h-1 w-12 rounded-full bg-[#efb000]" />
      </div>
    );
  }
  const { src, srcSet, width, height, alt } = post.featuredImage;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- static export, WordPress-hosted image
    <img
      src={src}
      srcSet={srcSet}
      alt={alt}
      width={width}
      height={height}
      sizes={sizes}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      decoding="async"
      className={className}
    />
  );
}

export function PostMeta({ post, className = "" }) {
  return (
    <div className={`blog-label flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] font-medium text-black/55 ${className}`}>
      <span className="inline-flex items-center gap-1.5">
        <CalendarIcon className="h-4 w-4 text-[#efb000]" />
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ClockIcon className="h-4 w-4 text-[#efb000]" />
        {post.readingMinutes} min read
      </span>
    </div>
  );
}

export default function BlogCard({ post, index = 0, headingLevel = "h3" }) {
  const Heading = headingLevel;
  return (
    <article
      className="reveal-on-scroll reveal-fade-up h-full"
      style={{ transitionDelay: `${(index % 3) * 110}ms` }}
    >
      <div className="blog-card group">
        <div className="blog-card-media">
          <PostImage post={post} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
          {post.primaryCategory && (
            <span className="blog-label absolute left-3 top-3 z-[2] max-w-[85%] truncate rounded-full bg-white/95 px-3 py-1 text-[12px] font-semibold text-[#7a5c00] shadow-sm backdrop-blur">
              {post.primaryCategory.name}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 px-3 pb-3 pt-5 sm:px-4">
          <PostMeta post={post} />
          <Heading className="line-clamp-3 text-[18px] font-bold leading-[1.32] text-[#1f1f1f] transition-colors duration-300 group-hover:text-[#b07d00]">
            <Link href={getPostHref(post)} className="blog-card-link">
              {post.title}
            </Link>
          </Heading>
          <p className="blog-label line-clamp-2 text-[14.5px] font-medium leading-[1.55] text-black/55">
            {post.excerpt}
          </p>
          <div className="mt-auto flex items-center justify-between gap-3 border-t border-dashed border-[#efe1bd] pt-4">
            <span className="blog-learn-more blog-label text-[14px] font-semibold text-[#b07d00] transition-colors">
              Read article
            </span>
            <span aria-hidden="true" className="blog-card-arrow">
              <ArrowRightIcon />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
