export interface CourseInfo {
  name: string;
  duration: string;
  fees: string;
  eligibility: string;
}

export interface College {
  id: string;
  name: string;
  logoColor: string;
  location: string;
  state: string;
  stream: 'Engineering' | 'Management' | 'Medical' | 'Law' | 'Science' | 'Arts';
  type: 'Public' | 'Private';
  established: number;
  rating: number;
  reviewsCount: number;
  avgFees: number; // in INR per year
  avgPlacement: number; // in LPA
  highestPlacement: number; // in LPA
  examsAccepted: string[];
  affiliation: string;
  topRecruiters: string[];
  shortDesc: string;
  longDesc: string;
  courses: CourseInfo[];
  facilities: string[];
}

export const collegesData: College[] = [
  // --- ENGINEERING COLLEGES ---
  {
    id: 'iit-delhi',
    name: 'Indian Institute of Technology (IIT), Delhi',
    logoColor: '#0a4b8f',
    location: 'New Delhi',
    state: 'Delhi',
    stream: 'Engineering',
    type: 'Public',
    established: 1961,
    rating: 4.9,
    reviewsCount: 1420,
    avgFees: 220000,
    avgPlacement: 22.5,
    highestPlacement: 120.0,
    examsAccepted: ['JEE Advanced', 'JEE Main', 'GATE'],
    affiliation: 'Autonomous',
    topRecruiters: ['Microsoft', 'Google', 'Apple', 'Uber', 'Goldman Sachs', 'Tata Consultancy Services'],
    shortDesc: 'One of the premier public technical and research universities in India, located in Hauz Khas, Delhi.',
    longDesc: 'Indian Institute of Technology Delhi is a public technical university located in Hauz Khas in South Delhi, Delhi, India. It is one of the oldest Indian Institutes of Technology. Established in 1961, it was formally inaugurated in August 1961 by Humayun Kabir, Minister of Scientific Research and Cultural Affairs. The institute is known for its world-class research facility, high-caliber teaching faculty, and top-tier student placements globally.',
    courses: [
      { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: '₹ 2,25,000 / year', eligibility: '12th standard with PCM + JEE Advanced' },
      { name: 'B.Tech Electrical Engineering', duration: '4 Years', fees: '₹ 2,20,000 / year', eligibility: '12th standard with PCM + JEE Advanced' },
      { name: 'B.Tech Mechanical Engineering', duration: '4 Years', fees: '₹ 2,15,000 / year', eligibility: '12th standard with PCM + JEE Advanced' },
      { name: 'M.Tech Data Science & AI', duration: '2 Years', fees: '₹ 1,50,000 / year', eligibility: 'B.Tech/BE degree + GATE score' }
    ],
    facilities: ['High-speed Wi-Fi', 'World-class Labs', 'Hostel accommodation', 'Sports Complex', 'Modern Library', 'Startup Incubator']
  },
  {
    id: 'bits-pilani',
    name: 'Birla Institute of Technology and Science (BITS), Pilani',
    logoColor: '#a81c1c',
    location: 'Pilani',
    state: 'Rajasthan',
    stream: 'Engineering',
    type: 'Private',
    established: 1964,
    rating: 4.8,
    reviewsCount: 980,
    avgFees: 520000,
    avgPlacement: 18.2,
    highestPlacement: 75.0,
    examsAccepted: ['BITSAT'],
    affiliation: 'Deemed University',
    topRecruiters: ['Amazon', 'Microsoft', 'NVIDIA', 'Salesforce', 'J.P. Morgan', 'Intel'],
    shortDesc: 'A premier private deemed university known for its excellent infrastructure, strong alumni network, and no-attendance policy.',
    longDesc: 'Birla Institute of Technology & Science, Pilani is a private deemed university in Pilani, India. It focuses primarily on higher education and research in engineering and sciences. BITS Pilani has established campuses in Pilani, Goa, Hyderabad, and Dubai. It is highly recognized for its rigorous curriculum, dynamic campus culture, and strong industry linkages via its unique Practice School internship programs.',
    courses: [
      { name: 'B.E. Computer Science & Engineering', duration: '4 Years', fees: '₹ 5,40,000 / year', eligibility: '12th standard with PCM + BITSAT' },
      { name: 'B.E. Electronics & Communication Engineering', duration: '4 Years', fees: '₹ 5,20,000 / year', eligibility: '12th standard with PCM + BITSAT' },
      { name: 'B.E. Chemical Engineering', duration: '4 Years', fees: '₹ 4,80,000 / year', eligibility: '12th standard with PCM + BITSAT' }
    ],
    facilities: ['Wi-Fi Campus', 'Advanced Science Labs', 'Incubation Centre', 'Recreational Gyms', 'Cafeterias', 'Practice School']
  },
  {
    id: 'dtu-delhi',
    name: 'Delhi Technological University (DTU), Delhi',
    logoColor: '#6a1b9a',
    location: 'New Delhi',
    state: 'Delhi',
    stream: 'Engineering',
    type: 'Public',
    established: 1941,
    rating: 4.6,
    reviewsCount: 1100,
    avgFees: 190000,
    avgPlacement: 15.6,
    highestPlacement: 64.0,
    examsAccepted: ['JEE Main', 'DASA'],
    affiliation: 'State University',
    topRecruiters: ['Paytm', 'Samsung', 'Adobe', 'Oracle', 'Directi', 'McKinsey & Co.'],
    shortDesc: 'Formerly known as Delhi College of Engineering (DCE), it is one of India’s most prestigious tech universities.',
    longDesc: 'Delhi Technological University, formerly known as the Delhi College of Engineering, is a state university in New Delhi, India. Established in 1941 as Delhi Polytechnic, it has produced numerous tech leaders, startup founders, and global executives. Known for its massive 164-acre lush green campus, outstanding campus life, and very high technical placement rates.',
    courses: [
      { name: 'B.Tech Software Engineering', duration: '4 Years', fees: '₹ 1,95,000 / year', eligibility: '12th standard with PCM + JEE Main' },
      { name: 'B.Tech Information Technology', duration: '4 Years', fees: '₹ 1,90,000 / year', eligibility: '12th standard with PCM + JEE Main' },
      { name: 'B.Tech Mechanical Engineering with Automation', duration: '4 Years', fees: '₹ 1,80,000 / year', eligibility: '12th standard with PCM + JEE Main' }
    ],
    facilities: ['Spacious Auditoriums', 'Computer Labs', 'Olympic-size Track', 'AC Hostels', 'Central Library', 'Open Air Theatre']
  },
  {
    id: 'vit-vellore',
    name: 'Vellore Institute of Technology (VIT), Vellore',
    logoColor: '#008080',
    location: 'Vellore',
    state: 'Tamil Nadu',
    stream: 'Engineering',
    type: 'Private',
    established: 1984,
    rating: 4.4,
    reviewsCount: 2450,
    avgFees: 198000,
    avgPlacement: 9.2,
    highestPlacement: 44.0,
    examsAccepted: ['VITEEE', 'JEE Main'],
    affiliation: 'Deemed University',
    topRecruiters: ['Cognizant', 'Wipro', 'Infosys', 'Capgemini', 'Deloitte', 'D.E. Shaw'],
    shortDesc: 'Renowned for its massive student community, robust placements, international relations, and active campus student chapters.',
    longDesc: 'Vellore Institute of Technology is a private deemed university located in Katpadi in Vellore, India. Founded in 1984 as Vellore Engineering College by G. Viswanathan, the institution offers 66 undergraduate, 58 postgraduate, 15 integrated programs, and research programs. It consistently ranks high among private universities in India, offering wide placement opportunities.',
    courses: [
      { name: 'B.Tech Computer Science & Engineering', duration: '4 Years', fees: '₹ 1,98,000 / year', eligibility: '12th standard + VITEEE rank' },
      { name: 'B.Tech Electronics & CSE (Bioinformatics)', duration: '4 Years', fees: '₹ 1,95,000 / year', eligibility: '12th standard + VITEEE rank' },
      { name: 'B.Tech Civil Engineering', duration: '4 Years', fees: '₹ 1,75,000 / year', eligibility: '12th standard + VITEEE rank' }
    ],
    facilities: ['Smart Classrooms', 'Lakeview Hostels', 'Swimming Pool', 'State-of-the-art Gyms', 'Multi-cuisine Food Courts', 'Research Labs']
  },

  // --- MANAGEMENT COLLEGES ---
  {
    id: 'iim-ahmedabad',
    name: 'Indian Institute of Management (IIM), Ahmedabad',
    logoColor: '#800000',
    location: 'Ahmedabad',
    state: 'Gujarat',
    stream: 'Management',
    type: 'Public',
    established: 1961,
    rating: 5.0,
    reviewsCount: 820,
    avgFees: 1150000,
    avgPlacement: 32.8,
    highestPlacement: 115.0,
    examsAccepted: ['CAT', 'GMAT'],
    affiliation: 'Autonomous',
    topRecruiters: ['McKinsey', 'BCG', 'Bain & Company', 'Goldman Sachs', 'Morgan Stanley', 'HUL'],
    shortDesc: 'Widely regarded as the top business school in India, famous for its case-study methodology and outstanding alumni.',
    longDesc: 'Indian Institute of Management Ahmedabad is a public business school located in Ahmedabad, Gujarat, India. The institute offers Master\'s degree programs in management, fellowship programs and a number of executive training programs. It was established in 1961 as an autonomous body and ranks #1 consistently under the NIRF Management rankings in India.',
    courses: [
      { name: 'PGP in Management (MBA)', duration: '2 Years', fees: '₹ 11,50,000 / year', eligibility: 'Graduation (min 50%) + CAT score' },
      { name: 'PGP in Food & Agribusiness Management', duration: '2 Years', fees: '₹ 10,00,000 / year', eligibility: 'Graduation (min 50%) + CAT score' }
    ],
    facilities: ['Historical Brick Campus', 'Harvard-style Case Study Halls', 'Executive Residences', 'Rich Management Archives', '24/7 Digital Library']
  },
  {
    id: 'iim-bangalore',
    name: 'Indian Institute of Management (IIM), Bangalore',
    logoColor: '#005f73',
    location: 'Bengaluru',
    state: 'Karnataka',
    stream: 'Management',
    type: 'Public',
    established: 1973,
    rating: 4.9,
    reviewsCount: 740,
    avgFees: 1100000,
    avgPlacement: 31.5,
    highestPlacement: 95.0,
    examsAccepted: ['CAT', 'GMAT'],
    affiliation: 'Autonomous',
    topRecruiters: ['Accenture Strategy', 'Kearney', 'Oliver Wyman', 'J.P. Morgan', 'Microsoft', 'Aditya Birla Group'],
    shortDesc: 'A stellar institution located in India’s high-tech capital, known for entrepreneurship support and beautiful stone architecture.',
    longDesc: 'Indian Institute of Management Bangalore is a public business school and Institute of National Importance located in Bangalore, India. Founded in 1973, it was the third IIM to be established in the country. The 100-acre green campus is famous for its stone masonry work and provides a perfect ecosystem for career transformation in general management and tech-consulting.',
    courses: [
      { name: 'PGP in Management (MBA)', duration: '2 Years', fees: '₹ 11,00,000 / year', eligibility: 'Graduation (min 50%) + CAT score' },
      { name: 'PGP in Business Analytics', duration: '2 Years', fees: '₹ 11,25,000 / year', eligibility: 'Graduation + CAT score with strong quantitative aptitude' }
    ],
    facilities: ['Lush Green Stone Campus', 'High-end Computing Hubs', 'Incubation Centre (NSRCEL)', 'Modern Sport Arenas', 'Vibrant Cafes']
  },
  {
    id: 'xlri-jamshedpur',
    name: 'XLRI - Xavier School of Management, Jamshedpur',
    logoColor: '#003366',
    location: 'Jamshedpur',
    state: 'Jharkhand',
    stream: 'Management',
    type: 'Private',
    established: 1949,
    rating: 4.8,
    reviewsCount: 650,
    avgFees: 1050000,
    avgPlacement: 27.2,
    highestPlacement: 78.2,
    examsAccepted: ['XAT', 'GMAT'],
    affiliation: 'Autonomous',
    topRecruiters: ['P&G', 'TAS', 'ITC', 'L\'Oreal', 'Deutsche Bank', 'Standard Chartered'],
    shortDesc: 'India’s oldest business management school, worldwide famous for producing stellar Human Resources and Business leaders.',
    longDesc: 'XLRI – Xavier School of Management is a private business school run by the Society of Jesus in Jamshedpur, Jharkhand, India. It was founded in 1949, making it the oldest business school in India. XLRI is globally recognized for its exceptional flagship HR (Human Resources) program which is considered the best in the Asia-Pacific region, alongside a top-tier Business Management (BM) course.',
    courses: [
      { name: 'PGDM in Human Resource Management', duration: '2 Years', fees: '₹ 10,50,000 / year', eligibility: 'Graduation + XAT score' },
      { name: 'PGDM in Business Management', duration: '2 Years', fees: '₹ 10,50,000 / year', eligibility: 'Graduation + XAT score' }
    ],
    facilities: ['Wi-Fi Hostels', 'Behavioral Labs', 'Finance Trading Terminal', 'Sports Complex', 'Auditoriums', 'Alumni Guest House']
  },
  {
    id: 'fms-delhi',
    name: 'Faculty of Management Studies (FMS), Delhi University',
    logoColor: '#d62828',
    location: 'Delhi',
    state: 'Delhi',
    stream: 'Management',
    type: 'Public',
    established: 1954,
    rating: 4.7,
    reviewsCount: 520,
    avgFees: 48000, // Extremely low fees!
    avgPlacement: 28.0,
    highestPlacement: 58.0,
    examsAccepted: ['CAT'],
    affiliation: 'Delhi University',
    topRecruiters: ['Morgan Stanley', 'Citi', 'EY', 'Amazon', 'Wipro', 'ITC', 'L\'Oreal'],
    shortDesc: 'Famously called the "ROI King" of business management, offering elite MBA education at virtually negligible costs.',
    longDesc: 'Faculty of Management Studies, commonly known as FMS Delhi, is a leading management institute associated with the University of Delhi. Established in 1954 under the patronage of Delhi University, it is one of the oldest business management schools in India. It is legendary for its extremely low fee structure compared to IIMs while offering equivalent or superior placement packages.',
    courses: [
      { name: 'Master of Business Administration (MBA)', duration: '2 Years', fees: '₹ 48,000 / year', eligibility: 'Graduation + high percentile in CAT' }
    ],
    facilities: ['Delhi University South Campus access', 'Rich Library Archives', 'Computer Center', 'Diverse Student Clubs', 'Seminar Halls']
  },

  // --- MEDICAL COLLEGES ---
  {
    id: 'aiims-delhi',
    name: 'All India Institute of Medical Sciences (AIIMS), New Delhi',
    logoColor: '#0b5257',
    location: 'New Delhi',
    state: 'Delhi',
    stream: 'Medical',
    type: 'Public',
    established: 1956,
    rating: 5.0,
    reviewsCount: 1650,
    avgFees: 1628, // Incredibly subsidized Govt fees!
    avgPlacement: 18.0,
    highestPlacement: 48.0,
    examsAccepted: ['NEET UG', 'NEET PG'],
    affiliation: 'Autonomous',
    topRecruiters: ['Apollo Hospitals', 'Max Healthcare', 'Fortis', 'Medanta', 'AIIMS Residency'],
    shortDesc: 'The apex medical research public university and hospital in India, standing #1 in medical healthcare education.',
    longDesc: 'All India Institute of Medical Sciences, New Delhi is a public medical research university and hospital based in New Delhi, India. The institute is governed by the AIIMS Act, 1956 and operates autonomously under the Ministry of Health and Family Welfare. It is the dream college for every medical aspirant in India, known for unmatched clinical exposure and highly subsidized treatments.',
    courses: [
      { name: 'MBBS (Bachelor of Medicine & Surgery)', duration: '5.5 Years', fees: '₹ 1,628 / year', eligibility: '12th with PCB (min 60%) + top NEET rank' },
      { name: 'M.D. in General Medicine', duration: '3 Years', fees: '₹ 2,200 / year', eligibility: 'MBBS degree + NEET PG rank' }
    ],
    facilities: ['Multi-specialty Hospital Labs', 'Advanced Surgical Simulators', 'Massive Clinical Library', 'Subsidized Hostels', 'Research Labs']
  },
  {
    id: 'mamc-delhi',
    name: 'Maulana Azad Medical College (MAMC), Delhi',
    logoColor: '#1d3557',
    location: 'New Delhi',
    state: 'Delhi',
    stream: 'Medical',
    type: 'Public',
    established: 1959,
    rating: 4.8,
    reviewsCount: 880,
    avgFees: 15450,
    avgPlacement: 14.5,
    highestPlacement: 32.0,
    examsAccepted: ['NEET UG'],
    affiliation: 'Delhi University',
    topRecruiters: ['Lok Nayak Hospital', 'GB Pant Hospital', 'Max Healthcare', 'Sir Ganga Ram Hospital'],
    shortDesc: 'A premier public medical college attached to four major hospitals in New Delhi, providing extreme clinical patient exposure.',
    longDesc: 'Maulana Azad Medical College is a public medical college in New Delhi, India, affiliated with the University of Delhi and run by the Delhi government. It is named after Indian freedom fighter and first education minister Maulana Abul Kalam Azad. The associated hospitals (LNJP, GB Pant, Guru Nanak Eye, Sushruta Trauma) contain over 2,800 beds combined, offering exceptional practical learning.',
    courses: [
      { name: 'MBBS', duration: '5.5 Years', fees: '₹ 15,450 / year', eligibility: '12th with PCB + NEET UG eligibility' }
    ],
    facilities: ['Lok Nayak Hospital Ward access', 'High-end Dissection Halls', 'AC Lecture Theatres', 'Hostels', 'Sports grounds']
  },
  {
    id: 'cmc-vellore',
    name: 'Christian Medical College (CMC), Vellore',
    logoColor: '#457b9d',
    location: 'Vellore',
    state: 'Tamil Nadu',
    stream: 'Medical',
    type: 'Private',
    established: 1900,
    rating: 4.9,
    reviewsCount: 680,
    avgFees: 52000,
    avgPlacement: 12.0,
    highestPlacement: 28.0,
    examsAccepted: ['NEET UG', 'NEET PG'],
    affiliation: 'Tamil Nadu Dr. M.G.R. Medical University',
    topRecruiters: ['CMC Hospital', 'Mission Hospitals', 'Tata Medical Center', 'Aster DM Healthcare'],
    shortDesc: 'A world-famous private medical school and hospital, widely recognized for pioneering healthcare treatments in India.',
    longDesc: 'Christian Medical College, Vellore, widely known as CMC Vellore, is a private, Christian minority-run medical college, hospital and research institute. Founded in 1900 by Dr. Ida S. Scudder, it has made outstanding contributions to medical breakthroughs in India, including performing the first open-heart surgery, the first kidney transplant, and the first bone marrow transplant in the country.',
    courses: [
      { name: 'MBBS', duration: '5.5 Years', fees: '₹ 52,000 / year', eligibility: '12th with PCB + NEET UG score + Aptitude interview' },
      { name: 'B.Sc in Nursing', duration: '4 Years', fees: '₹ 38,000 / year', eligibility: '12th with Sciences + CMC entrance test' }
    ],
    facilities: ['Advanced Hospital Training', 'Ida Scudder Library', 'Residential Camps', 'Scientific Research Labs', 'Cafeteria']
  },

  // --- LAW COLLEGES ---
  {
    id: 'nls-bangalore',
    name: 'National Law School of India University (NLSIU), Bangalore',
    logoColor: '#1a3a2a',
    location: 'Bengaluru',
    state: 'Karnataka',
    stream: 'Law',
    type: 'Public',
    established: 1986,
    rating: 4.9,
    reviewsCount: 420,
    avgFees: 275000,
    avgPlacement: 16.5,
    highestPlacement: 32.0,
    examsAccepted: ['CLAT'],
    affiliation: 'Autonomous State University',
    topRecruiters: ['Shardul Amarchand Mangaldas', 'Cyril Amarchand Mangaldas', 'Khaitan & Co', 'Trilegal', 'Luthra & Luthra', 'AZB & Partners'],
    shortDesc: 'The Harvard of Law schools in India, consistently standing as the ultimate #1 legal education institute.',
    longDesc: 'National Law School of India University is a public law school and a premier university for legal education located in Bangalore, Karnataka, India. Established in 1986, it was the first National Law University established in India. It is highly famous for its rigorous academic curriculum, trisemester system, and 100% placements in top-tier corporate legal firms and international organizations.',
    courses: [
      { name: 'B.A. LL.B. (Hons.) Dual Degree', duration: '5 Years', fees: '₹ 2,75,000 / year', eligibility: '12th standard + high score in CLAT' },
      { name: 'Master of Laws (LL.M.)', duration: '1 Year', fees: '₹ 2,10,000 / year', eligibility: 'LL.B. degree + CLAT PG score' }
    ],
    facilities: ['Moot Court Hall', 'Huge Legal Library (Sri Narayan Rao Library)', 'Wi-Fi Campus', 'Academic Halls', 'Recreational Gyms']
  },
  {
    id: 'nalsar-hyderabad',
    name: 'NALSAR University of Law, Hyderabad',
    logoColor: '#3d0c02',
    location: 'Hyderabad',
    state: 'Telangana',
    stream: 'Law',
    type: 'Public',
    established: 1998,
    rating: 4.8,
    reviewsCount: 380,
    avgFees: 260000,
    avgPlacement: 14.8,
    highestPlacement: 28.5,
    examsAccepted: ['CLAT'],
    affiliation: 'Autonomous State University',
    topRecruiters: ['J. Sagar Associates', 'L&L Partners', 'Trilegal', 'ICICI Bank Law Cell', 'EY Legal'],
    shortDesc: 'Highly prestigious National Law University known for its academic liberty, beautiful campus, and top legal placements.',
    longDesc: 'The National Academy of Legal Studies and Research, commonly known as NALSAR University of Law, is a public law university located in Shamirpet, Hyderabad, Telangana, India. Known for its strong emphasis on liberal legal education, research, and excellent infrastructure, it ranks #2 in NIRF Law rankings, acting as a direct competitor to NLSIU.',
    courses: [
      { name: 'B.A. LL.B. (Hons.)', duration: '5 Years', fees: '₹ 2,60,000 / year', eligibility: '12th standard + CLAT rank' }
    ],
    facilities: ['Air-conditioned Moot Courts', 'Research Centres', 'Hostels with Wi-Fi', 'Sports Fields', 'State-of-art Gym']
  },

  // --- ARTS & SCIENCES COLLEGES ---
  {
    id: 'miranda-house-delhi',
    name: 'Miranda House, Delhi University',
    logoColor: '#2b2d42',
    location: 'Delhi',
    state: 'Delhi',
    stream: 'Arts',
    type: 'Public',
    established: 1948,
    rating: 4.8,
    reviewsCount: 790,
    avgFees: 14500,
    avgPlacement: 7.2,
    highestPlacement: 22.0,
    examsAccepted: ['CUET'],
    affiliation: 'Delhi University',
    topRecruiters: ['McKinsey & Co', 'De Shaw', 'Accenture', 'Brain & Co.', 'KPMG'],
    shortDesc: 'The #1 Ranked College in India by NIRF for multiple consecutive years, offering elite Arts and Science programs for women.',
    longDesc: 'Miranda House is a constituent college for women at the University of Delhi, India. Established in 1948, it is a pioneer in women\'s education, offering high-quality courses in Humanities, Social Sciences, and Basic Sciences. Famously known for its historic red-brick building, academic rigor, active student societies, and great placement avenues.',
    courses: [
      { name: 'B.A. (Hons.) English', duration: '3 Years', fees: '₹ 14,100 / year', eligibility: '12th standard + CUET exam score' },
      { name: 'B.A. (Hons.) Economics', duration: '3 Years', fees: '₹ 14,500 / year', eligibility: '12th standard + CUET exam score' },
      { name: 'B.Sc. (Hons.) Physics', duration: '3 Years', fees: '₹ 16,000 / year', eligibility: '12th standard with PCM + CUET' }
    ],
    facilities: ['Lush Heritage Gardens', 'Advanced Biotech Labs', 'Active Literary Clubs', 'On-campus Hostel', 'Seminar Rooms']
  },
  {
    id: 'st-stephens-delhi',
    name: 'St. Stephen\'s College, Delhi University',
    logoColor: '#03045e',
    location: 'Delhi',
    state: 'Delhi',
    stream: 'Arts',
    type: 'Public',
    established: 1881,
    rating: 4.7,
    reviewsCount: 560,
    avgFees: 40500,
    avgPlacement: 8.4,
    highestPlacement: 29.0,
    examsAccepted: ['CUET'],
    affiliation: 'Delhi University',
    topRecruiters: ['Bain & Company', 'McKinsey', 'EY', 'PwC', 'J-PAL', 'Teach for India'],
    shortDesc: 'One of the oldest and most prestigious liberal arts and sciences colleges in India, known for producing global leaders.',
    longDesc: 'St. Stephen\'s College is a premier constituent college of the University of Delhi. Founded in 1881 by the Cambridge Mission to Delhi, it is one of the oldest institutions for higher education in the capital city. The college has produced Nobel laureates, Chief Justices, famous authors, and prominent politicians. The campus boasts unique residential halls and a very cohesive student culture.',
    courses: [
      { name: 'B.A. (Hons.) Economics', duration: '3 Years', fees: '₹ 42,000 / year', eligibility: '12th standard + high CUET score + interview' },
      { name: 'B.A. (Hons.) History', duration: '3 Years', fees: '₹ 38,000 / year', eligibility: '12th standard + CUET score + interview' },
      { name: 'B.Sc. (Hons.) Chemistry', duration: '3 Years', fees: '₹ 44,000 / year', eligibility: '12th standard with PCM + CUET + interview' }
    ],
    facilities: ['Gothic-style Chapel', 'Historic dining hall', 'Vast Library Collection', 'Residential blocks', 'Tennis Courts']
  },
  {
    id: 'loyola-chennai',
    name: 'Loyola College, Chennai',
    logoColor: '#4f5d75',
    location: 'Chennai',
    state: 'Tamil Nadu',
    stream: 'Science',
    type: 'Private',
    established: 1925,
    rating: 4.6,
    reviewsCount: 940,
    avgFees: 28000,
    avgPlacement: 6.8,
    highestPlacement: 15.0,
    examsAccepted: ['Merit-based', 'TANCET'],
    affiliation: 'Madras University',
    topRecruiters: ['Wipro', 'Cognizant', 'Standard Chartered', 'Infosys', 'EY', 'ICICI Bank'],
    shortDesc: 'A legendary Jesuit institution in Chennai, recognized for its social sciences, commerce, and scientific research.',
    longDesc: 'Loyola College is an autonomous, Catholic Christian minority institution affiliated with the University of Madras. It was founded in 1925 by the Society of Jesus. Loyola consistently ranks among the top 10 institutions in India for Arts, Sciences, and Commerce, featuring a sprawling 99-acre campus in the heart of Chennai.',
    courses: [
      { name: 'B.Sc. Computer Science', duration: '3 Years', fees: '₹ 28,000 / year', eligibility: '12th standard with Mathematics' },
      { name: 'B.Com (General)', duration: '3 Years', fees: '₹ 32,000 / year', eligibility: '12th standard with Commerce & Accountancy' }
    ],
    facilities: ['Entomology Research Institute', 'AC Audio-Visual Halls', 'Spacious Hostels', 'Vast Playground', 'Wi-Fi labs']
  }
];
