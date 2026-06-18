import { Inter, Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";
import Footer from '@/components/Footer';

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSansSinhala = Noto_Sans_Sinhala({
  variable: "--font-noto-sinhala",
  subsets: ["sinhala"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: 'Physics Master | Flagship Studios',
  description: 'A/L Physics App developed by Flagship Studios',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="si"
      className={`${inter.variable} ${notoSansSinhala.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
