import Head from "next/head";
import { PageInfo } from "../typings";
import { urlFor } from "../sanity";

type Props = {
  pageInfo: PageInfo;
  title?: string;
  description?: string;
  image?: PageInfo["heroImage"];
  imageAlt?: string;
  path?: string;
};

export default function Seo({ pageInfo, title, description, image, imageAlt, path = "/" }: Props) {
  const name = pageInfo.name || "Developer portfolio";
  const pageTitle = title || `${name} | ${pageInfo.role || "Freelance Developer"}`;
  const pageDescription = (description || pageInfo.seoDescription || pageInfo.backgroundInformation || `Explore ${name}'s projects, skills and experience, and get in touch.`).replace(/\s+/g, " ").trim().slice(0, 160);
  const preview = image || pageInfo.socialImage || pageInfo.heroImage || pageInfo.profilePic;
  const imageUrl = preview?.asset ? urlFor(preview).width(1200).height(630).fit("crop").auto("format").url() : undefined;
  let canonical: string | undefined;
  try {
    const site = new URL(process.env.NEXT_PUBLIC_SITE_URL || pageInfo.siteUrl || "");
    if (["https:", "http:"].includes(site.protocol)) canonical = new URL(path, site.origin).href;
  } catch { /* Omit canonical until a public site URL is configured. */ }

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={pageDescription} key="description" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta name="twitter:card" content={imageUrl ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={pageDescription} />
      {canonical && <link rel="canonical" href={canonical} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {imageUrl && <meta property="og:image" content={imageUrl} />}
      {imageUrl && <meta property="og:image:width" content="1200" />}
      {imageUrl && <meta property="og:image:height" content="630" />}
      {imageUrl && <meta property="og:image:alt" content={imageAlt || `${name}'s portfolio`} />}
      {imageUrl && <meta name="twitter:image" content={imageUrl} />}
      {imageUrl && <meta name="twitter:image:alt" content={imageAlt || `${name}'s portfolio`} />}
    </Head>
  );
}
