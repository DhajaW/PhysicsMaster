"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect, Suspense } from "react";
import { Clock, ChevronRight, ChevronLeft, CheckCircle2, Loader2, Award, RefreshCw, AlertTriangle, ArrowLeft, Eye } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useSearchParams } from "next/navigation";

// KaTeX CSS සහ Components
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// සාමාන්ය අකුරු සහ $...$ අස්සේ තියෙන LaTeX සමීකරණ වෙන් කරලා Render කරන Helper Function එක
const renderTextWithLatex = (text) => {
  if (!text) return "";
  const parts = text.split('$');
  return parts.map((part, index) => {
    // ඔත්තේ සංඛ්යා (Odd indices) වල තියෙන්නේ $ වලින් වටවුණු LaTeX සමීකරණ
    if (index % 2 !== 0) {
      return <InlineMath key={index} math={part} />;
    }
    // ඉරට්ටේ සංඛ්යා වල තියෙන්නේ සාමාන්ය අකුරු
    return <span key={index}>{part}</span>;
  });
};

function QuizContent() {
  const searchParams = useSearchParams();
  const paperParam = searchParams.get("paper") || "1";
  const selectedPaper = parseInt(paperParam, 10) || 1;

  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [timeLeft, setTimeLeft] = useState(2 * 60 * 60); // 2 hours (7200 seconds)
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);

  console.log("🧩 QuizContent Render State:", {
    isSubmitted,
    reviewMode,
    loading,
    questionsLength: questions.length,
    selectedPaper
  });

  // 1. Supabase එකෙන් ප්රශ්න Fetch කිරීම
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('paper_no', selectedPaper) // මෙතනින් තමයි පේපර් එක තෝරන්නේ!
        .order('id', { ascending: true })
        .limit(50); // උපරිම ප්රශ්න 50යි ගන්නේ

      if (error) {
        console.error("Error fetching questions:", error);
      } else {
        setQuestions(data || []);
      }
      setLoading(false);
    };

    fetchQuestions();
  }, [selectedPaper]);

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0 || loading || isSubmitted) return;
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading, isSubmitted]);

  // Auto-submit when timer reaches 0
  useEffect(() => {
    if (timeLeft === 0 && !isSubmitted && !loading && questions.length > 0) {
      handleSubmit();
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleSelectOption = (index) => {
    if (isSubmitted) return; // Prevent changing answers after submission
    setAnswers({ ...answers, [currentQ]: index });
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setReviewMode(false); // Show Results Dashboard first!
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQ(0);
    setTimeLeft(2 * 60 * 60); // Reset to 2 hours
    setIsSubmitted(false);
    setReviewMode(false);
  };

  // Score Calculation Helpers
  const getCorrectAnswersCount = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] !== undefined && answers[idx] === q.correct_answer) {
        score++;
      }
    });
    return score;
  };

  const getUnansweredCount = () => {
    let unanswered = 0;
    questions.forEach((_, idx) => {
      if (answers[idx] === undefined) {
        unanswered++;
      }
    });
    return unanswered;
  };

  const correctCount = getCorrectAnswersCount();
  const unansweredCount = getUnansweredCount();
  const wrongCount = questions.length - correctCount - unansweredCount;
  const scorePercent = questions.length > 0 ? Math.round((correctCount / questions.length) * 100) : 0;

  // Grade and Feedback Generation
  let gradeText = "නැවත පුහුණු වෙමු! 📚";
  let gradeColor = "text-red-400 border-red-500/30 bg-red-500/10";
  let feedbackText = "භෞතික විද්‍යා සිද්ධාන්ත නැවත හොඳින් අධ්‍යයනය කර නැවත උත්සාහ කරන්න.";

  if (scorePercent >= 75) {
    gradeText = "විශිෂ්ටයි! A සාමාර්ථයක් 🏆🎓";
    gradeColor = "text-yellow-400 border-yellow-500/30 bg-yellow-500/10";
    feedbackText = "ඔබගේ සූදානම ඉතාමත් විශිෂ්ට මට්ටමක පවතී. දිගටම මේ ආකාරයෙන්ම කැපවෙන්න!";
  } else if (scorePercent >= 60) {
    gradeText = "ඉතා හොඳයි! B සාමාර්ථයක් 🌟";
    gradeColor = "text-emerald-400 border-emerald-500/30 bg-emerald-500/10";
    feedbackText = "නියමයි මචන්! තව සුළු වැරදි කිහිපයක් පමණයි හැදාගන්න තියෙන්නේ. දිගටම කරගෙන යමු.";
  } else if (scorePercent >= 45) {
    gradeText = "සාමාන්‍යයි! C/S සාමාර්ථයක් 💪";
    gradeColor = "text-blue-400 border-blue-500/30 bg-blue-500/10";
    feedbackText = "තව ටිකක් උත්සාහ කළහොත් ඔබට ඉහළ සාමාර්ථයකට ළඟා විය හැක.";
  }

  // Loading Screen
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-cyan-500">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-xl font-semibold animate-pulse">ප්‍රශ්න පත්‍රය (Paper {selectedPaper}) සූදානම් කරමින් පවතී...</p>
      </div>
    );
  }

  // Empty Database Screen
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center text-gray-400">
        <div className="text-center p-8 bg-gray-900 border border-gray-800 rounded-3xl max-w-md shadow-2xl">
          <AlertTriangle className="w-16 h-16 text-yellow-500 mx-auto mb-4 animate-bounce" />
          <h3 className="text-xl font-bold text-white mb-2">ප්‍රශ්න කිසිවක් හමු නොවීය ❌</h3>
          <p className="text-sm text-gray-500 mb-6">දැනට ප්‍රශ්න පත්‍ර {selectedPaper} සඳහා ප්‍රශ්න කිසිවක් දත්ත ගබඩාවේ සටහන් වී නොමැත.</p>
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition">
            <ArrowLeft className="w-5 h-5 mr-2" /> Dashboard එකට යන්න
          </Link>
        </div>
      </div>
    );
  }

  // Result Dashboard Screen
  if (isSubmitted && !reviewMode) {
    return (
      <div className="min-h-screen bg-gray-950 text-white p-6 pt-24 font-sans">
        <div className="max-w-3xl mx-auto space-y-8 animate-fadeIn">
          
          {/* Result Card Header */}
          <div className="bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl text-center space-y-6">
            <Award className="w-20 h-20 text-yellow-400 mx-auto animate-bounce" />
            <div>
              <span className={`px-4 py-1.5 rounded-full border text-sm font-bold uppercase tracking-wider ${gradeColor}`}>
                {gradeText}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
                {scorePercent}% ලකුණු ප්‍රමාණයක්!
              </h1>
              <p className="text-sm text-slate-350 mt-3 max-w-md mx-auto leading-relaxed">
                {feedbackText}
              </p>
            </div>

            {/* Progress representation */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="bg-gray-850/50 p-4 rounded-2xl border border-gray-800/60">
                <span className="block text-2xl font-extrabold text-green-400">{correctCount}</span>
                <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">නිවැරදි</span>
              </div>
              <div className="bg-gray-850/50 p-4 rounded-2xl border border-gray-800/60">
                <span className="block text-2xl font-extrabold text-red-400">{wrongCount}</span>
                <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">වැරදි</span>
              </div>
              <div className="bg-gray-850/50 p-4 rounded-2xl border border-gray-800/60">
                <span className="block text-2xl font-extrabold text-gray-400">{unansweredCount}</span>
                <span className="text-xs text-gray-400 uppercase font-semibold tracking-wider">නොකළ</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setReviewMode(true)}
              className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl shadow-lg transition-all cursor-pointer"
            >
              <Eye className="w-5 h-5 mr-2" /> පිළිතුරු පත්‍රය පරීක්ෂා කරන්න
            </button>
            <button
              onClick={handleRestart}
              className="flex-1 inline-flex items-center justify-center px-6 py-4 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-2xl shadow-md border border-gray-750 transition-all cursor-pointer"
            >
              <RefreshCw className="w-5 h-5 mr-2" /> නැවත උත්සාහ කරන්න
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-4 bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold rounded-2xl border border-slate-800 transition-all"
            >
              මුල් පිටුවට
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-6 pt-24 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Top Control Panel */}
        <div className="flex justify-between items-center bg-gray-900 p-4 rounded-2xl border border-gray-800 shadow-xl">
          <div className="flex items-center gap-3 text-cyan-400 font-bold">
            <Clock className="w-6 h-6 animate-pulse" />
            <span className="text-xl tracking-wider font-mono">{formatTime(timeLeft)}</span>
          </div>
          <div className="text-sm font-semibold text-gray-400">
            Paper {selectedPaper} | ප්‍රශ්න {currentQ + 1} / {questions.length}
          </div>
          {isSubmitted ? (
            <button 
              onClick={() => setReviewMode(false)}
              className="px-4 py-1.5 rounded-xl border border-yellow-500/40 text-yellow-400 bg-yellow-500/10 font-bold text-xs hover:bg-yellow-500/20 transition cursor-pointer"
            >
              ප්‍රතිඵල බැලීමට
            </button>
          ) : (
            <button 
              onClick={handleSubmit}
              className="px-4 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow transition cursor-pointer"
            >
              End Test ❌
            </button>
          )}
        </div>

        {/* Sidebar Question Navigation Grid */}
        <div className="bg-gray-900/50 backdrop-blur p-4 rounded-2xl border border-gray-800/80">
          <div className="flex flex-wrap gap-2 justify-center">
            {questions.map((_, index) => {
              const isAnswered = answers[index] !== undefined;
              const isActive = currentQ === index;
              let btnClass = "border-gray-700 bg-gray-800/30 text-gray-400";
              
              if (isSubmitted) {
                const isCorrect = answers[index] === questions[index].correct_answer;
                if (answers[index] === undefined) {
                  btnClass = "border-gray-700 bg-gray-800/20 text-gray-500";
                } else {
                  btnClass = isCorrect 
                    ? "border-green-500 bg-green-500/25 text-green-300"
                    : "border-red-500 bg-red-500/25 text-red-300";
                }
              } else {
                if (isActive) {
                  btnClass = "border-cyan-500 bg-cyan-500/20 text-cyan-400 font-extrabold";
                } else if (isAnswered) {
                  btnClass = "border-gray-500 bg-gray-700 text-white font-bold";
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => setCurrentQ(index)}
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center text-sm font-semibold transition-all hover:scale-105 cursor-pointer ${btnClass}`}
                >
                  {index + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Question Card Box */}
        <div className="bg-gray-900 p-8 rounded-3xl border border-gray-850 shadow-2xl relative overflow-hidden group">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:20px_20px]"></div>

          <h2 className="text-xl md:text-2xl font-bold leading-relaxed mb-8 relative z-10 text-slate-100">
            {currentQ + 1}. {renderTextWithLatex(currentQuestion.question_text)}
          </h2>

          {/* Options Grid */}
          <div className="space-y-4 relative z-10">
            {currentQuestion.options.map((opt, index) => {
              const isSelected = answers[currentQ] === index;
              const isCorrectOpt = currentQuestion.correct_answer === index;
              
              let optStyle = "bg-gray-800/40 border-gray-750 text-gray-300 hover:bg-gray-800 hover:border-gray-600";
              let badgeStyle = "border-gray-500 text-gray-400";
              let badgeContent = index + 1;

              if (isSubmitted) {
                if (isCorrectOpt) {
                  optStyle = "bg-green-500/15 border-green-500 text-green-100 shadow-[0_0_12px_rgba(34,197,94,0.15)]";
                  badgeStyle = "bg-green-500 border-green-500 text-gray-950 font-bold";
                  badgeContent = "✓";
                } else if (isSelected) {
                  optStyle = "bg-red-500/15 border-red-500 text-red-100";
                  badgeStyle = "bg-red-500 border-red-500 text-white font-bold";
                  badgeContent = "✗";
                } else {
                  optStyle = "bg-gray-800/20 border-gray-800/60 text-gray-500 opacity-60";
                  badgeStyle = "border-gray-750 text-gray-600";
                }
              } else {
                if (isSelected) {
                  optStyle = "bg-cyan-900/30 border-cyan-500 text-cyan-100 shadow-[0_0_15px_rgba(6,182,212,0.1)] scale-[1.01]";
                  badgeStyle = "bg-cyan-500 border-cyan-500 text-gray-950 font-bold";
                  badgeContent = <CheckCircle2 className="w-5 h-5" />;
                }
              }

              return (
                <button
                  key={index}
                  disabled={isSubmitted}
                  onClick={() => handleSelectOption(index)}
                  className={`w-full flex items-center p-4 rounded-2xl border transition-all duration-200 text-left text-base md:text-lg cursor-pointer ${optStyle}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 border shrink-0 transition-colors ${badgeStyle}`}>
                    {badgeContent}
                  </div>
                  <div className="leading-relaxed">{renderTextWithLatex(opt)}</div>
                </button>
              );
            })}
          </div>

          {/* Review Mode Explanatory Notes */}
          {isSubmitted && currentQuestion.explanation && (
            <div className="mt-8 p-5 bg-blue-500/10 border border-blue-500/30 rounded-2xl space-y-2.5 animate-fadeIn">
              <h4 className="text-sm font-extrabold text-blue-400 uppercase tracking-widest flex items-center gap-1.5">
                💡 විවරණය (Explanation):
              </h4>
              <p className="text-sm text-blue-200 leading-relaxed font-sans">
                {renderTextWithLatex(currentQuestion.explanation)}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Control Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => setCurrentQ((prev) => Math.max(0, prev - 1))}
            disabled={currentQ === 0}
            className="flex items-center px-5 py-3.5 bg-gray-900 hover:bg-gray-850 border border-gray-800 text-white font-bold rounded-2xl disabled:opacity-40 disabled:hover:bg-gray-900 transition cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 mr-1" /> පෙර ප්‍රශ්නය
          </button>

          {currentQ === questions.length - 1 ? (
            !isSubmitted ? (
              <button 
                onClick={handleSubmit}
                className="px-8 py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl font-extrabold text-white hover:shadow-lg hover:shadow-green-500/20 hover:-translate-y-0.5 transition cursor-pointer"
              >
                Submit Quiz 🚀
              </button>
            ) : (
              <button 
                onClick={handleRestart}
                className="px-8 py-3.5 bg-gray-800 hover:bg-gray-700 rounded-2xl font-extrabold text-white transition cursor-pointer"
              >
                Reset Exam 🔄
              </button>
            )
          ) : (
            <button
              onClick={() => setCurrentQ((prev) => Math.min(questions.length - 1, prev + 1))}
              className="flex items-center px-5 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-2xl hover:-translate-y-0.5 shadow-md shadow-cyan-900/10 transition cursor-pointer"
            >
              ඊළඟ ප්‍රශ්නය <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

export default function QuizEngine() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-cyan-500">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-xl font-semibold animate-pulse">ප්‍රශ්න පත්‍රය සූදානම් කරමින් පවතී...</p>
      </div>
    }>
      <QuizContent />
    </Suspense>
  );
}
