import { Heart, Phone, Mail, Sparkles } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 py-10 mt-16 border-t-4 border-blue-500 font-sans">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          {/* වම් පැත්ත: App එක ගැන (Meaningful Section) */}
          <div className="text-center md:text-left max-w-sm">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Physics Master
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              උසස් පෙළ භෞතික විද්යාව ඉතාමත් සරලව සහ නිවැරදිව ඉගෙන ගන්න. ශ්රී ලාංකේය සිසුන්ගේ විභාග ජයග්රහණය වෙනුවෙන්ම නිර්මාණය කළ අද්විතීය ඩිජිටල් අත්දැකීමකි.
            </p>
          </div>

          {/* දකුණු පැත්ත: Flagship Studios Branding */}
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

        {/* පහළම කොටස: Copyright */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {currentYear} Physics Master. All rights reserved.</p>
          <p>Sri Lanka&apos;s Premium EdTech Platform</p>
        </div>
      </div>
    </footer>
  );
}
