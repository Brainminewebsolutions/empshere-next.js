import Link from "next/link";
import { getPostHref } from "@/lib/blog";
import { PostImage, PostMeta } from "./BlogCard";
import { ArrowRightIcon } from "./BlogIcons";

/* Latest post, shown large above the grid on /blog. */

export default function FeaturedPost({ post }) {
  return (
    <article className="blog-featured reveal-on-scroll reveal-zoom-in">
      <div className="blog-card group lg:grid lg:grid-cols-[1.15fr_1fr] lg:gap-2">
        <div className="blog-card-media lg:aspect-auto lg:min-h-[420px]">
          {/* The whole image is always shown (object-contain); a blurred copy
              fills any space left when the column isn't the image's shape. */}
          {post.featuredImage && (
            // eslint-disable-next-line @next/next/no-img-element -- decorative backdrop, same file as below
            <img
              src={post.featuredImage.src}
              srcSet={post.featuredImage.srcSet}
              sizes="(min-width: 1024px) 660px, 100vw"
              alt=""
              aria-hidden="true"
              className="absolute inset-0 scale-110 object-cover opacity-70 blur-2xl"
            />
          )}
          <PostImage
            post={post}
            eager
            sizes="(min-width: 1024px) 660px, 100vw"
            className="relative z-[1] object-contain lg:absolute lg:inset-0"
          />
        </div>

        <div className="relative flex flex-col justify-center gap-5 overflow-hidden px-4 pb-5 pt-7 sm:px-7 sm:pb-7 lg:px-10 lg:py-10 xl:px-12">
          <span aria-hidden="true" className="blog-featured-glow" />
          <div className="relative flex flex-wrap items-center gap-2.5">
            <span className="blog-label inline-flex items-center gap-2 rounded-full bg-[#efb000] px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-white shadow-[0_8px_18px_-8px_rgba(239,176,0,0.8)]">
              <span className="blog-live-dot h-1.5 w-1.5 rounded-full bg-white" />
              Latest Article
            </span>
            {post.primaryCategory && (
              <span className="blog-label rounded-full bg-[#fff5d9] px-3.5 py-1.5 text-[11.5px] font-bold uppercase tracking-[0.1em] text-[#7a5c00]">
                {post.primaryCategory.name}
              </span>
            )}
          </div>
          <h2 className="relative text-[24px] font-bold leading-[1.22] tracking-[-0.01em] text-[#1f1f1f] transition-colors duration-300 group-hover:text-[#b07d00] sm:text-[30px] lg:text-[34px]">
            <Link href={getPostHref(post)} className="blog-card-link">
              {post.title}
            </Link>
          </h2>
          <p className="blog-label relative line-clamp-3 text-[15px] font-medium leading-[1.65] text-black/60 sm:text-base">
            {post.excerpt}
          </p>
          <div className="relative flex flex-wrap items-center justify-between gap-4 border-t border-dashed border-[#efe1bd] pt-5">
            <PostMeta post={post} />
            <span className="blog-btn blog-btn-gold">
              Read Article
              <ArrowRightIcon />
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
