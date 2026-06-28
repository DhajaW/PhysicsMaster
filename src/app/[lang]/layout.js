import "../globals.css";
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import Script from 'next/script';
import LanguageSwitcher from '@/components/LanguageSwitcher';

const siteUrl = 'https://physics-masters.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  verification: {
    google: 'Imol3irmdd1T22W0GmUhl-aqNp_Su34_ktlvhKr79Bk',
  },
  title: 'Physics Master A/L | උසස් පෙළ භෞතික විද්‍යාව සහ MCQ ප්‍රශ්න පත්‍ර',
  description: 'උසස් පෙළ භෞතික විද්‍යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න. A/L Physics සම්පත් පොත් සාරාංශ, විභාග MCQ ප්‍රශ්න පත්‍ර සහ අතථ්‍ය පරීක්ෂණ මෙතැනින්.',
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
    canonical: '/',
    languages: {
      'si': '/si',
      'en': '/en',
      'x-default': '/si',
    },
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
    title: 'Physics Master A/L | උසස් පෙළ භෞතික විද්‍යාව සහ MCQ ප්‍රශ්න පත්‍ර',
    description: 'උසස් පෙළ භෞතික විද්‍යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න. A/L Physics සම්පත් පොත් සාරාංශ, විභාග MCQ ප්‍රශ්න පත්‍ර සහ අතථ්‍ය පරීක්ෂණ මෙතැනින්.',
    url: 'https://physics-masters.vercel.app',
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
    title: 'Physics Master A/L | උසස් පෙළ භෞතික විද්‍යාව සහ MCQ ප්‍රශ්න පත්‍ර',
    description: 'උසස් පෙළ භෞතික විද්‍යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න. A/L Physics සම්පත් පොත් සාරාංශ, විභාග MCQ ප්‍රශ්න පත්‍ර සහ අතථ්‍ය පරීක්ෂණ මෙතැනින්.',
    images: ['/og-image.png'],
  }
};

export default async function RootLayout({ children, params }) {
  const { lang } = await params;
  
  return (
    <html lang={lang || "si"} className="h-full antialiased">
      <head>
        <link rel="apple-touch-icon" href="/icon.svg" />
      </head>
      <body className="min-h-full flex flex-col bg-slate-950 text-slate-100">
        {/* Schema.org Organization and WebSite JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://physics-masters.vercel.app/#organization",
                  "name": "Physics Master",
                  "url": "https://physics-masters.vercel.app",
                  "logo": {
                    "@type": "ImageObject",
                    "@id": "https://physics-masters.vercel.app/#logo",
                    "url": "https://physics-masters.vercel.app/og-image.png",
                    "caption": "Physics Master Logo"
                  },
                  "contactPoint": {
                    "@type": "ContactPoint",
                    "telephone": "+94713080010",
                    "contactType": "technical support",
                    "areaServed": "LK",
                    "availableLanguage": ["si", "en"]
                  },
                  "sameAs": [
                    "https://www.facebook.com/",
                    "https://www.youtube.com/",
                    "https://twitter.com/",
                    "https://www.instagram.com/",
                    "https://www.linkedin.com/"
                  ]
                },
                {
                  "@type": "LocalBusiness",
                  "@id": "https://physics-masters.vercel.app/#localbusiness",
                  "name": "Physics Master A/L",
                  "url": "https://physics-masters.vercel.app",
                  "telephone": "+94713080010",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Colombo",
                    "addressLocality": "Colombo",
                    "addressCountry": "LK"
                  }
                },
                {
                  "@type": "WebSite",
                  "@id": "https://physics-masters.vercel.app/#website",
                  "url": "https://physics-masters.vercel.app",
                  "name": "Physics Master A/L",
                  "description": "උසස් පෙළ භෞතික විද්‍යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න.",
                  "publisher": {
                    "@id": "https://physics-masters.vercel.app/#organization"
                  },
                  "inLanguage": ["si", "en"]
                }
              ]
            })
          }}
        />
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
