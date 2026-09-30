'use client';
import { useState, useEffect } from 'react';

export default function SchoolMasterSystem() {
  const [mounted, setMounted] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Nav Dropdowns
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);

  // Auth Sessions
  const [authRole, setAuthRole] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [authError, setAuthError] = useState('');

  // Login Form
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRole, setLoginRole] = useState('STUDENT');

  // Admin Search & Filter
  const [adminSearch, setAdminSearch] = useState('');
  const [adminClassFilter, setAdminClassFilter] = useState('ALL');

  // Teacher Portal
  const [attendanceLocked, setAttendanceLocked] = useState(false);
  const [classworkTopic, setClassworkTopic] = useState('');
  const [classworkHomework, setClassworkHomework] = useState('');
  const [classworkStatus, setClassworkStatus] = useState(null);

  // Student Portal
  const [selectedChild, setSelectedChild] = useState('Arjun Sharma');
  const [activeReportExam, setActiveReportExam] = useState('Annual');
  const [expandedSubject, setExpandedSubject] = useState('Hindi');
  const [selectedFeeIds, setSelectedFeeIds] = useState(['F11', 'F12']);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  // Contact Form
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Admissions Inquiry');
  const [message, setMessage] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Blog Data
  const blogPosts = [
    {
      id: 'ai-in-k12-classrooms',
      title: 'The Role of Artificial Intelligence in K-12 Classrooms',
      date: 'March 29, 2026',
      author: 'Dr. V. K. Sharma',
      authorRole: 'Principal, Ph.D.',
      readTime: '5 min read',
      excerpt: 'How guided AI tools assist teachers in personalizing assessments and identifying student learning gaps without replacing human mentoring.',
      content: 'Artificial Intelligence in K-12 classrooms provides personalized assistance, automated formative evaluations, and adaptive learning workflows without displacing human mentorship. By analyzing student performance patterns, our system helps identify specific learning gaps in subjects like Mathematics and languages early on, allowing teachers to deliver targeted interventions. This balance of AI and human care ensures that student growth is continuous, scientifically tracked, and securely monitored without compromising data privacy standards.'
    },
    {
      id: 'reading-habits-in-children',
      title: 'Cultivating Lifelong Reading Habits in Primary Schoolers',
      date: 'February 15, 2026',
      author: 'Mrs. Anjali Sen',
      authorRole: 'Class Teacher (Class 1-A), B.Ed.',
      readTime: '4 min read',
      excerpt: 'Early literacy routines build cognitive empathy, rich vocabularies, and analytical thinking. Discover practical guidelines for parents at home.',
      content: 'Early literacy routines build cognitive empathy, rich vocabularies, and analytical thinking. Discover practical guidelines for parents at home, such as establishing a dedicated reading corner, practicing shared read-aloud sessions, and asking open-ended questions about the story characters. Promoting reading as a joyful, regular activity rather than an academic chore fosters long-term curiosity and comprehension abilities that support overall academic performance.'
    },
    {
      id: 'athletics-and-board-exams',
      title: 'Balancing Athletics and Board Exams: A Topper’s Guide',
      date: 'January 10, 2026',
      author: 'Mr. Amit Chauhan',
      authorRole: 'Director of Physical Education',
      readTime: '6 min read',
      excerpt: 'Why structured physical activity enhances mental stamina, reduces exam anxiety, and sharpens cognitive retention.',
      content: 'Physical fitness directly enhances mental stamina, memory retention, and reduces stress during CBSE Board Examinations. Our physical education department stresses the importance of balanced lifestyles where students spend at least 45 minutes outdoors daily. Regular exercise stimulates endorphins, offsets intellectual fatigue, and optimizes sleep cycles—ultimately resulting in higher cognitive focus and better performance in terminal examinations.'
    }
  ];

  // 9 Complete Subjects Data for all exams
  const examResultsData = {
    'Annual': [
      { name: 'Hindi', components: [{ name: 'Written', max: 10, obt: 10 }, { name: 'Oral', max: 5, obt: 4 }, { name: 'Dictation', max: 5, obt: 5 }], totalMax: 20, totalObt: 19 },
      { name: 'English', components: [{ name: 'Written', max: 60, obt: 54 }, { name: 'Oral', max: 10, obt: 9 }, { name: 'Dictation', max: 10, obt: 9 }], totalMax: 80, totalObt: 72 },
      { name: 'Mathematics', components: [{ name: 'Written Theory', max: 70, obt: 69 }, { name: 'Mental Maths', max: 10, obt: 10 }], totalMax: 80, totalObt: 79 },
      { name: 'Science', components: [{ name: 'Theory', max: 60, obt: 56 }, { name: 'Practical Lab', max: 20, obt: 19 }], totalMax: 80, totalObt: 75 },
      { name: 'Social Science', components: [{ name: 'Theory Exam', max: 80, obt: 72 }, { name: 'History Project', max: 20, obt: 18 }], totalMax: 100, totalObt: 90 },
      { name: 'EVS', components: [{ name: 'Environmental Studies', max: 30, obt: 29 }, { name: 'Field Activity', max: 20, obt: 19 }], totalMax: 50, totalObt: 48 },
      { name: 'Computer Science', components: [{ name: 'Python Theory', max: 50, obt: 48 }, { name: 'Lab Practical', max: 50, obt: 49 }], totalMax: 100, totalObt: 97 },
      { name: 'Physical Education', components: [{ name: 'Athletics', max: 50, obt: 49 }, { name: 'Motor Skills', max: 50, obt: 48 }], totalMax: 100, totalObt: 97 },
      { name: 'General Knowledge & Arts', components: [{ name: 'GK Written', max: 25, obt: 24 }, { name: 'Drawing & Art', max: 25, obt: 25 }], totalMax: 50, totalObt: 49 }
    ],
    'Half-Yearly': [
      { name: 'Hindi', components: [{ name: 'Written', max: 10, obt: 9 }, { name: 'Oral', max: 5, obt: 4 }, { name: 'Dictation', max: 5, obt: 5 }], totalMax: 20, totalObt: 18 },
      { name: 'English', components: [{ name: 'Written', max: 60, obt: 50 }, { name: 'Oral', max: 10, obt: 9 }, { name: 'Dictation', max: 10, obt: 9 }], totalMax: 80, totalObt: 68 },
      { name: 'Mathematics', components: [{ name: 'Written Theory', max: 70, obt: 66 }, { name: 'Mental Maths', max: 10, obt: 10 }], totalMax: 80, totalObt: 76 },
      { name: 'Science', components: [{ name: 'Theory', max: 60, obt: 52 }, { name: 'Practical Lab', max: 20, obt: 18 }], totalMax: 80, totalObt: 70 },
      { name: 'Social Science', components: [{ name: 'Theory Exam', max: 80, obt: 68 }, { name: 'Project', max: 20, obt: 17 }], totalMax: 100, totalObt: 85 },
      { name: 'EVS', components: [{ name: 'Environmental Studies', max: 30, obt: 27 }, { name: 'Field Activity', max: 20, obt: 18 }], totalMax: 50, totalObt: 45 },
      { name: 'Computer Science', components: [{ name: 'Theory', max: 50, obt: 46 }, { name: 'Lab Practical', max: 50, obt: 46 }], totalMax: 100, totalObt: 92 },
      { name: 'Physical Education', components: [{ name: 'Athletics', max: 50, obt: 48 }, { name: 'Motor Skills', max: 50, obt: 48 }], totalMax: 100, totalObt: 96 },
      { name: 'General Knowledge & Arts', components: [{ name: 'GK Written', max: 25, obt: 23 }, { name: 'Drawing & Art', max: 25, obt: 24 }], totalMax: 50, totalObt: 47 }
    ],
    'Quarterly': [
      { name: 'Hindi', components: [{ name: 'Written', max: 10, obt: 8 }, { name: 'Oral', max: 5, obt: 4 }, { name: 'Dictation', max: 5, obt: 5 }], totalMax: 20, totalObt: 17 },
      { name: 'English', components: [{ name: 'Written', max: 60, obt: 52 }, { name: 'Oral', max: 10, obt: 9 }, { name: 'Dictation', max: 10, obt: 9 }], totalMax: 80, totalObt: 70 },
      { name: 'Mathematics', components: [{ name: 'Written Theory', max: 70, obt: 64 }, { name: 'Mental Maths', max: 10, obt: 10 }], totalMax: 80, totalObt: 74 },
      { name: 'Science', components: [{ name: 'Theory', max: 60, obt: 54 }, { name: 'Practical Lab', max: 20, obt: 18 }], totalMax: 80, totalObt: 72 },
      { name: 'Social Science', components: [{ name: 'Theory Exam', max: 80, obt: 64 }, { name: 'Project', max: 20, obt: 16 }], totalMax: 100, totalObt: 80 },
      { name: 'EVS', components: [{ name: 'Environmental Studies', max: 30, obt: 26 }, { name: 'Field Activity', max: 20, obt: 18 }], totalMax: 50, totalObt: 44 },
      { name: 'Computer Science', components: [{ name: 'Theory', max: 50, obt: 45 }, { name: 'Lab Practical', max: 50, obt: 45 }], totalMax: 100, totalObt: 90 },
      { name: 'Physical Education', components: [{ name: 'Athletics', max: 50, obt: 47 }, { name: 'Motor Skills', max: 50, obt: 47 }], totalMax: 100, totalObt: 94 },
      { name: 'General Knowledge & Arts', components: [{ name: 'GK Written', max: 25, obt: 22 }, { name: 'Drawing & Art', max: 25, obt: 23 }], totalMax: 50, totalObt: 45 }
    ],
    'Mid-Term': [
      { name: 'Hindi', components: [{ name: 'Written', max: 10, obt: 8 }, { name: 'Oral', max: 5, obt: 4 }, { name: 'Dictation', max: 5, obt: 4 }], totalMax: 20, totalObt: 16 },
      { name: 'English', components: [{ name: 'Written', max: 60, obt: 51 }, { name: 'Oral', max: 10, obt: 8 }, { name: 'Dictation', max: 10, obt: 9 }], totalMax: 80, totalObt: 68 },
      { name: 'Mathematics', components: [{ name: 'Written Theory', max: 70, obt: 63 }, { name: 'Mental Maths', max: 10, obt: 9 }], totalMax: 80, totalObt: 72 },
      { name: 'Science', components: [{ name: 'Theory', max: 60, obt: 51 }, { name: 'Practical Lab', max: 20, obt: 17 }], totalMax: 80, totalObt: 68 },
      { name: 'Social Science', components: [{ name: 'Theory Exam', max: 80, obt: 65 }, { name: 'Project', max: 20, obt: 17 }], totalMax: 100, totalObt: 82 },
      { name: 'EVS', components: [{ name: 'Environmental Studies', max: 30, obt: 25 }, { name: 'Field Activity', max: 20, obt: 18 }], totalMax: 50, totalObt: 43 },
      { name: 'Computer Science', components: [{ name: 'Theory', max: 50, obt: 44 }, { name: 'Lab Practical', max: 50, obt: 44 }], totalMax: 100, totalObt: 88 },
      { name: 'Physical Education', components: [{ name: 'Athletics', max: 50, obt: 46 }, { name: 'Motor Skills', max: 50, obt: 46 }], totalMax: 100, totalObt: 92 },
      { name: 'General Knowledge & Arts', components: [{ name: 'GK Written', max: 25, obt: 22 }, { name: 'Drawing & Art', max: 25, obt: 22 }], totalMax: 50, totalObt: 44 }
    ],
    'Class Tests': [
      { name: 'Hindi', components: [{ name: 'Unit Test', max: 20, obt: 19 }], totalMax: 20, totalObt: 19 },
      { name: 'English', components: [{ name: 'Unit Test', max: 20, obt: 18 }], totalMax: 20, totalObt: 18 },
      { name: 'Mathematics', components: [{ name: 'Unit Test', max: 20, obt: 20 }], totalMax: 20, totalObt: 20 },
      { name: 'Science', components: [{ name: 'Unit Test', max: 20, obt: 19 }], totalMax: 20, totalObt: 19 },
      { name: 'Social Science', components: [{ name: 'Unit Test', max: 20, obt: 18 }], totalMax: 20, totalObt: 18 },
      { name: 'EVS', components: [{ name: 'Unit Test', max: 20, obt: 19 }], totalMax: 20, totalObt: 19 },
      { name: 'Computer Science', components: [{ name: 'Unit Test', max: 20, obt: 20 }], totalMax: 20, totalObt: 20 },
      { name: 'Physical Education', components: [{ name: 'Unit Test', max: 20, obt: 20 }], totalMax: 20, totalObt: 20 },
      { name: 'General Knowledge & Arts', components: [{ name: 'Unit Test', max: 20, obt: 19 }], totalMax: 20, totalObt: 19 }
    ],
    'Practical': [
      { name: 'Science', components: [{ name: 'Experiment', max: 30, obt: 29 }, { na
