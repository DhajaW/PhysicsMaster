const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://ibgmvziexrzqnlclhctp.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImliZ212emlleHJ6cW5sY2xoY3RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2ODM1OTAsImV4cCI6MjA5NzI1OTU5MH0.nLtGAg8f8o2n5r-BS9W_FszGXWVyVbRvWQb67YyCfsk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  const { data, error, count } = await supabase
    .from('questions')
    .select('*', { count: 'exact' });

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log('Total questions in database:', count);
  console.log('Unique units in database:', [...new Set(data.map(q => q.unit))]);
  console.log('Unique paper_no in database:', [...new Set(data.map(q => q.paper_no))]);
  
  // Show first question for each paper_no
  const paperNos = [...new Set(data.map(q => q.paper_no))];
  for (const p of paperNos) {
    const q = data.find(item => item.paper_no === p);
    console.log(`\n--- Paper ${p} Question 1 ---`);
    console.log('Question Text:', q.question_text);
    console.log('Options:', q.options);
    console.log('Explanation:', q.explanation);
  }
}

run();
