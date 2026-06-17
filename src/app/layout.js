import { Inter, Noto_Sans_Sinhala } from "next/font/google";
import "./globals.css";

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
  title: "PhysicsMaster A/L - උසස් පෙළ භෞතික විද්‍යාව",
  description: "ශ්‍රී ලංකා උසස් පෙළ භෞතික විද්‍යාව විෂය නිර්දේශයේ සියලුම ඒකක, ප්‍රායෝගික පරීක්ෂණ, පසුගිය විභාග ප්‍රශ්න හා ලකුණු දීමේ ක්‍රමවේදයන් (Marking Schemes) ඇතුළත් සජීවී ඉගෙනුම් මෙවලම.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="si"
      className={`${inter.variable} ${notoSansSinhala.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
