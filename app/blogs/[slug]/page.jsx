import Link from "next/link";
import { notFound } from "next/navigation";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ScrollReveal";
import BlogCard, { PostImage } from "@/components/blog/BlogCard";
import BlogCta from "@/components/blog/BlogCta";
import { ArrowRightIcon, CalendarIcon, ChevronIcon, ClockIcon, HomeIcon } from "@/components/blog/BlogIcons";
import ReadingProgress from "@/components/blog/ReadingProgress";
import ShareButtons from "@/components/blog/ShareButtons";
import {
  SITE_NAME,
  SITE_URL,
  formatDate,
  getAdjacentPosts,
  getAllPosts,
  getPostBySlug,
  getPostHref,
  getPostUrl,
  getRelatedPosts,
  jsonLdScript,
} from "@/lib/blog";

// Static export: one HTML file per WordPress post, nothing rendered on demand.
export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  // A static export needs at least one param; an unknown slug renders 404.
  if (posts.length === 0) return [{ slug: "coming-soon" }];
  return posts.map((post) => ({ slug: post.slug }));
}

const GENERIC_AUTHORS = new Set(["admin", "administrator", "emsphere", ""]);
const LOGO_URL = `${SITE_URL}/universal-images/header/emsphere-technologies-logo.webp`;

function getAuthor(post) {
  const isGeneric = GENERIC_AUTHORS.has(post.author.trim().toLowerCase());
  return { name: isGeneric ? "Emsphere Team" : post.author, isOrganization: isGeneric };
}

function getKeywords(post) {
  if (post.seo?.keywords?.length) return post.seo.keywords;
  return [...post.categories, ...post.tags].map((t) => t.name).filter((name) => name !== "Uncategorized");
}

// Title, description, robots and social tags all come from Rank Math (see
// scripts/fetch-blog-posts.mjs); WordPress fields are only the fallback.
export async function generateMetadata({ params }) {
  const post = getPostBySlug((await params).slug);
  if (!post) return {};

  const seo = post.seo || {};
  const url = getPostUrl(post);
  const title = seo.title || post.title;
  const description = seo.description || post.excerpt;
  const imageUrl = seo.ogImage || post.featuredImage?.src;
  const isFeatured = imageUrl && imageUrl === post.featuredImage?.src;
  const author = getAuthor(post);
  const keywords = getKeywords(post);
  const index = seo.index !== false;
  const follow = seo.follow !== false;

  return {
    title: { absolute: title },
    description,
    keywords,
    authors: [{ name: author.name }],
    alternates: { canonical: url },
    robots: {
      index,
      follow,
      googleBot: { index, follow, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
    },
    openGraph: {
      type: "article",
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      title: seo.ogTitle || title,
      description: seo.ogDescription || description,
      publishedTime: post.date,
      modifiedTime: post.modified,
      section: post.primaryCategory?.name,
      tags: keywords,
      authors: [author.name],
      images: imageUrl
        ? [
            {
              url: imageUrl,
              alt: seo.ogImageAlt || post.featuredImage?.alt || post.title,
              ...(isFeatured ? { width: post.featuredImage.width, height: post.featuredImage.height } : {}),
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo.twitterTitle || seo.ogTitle || title,
      description: seo.twitterDescription || seo.ogDescription || description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}

function buildJsonLd(post) {
  const url = getPostUrl(post);
  const author = getAuthor(post);
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    logo: { "@type": "ImageObject", url: LOGO_URL, width: 550, height: 143 },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title.length > 110 ? `${post.title.slice(0, 107)}…` : post.title,
        name: post.seo?.title || post.title,
        description: post.seo?.description || post.excerpt,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        image: post.featuredImage
          ? { "@type": "ImageObject", url: post.featuredImage.src, width: post.featuredImage.width, height: post.featuredImage.height }
          : undefined,
        datePublished: post.date,
        dateModified: post.modified,
        author: author.isOrganization
          ? { "@id": `${SITE_URL}/#organization` }
          : { "@type": "Person", name: author.name },
        publisher: organization,
        articleSection: post.primaryCategory?.name,
        keywords: getKeywords(post).join(", ") || undefined,
        wordCount: post.wordCount,
        inLanguage: "en-US",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };
}

function TableOfContents({ toc }) {
  return (
    <ol className="blog-toc mt-3 space-y-0.5">
      {toc.map((item) => (
        <li key={item.id}>
          <a href={`#${item.id}`}>{item.text}</a>
        </li>
      ))}
    </ol>
  );
}

function SidebarCta() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#efb000] p-6">
      <div aria-hidden="true" className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/25" />
      <p className="blog-label relative text-[12px] font-bold uppercase tracking-[0.1em] text-black/70">Free demo</p>
      <p className="relative mt-2 text-[22px] font-bold leading-tight text-black">See Emsphere in action</p>
      <p className="blog-label relative mt-2 text-[14px] font-medium leading-relaxed text-black/75">
        HRMS, CLMS, payroll, visitor &amp; canteen management — on one connected platform.
      </p>
      <Link href="/contact-us/" className="blog-btn blog-btn-blue relative mt-5 w-full">
        BOOK A DEMO
        <ArrowRightIcon />
      </Link>
    </div>
  );
}

export default async function BlogPostPage({ params }) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();

  const url = getPostUrl(post);
  const author = getAuthor(post);
  const related = getRelatedPosts(post, 3);
  const { newer, older } = getAdjacentPosts(post);
  const hasToc = post.toc.length >= 3;
  const wasUpdated = new Date(post.modified) - new Date(post.date) > 1000 * 60 * 60 * 24;
  const tagList = [...post.categories, ...post.tags].filter(
    (t, i, all) => t.slug !== "uncategorized" && all.findIndex((x) => x.slug === t.slug) === i
  );

  return (
    <main className="animated-page blog-page flex-1 bg-white">
      <ScrollReveal root=".animated-page" />
      <ReadingProgress target="#article-body" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(buildJsonLd(post))} />

      {/* Header */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#eef8ff] via-[#f5fbff] to-white">
        <div aria-hidden="true" className="blog-float absolute -right-24 -top-28 -z-10 h-80 w-80 rounded-full bg-[#a7ddff]/40 blur-3xl" />
        <div aria-hidden="true" className="blog-float absolute -left-24 top-40 -z-10 h-64 w-64 rounded-full bg-[#efb000]/15 blur-3xl [animation-delay:-3.5s]" />

        <div className="mx-auto max-w-[900px] px-5 pb-10 pt-10 text-center sm:px-6 sm:pb-12 sm:pt-14 lg:pt-16">
          <nav aria-label="Breadcrumb" className="reveal-on-scroll reveal-fade-down blog-label text-[13px] font-medium text-black/55">
            <ol className="flex flex-wrap items-center justify-center gap-1.5">
              <li>
                <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#0077c2]">
                  <HomeIcon className="h-4 w-4" />
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronIcon className="h-3.5 w-3.5 text-black/35" />
              </li>
              <li>
                <Link href="/blog/" className="transition-colors hover:text-[#0077c2]">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="hidden sm:block">
                <ChevronIcon className="h-3.5 w-3.5 text-black/35" />
              </li>
              <li aria-current="page" className="hidden max-w-[320px] truncate text-black/80 sm:block">
                {post.title}
              </li>
            </ol>
          </nav>

          {post.primaryCategory && (
            <p className="reveal-on-scroll reveal-fade-up mt-6">
              <span className="blog-label inline-block rounded-full bg-[#0077c2] px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.08em] text-white shadow-[0_8px_18px_-8px_rgba(0,119,194,0.7)]">
                {post.primaryCategory.name}
              </span>
            </p>
          )}

          <h1
            className="reveal-on-scroll reveal-fade-up mt-5 text-[28px] font-bold leading-[1.2] tracking-[-0.02em] text-[#1a1a1a] sm:text-[38px] lg:text-[46px]"
            style={{ transitionDelay: "80ms" }}
          >
            {post.title}
          </h1>

          <div
            className="reveal-on-scroll reveal-fade-up blog-label mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-[14px] font-medium text-black/60"
            style={{ transitionDelay: "160ms" }}
          >
            <span className="inline-flex items-center gap-2.5">
              <span
                aria-hidden="true"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-[#0077c2] to-[#0061af] text-[14px] font-bold text-white"
              >
                {author.name.charAt(0)}
              </span>
              <span>
                By <span className="font-semibold text-black/85">{author.name}</span>
              </span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarIcon className="h-4 w-4 text-[#0077c2]" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </span>
            {wasUpdated && (
              <span className="inline-flex items-center gap-1.5">
                Updated <time dateTime={post.modified}>{formatDate(post.modified)}</time>
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <ClockIcon className="h-4 w-4 text-[#0077c2]" />
              {post.readingMinutes} min read
            </span>
          </div>
        </div>

        {post.featuredImage && (
          <div className="mx-auto max-w-[900px] px-5 sm:px-6">
            {/* Natural aspect ratio — never cropped. The frame hugs the image,
                and tall images are capped in height instead of cut. */}
            <figure className="reveal-on-scroll reveal-zoom-in mx-auto w-fit max-w-full overflow-hidden rounded-2xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)] ring-[3px] ring-[#a7ddff]">
              <PostImage
                post={post}
                eager
                sizes="(min-width: 900px) 860px, 100vw"
                className="block h-auto max-h-[600px] w-auto max-w-full"
              />
            </figure>
          </div>
        )}
      </section>

      {/* Body */}
      <section className="pb-16 pt-10 sm:pb-20 sm:pt-14">
        <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-14">
          <div className="min-w-0">
            {hasToc && (
              <details className="blog-toc-mobile reveal-on-scroll reveal-fade-up mb-8 rounded-xl bg-[#eef8ff] px-5 py-4 shadow-[inset_0_0_0_2px_#a7ddff] lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between text-[16px] font-bold text-[#0061af]">
                  In this article
                  <ChevronIcon direction="down" className="blog-toc-chevron h-5 w-5 transition-transform duration-300" />
                </summary>
                <TableOfContents toc={post.toc} />
              </details>
            )}

            <article
              id="article-body"
              className="blog-prose mx-auto max-w-[760px]"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <div className="mx-auto mt-12 max-w-[760px] space-y-8 border-t border-black/10 pt-8">
              {tagList.length > 0 && (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="blog-label mr-1 text-[13px] font-bold uppercase tracking-[0.08em] text-black/50">Topics</span>
                  {tagList.map((tag) => (
                    <span
                      key={tag.slug}
                      className="blog-label rounded-full bg-[#eef8ff] px-3.5 py-1.5 text-[13px] font-semibold text-[#0061af] shadow-[inset_0_0_0_1.5px_#a7ddff]"
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:hidden">
                <span className="blog-label text-[13px] font-bold uppercase tracking-[0.08em] text-black/50">Share this article</span>
                <ShareButtons url={url} title={post.title} />
              </div>

              {(newer || older) && (
                <nav aria-label="More articles" className="grid gap-4 sm:grid-cols-2">
                  {older ? (
                    <Link
                      href={getPostHref(older)}
                      className="group rounded-xl bg-[#f7f7f7] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#eef8ff] hover:shadow-[inset_0_0_0_2px_#a7ddff]"
                    >
                      <span className="blog-label inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.08em] text-[#0077c2]">
                        <ChevronIcon direction="left" className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                        Previous article
                      </span>
                      <span className="mt-2 line-clamp-2 block text-[16px] font-bold leading-snug text-[#1a1a1a] group-hover:text-[#0061af]">
                        {older.title}
                      </span>
                    </Link>
                  ) : (
                    <span className="hidden sm:block" />
                  )}
                  {newer && (
                    <Link
                      href={getPostHref(newer)}
                      className="group rounded-xl bg-[#f7f7f7] p-5 text-right transition-all duration-300 hover:-translate-y-1 hover:bg-[#eef8ff] hover:shadow-[inset_0_0_0_2px_#a7ddff]"
                    >
                      <span className="blog-label inline-flex items-center gap-1 text-[12px] font-bold uppercase tracking-[0.08em] text-[#0077c2]">
                        Next article
                        <ChevronIcon direction="right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                      <span className="mt-2 line-clamp-2 block text-[16px] font-bold leading-snug text-[#1a1a1a] group-hover:text-[#0061af]">
                        {newer.title}
                      </span>
                    </Link>
                  )}
                </nav>
              )}
            </div>
          </div>

          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-[112px] space-y-6">
              {hasToc && (
                <div className="reveal-on-scroll reveal-fade-left rounded-2xl bg-white p-6 shadow-[0_0_24px_-9px_rgba(0,0,0,0.25)] ring-1 ring-black/5">
                  <p className="text-[16px] font-bold text-[#1a1a1a]">In this article</p>
                  <nav aria-label="Table of contents" className="max-h-[42vh] overflow-y-auto pr-1">
                    <TableOfContents toc={post.toc} />
                  </nav>
                </div>
              )}
              <div className="reveal-on-scroll reveal-fade-left" style={{ transitionDelay: "100ms" }}>
                <p className="blog-label mb-3 text-[13px] font-bold uppercase tracking-[0.08em] text-black/50">Share this article</p>
                <ShareButtons url={url} title={post.title} />
              </div>
              <div className="reveal-on-scroll reveal-fade-left" style={{ transitionDelay: "180ms" }}>
                <SidebarCta />
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-[#efb000] py-16 sm:py-20">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-6">
            <div className="reveal-on-scroll reveal-fade-up flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
              <div>
                <h2 className="text-[30px] font-bold text-black sm:text-[38px]">Related Articles</h2>
                <p className="blog-label mt-2 text-[15px] font-medium text-black/75">
                  Keep exploring HRTech trends, insights and innovations.
                </p>
              </div>
              <Link href="/blog/" className="blog-btn blog-btn-blue shrink-0">
                VIEW ALL BLOGS
                <ArrowRightIcon />
              </Link>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
              {related.map((item, index) => (
                <BlogCard key={item.slug} post={item} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mobile CTA (desktop has it in the sidebar) */}
      <div className="px-5 pt-14 sm:px-6 lg:hidden">
        <div className="mx-auto max-w-[560px]">
          <SidebarCta />
        </div>
      </div>

      <BlogCta />
      <BackToTop trigger=".blog-page > section" />
    </main>
  );
}
