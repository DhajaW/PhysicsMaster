const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://ibgmvziexrzqnlclhctp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZ212emlleHJ6cW5sY2xoY3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2ODM1OTAsImV4cCI6MjA5NzI1OTU5MH0.nLtGAg8f8o2n5r-BS9W_FszGXWVyVbRvWQb67YyCfsk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function translateText(text) {
  if (!text) return '';
  // If the text is purely mathematical like "$2 m/s^2$", return it directly to save API calls
  if (text.startsWith('$') && text.endsWith('$') && !/[a-zA-Z\s]{4,}/.test(text)) {
    return text;
  }
  
  const url = 'https://translate.googleapis.com/translate_a/single?client=gtx&sl=si&tl=en&dt=t&q=' + encodeURIComponent(text);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const data = await res.json();
    return data[0].map(item => item[0]).join('');
  } catch (err) {
    // If rate limited or error, return the original text
    return text;
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function translateQuestion(q) {
  const [translatedText, translatedExplanation, ...translatedOptions] = await Promise.all([
    translateText(q.question_text),
    translateText(q.explanation),
    ...q.options.map(opt => translateText(opt))
  ]);

  return {
    id: q.id,
    question_text_en: translatedText,
    options_en: translatedOptions,
    explanation_en: translatedExplanation
  };
}

async function run() {
  console.log('Fetching questions from Supabase...');
  const { data: questions, error } = await supabase
    .from('questions')
    .select('*');

  if (error) {
    console.error('Error fetching questions:', error);
    return;
  }

  console.log(`Fetched ${questions.length} questions.`);
  const translations = {};
  
  // Try loading existing translations to avoid re-translating if run again
  if (fs.existsSync('src/data/quiz_translations.json')) {
    try {
      const existing = JSON.parse(fs.readFileSync('src/data/quiz_translations.json'));
      Object.assign(translations, existing);
      console.log(`Loaded ${Object.keys(translations).length} existing translations.`);
    } catch (e) {
      // Ignore
    }
  }

  const batchSize = 10;
  for (let i = 0; i < questions.length; i += batchSize) {
    const batch = questions.slice(i, i + batchSize);
    console.log(`Processing batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(questions.length / batchSize)} (Questions ${i + 1} to ${Math.min(i + batchSize, questions.length)})...`);
    
    // Filter out questions that are already translated
    const pendingQuestions = batch.filter(q => !translations[q.id]);
    
    if (pendingQuestions.length > 0) {
      const results = await Promise.all(pendingQuestions.map(q => translateQuestion(q)));
      results.forEach(res => {
        translations[res.id] = {
          question_text_en: res.question_text_en,
          options_en: res.options_en,
          explanation_en: res.explanation_en
        };
      });
      // Save progressively
      fs.writeFileSync('src/data/quiz_translations.json', JSON.stringify(translations, null, 2));
      await sleep(600); // Batch delay
    } else {
      console.log('Batch already translated. Skipping.');
    }
  }

  console.log('Successfully completed all translations!');
}

run();
