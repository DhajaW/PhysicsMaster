export const dynamic = 'force-static';

export default async function sitemap() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://physics-masters.vercel.app';

  // Base static routes
  const routes = [
    '',
    '/lessons',
    '/formulas',
    '/exam-secrets',
    '/quiz',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic unit routes (01 to 11)
  const unitIds = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11'];
  const unitRoutes = unitIds.map((id) => ({
    url: `${siteUrl}/units/${id}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...routes, ...unitRoutes];
}
