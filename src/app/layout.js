import "./globals.css";
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Physics Master | Flagship Studios',
  description: 'A/L Physics App developed by Flagship Studios',
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
    </html>
  );
}
