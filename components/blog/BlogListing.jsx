import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ScrollReveal";
import {
  FIRST_PAGE_GRID,
  POSTS_PER_PAGE,
  SITE_NAME,
  SITE_URL,
  formatDate,
  getAllPosts,
  getBlogIndexSeo,
  getPage,
  getPageHref,
  getPostUrl,
  getTopCategories,
  getTotalPages,
  jsonLdScript,
} from "@/lib/blog";
import BlogCard from "./BlogCard";
import BlogCta from "./BlogCta";
import { PostImage } from "./BlogCard";
import { CalendarIcon, ChevronIcon, HomeIcon } from "./BlogIcons";
import FeaturedPost from "./FeaturedPost";
import Pagination from "./Pagination";
import { DEFAULT_OG_IMAGE, TWITTER_SITE } from "@/lib/seo";

const DEFAULT_TITLE = "Blogs - HR & Workforce - Emsphere";
const DEFAULT_DESCRIPTION =
  "Stay updated with the latest trends and insights in the world of HR, payroll and workforce management on our informative blogs.";

// Metadata for /blog/ and /blog/page/N/ — title and description come from
// Rank Math's settings for the WordPress blog page when available.
export function getListingMetadata(page) {
  const seo = getBlogIndexSeo();
  const baseTitle = seo?.title || DEFAULT_TITLE;
  const description = seo?.description || DEFAULT_DESCRIPTION;
  const title = page > 1 ? `${baseTitle} - Page ${page} of ${getTotalPages()}` : baseTitle;
  const url = `${SITE_URL}${getPageHref(page)}`;
  const image = seo?.ogImage || getAllPosts()[0]?.featuredImage?.src || DEFAULT_OG_IMAGE.url;

  return {
    title: { absolute: title },
    description: page > 1 ? `${description} Page ${page}.` : description,
    alternates: { canonical: url },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      title: seo?.ogTitle || title,
      description: seo?.ogDescription || description,
      images: [{ url: image, alt: seo?.ogImageAlt || "Emsphere blog" }],
    },
    twitter: {
      card: "summary_large_image",
      site: TWITTER_SITE,
      title: seo?.twitterTitle || title,
      description: seo?.twitterDescription || description,
      images: [image],
    },
  };
}

function Breadcrumbs({ page }) {
  return (
    <nav aria-label="Breadcrumb" className="blog-label text-[13px] font-medium text-black/65">
      <ol className="flex flex-wrap items-center justify-center gap-1.5 lg:justify-start">
        <li>
          <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#b07d00]">
            <HomeIcon className="h-4 w-4" />
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronIcon className="h-3.5 w-3.5 text-black/40" />
        </li>
        <li>
          {page > 1 ? (
            <Link href="/blog/" className="transition-colors hover:text-[#b07d00]">
              Blog
            </Link>
          ) : (
            <span aria-current="page" className="font-semibold text-black">
              Blog
            </span>
          )}
        </li>
        {page > 1 && (
          <>
            <li aria-hidden="true">
              <ChevronIcon className="h-3.5 w-3.5 text-black/40" />
            </li>
            <li aria-current="page" className="font-semibold text-black">
              Page {page}
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}

function CoverStack({ posts }) {
  // Newest post renders last so it sits on top of the fan.
  const stack = [...posts].reverse();
  const newest = posts[0];
  return (
    <div className="reveal-on-scroll reveal-fade-left relative mt-14 lg:mt-0" style={{ transitionDelay: "200ms" }} aria-hidden="true">
      <div className="blog-stack">
        {stack.map((post) => (
          <div key={post.slug} className="blog-stack-card">
            <PostImage post={post} sizes="(min-width: 1024px) 420px, 70vw" />
          </div>
        ))}
      </div>
      {newest && (
        <div className="blog-stack-chip blog-label -bottom-2 right-2 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[inset_0_0_0_1px_#efe6d0,0_18px_40px_-18px_rgba(0,0,0,0.3)] sm:right-6">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#efb000] text-white">
            <CalendarIcon className="h-[18px] w-[18px]" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] font-semibold uppercase tracking-[0.1em] text-black/50">Latest post</span>
            <span className="text-[14px] font-bold text-[#1f1f1f]">{formatDate(newest.date)}</span>
          </span>
        </div>
      )}
    </div>
  );
}

function Hero({ page, totalPages, totalPosts, topics, coverPosts }) {
  const stats = [
    { value: totalPosts, label: "Articles" },
    { value: totalPages, label: "Pages" },
    ...(topics.length ? [{ value: topics.length, label: "Topics" }] : []),
  ];
  return (
    <section className="relative isolate overflow-hidden bg-[#FFFFFA] text-black">
      <div aria-hidden="true" className="blog-hero-dots absolute inset-0 -z-10" />
      <div aria-hidden="true" className="blog-hero-blob -z-10 right-[8%] top-[10%] h-72 w-72 bg-[#efb000]/20" />
      <div aria-hidden="true" className="blog-hero-blob -z-10 -left-24 bottom-0 h-64 w-64 bg-[#f8bb18]/15" style={{ animationDelay: "-7s" }} />

      <div className="mx-auto max-w-[1240px] px-5 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:pb-24 lg:pt-20">
        <div className="lg:grid lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-14">
          <div className="text-center lg:text-left">
            <div className="reveal-on-scroll reveal-fade-down">
              <Breadcrumbs page={page} />
            </div>

            <p className="reveal-on-scroll reveal-fade-up blog-label mt-7 inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-[12px] font-bold uppercase tracking-[0.16em] text-[#7a5c00] shadow-[inset_0_0_0_1px_#f0d48a,0_8px_20px_-12px_rgba(176,125,0,0.5)]">
              <span className="blog-live-dot h-2 w-2 rounded-full bg-[#efb000]" />
              Emsphere Blog<span className="hidden sm:inline"> · Insights &amp; Resources</span>
            </p>

            <h1
              className="reveal-on-scroll reveal-fade-up mt-6 text-[36px] font-bold leading-[1.1] tracking-[-0.025em] sm:text-[48px] lg:text-[58px]"
              style={{ transitionDelay: "80ms" }}
            >
              {page > 1 ? (
                <>
                  HR &amp; Workforce Blog{" "}
                  <span className="text-[#efb000]">
                    Page {page}
                  </span>
                </>
              ) : (
                <>
                  HR, Payroll &amp; Workforce{" "}
                  <span className="text-[#efb000]">
                    Insights
                  </span>
                </>
              )}
            </h1>

            <p
              className="reveal-on-scroll reveal-fade-up blog-label mx-auto mt-6 max-w-[560px] text-[16px] font-medium leading-[1.65] text-black/65 sm:text-[17.5px] lg:mx-0"
              style={{ transitionDelay: "160ms" }}
            >
              HR teams stay updated with the latest HRTech trends, insights, and innovations through our expert blogs on
              HRMS, contract labour, payroll, visitor and canteen management.
            </p>

            <dl
              className="reveal-on-scroll reveal-fade-up mx-auto mt-9 inline-flex items-stretch divide-x divide-[#efe1bd] rounded-2xl bg-white py-3 shadow-[inset_0_0_0_1px_#efe6d0,0_14px_30px_-20px_rgba(176,125,0,0.45)] lg:mx-0"
              style={{ transitionDelay: "220ms" }}
            >
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center px-5 sm:px-7">
                  <dt className="blog-label order-2 mt-1.5 text-[11.5px] font-semibold uppercase tracking-[0.1em] text-black/55">
                    {stat.label}
                  </dt>
                  <dd className="order-1 text-[26px] font-bold leading-none text-[#efb000] sm:text-[30px]">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          {coverPosts.length >= 3 && <CoverStack posts={coverPosts} />}
        </div>

        {topics.length > 0 && (
          <div
            className="reveal-on-scroll reveal-fade-up mt-14 flex flex-col items-center gap-3 border-t border-dashed border-[#efe1bd] pt-8 lg:flex-row lg:items-center lg:gap-5"
            style={{ transitionDelay: "280ms" }}
          >
            <p className="blog-label shrink-0 text-[12px] font-bold uppercase tracking-[0.12em] text-black/55">Popular topics</p>
            <ul className="flex flex-wrap justify-center gap-2 lg:justify-start">
              {topics.map((topic) => (
                <li
                  key={topic.name}
                  className="blog-topic blog-label inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-[13px] font-semibold text-black/75 shadow-[inset_0_0_0_1px_#ece4d2]"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#efb000]" />
                  {topic.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default function BlogListing({ page }) {
  const allPosts = getAllPosts();
  const totalPages = getTotalPages();
  const { featured, posts } = getPage(page);

  const firstIndex = page === 1 ? 1 : 1 + FIRST_PAGE_GRID + (page - 2) * POSTS_PER_PAGE;
  const listed = featured ? [featured, ...posts] : posts;
  const pageUrl = `${SITE_URL}${getPageHref(page)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: page > 1 ? `Emsphere Blog — Page ${page}` : "Emsphere Blog",
        inLanguage: "en-US",
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: listed.map((post, i) => ({
            "@type": "ListItem",
            position: (page === 1 ? 0 : firstIndex) + i + 1,
            url: getPostUrl(post),
            name: post.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog/` },
          ...(page > 1 ? [{ "@type": "ListItem", position: 3, name: `Page ${page}`, item: pageUrl }] : []),
        ],
      },
    ],
  };

  const shownFrom = page === 1 ? 1 : firstIndex + 1;
  const shownTo = (page === 1 ? 0 : firstIndex) + listed.length;

  return (
    <main className="animated-page blog-page flex-1 bg-[#FFFFFA]">
      <ScrollReveal root=".animated-page" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />

      <Hero page={page} totalPages={totalPages} totalPosts={allPosts.length} topics={page === 1 ? getTopCategories(8) : []} coverPosts={allPosts.slice(0, 3)} />

      <section className="bg-[#FFFFFA] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-6">
          {listed.length === 0 ? (
            <p className="blog-label py-20 text-center text-lg font-medium text-black/60">
              New articles are on their way — please check back soon.
            </p>
          ) : (
            <>
              {featured && <FeaturedPost post={featured} />}

              <div
                className={`reveal-on-scroll reveal-fade-up flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:items-end sm:text-left ${
                  featured ? "mt-20 sm:mt-24" : ""
                }`}
              >
                <div>
                  <p className="blog-label text-[12px] font-bold uppercase tracking-[0.16em] text-[#b07d00]">
                    {page === 1 ? "Keep reading" : "Browse the archive"}
                  </p>
                  <h2 className="mt-2 text-[28px] font-bold tracking-[-0.015em] text-[#1f1f1f] sm:text-[36px]">
                    {page === 1 ? "More Articles" : "All Articles"}
                  </h2>
                </div>
                <p className="blog-label inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[13px] font-semibold text-black/60 shadow-[inset_0_0_0_1px_#efe6d0]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#efb000]" />
                  Showing {shownFrom}–{shownTo} of {allPosts.length}
                </p>
              </div>
              <div aria-hidden="true" className="reveal-on-scroll reveal-fade-up mt-6 h-px w-full bg-[#efe1bd]">
                <div className="h-px w-24 bg-[#efb000]" />
              </div>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-7 lg:grid-cols-3 lg:gap-8">
                {posts.map((post, index) => (
                  <BlogCard key={post.slug} post={post} index={index} />
                ))}
              </div>

              <Pagination current={page} total={totalPages} />
            </>
          )}
        </div>
      </section>

      <BlogCta />
      <BackToTop trigger=".blog-page > section" />
    </main>
  );
}
