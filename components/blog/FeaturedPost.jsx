import Link from "next/link";
import { getPostHref } from "@/lib/blog";
import { PostImage, PostMeta } from "./BlogCard";
import { ArrowRightIcon } from "./BlogIcons";

/* Latest post, shown large above the grid on /blog. */

export default function FeaturedPost({ post }) {
  return (
    <article className="reveal-on-scroll reveal-zoom-in">
      <div className="blog-card lg:grid lg:grid-cols-[1.15fr_1fr]">
        <div className="blog-card-media lg:aspect-auto lg:min-h-[400px]">
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
          <span className="blog-label absolute left-4 top-4 z-[2] inline-flex items-center gap-2 rounded-full bg-[#efb000] px-3.5 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-black shadow-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-black" />
            Latest Article
          </span>
        </div>

        <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-10 xl:p-12">
          {post.primaryCategory && (
            <span className="blog-label text-[13px] font-bold uppercase tracking-[0.1em] text-[#0077c2]">
              {post.primaryCategory.name}
            </span>
          )}
          <h2 className="text-[24px] font-bold leading-[1.25] text-[#0061af] sm:text-[28px] lg:text-[32px]">
            <Link href={getPostHref(post)} className="blog-card-link">
              {post.title}
            </Link>
          </h2>
          <p className="blog-label line-clamp-4 text-[15px] font-medium leading-[1.6] text-black/60 sm:text-base">
            {post.excerpt}
          </p>
          <PostMeta post={post} />
          <span className="blog-btn blog-btn-blue mt-2 self-start">
            READ ARTICLE
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </article>
  );
}
