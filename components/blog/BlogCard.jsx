import Link from "next/link";
import { formatDate, getPostHref } from "@/lib/blog";
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
        className={`relative isolate flex h-full w-full flex-col justify-end overflow-hidden bg-gradient-to-br from-[#0077c2] via-[#006bb8] to-[#004f8f] p-5 text-left sm:p-6 ${className}`}
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
        <CalendarIcon className="h-4 w-4 text-[#0077c2]" />
        <time dateTime={post.date}>{formatDate(post.date)}</time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <ClockIcon className="h-4 w-4 text-[#0077c2]" />
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
      <div className="blog-card">
        <div className="blog-card-media">
          <PostImage post={post} sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw" />
          {post.primaryCategory && (
            <span className="blog-label absolute left-3 top-3 z-[2] max-w-[85%] truncate rounded-full bg-white/95 px-3 py-1 text-[12px] font-semibold text-[#0061af] shadow-sm backdrop-blur">
              {post.primaryCategory.name}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 px-5 pb-6 pt-5 sm:px-6">
          <PostMeta post={post} />
          <Heading className="line-clamp-3 text-[18px] font-bold leading-[1.3] text-[#0061af]">
            <Link href={getPostHref(post)} className="blog-card-link">
              {post.title}
            </Link>
          </Heading>
          <p className="blog-label line-clamp-3 text-[15px] font-medium leading-[1.5] text-black/55">
            {post.excerpt}
          </p>
          <span className="blog-learn-more blog-label mt-auto pt-1 inline-flex items-center gap-2 text-[15px] font-semibold text-[#0077c2] transition-colors">
            Learn More
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </article>
  );
}
