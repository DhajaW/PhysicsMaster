import "./globals.css";
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const siteUrl = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) || 
  'https://physics-masters.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Physics Master A/L',
  description: 'උසස් පෙළ භෞතික විද්‍යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න.',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Physics Master',
  },
  openGraph: {
    title: 'Physics Master A/L',
    description: 'උසස් පෙළ භෞතික විද්‍යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න.',
    url: siteUrl,
    siteName: 'Physics Master A/L',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Physics Master A/L Banner',
      },
    ],
    locale: 'si_LK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Physics Master A/L',
    description: 'උසස් පෙළ භෞතික විද්‍යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න.',
    images: ['/og-image.jpg'],
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="si" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50">
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <LanguageSwitcher />
        
        {/* Google Translate Init Script */}
        <Script id="google-translate-init" strategy="beforeInteractive">
          {`
            window.googleTranslateElementInit = function() {
              new google.translate.TranslateElement({
                pageLanguage: 'si',
                includedLanguages: 'en,si',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
              }, 'google_translate_element');
            }
          `}
        </Script>
        <Script 
          src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        {/* Hidden div required by Google Translate */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>

        {/* Google AdSense Script */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <Script 
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
      <GoogleAnalytics gaId="G-82HVY187H1" />
    </html>
  );
}
