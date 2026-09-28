import { Instrument_Sans, Inter } from "next/font/google";

// The home page typefaces, self-hosted by next/font for the blog routes.
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-blog-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-blog-label",
  display: "swap",
});

export default function BlogLayout({ children }) {
  return <div className={`${instrumentSans.variable} ${inter.variable} flex flex-1 flex-col`}>{children}</div>;
}
