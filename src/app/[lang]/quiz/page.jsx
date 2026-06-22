import QuizClient from "./QuizClient";

export async function generateMetadata({ params }) {
  const { lang = 'si' } = await params;
  return {
    title: lang === 'en' 
      ? 'A/L Physics Quizzes & Practice Exams | Physics Master A/L' 
      : 'භෞතික විද්‍යාව ප්‍රශ්න පත්‍ර (A/L Physics Quizzes) | Physics Master A/L',
    description: lang === 'en'
      ? 'Attempt GCE A/L Structured Essay and MCQ Physics practice tests, check score reports, and review answers with explanations.'
      : 'උසස් පෙළ භෞතික විද්‍යාව ව්‍යුහගත සහ බහුවරණ (MCQ) ප්‍රශ්න පත්‍ර වලට කාලය අනුව උත්තර දී ඔබේ ලකුණු මට්ටම සහ විවරණ (Explanations) මෙතැනින් ලබාගන්න.',
    alternates: {
      canonical: `/${lang}/quiz`,
    },
  };
}

export default async function QuizPage({ params }) {
  const { lang = 'si' } = await params;
  return <QuizClient lang={lang} />;
}
