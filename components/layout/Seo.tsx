import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "@/lib/i18n";

export interface SeoProps {
  title: string;
  description?: string;
  /** Site-relative (e.g. "/products/aviator-black.svg") or absolute image URL. */
  image?: string;
  type?: "website" | "product";
  /** Structured data (schema.org JSON-LD) rendered as a script tag. */
  jsonLd?: Record<string, unknown>;
  noIndex?: boolean;
}

/**
 * Set NEXT_PUBLIC_SITE_URL (e.g. https://blinkblink.com) so canonical and
 * Open Graph URLs are absolute; without it they are left out rather than
 * pointing at the wrong host.
 */
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

function absolute(path: string): string | undefined {
  if (/^https?:\/\//.test(path)) return path;
  return SITE_URL ? `${SITE_URL}${path}` : undefined;
}

/** Per-page <title>, description, canonical, Open Graph/Twitter tags and JSON-LD. */
export default function Seo({ title, description, image, type = "website", jsonLd, noIndex }: SeoProps) {
  const router = useRouter();
  const t = useTranslation();
  const metaDescription = description ?? t.pages.home.description;
  const url = absolute(router.asPath.split(/[?#]/)[0] ?? "/");
  const imageUrl = image ? absolute(image) : undefined;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={metaDescription} />
      {noIndex && <meta name="robots" content="noindex" />}
      {url && <link rel="canonical" href={url} />}

      <meta property="og:site_name" content={t.common.brandName} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type === "product" ? "product" : "website"} />
      {url && <meta property="og:url" content={url} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      <meta name="twitter:card" content={imageUrl ? "summary_large_image" : "summary"} />

      {jsonLd && (
        <script
          type="application/ld+json"
          // JSON.stringify output with "<" escaped can't break out of the script tag.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
    </Head>
  );
}
