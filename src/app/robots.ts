import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://tutorbari.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/job/list", "/job/view/*", "/tutorial", "/faq", "/terms-condition", "/hire-a-tutor"],
        disallow: ["/admin/", "/guardian/", "/tutor/", "/api/", "/invoice/", "/payment/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
