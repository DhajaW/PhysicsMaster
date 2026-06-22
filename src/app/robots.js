export const dynamic = 'force-static';

export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://physics-masters.vercel.app';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/_next/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
