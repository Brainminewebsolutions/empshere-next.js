import Link from "next/link";
import BackToTop from "@/components/BackToTop";
import ScrollReveal from "@/components/ScrollReveal";
import {
  FIRST_PAGE_GRID,
  POSTS_PER_PAGE,
  SITE_NAME,
  SITE_URL,
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
import { ChevronIcon, HomeIcon } from "./BlogIcons";
import FeaturedPost from "./FeaturedPost";
import Pagination from "./Pagination";

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
  const image = seo?.ogImage || getAllPosts()[0]?.featuredImage?.src;

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
      images: image ? [{ url: image, alt: seo?.ogImageAlt || "Emsphere blog" }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seo?.twitterTitle || title,
      description: seo?.twitterDescription || description,
      images: image ? [image] : undefined,
    },
  };
}

function Breadcrumbs({ page }) {
  return (
    <nav aria-label="Breadcrumb" className="blog-label text-[13px] font-medium text-black/65">
      <ol className="flex flex-wrap items-center justify-center gap-1.5 lg:justify-start">
        <li>
          <Link href="/" className="inline-flex items-center gap-1.5 transition-colors hover:text-[#0061af]">
            <HomeIcon className="h-4 w-4" />
            Home
          </Link>
        </li>
        <li aria-hidden="true">
          <ChevronIcon className="h-3.5 w-3.5 text-black/40" />
        </li>
        <li>
          {page > 1 ? (
            <Link href="/blog/" className="transition-colors hover:text-[#0061af]">
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

function Hero({ page, totalPages, totalPosts, topics }) {
  return (
    <section className="relative isolate overflow-hidden bg-white bg-[radial-gradient(circle_at_0%_60%,rgba(248,187,24,0.3),transparent_30%),radial-gradient(circle_at_50%_0%,rgba(248,187,24,0.25),transparent_35%),radial-gradient(circle_at_40%_75%,rgba(239,68,68,0.12),transparent_20%),radial-gradient(circle_at_65%_65%,rgba(15,184,128,0.12),transparent_20%),radial-gradient(circle_at_100%_75%,rgba(248,187,24,0.3),transparent_25%)] text-black">
      <div className="mx-auto max-w-[1240px] px-5 py-14 text-center sm:px-6 sm:py-20 lg:py-24 lg:text-left">
        <div className="reveal-on-scroll reveal-fade-down">
          <Breadcrumbs page={page} />
        </div>

        <div className="mt-6 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-16">
          <div>
            <p className="reveal-on-scroll reveal-fade-up blog-label text-[13px] font-bold uppercase tracking-[0.16em] text-[#0061af]">
              Emsphere Blog · Insights &amp; Resources
            </p>
            <h1
              className="reveal-on-scroll reveal-fade-up mt-4 text-[34px] font-bold leading-[1.12] tracking-[-0.02em] sm:text-[44px] lg:text-[54px]"
              style={{ transitionDelay: "80ms" }}
            >
              {page > 1 ? (
                <>
                  HR &amp; Workforce Blog <span className="text-[#0061af]">— Page {page}</span>
                </>
              ) : (
                <>
                  HR, Payroll &amp; Workforce <span className="text-[#0061af]">Insights</span>
                </>
              )}
            </h1>
            <p
              className="reveal-on-scroll reveal-fade-up blog-label mx-auto mt-5 max-w-[620px] text-[16px] font-medium leading-[1.6] text-black/75 sm:text-[18px] lg:mx-0"
              style={{ transitionDelay: "160ms" }}
            >
              HR teams stay updated with the latest HRTech trends, insights, and innovations through our expert blogs on
              HRMS, contract labour, payroll, visitor and canteen management.
            </p>
          </div>

          <dl
            className="reveal-on-scroll reveal-fade-left mx-auto mt-10 grid max-w-[420px] grid-cols-2 gap-3 sm:gap-4 lg:mx-0 lg:mt-0"
            style={{ transitionDelay: "220ms" }}
          >
            <div className="rounded-xl bg-white/70 px-5 py-4 text-left shadow-[0_10px_24px_-14px_rgba(0,0,0,0.15)] ring-1 ring-black/10 backdrop-blur-sm">
              <dt className="blog-label text-[12px] font-semibold uppercase tracking-[0.08em] text-black/60">Articles</dt>
              <dd className="mt-1 text-[30px] font-bold leading-none text-[#0061af]">{totalPosts}</dd>
            </div>
            <div className="rounded-xl bg-white/70 px-5 py-4 text-left shadow-[0_10px_24px_-14px_rgba(0,0,0,0.15)] ring-1 ring-black/10 backdrop-blur-sm">
              <dt className="blog-label text-[12px] font-semibold uppercase tracking-[0.08em] text-black/60">Pages</dt>
              <dd className="mt-1 text-[30px] font-bold leading-none text-[#0061af]">
                {page}
                <span className="text-[18px] font-semibold text-black/45"> / {totalPages}</span>
              </dd>
            </div>
          </dl>
        </div>

        {topics.length > 0 && (
          <div className="reveal-on-scroll reveal-fade-up mt-10" style={{ transitionDelay: "280ms" }}>
            <p className="blog-label text-[12px] font-semibold uppercase tracking-[0.1em] text-black/60">Popular topics</p>
            <ul className="mt-3 flex flex-wrap justify-center gap-2 lg:justify-start">
              {topics.map((topic) => (
                <li
                  key={topic.name}
                  className="blog-label rounded-full bg-white/70 px-3.5 py-1.5 text-[13px] font-semibold text-black/80 ring-1 ring-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-white hover:text-[#0061af] hover:shadow-md"
                >
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
    <main className="animated-page blog-page flex-1 bg-white">
      <ScrollReveal root=".animated-page" />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(jsonLd)} />

      <Hero page={page} totalPages={totalPages} totalPosts={allPosts.length} topics={page === 1 ? getTopCategories(8) : []} />

      <section className="bg-[#f7f7f7] py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-6">
          {listed.length === 0 ? (
            <p className="blog-label py-20 text-center text-lg font-medium text-black/60">
              New articles are on their way — please check back soon.
            </p>
          ) : (
            <>
              {featured && <FeaturedPost post={featured} />}

              <div
                className={`reveal-on-scroll reveal-fade-up flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left ${
                  featured ? "mt-16 sm:mt-20" : ""
                }`}
              >
                <h2 className="text-[26px] font-semibold text-[#4c4c4c] sm:text-[32px]">
                  {page === 1 ? "More Articles" : "All Articles"}
                </h2>
                <p className="blog-label text-[14px] font-medium text-black/55">
                  Showing {shownFrom}–{shownTo} of {allPosts.length} articles
                </p>
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
