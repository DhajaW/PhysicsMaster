import "./globals.css";
import Footer from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';

const siteUrl = 
  process.env.NEXT_PUBLIC_SITE_URL || 
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) || 
  'https://physicsmaster.lk';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Physics Master A/L',
  description: 'උසස් පෙළ භෞතික විද්‍යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න.',
  openGraph: {
    title: 'Physics Master A/L',
    description: 'උසස් පෙළ භෞතික විද්‍යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න.',
    url: siteUrl,
    siteName: 'Physics Master A/L',
    locale: 'si_LK',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Physics Master A/L',
    description: 'උසස් පෙළ භෞතික විද්‍යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න.',
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
      </body>
      <GoogleAnalytics gaId="G-82HVY187H1" />
    </html>
  );
}
