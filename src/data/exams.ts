export interface EntranceExam {
  id: string;
  name: string;
  fullName: string;
  stream: string;
  conductingBody: string;
  registrationStart: string;
  registrationEnd: string;
  examDate: string;
  resultDate: string;
  applicationStatus: 'Open' | 'Closed' | 'Upcoming';
  applicationFee: string;
  eligibility: string;
  syllabusOverview: string[];
}

export const examsData: EntranceExam[] = [
  {
    id: 'jee-main',
    name: 'JEE Main',
    fullName: 'Joint Entrance Examination (Main)',
    stream: 'Engineering',
    conductingBody: 'National Testing Agency (NTA)',
    registrationStart: '2026-02-15',
    registrationEnd: '2026-03-31',
    examDate: '2026-05-10',
    resultDate: '2026-05-30',
    applicationStatus: 'Closed',
    applicationFee: '₹ 1,000',
    eligibility: '12th standard (Physics, Chemistry, Mathematics) with minimum 75% marks (65% for SC/ST)',
    syllabusOverview: ['Physics: Mechanics, Thermodynamics, Electromagnetism', 'Chemistry: Physical, Organic, Inorganic', 'Mathematics: Calculus, Algebra, Coordinate Geometry']
  },
  {
    id: 'jee-advanced',
    name: 'JEE Advanced',
    fullName: 'Joint Entrance Examination (Advanced)',
    stream: 'Engineering',
    conductingBody: 'IIT Kanpur',
    registrationStart: '2026-06-01',
    registrationEnd: '2026-06-15',
    examDate: '2026-06-28',
    resultDate: '2026-07-15',
    applicationStatus: 'Upcoming',
    applicationFee: '₹ 2,800',
    eligibility: 'Top 2,50,000 qualifiers of JEE Main exam',
    syllabusOverview: ['Highly conceptual problems in Physics', 'In-depth Organic/Inorganic mechanisms', 'Rigorous Mathematics applications']
  },
  {
    id: 'bitsat',
    name: 'BITSAT',
    fullName: 'BITS Admission Test',
    stream: 'Engineering',
    conductingBody: 'BITS Pilani',
    registrationStart: '2026-03-01',
    registrationEnd: '2026-05-05',
    examDate: '2026-05-22',
    resultDate: '2026-06-05',
    applicationStatus: 'Closed',
    applicationFee: '₹ 3,400',
    eligibility: '12th standard with PCM with minimum 75% aggregate marks and at least 60% in each subject',
    syllabusOverview: ['Physics & Chemistry concepts', 'Mathematics analytical skills', 'English Proficiency & Logical Reasoning (unique section)']
  },
  {
    id: 'cat',
    name: 'CAT',
    fullName: 'Common Admission Test',
    stream: 'Management',
    conductingBody: 'IIM Bangalore',
    registrationStart: '2026-08-01',
    registrationEnd: '2026-09-20',
    examDate: '2026-11-29',
    resultDate: '2027-01-05',
    applicationStatus: 'Upcoming',
    applicationFee: '₹ 2,400',
    eligibility: 'Graduation in any discipline with minimum 50% marks (45% for SC/ST)',
    syllabusOverview: ['Quantitative Aptitude (QA)', 'Data Interpretation & Logical Reasoning (DILR)', 'Verbal Ability & Reading Comprehension (VARC)']
  },
  {
    id: 'xat',
    name: 'XAT',
    fullName: 'Xavier Aptitude Test',
    stream: 'Management',
    conductingBody: 'XLRI Jamshedpur',
    registrationStart: '2026-08-15',
    registrationEnd: '2026-11-30',
    examDate: '2027-01-03',
    resultDate: '2027-01-25',
    applicationStatus: 'Upcoming',
    applicationFee: '₹ 2,100',
    eligibility: 'Recognized Bachelor\'s degree in any discipline',
    syllabusOverview: ['Quantitative Ability & Data Interpretation', 'Decision Making (unique logical component)', 'Verbal & Logical Ability', 'General Knowledge & Essay Writing']
  },
  {
    id: 'neet-ug',
    name: 'NEET UG',
    fullName: 'National Eligibility cum Entrance Test (Undergraduate)',
    stream: 'Medical',
    conductingBody: 'National Testing Agency (NTA)',
    registrationStart: '2026-03-01',
    registrationEnd: '2026-04-15',
    examDate: '2026-05-03',
    resultDate: '2026-06-12',
    applicationStatus: 'Closed',
    applicationFee: '₹ 1,700',
    eligibility: '12th standard with Physics, Chemistry, Biology/Biotechnology with min 50% marks, age min 17 years',
    syllabusOverview: ['Biology: Botany & Zoology (50% weightage)', 'Physics: Mechanics, Wave Motion, Modern Physics', 'Chemistry: Physical, Organic, Inorganic foundations']
  },
  {
    id: 'clat',
    name: 'CLAT',
    fullName: 'Common Law Admission Test',
    stream: 'Law',
    conductingBody: 'Consortium of National Law Universities',
    registrationStart: '2026-07-01',
    registrationEnd: '2026-11-10',
    examDate: '2026-12-06',
    resultDate: '2026-12-24',
    applicationStatus: 'Upcoming',
    applicationFee: '₹ 4,000',
    eligibility: '12th standard or equivalent with minimum 45% marks (40% for SC/ST)',
    syllabusOverview: ['English Language & Comprehension', 'Current Affairs including General Knowledge', 'Legal Reasoning (core evaluation)', 'Logical Reasoning', 'Quantitative Techniques']
  },
  {
    id: 'cuet',
    name: 'CUET UG',
    fullName: 'Common University Entrance Test (UG)',
    stream: 'Arts',
    conductingBody: 'National Testing Agency (NTA)',
    registrationStart: '2026-02-28',
    registrationEnd: '2026-04-05',
    examDate: '2026-05-15',
    resultDate: '2026-06-20',
    applicationStatus: 'Closed',
    applicationFee: '₹ 750 per subject',
    eligibility: '12th standard passed or appearing from a recognized school board',
    syllabusOverview: ['Section IA & IB: Languages (Reading Comprehension, Grammar)', 'Section II: Domain-specific subjects (History, Economics, Physics, etc.)', 'Section III: General Test (GK, Current Affairs, Math, Reasoning)']
  }
];

export interface ExamNotification {
  id: string;
  title: string;
  date: string;
  tag: 'Exam Date' | 'Registration' | 'Admit Card' | 'Results';
  link: string;
}

export const examNotifications: ExamNotification[] = [
  { id: 'n1', title: 'JEE Main 2026 Session 2 final answer key and scorecard released today.', date: 'May 25, 2026', tag: 'Results', link: '#jee-main' },
  { id: 'n2', title: 'CLAT 2026 Registration will open on July 1st, 2026 online.', date: 'May 24, 2026', tag: 'Registration', link: '#clat' },
  { id: 'n3', title: 'NEET UG 2026 Answer keys open for challenge online; check portal link.', date: 'May 22, 2026', tag: 'Exam Date', link: '#neet-ug' },
  { id: 'n4', title: 'CAT 2026 examination syllabus and IIM Bangalore core notification announced.', date: 'May 18, 2026', tag: 'Registration', link: '#cat' },
  { id: 'n5', title: 'JEE Advanced 2026 registration dates scheduled; checklist released.', date: 'May 15, 2026', tag: 'Registration', link: '#jee-advanced' }
];
