import { NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const locales = ['si', 'en'];
const defaultLocale = 'si';

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Ignore internal assets, sitemaps, robots, icons, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname === '/sitemap.xml' ||
    pathname === '/robots.txt' ||
    pathname === '/favicon.ico' ||
    pathname === '/manifest.json' ||
    pathname === '/sw.js' ||
    PUBLIC_FILE.test(pathname)
  ) {
    return;
  }

  // Check if the pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // Detect language: cookie first, then headers, default to 'si'
  let locale = defaultLocale;
  
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && locales.includes(cookieLocale)) {
    locale = cookieLocale;
  } else {
    const acceptLang = request.headers.get('accept-language');
    if (acceptLang && acceptLang.toLowerCase().includes('en')) {
      locale = 'en';
    }
  }

  // Redirect to localized URL
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    // Match all requests except internal paths
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
