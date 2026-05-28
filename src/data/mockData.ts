// --- NEWS ARTICLES ---
export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  date: string;
  readTime: string;
  summary: string;
  imageUrl: string;
}

export const newsArticles: NewsArticle[] = [
  {
    id: 'art-1',
    title: 'NTA Declares JEE Main 2026 Results: Historic Cutoffs Reported',
    source: 'National News Desk',
    date: 'May 25, 2026',
    readTime: '3 min read',
    summary: 'The National Testing Agency has officially declared the results for the Joint Entrance Examination (JEE) Main. Experts note a significant increase in cutoffs due to high scores and an unprecedented volume of applicants. Read details on how to register for counseling.',
    imageUrl: 'engineering'
  },
  {
    id: 'art-2',
    title: 'Top MBA Recruiters for 2026: Technology & Consulting Lead the Way',
    source: 'Business Insider',
    date: 'May 23, 2026',
    readTime: '5 min read',
    summary: 'As placement reports trickle in from top-tier IIMs and XLRI, statistics show that management consulting and tech conglomerates (like McKinsey, Amazon, BCG) remain the highest employers. Financial roles saw a 12% rise in starting average packages.',
    imageUrl: 'management'
  },
  {
    id: 'art-3',
    title: 'Medical Admissions 2026: Simplified Registration and counseling Rules Explained',
    source: 'Healthcare Times',
    date: 'May 20, 2026',
    readTime: '4 min read',
    summary: 'With NEET UG results around the corner, MCC (Medical Counseling Committee) has released updated rules. The counseling will feature simplified registration steps, unified quota selections, and a centralized portal to apply to AIIMS and state medical colleges.',
    imageUrl: 'medical'
  }
];

// --- PSYCHOMETRIC TEST (CAREER COMPASS) ---
export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    scores: { [key: string]: number }; // Maps fields to scores
  }[];
}

export const compassQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: 'When starting a new group project, what role do you naturally assume?',
    options: [
      { text: 'Designing the blueprint, writing code, or building the model.', scores: { Engineering: 4, Science: 2 } },
      { text: 'Organizing timelines, assigning tasks, and leading discussions.', scores: { Management: 4, Law: 2 } },
      { text: 'Investigating core theories, writing reports, or researching details.', scores: { Science: 4, Arts: 2 } },
      { text: 'Supporting team members\' wellbeing and solving interpersonal conflicts.', scores: { Medical: 4, Arts: 3 } }
    ]
  },
  {
    id: 2,
    question: 'Which of the following problems would you find most satisfying to solve?',
    options: [
      { text: 'Optimizing a slow application or repairing a mechanical glitch.', scores: { Engineering: 4 } },
      { text: 'Mediating a heated debate and drafting a fair agreement.', scores: { Law: 4, Management: 2 } },
      { text: 'Diagnosing a complex symptom or helping someone recover from injury.', scores: { Medical: 4 } },
      { text: 'Analyzing financial investments or boosting a brand\'s market share.', scores: { Management: 4 } }
    ]
  },
  {
    id: 3,
    question: 'How do you prefer to spend your free time?',
    options: [
      { text: 'Tinkering with gadgets, gaming, or playing around with tech.', scores: { Engineering: 4, Science: 2 } },
      { text: 'Reading about politics, philosophy, history, or creative writing.', scores: { Arts: 4, Law: 3 } },
      { text: 'Volunteering at a clinic, learning about human anatomy, or fitness.', scores: { Medical: 4, Science: 2 } },
      { text: 'Following market trends, trading, or reading biographies of executives.', scores: { Management: 4 } }
    ]
  },
  {
    id: 4,
    question: 'Choose a setting where you would feel most comfortable working:',
    options: [
      { text: 'A dynamic, high-tech development lab or software studio.', scores: { Engineering: 4 } },
      { text: 'A corporate boardroom, bustling startup workspace, or finance desk.', scores: { Management: 4 } },
      { text: 'A clinical hospital ward, pharmacy lab, or medical research facility.', scores: { Medical: 4, Science: 3 } },
      { text: 'A court, library archives, design studio, or dynamic legal clinic.', scores: { Law: 4, Arts: 4 } }
    ]
  },
  {
    id: 5,
    question: 'When researching a topic, you are most drawn to:',
    options: [
      { text: 'Algorithms, engineering mathematics, and technical specifications.', scores: { Engineering: 4, Science: 2 } },
      { text: 'Consumer behavior, corporate psychology, and logistics spreadsheets.', scores: { Management: 4 } },
      { text: 'Case laws, constitutional histories, and debate principles.', scores: { Law: 4 } },
      { text: 'Social narratives, linguistics, creative designs, and philosophies.', scores: { Arts: 4 } }
    ]
  },
  {
    id: 6,
    question: 'If you had to write a magazine article, what topic would you pick?',
    options: [
      { text: 'The Future of Quantum Computing and Artificial Intelligence.', scores: { Engineering: 4, Science: 3 } },
      { text: 'How Modern Fintech Startups are Dislocating Traditional Banking.', scores: { Management: 4 } },
      { text: 'Gene-Editing Breakthroughs: The Ethical Dilemma of CRISPR.', scores: { Medical: 4, Science: 4 } },
      { text: 'Analyzing the Legal Precedents of Modern Privacy Laws.', scores: { Law: 4, Arts: 2 } }
    ]
  },
  {
    id: 7,
    question: 'Which school subject did you enjoy or find easiest?',
    options: [
      { text: 'Mathematics, Computer Science, or Applied Physics.', scores: { Engineering: 4, Science: 3 } },
      { text: 'Business Studies, Commerce, or Economics.', scores: { Management: 4 } },
      { text: 'Biology, Chemistry, or Environmental Studies.', scores: { Medical: 4, Science: 4 } },
      { text: 'English Literature, History, Civics, or Art.', scores: { Arts: 4, Law: 3 } }
    ]
  },
  {
    id: 8,
    question: 'How do you make important life decisions?',
    options: [
      { text: 'Gathering data, checking logic, and optimizing the flow.', scores: { Engineering: 4, Science: 4 } },
      { text: 'Calculating risks, costs, benefits, and long-term milestones.', scores: { Management: 4, Law: 2 } },
      { text: 'Consulting intuition, ethical impact, and helping others.', scores: { Medical: 4, Arts: 4 } },
      { text: 'Analyzing precedents, rules, fairness, and solid proof.', scores: { Law: 4 } }
    ]
  },
  {
    id: 9,
    question: 'What kind of legacy do you want to leave behind?',
    options: [
      { text: 'Inventions, codes, or structures that make lives highly efficient.', scores: { Engineering: 4 } },
      { text: 'Successful organizations, products, or financial security.', scores: { Management: 4 } },
      { text: 'Treating illnesses, saving lives, or promoting public wellness.', scores: { Medical: 4, Science: 2 } },
      { text: 'Defending human rights, writing literature, or educating the public.', scores: { Law: 4, Arts: 4 } }
    ]
  },
  {
    id: 10,
    question: 'If you were gifted ₹10,00,000, you would primarily use it to:',
    options: [
      { text: 'Build a high-end customized laboratory or buy software rigs.', scores: { Engineering: 4, Science: 3 } },
      { text: 'Invest in stocks, mutual funds, or seed a small retail brand.', scores: { Management: 4 } },
      { text: 'Fund a free medical camp or invest in pharmaceutical research.', scores: { Medical: 4, Science: 3 } },
      { text: 'Support advocacy panels, publish a historical novel, or study abroad.', scores: { Law: 3, Arts: 4 } }
    ]
  }
];

export interface CareerResult {
  title: string;
  desc: string;
  traits: string[];
  careers: string[];
  courses: string[];
}

export const compassResults: { [key: string]: CareerResult } = {
  Engineering: {
    title: 'The Tech Innovator (Engineering)',
    desc: 'You possess a logical, structural, and analytical mind. You enjoy understanding how things operate, building functional systems, and writing code to automate processes.',
    traits: ['Analytical Thinking', 'Problem Solving', 'Data-driven Logic', 'System Design'],
    careers: ['Software Architect', 'AI/ML Engineer', 'Robotics Specialist', 'Aerospace Designer', 'Data Scientist'],
    courses: ['B.Tech Computer Science', 'B.Tech Electrical Engineering', 'B.E. Mechanical Engineering', 'M.Tech AI']
  },
  Management: {
    title: 'The Visionary Leader (Management & Finance)',
    desc: 'You are highly strategic, organized, and business-savvy. You possess natural leadership capabilities, understand financial systems, and enjoy optimizing team operations.',
    traits: ['Leadership', 'Strategic Planning', 'Risk Analysis', 'Public Communication'],
    careers: ['Investment Banker', 'Product Manager', 'Management Consultant', 'Entrepreneur', 'HR Operations Director'],
    courses: ['MBA (General Management)', 'PGDM in Business Analytics', 'BBA in Finance', 'PGDM in HR']
  },
  Medical: {
    title: 'The Empathetic Healer (Medical & Healthcare)',
    desc: 'You are highly compassionate, research-minded, and dedicated to human welfare. You are drawn to understanding biological functions and helping patients recover.',
    traits: ['Empathy', 'Scientific Observation', 'Focus Under Pressure', 'Patient Care'],
    careers: ['Cardiologist', 'Surgeon', 'Clinical Researcher', 'Pharmacologist', 'Hospital Administrator'],
    courses: ['MBBS', 'B.Sc. Nursing', 'M.D. in General Medicine', 'B.Pharm']
  },
  Law: {
    title: 'The Guardian of Justice (Legal Studies)',
    desc: 'You are analytical, detail-oriented, and highly articulate. You love reading, evaluating complex arguments, and standing up for rules, fairness, and rights.',
    traits: ['Critical Analysis', 'Persuasive Speech', 'Detailed Drafting', 'Ethical Rigor'],
    careers: ['Corporate Attorney', 'Litigation Counsel', 'Arbitrator/Mediator', 'Legal Tech Expert', 'Judicial Magistrate'],
    courses: ['B.A. LL.B. (Hons.) Dual Degree', 'LL.M. in Corporate Law', 'BBA LL.B.']
  },
  Arts: {
    title: 'The Creative Philosopher (Humanities & Arts)',
    desc: 'You possess deep emotional intelligence, artistic vision, and a passion for culture. You are highly expressive, communicative, and drawn to history, literature, or sociology.',
    traits: ['Creative Expression', 'Social Empathy', 'Linguistic Aptitude', 'Philosophical Thought'],
    careers: ['Content Strategist', 'Foreign Policy Analyst', 'Journalist', 'Creative Writer', 'Sociologist'],
    courses: ['B.A. (Hons.) English Literature', 'B.A. in History & Sociology', 'B.Sc. in Psychology']
  },
  Science: {
    title: 'The Scientific Pioneer (Basic & Applied Sciences)',
    desc: 'You are infinitely curious, methodical, and observant. You love exploring the mysteries of nature, performing experiments, and formulating rigorous theories.',
    traits: ['Curiosity', 'Methodical Experimentation', 'Statistical Skills', 'Hypothesis Testing'],
    careers: ['Research Scientist', 'Biotechnologist', 'Quantum Physics Analyst', 'Environmental Consultant'],
    courses: ['B.Sc. Computer Science', 'B.Sc. Physics', 'B.Sc. Biotechnology', 'M.Sc. Data Science']
  }
};

// --- SAARTHIGPT KNOWLEDGE BASE ---
export interface BotMessage {
  text: string;
  isBot: boolean;
  options?: string[];
}

export const saarthiReplies: { keywords: string[]; reply: string; options?: string[] }[] = [
  {
    keywords: ['hi', 'hello', 'hey', 'start', 'counseling'],
    reply: "Hello! I am **SaarthiGPT**, your personal AI Career Counselor at Career Grazers. I can help you find your dream college, predict admissions based on your scores, recommend entrance exams, or assist with your Common Application Form (CAF). \n\nWhat would you like to explore today?",
    options: ['Explore Colleges', 'Predict Admissions', 'Apply to Colleges (CAF)', 'Take Career Compass Quiz']
  },
  {
    keywords: ['engineering', 'btech', 'iit', 'bits', 'dtu', 'vit'],
    reply: "Engineering is a highly sought-after stream at Career Grazers! We have detailed profiles for premium institutions like:\n- **IIT Delhi** (Public, Avg Package: 22.5 LPA, Exams: JEE Advanced)\n- **BITS Pilani** (Private, Avg Package: 18.2 LPA, Exams: BITSAT)\n- **DTU Delhi** (Public, Avg Package: 15.6 LPA, Exams: JEE Main)\n- **VIT Vellore** (Private, Avg Package: 9.2 LPA, Exams: VITEEE)\n\nWould you like to search all engineering colleges or check the **College Predictor**?",
    options: ['Search Engineering Colleges', 'Open College Predictor', 'View Exam Calendars']
  },
  {
    keywords: ['management', 'mba', 'iim', 'xlri', 'fms', 'cat'],
    reply: "Management programs are excellent for building leadership! Top institutions on Career Grazers include:\n- **IIM Ahmedabad** (Public, Avg Package: 32.8 LPA, Exams: CAT)\n- **IIM Bangalore** (Public, Avg Package: 31.5 LPA, Exams: CAT)\n- **XLRI Jamshedpur** (Private, Avg Package: 27.2 LPA, Exams: XAT)\n- **FMS Delhi** (Public, legendary ROI with fees of only ₹48,000/yr, Avg Package: 28.0 LPA!)\n\nWhich business school details can I provide for you?",
    options: ['Search MBA Colleges', 'Read FMS Delhi Details', 'Learn about CAT Exam']
  },
  {
    keywords: ['medical', 'mbbs', 'aiims', 'mamc', 'cmc', 'neet'],
    reply: "For medical aspirants, clinical experience is everything! Top featured medical institutes include:\n- **AIIMS New Delhi** (#1 ranked globally in patient care, subsidized fee: ₹1,628/yr, Exams: NEET UG)\n- **MAMC Delhi** (Public, attached to LNJP hospital, Exams: NEET UG)\n- **CMC Vellore** (Private pioneer in medical transplants, Exams: NEET UG)\n\nDo you want to know about NEET UG registrations or search medical colleges?",
    options: ['Search Medical Colleges', 'NEET UG Exam Details', 'Go to CAF Portal']
  },
  {
    keywords: ['law', 'clat', 'nls', 'nalsar', 'llb'],
    reply: "Legal careers are highly rewarding. Top national law schools include:\n- **NLSIU Bangalore** (#1 ranked Law university, Avg Package: 16.5 LPA, Exams: CLAT)\n- **NALSAR Hyderabad** (Excellent legal research and campus, Exams: CLAT)\n\nWould you like to explore CLAT dates or view full law course curricula?",
    options: ['Search Law Colleges', 'CLAT Exam Calendar', 'Compare Law Colleges']
  },
  {
    keywords: ['predict', 'predictor', 'rank', 'cutoff', 'score'],
    reply: "Predicting your admission chances is easy! We have a built-in **College Predictor** tool. Input your exam (JEE Main, CAT, NEET, CLAT), your rank, and your category to instantly get a categorized list of colleges with 'High', 'Medium', or 'Low' chances of acceptance.",
    options: ['Open College Predictor', 'Search Colleges by Exam', 'Connect with Live Counselor']
  },
  {
    keywords: ['caf', 'common application', 'apply', 'registration', 'upload'],
    reply: "The **Common Application Form (CAF)** is Career Grazers' unique feature. It lets you fill in your details, enter academic scores, select up to 3 colleges, upload mock transcripts, and submit a single application to multiple colleges instantly!\n\nWould you like to start your CAF application now?",
    options: ['Fill Common Application (CAF)', 'Track Existing Applications', 'Help with CAF Uploads']
  },
  {
    keywords: ['compare', 'comparison', 'different'],
    reply: "You can compare colleges side-by-side! Browse colleges in the directory, check the 'Compare' boxes, and a bottom comparison panel will slide up. Click 'Compare Now' to compare fees, ratings, placements, and top recruiters in a clean grid.",
    options: ['Search Colleges to Compare', 'Check Compare Guide', "Saarthi's Picks"]
  },
  {
    keywords: ['fees', 'cheap', 'low cost', 'subsidized'],
    reply: "Looking for high return on investment (ROI)? Here are some excellent low-cost choices:\n- **FMS Delhi (MBA)**: Fees are just ₹48,000 per year with avg placements of 28.0 LPA.\n- **AIIMS Delhi (MBBS)**: Subsidized fee is just ₹1,628 per year.\n- **MAMC Delhi (MBBS)**: Annual fee is around ₹15,450.\n- **Miranda House (Arts)**: Elite DU education at just ₹14,500 per year.\n\nWould you like to search the college directory and sort by fees?",
    options: ['Search and Filter by Fees', "Saarthi's Premium Colleges", 'Common Application Form']
  }
];

export const getSaarthiResponse = (query: string): { reply: string; options?: string[] } => {
  const cleanQuery = query.toLowerCase().trim();
  
  for (const item of saarthiReplies) {
    if (item.keywords.some(keyword => cleanQuery.includes(keyword))) {
      return { reply: item.reply, options: item.options };
    }
  }
  
  return {
    reply: "I understand you are asking about colleges or career advice! I can search our 16 detailed institutional listings, check exam eligibility, estimate cutoffs with our **College Predictor**, or guide you through the **Common Application Form (CAF)**.\n\nCould you please refine your question or select one of these popular portals?",
    options: ['Explore Colleges', 'Predict College Admissions', 'Take Career Compass Test', 'Chat with Counselors']
  };
};
