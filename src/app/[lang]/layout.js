import "../globals.css";
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
  title: 'Physics Master A/L | උසස් පෙළ භෞතික විද්‍යාව',
  description: 'උසස් පෙළ භෞතික විද්‍යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න. සම්පත් පොත් සාරාංශ, විෂය නිර්දේශයන් සහ අතථ්‍ය පරීක්ෂණ මෙතැනින්.',
  keywords: [
    'A/L Physics',
    'AL Physics',
    'Physics Sinhala',
    'Physics Master',
    'භෞතික විද්‍යාව',
    'උසස් පෙළ',
    'Physics Short Notes',
    'Physics Practicals',
    'Physics MCQ'
  ],
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Physics Master',
  },
  openGraph: {
    title: 'Physics Master A/L | උසස් පෙළ භෞතික විද්‍යාව',
    description: 'උසස් පෙළ භෞතික විද්‍යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න. සම්පත් පොත් සාරාංශ, විෂය නිර්දේශයන් සහ අතථ්‍ය පරීක්ෂණ මෙතැනින්.',
    url: siteUrl,
    siteName: 'Physics Master A/L',
    images: [
      {
        url: '/og-image.png',
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
    title: 'Physics Master A/L | උසස් පෙළ භෞතික විද්‍යාව',
    description: 'උසස් පෙළ භෞතික විද්‍යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න. සම්පත් පොත් සාරාංශ, විෂය නිර්දේශයන් සහ අතථ්‍ය පරීක්ෂණ මෙතැනින්.',
    images: ['/og-image.png'],
  }
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  
  return (
    <html lang={lang || "si"} className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        <main className="flex-grow">
          {children}
        </main>
        <Footer lang={lang || "si"} />
        <LanguageSwitcher lang={lang || "si"} />

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
