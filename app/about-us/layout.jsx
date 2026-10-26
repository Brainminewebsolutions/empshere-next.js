import { DEFAULT_OG_IMAGE, TWITTER_SITE } from "@/lib/seo";
// page.jsx is a client component, so the route's metadata lives here.
const PAGE_URL = "https://www.emsphere.com/about-us/";
const PAGE_TITLE = "About Emsphere - HR Management System, India";
const PAGE_DESCRIPTION =
  "emSphere is a leading provider of HR management software solution which helps companies automate all aspects of their workforce management processes.";

export const metadata = {
  title: { absolute: PAGE_TITLE },
  description: PAGE_DESCRIPTION,
  keywords: null,
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    url: PAGE_URL,
    siteName: "Emsphere Technologies",
    locale: "en_US",
    images: [DEFAULT_OG_IMAGE],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: TWITTER_SITE,
    title: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function AboutLayout({ children }) {
  return children;
}
