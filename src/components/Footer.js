import { Heart, Phone, Sparkles, MapPin } from 'lucide-react';

export default function Footer({ lang = 'si' }) {
  const currentYear = new Date().getFullYear();
  const isEnglish = lang === 'en';

  return (
    <footer className="bg-slate-900 text-slate-300 pt-6 pb-10 md:py-10 mt-4 md:mt-8 border-t-4 border-blue-500 font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12 text-left">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          {/* Left: About the App */}
          <div className="text-center md:text-left max-w-sm">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Physics Master
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {isEnglish 
                ? 'Master A/L Physics simply and correctly. A unique digital experience designed specifically for Sri Lankan students to conquer their exams.'
                : 'උසස් පෙළ භෞතික විද්යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න. ශ්‍රී ලාංකේය සිසුන්ගේ විභාග ජයග්‍රහණය වෙනුවෙන්ම නිර්මාණය කළ අද්විතීය ඩිජිටල් අත්දැකීමකි.'}
            </p>
          </div>

          {/* Middle: Social Links & Address */}
          <div className="text-center md:text-left">
            <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Connect With Us</h4>
            <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
              <a href="#" aria-label="Facebook Page" className="text-slate-400 hover:text-blue-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z"/></svg>
              </a>
              <a href="#" aria-label="YouTube Channel" className="text-slate-400 hover:text-red-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.58 7.19C21.36 6.36 20.71 5.71 19.88 5.49C18.38 5.09 12 5.09 12 5.09C12 5.09 5.62 5.09 4.12 5.49C3.29 5.71 2.64 6.36 2.42 7.19C2 8.69 2 12 2 12C2 12 2 15.31 2.42 16.81C2.64 17.64 3.29 18.29 4.12 18.51C5.62 18.91 12 18.91 12 18.91C12 18.91 18.38 18.91 19.88 18.51C20.71 18.29 21.36 17.64 21.58 16.81C22 15.31 22 12 22 12C22 12 22 8.69 21.58 7.19ZM10 15V9L15.2 12L10 15Z"/></svg>
              </a>
              <a href="#" aria-label="X Profile (Twitter)" className="text-slate-400 hover:text-sky-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10C2.38 10 2.38 10 2.38 10.03C2.38 12.11 3.86 13.85 5.82 14.24C5.46 14.34 5.08 14.39 4.69 14.39C4.42 14.39 4.15 14.36 3.89 14.31C4.43 16.03 6.03 17.29 7.92 17.32C6.45 18.47 4.59 19.16 2.58 19.16C2.22 19.16 1.88 19.14 1.54 19.1C3.44 20.32 5.69 21 8.1 21C15.97 21 20.27 14.48 20.27 8.82C20.27 8.63 20.27 8.45 20.26 8.27C21.1 7.67 21.85 6.9 22.46 6Z"/></svg>
              </a>
              <a href="#" aria-label="Instagram Profile" className="text-slate-400 hover:text-pink-500 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7.75 2C4.58 2 2 4.58 2 7.75V16.25C2 19.42 4.58 22 7.75 22H16.25C19.42 22 22 19.42 22 16.25V7.75C22 4.58 19.42 2 16.25 2H7.75ZM7.75 4H16.25C18.32 4 20 5.68 20 7.75V16.25C20 18.32 18.32 20 16.25 20H7.75C5.68 20 4 18.32 4 16.25V7.75C4 5.68 5.68 4 7.75 4ZM17.25 5.5C16.56 5.5 16 6.06 16 6.75C16 7.44 16.56 8 17.25 8C17.94 8 18.5 7.44 18.5 6.75C18.5 6.06 17.94 5.5 17.25 5.5ZM12 7C9.24 7 7 9.24 7 12C7 14.76 9.24 17 12 17C14.76 17 17 14.76 17 12C17 9.24 14.76 7 12 7ZM12 9C13.66 9 15 10.34 15 12C15 13.66 13.66 15 12 15C10.34 15 9 13.66 9 12C9 10.34 10.34 9 12 9Z"/></svg>
              </a>
              <a href="#" aria-label="LinkedIn Profile" className="text-slate-400 hover:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19ZM18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.07 9.94 13.4 10.58 13 11.23V10.12H10.56V18.5H13V14.15C13 13 13.4 12.28 14.2 12.28C15 12.28 15.5 12.91 15.5 14V18.5H18.5ZM7.66 8.5C8.45 8.5 9 7.9 9 7.12C9 6.33 8.45 5.75 7.66 5.75C6.88 5.75 6.32 6.33 6.32 7.12C6.32 7.9 6.88 8.5 7.66 8.5ZM6.42 18.5H8.9V10.12H6.42V18.5Z"/></svg>
              </a>
            </div>
            <div className="flex items-start justify-center md:justify-start gap-2 text-sm text-slate-400">
              <MapPin className="w-4 h-4 mt-0.5 text-slate-500 flex-shrink-0" />
              <span>Colombo, Sri Lanka</span>
            </div>
          </div>

          {/* Right: Flagship Studios Branding */}
          <div className="text-center md:text-right bg-slate-800/50 p-5 rounded-2xl border border-slate-700/50">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold mb-2 flex items-center justify-center md:justify-end gap-1">
              Developed with <Heart className="w-4 h-4 text-rose-500 fill-rose-500 animate-pulse" /> by
            </p>
            <h4 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Flagship Studios
            </h4>
            <p className="text-sm text-slate-300 mt-1 font-medium">Dhaja Thusitha Weerasinghe</p>
            
            <div className="flex items-center justify-center md:justify-end gap-2 mt-3 text-sm font-mono bg-slate-900/50 inline-flex px-3 py-1.5 rounded-lg border border-slate-700 hover:border-slate-500 transition-colors">
              <Phone className="w-4 h-4 text-emerald-400" />
              <a href="tel:+94713080010" className="hover:text-white transition-colors">
                +94 713 080 010
              </a>
            </div>
          </div>

        </div>

        {/* Bottom: Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Physics Master. All rights reserved.</p>
          <p>Sri Lanka&apos;s Premium EdTech Platform</p>
        </div>
      </div>
    </footer>
  );
}
