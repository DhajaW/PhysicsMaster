import FormulasClient from "./FormulasClient";

export async function generateMetadata({ params }) {
  const { lang = 'si' } = await params;
  return {
    title: lang === 'en' 
      ? 'Physics Formulas & Equations | Physics Master A/L' 
      : 'සූත්‍ර සහ සමීකරණ (Physics Formulas) | Physics Master A/L',
    description: lang === 'en'
      ? 'Study all formulas, equations, SI units, and short descriptions of the A/L Physics syllabus in one place. (LaTeX rendered equations)'
      : 'උසස් පෙළ භෞතික විද්‍යාව විෂය නිර්දේශයේ සියලුම සූත්‍ර, සමීකරණ, ඒකක සහ කෙටි විස්තර එකම තැනකින් අධ්‍යයනය කරන්න. (LaTeX rendered equations)',
    alternates: {
      canonical: `/${lang}/formulas`,
    },
  };
}

export default async function FormulasPage({ params }) {
  const { lang = 'si' } = await params;
  return <FormulasClient lang={lang} />;
}
