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

  // Admin Add Student Profile Feature
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [newStudentData, setNewStudentData] = useState({
    name: '',
    roll: '',
    className: 'Class 1-A',
    father: '',
    mobile: ''
  });
  const [studentRoster, setStudentRoster] = useState([
    { id: 'ST001', name: 'Arjun Sharma', class: 'Class 1-A', roll: '01', parent: 'Rajesh Sharma', mobile: '9876543210' }
  ]);
  const [addStudentSuccess, setAddStudentSuccess] = useState('');

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
      { name: 'Science', components: [{ name: 'Experiment', max: 30, obt: 29 }, { name: 'Viva', max: 10, obt: 10 }, { name: 'Record File', max: 10, obt: 10 }], totalMax: 50, totalObt: 49 },
      { name: 'Computer Science', components: [{ name: 'Coding Lab', max: 30, obt: 30 }, { name: 'Viva', max: 10, obt: 10 }, { name: 'Project File', max: 10, obt: 10 }], totalMax: 50, totalObt: 50 },
      { name: 'Physical Education', components: [{ name: 'Field Drill', max: 30, obt: 29 }, { name: 'Fitness Test', max: 20, obt: 20 }], totalMax: 50, totalObt: 49 }
    ],
    'All Examinations': []
  };

  // Full 12-Month Itemized Fee Table Data
  const [feeLedgerList, setFeeLedgerList] = useState([
    { id: 'F01', type: 'Tuition Fee (Monthly Plan)', month: 'April 2026', due: '10-Apr-2026', amount: 1000, paid: true },
    { id: 'F02', type: 'Tuition Fee (Monthly Plan)', month: 'May 2026', due: '10-May-2026', amount: 1000, paid: true },
    { id: 'F03', type: 'Transport Charge (Monthly Option)', month: 'June 2026', due: '10-Jun-2026', amount: 800, paid: true },
    { id: 'F04', type: 'Examination Fee', month: 'July 2026', due: '10-Jul-2026', amount: 500, paid: true },
    { id: 'F05', type: 'Annual Fee (Upfront Plan)', month: 'August 2026', due: '10-Aug-2026', amount: 11000, paid: true },
    { id: 'F06', type: 'Tuition Fee (Monthly Plan)', month: 'September 2026', due: '10-Sep-2026', amount: 1000, paid: true },
    { id: 'F07', type: 'Transport Charge (Yearly Option)', month: 'October 2026', due: '10-Oct-2026', amount: 8000, paid: true },
    { id: 'F08', type: 'Activity & Sports Fee', month: 'November 2026', due: '10-Nov-2026', amount: 600, paid: true },
    { id: 'F09', type: 'Tuition Fee (Monthly Plan)', month: 'December 2026', due: '10-Dec-2026', amount: 1000, paid: true },
    { id: 'F10', type: 'Tuition Fee (Monthly Plan)', month: 'January 2027', due: '10-Jan-2027', amount: 1000, paid: true },
    { id: 'F11', type: 'Tuition Fee (Monthly Plan)', month: 'February 2027', due: '10-Feb-2027', amount: 1000, paid: false },
    { id: 'F12', type: 'Tuition Fee (Monthly Plan)', month: 'March 2027', due: '10-Mar-2027', amount: 1000, paid: false },
    { id: 'F13', type: 'Transport Charge (Monthly Option)', month: 'March 2027', due: '10-Mar-2027', amount: 800, paid: false }
  ]);

  useEffect(() => {
    setMounted(true);
    setCurrentPath(window.location.pathname || '/');

    const handlePopState = () => {
      const path = window.location.pathname || '/';
      setCurrentPath(path);
      if (path.startsWith('/blog/')) {
        const blogId = path.split('/').pop();
        const found = blogPosts.find(b => b.id === blogId);
        setSelectedBlog(found || null);
      } else {
        setSelectedBlog(null);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  if (!mounted) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center font-bold text-indigo-900">Loading School ERP...</div>;
  }

  const navigateTo = (path, blogData = null) => {
    setCurrentPath(path);
    setSelectedBlog(blogData);
    setAboutDropdown(false);
    setResourcesDropdown(false);
    window.history.pushState({}, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setCaptchaError('');
    if (captchaInput.trim() === '') {
      setCaptchaError('Anti-spam math answer required.');
      return;
    }
    if (parseInt(captchaInput, 10) !== 12) {
      setCaptchaError('Incorrect math verification. What is 7 + 5?');
      return;
    }
    setContactSubmitted(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setAuthError('');
    const u = loginUsername.trim();
    const p = loginPassword.trim();
    if (loginRole === 'ADMIN') {
      if (u === 'admin' && p === 'AdminPassword2026!') {
        setAuthRole('ADMIN');
        setCurrentUser({ name: 'Administrator', role: 'School Admin' });
        navigateTo('/portal/admin-dashboard');
      } else {
        setAuthError('Invalid Admin credentials. Use admin / AdminPassword2026!');
      }
    } else if (loginRole === 'TEACHER') {
      if (u === 'teacher' && p === 'TeacherPass2026!') {
        setAuthRole('TEACHER');
        setCurrentUser({ name: 'Mrs. Anjali Sen', role: 'Class Teacher', class: 'Class 1-A' });
        navigateTo('/portal/faculty-dashboard');
      } else {
        setAuthError('Invalid Faculty credentials. Use teacher / TeacherPass2026!');
      }
    } else {
      if ((u === 'ST001' || u === 'ADM1024' || u === '9876543210') && p === 'StudentPass2026!') {
        setAuthRole('STUDENT');
        setCurrentUser({
          name: 'Arjun Sharma',
          id: 'ST001',
          admissionNo: 'ADM1024',
          class: 'Class 1-A',
          father: 'Rajesh Sharma',
          mother: 'Neha Sharma',
          aadhaar: 'XXXX XXXX XXXX 4321'
        });
        navigateTo('/portal/student-dashboard');
      } else {
        setAuthError('Invalid Student credentials. Use ST001 / StudentPass2026!');
      }
    }
  };

  const handleLogout = () => {
    setAuthRole(null);
    setCurrentUser(null);
    setLoginUsername('');
    setLoginPassword('');
    navigateTo('/');
  };

  const handleAddNewStudent = (e) => {
    e.preventDefault();
    const newId = `ST00${studentRoster.length + 1}`;
    setStudentRoster([
      ...studentRoster,
      {
        id: newId,
        name: newStudentData.name,
        class: newStudentData.className,
        roll: newStudentData.roll,
        parent: newStudentData.father,
        mobile: newStudentData.mobile
      }
    ]);
    setAddStudentSuccess(`✅ Student "${newStudentData.name}" successfully enrolled with ID: ${newId}! Profile saved to database.`);
    setTimeout(() => {
      setAddStudentSuccess('');
      setShowAddStudentModal(false);
    }, 2500);
    setNewStudentData({ name: '', roll: '', className: 'Class 1-A', father: '', mobile: '' });
  };

  const renderBreadcrumbs = () => {
    if (currentPath === '/') return null;
    const segments = currentPath.split('/').filter(Boolean);
    return (
      <div className="bg-slate-200 border-b border-slate-300 py-3.5 px-6 text-xs text-slate-700 font-bold shadow-inner w-full">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span onClick={() => navigateTo('/')} className="hover:text-indigo-600 hover:underline cursor-pointer">Home</span>
          {segments.map((seg, idx) => {
            const path = `/${segments.slice(0, idx + 1).join('/')}`;
            const isLast = idx === segments.length - 1;
            let label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');
            if (seg === 'portal') label = 'Portal';
            if (seg === 'about') label = 'About Us';
            if (seg === 'resources') label = 'Resources';
            return (
              <span key={path} className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                {isLast ? (
                  <span className="text-indigo-950 font-black">{selectedBlog ? selectedBlog.title : label}</span>
                ) : (
                  <span onClick={() => navigateTo(path)} className="hover:text-indigo-600 hover:underline cursor-pointer">{label}</span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    );
  };

  const getCurrentExamSubjects = () => {
    if (activeReportExam === 'All Examinations') return examResultsData['Annual'];
    return examResultsData[activeReportExam] || [];
  };

  const calculateResultSummary = () => {
    const subs = getCurrentExamSubjects();
    let max = 0;
    let obt = 0;
    subs.forEach(s => { max += s.totalMax; obt += s.totalObt; });
    const pct = max > 0 ? ((obt / max) * 100).toFixed(2) : '0.00';
    let g = 'F';
    if (parseFloat(pct) >= 90) g = 'A+ (Outstanding)';
    else if (parseFloat(pct) >= 80) g = 'A (Excellent)';
    else if (parseFloat(pct) >= 70) g = 'B+ (Very Good)';
    else if (parseFloat(pct) >= 60) g = 'B (Good)';
    else if (parseFloat(pct) >= 33) g = 'D (Pass)';
    return { max, obt, pct, g };
  };

  const { max: totalMax, obt: totalObt, pct: percentage, g: grade } = calculateResultSummary();

  const calculateSelectedFeeTotal = () => {
    return feeLedgerList.filter(f => selectedFeeIds.includes(f.id)).reduce((sum, item) => sum + item.amount, 0);
  };

  const shouldRenderGlobalSections = () => {
    if (currentPath === '/') return false;
    if (currentPath.startsWith('/blog')) return false;
    return true;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between w-full">
      
      {/* 1. TOP BAR */}
      <div className="bg-indigo-950 text-slate-300 text-xs py-2 px-6 border-b border-indigo-900 w-full">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span>📞 +91 98765 43210</span>
            <span>✉️ info@delhipublicmodel.edu.in</span>
            <span className="hidden md:inline">📍 Sector 14, Knowledge Corridor, New Delhi 110001</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-bold">CBSE Affiliation: 2130098</span>
            <div className="flex gap-4 items-center">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">🔵 Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">📸 Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">🔴 YouTube</a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm w-full">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('/')}>
            <div className="w-12 h-12 bg-indigo-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md">
              DP
            </div>
            <div>
              <h1 className="text-xl font-black text-indigo-950 leading-tight tracking-tight">DELHI PUBLIC MODEL SCHOOL</h1>
              <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider">Discipline • Excellence • Integrity</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            <button onClick={() => navigateTo('/')} className={`py-1 transition border-b-2 ${currentPath === '/' ? 'text-indigo-600 border-indigo-600 font-bold' : 'border-transparent hover:text-indigo-600'}`}>Home</button>

            {/* About Us Dropdown */}
            <div className="relative py-2 group" onMouseEnter={() => setAboutDropdown(true)} onMouseLeave={() => setAboutDropdown(false)}>
              <div className="flex items-center cursor-pointer">
                <button onClick={() => navigateTo('/about')} className={`py-1 transition border-b-2 ${currentPath.startsWith('/about') ? 'text-indigo-600 border-indigo-600 font-bold' : 'border-transparent group-hover:text-indigo-600'}`}>
                  About Us
                </button>
                <span className="pl-1 text-xs text-slate-400 group-hover:text-indigo-600">▼</span>
              </div>
              <div className={`absolute left-0 top-full pt-1 z-50 transition-all duration-200 ${aboutDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-1'}`}>
                <div className="w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 text-xs">
                  <button onClick={() => navigateTo('/about')} className="w-full text-left px-4 py-2.5 font-bold text-indigo-950 hover:bg-slate-50">🏛️ Main About Us Page (Section 9)</button>
                  <hr className="my-1 border-slate-100" />
                  <button onClick={() => navigateTo('/about/infrastructure')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700">🏫 School Infrastructure (Section 11)</button>
                  <button onClick={() => navigateTo('/about/facilities')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700">🔬 Facilities (Section 12)</button>
                  <button onClick={() => navigateTo('/about/achievements')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700">🏆 Achievements (Section 13)</button>
                  <button onClick={() => navigateTo('/about/rules')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700">📜 School Rules (Section 14)</button>
                  <button onClick={() => navigateTo('/about/faculty')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700">👩‍🏫 Faculty Directory (Section 15)</button>
                  <button onClick={() => navigateTo('/about/gallery')} className="w-full text-left px-4 py-2 hover:bg-slate-50 text-slate-700">🖼️ Campus Gallery (Section 16)</button>
                </div>
              </div>
            </div>

            <button onClick={() => navigateTo('/blog')} className={`py-1 transition border-b-2 ${currentPath.startsWith('/blog') ? 'text-indigo-600 border-indigo-600 font-bold' : 'border-transparent hover:text-indigo-600'}`}>Blog</button>

            {/* Resources Dropdown */}
            <div className="relative py-2 group" onMouseEnter={() => setResourcesDropdown(true)} onMouseLeave={() => setResourcesDropdown(false)}>
              <div className="flex items-center cursor-pointer">
                <button onClick={() => navigateTo('/resources/academics')} className={`py-1 transition border-b-2 ${currentPath.startsWith('/resources') ? 'text-indigo-600 border-indigo-600 font-bold' : 'border-transparent group-hover:text-indigo-600'}`}>
                  Resources
                </button>
                <span className="pl-1 text-xs text-slate-400 group-hover:text-indigo-600">▼</span>
              </div>
              <div className={`absolute left-0 top-full pt-1 z-50 transition-all duration-200 ${resourcesDropdown ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible pointer-events-none -translate-y-1'}`}>
                <div className="w-56 bg-white border border-slate-200 rounded-2xl shadow-2xl py-2 text-xs">
                  <button onClick={() => navigateTo('/resources/academics')} className="w-full text-left px-4 py-2.5 font-bold hover:bg-slate-50">📚 Academics Framework (Section 17)</button>
                  <button onClick={() => navigateTo('/resources/campus-life')} className="w-full text-left px-4 py-2.5 font-bold hover:bg-slate-50">🌳 Campus Life & Clubs (Section 11)</button>
                  <button onClick={() => navigateTo('/resources/examinations')} className="w-full text-left px-4 py-2.5 font-bold hover:bg-slate-50">📝 Examinations & Reports (Section 42)</button>
                  <button onClick={() => navigateTo('/about/faculty')} className="w-full text-left px-4 py-2.5 font-bold hover:bg-slate-50">👩‍🏫 Faculty Directory (Section 15)</button>
                </div>
              </div>
            </div>

            <button onClick={() => navigateTo('/news')} className={`py-1 transition border-b-2 ${currentPath === '/news' ? 'text-indigo-600 border-indigo-600 font-bold' : 'border-transparent hover:text-indigo-600'}`}>News & Events</button>
            <button onClick={() => navigateTo('/contact')} className={`py-1 transition border-b-2 ${currentPath === '/contact' ? 'text-indigo-600 border-indigo-600 font-bold' : 'border-transparent hover:text-indigo-600'}`}>Contact Us</button>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigateTo(authRole === 'STUDENT' ? '/portal/student-dashboard' : '/portal/student-login')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              {authRole === 'STUDENT' ? 'Student Portal (Active)' : 'Parent & Student Portal'}
            </button>
            <button
              onClick={() => {
                if (authRole === 'ADMIN') navigateTo('/portal/admin-dashboard');
                else if (authRole === 'TEACHER') navigateTo('/portal/faculty-dashboard');
                else navigateTo('/portal/admin-login');
              }}
              className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold transition shadow-sm"
            >
              {authRole === 'ADMIN' ? 'Admin Board' : (authRole === 'TEACHER' ? 'Faculty Portal' : 'Staff Login')}
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumbs Row */}
      {renderBreadcrumbs()}

      {/* 3. DYNAMIC CONTENT ROUTER */}
      <main className="flex-grow w-full">
        
        {/* ================= VIEW 1: HOME PAGE (ALL 14 SECTIONS) ================= */}
        {currentPath === '/' && (
          <div className="space-y-16 w-full">
            {/* 1. HERO */}
            <section className="bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-900 text-white py-24 px-6 relative overflow-hidden w-full">
              <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <span className="px-3.5 py-1.5 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-400/30">
                    Admissions Open For Session 2026–27
                  </span>
                  <h2 className="text-4xl sm:text-6xl font-black leading-tight tracking-tight">
                    Shaping Tomorrow's Visionaries With Excellence
                  </h2>
                  <p className="text-slate-300 text-base leading-relaxed">
                    A premier CBSE Senior Secondary educational institution integrating academic brilliance, modern scientific discovery laboratories, ethical leadership, and automated ERP management.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <button onClick={() => navigateTo('/contact')} className="px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-2xl shadow-xl transition">Apply for Admission</button>
                    <button onClick={() => navigateTo('/portal/student-login')} className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-2xl backdrop-blur transition">Parent & Student Portal</button>
                  </div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur shadow-2xl space-y-4">
                  <h3 className="text-lg font-bold text-amber-400 border-b border-white/10 pb-2">Institutional Notice Board</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition cursor-pointer" onClick={() => navigateTo('/news')}>
                      <span className="text-xs text-amber-300 font-bold">📢 MAR 2026</span>
                      <p className="font-semibold text-slate-100">Annual Board & Term Examination 2026 Date Sheet Released.</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. QUICK ACCESS TILES */}
            <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-20">
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {[
                  { label: 'Pay Fees Online', icon: '💳', path: '/portal/student-login' },
                  { label: 'Admission Form', icon: '📝', path: '/contact' },
                  { label: 'Exam Datesheet', icon: '📅', path: '/resources/examinations' },
                  { label: 'Academic Calendar', icon: '📆', path: '/news' },
                  { label: 'Faculty Directory', icon: '👩‍🏫', path: '/about/faculty' },
                  { label: 'Bus Routes & GPS', icon: '🚌', path: '/about/infrastructure' },
                ].map((tile, i) => (
                  <div key={i} onClick={() => navigateTo(tile.path)} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-md text-center space-y-2 cursor-pointer hover:shadow-lg transition">
                    <span className="text-2xl">{tile.icon}</span>
                    <p className="font-bold text-slate-900 text-xs">{tile.label}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. WELCOME / ABOUT SCHOOL */}
            <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-4">
                <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">Section 3: Institutional Vision</span>
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight">Welcome to Delhi Public Model School</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Founded under the National Public Education Trust, Delhi Public Model School is dedicated to fostering intellectual distinction, emotional resilience, and moral character.
                </p>
                <div className="pt-2">
                  <button onClick={() => navigateTo('/about')} className="px-5 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl shadow">Read More About Us →</button>
                </div>
              </div>
              <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-xl space-y-4">
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wider">Principal Leadership Preview</span>
                <h3 className="text-xl font-bold">"Nurturing Character, Intellect and Purpose"</h3>
                <p className="text-slate-300 text-xs leading-relaxed">"Our mission is to help every student discover their potential through personalized mentorship and technology-enabled learning."</p>
                <div className="text-xs font-bold text-amber-400">— Dr. V. K. Sharma, Principal</div>
              </div>
            </section>

            {/* 4. WHY CHOOSE */}
            <section className="bg-slate-100 py-16 px-6 border-y border-slate-200">
              <div className="max-w-7xl mx-auto space-y-12">
                <div className="text-center max-w-2xl mx-auto">
                  <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">Section 4: Our Core Pillars</span>
                  <h2 className="text-3xl font-black text-slate-900 mt-2">Why Choose Delhi Public Model School?</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { icon: '🎓', title: 'CBSE Academic Rigor', desc: 'Continuous assessments, periodic tests, and comprehensive report cards.' },
                    { icon: '🤖', title: 'Smart STEM & AI Labs', desc: 'Robotics, high-speed computer labs, and interactive smart board classrooms.' },
                    { icon: '🛡️', title: 'Safe & Secure Campus', desc: 'CCTV surveillance, GPS bus tracking, and strict visitor verification.' },
                  ].map((card, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
                      <span className="text-3xl">{card.icon}</span>
                      <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                      <p className="text-slate-600 text-xs leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 5. STATS */}
            <section className="max-w-7xl mx-auto px-6">
              <div className="bg-indigo-950 text-white rounded-3xl p-8 lg:p-12 shadow-2xl grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
                <div><p className="text-3xl sm:text-4xl font-black text-amber-400">1,420+</p><p className="text-xs text-slate-300 font-bold mt-1">Enrolled Students</p></div>
                <div><p className="text-3xl sm:text-4xl font-black text-amber-400">68+</p><p className="text-xs text-slate-300 font-bold mt-1">Certified Educators</p></div>
                <div><p className="text-3xl sm:text-4xl font-black text-amber-400">100%</p><p className="text-xs text-slate-300 font-bold mt-1">CBSE Pass Rate</p></div>
                <div><p className="text-3xl sm:text-4xl font-black text-amber-400">10 Acres</p><p className="text-xs text-slate-300 font-bold mt-1">Lush Green Campus</p></div>
                <div><p className="text-3xl sm:text-4xl font-black text-amber-400">20+ Yrs</p><p className="text-xs text-slate-300 font-bold mt-1">Educational Legacy</p></div>
              </div>
            </section>

            {/* 6. ACADEMIC JOURNEY */}
            <section className="max-w-7xl mx-auto px-6 space-y-8">
              <div className="text-center max-w-2xl mx-auto">
                <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">Section 6: Wing Hierarchy</span>
                <h2 className="text-3xl font-black text-slate-900 mt-2">The Academic Journey at DPMS</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { step: '01', title: 'Foundational Wing', classes: 'Pre-Nursery, Nursery, LKG, UKG', desc: 'Activity-based sensory learning, phonetics, and motor development.' },
                  { step: '02', title: 'Primary Wing', classes: 'Class 1 to Class 5', desc: 'Core Literacy, Numeracy, Environmental Studies, Hindi & Computer Basics.' },
                  { step: '03', title: 'Middle Wing', classes: 'Class 6 to Class 8', desc: 'Integrated Sciences, Mathematics, Social Sciences, Third Language & Coding.' },
                  { step: '04', title: 'Senior Secondary', classes: 'Class 9 to Class 12', desc: 'Science (PCM/PCB), Commerce, and Humanities with laboratory practicals.' },
                ].map((wing, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2 relative">
                    <span className="text-2xl font-black text-indigo-100 absolute top-4 right-4">{wing.step}</span>
                    <h4 className="text-base font-bold text-slate-900">{wing.title}</h4>
                    <p className="text-xs font-bold text-indigo-600">{wing.classes}</p>
                    <p className="text-slate-600 text-xs leading-relaxed">{wing.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. FACILITIES */}
            <section className="bg-slate-100 py-16 px-6 border-y border-slate-200">
              <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-3xl font-black text-slate-900">Campus & Specialized Facilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['Advanced Science & Composite STEM Labs', 'Central Knowledge Library with 20,000+ Books', 'Olympic Standard Athletics & Sports Grounds'].map((fac, i) => (
                    <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-bold text-slate-900">{fac}</div>
                  ))}
                </div>
              </div>
            </section>

            {/* 8. FACULTY */}
            <section className="max-w-7xl mx-auto px-6 space-y-8">
              <h2 className="text-3xl font-black text-slate-900">Featured Faculty & Coordinators</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { n: 'Dr. V. K. Sharma', r: 'Principal', q: 'M.Sc., Ph.D.' },
                  { n: 'Mrs. Sunita Verma', r: 'Vice Principal', q: 'M.Sc., M.Ed.' },
                  { n: 'Mr. Rakesh Kapoor', r: 'HOD Mathematics', q: 'M.Sc., B.Ed.' },
                  { n: 'Mrs. Anjali Sen', r: 'Class Teacher (1-A)', q: 'M.A., B.Ed.' },
                ].map((f, i) => (
                  <div key={i} className="bg-white p-6 rounded-2xl border text-center space-y-1">
                    <h4 className="font-bold text-slate-900">{f.n}</h4>
                    <p className="text-xs text-indigo-600 font-bold">{f.r}</p>
                    <p className="text-xs text-slate-400">{f.q}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 9 & 10. NEWS & EVENTS */}
            <section className="bg-slate-100 py-16 px-6 border-y border-slate-200">
              <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">Latest School News</h3>
                  <div className="p-4 bg-white rounded-xl border shadow-sm">
                    <span className="text-xs font-bold text-indigo-600">15-Mar-2026</span>
                    <h4 className="font-bold text-slate-900 text-sm">CBSE Board Exam Date Sheet Finalized</h4>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-slate-900">Upcoming Holidays (Section 73)</h3>
                  <div className="p-4 bg-white rounded-xl border flex justify-between items-center shadow-sm">
                    <p className="font-bold text-slate-900 text-sm">Maha Shivratri & Holi Festival</p>
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">March 2026</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 11. ACHIEVEMENTS */}
            <section className="max-w-7xl mx-auto px-6 space-y-6">
              <h2 className="text-3xl font-black text-slate-900 text-center">School & Student Achievements</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {['100% CBSE Class 12 Pass Result (38 Above 95%)', 'National Science Olympiad Gold Medal (Arjun Sharma)', 'State Junior Athletics Championship Trophy'].map((a, i) => (
                  <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-bold text-amber-900 bg-amber-50/50">{a}</div>
                ))}
              </div>
            </section>

            {/* 12. GALLERY */}
            <section className="max-w-7xl mx-auto px-6 space-y-6">
              <div className="flex justify-between items-end">
                <h2 className="text-3xl font-black text-slate-900">Campus Gallery</h2>
                <button onClick={() => navigateTo('/about/gallery')} className="text-indigo-600 text-xs font-bold hover:underline">Open Albums →</button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['Sports Meet', 'Science Expo', 'Robotics Hub', 'Independence Gala'].map((g, i) => (
                  <div key={i} className="h-44 bg-white rounded-2xl border p-4 flex items-end font-bold shadow-sm">{g}</div>
                ))}
              </div>
            </section>

            {/* 13. TESTIMONIALS */}
            <section className="bg-slate-100 py-16 px-6 border-y border-slate-200">
              <div className="max-w-7xl mx-auto space-y-8">
                <h2 className="text-3xl font-black text-slate-900 text-center">Parent Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {['"The digital fee payment and automated attendance alerts provide complete peace of mind."', '"Balanced focus on robotics, academic discipline, and athletic sports makes DPMS a standout."'].map((t, i) => (
                    <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm text-xs italic text-slate-600">{t}</div>
                  ))}
                </div>
              </div>
            </section>

            {/* 14. CTA */}
            <section className="max-w-7xl mx-auto px-6 text-center space-y-6 py-12">
              <h2 className="text-4xl font-black text-slate-900">Join the Delhi Public Model School Family</h2>
              <div className="flex justify-center gap-4">
                <button onClick={() => navigateTo('/contact')} className="px-6 py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-lg">Submit Admission Inquiry</button>
                <button onClick={() => navigateTo('/contact')} className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-lg">Book Campus Tour</button>
              </div>
            </section>
          </div>
        )}

        {/* ================= VIEW 2: ABOUT US (TWO COLUMNS) ================= */}
        {currentPath === '/about' && (
          <div className="max-w-7xl mx-auto py-12 px-6 space-y-12">
            <div className="text-center max-w-3xl mx-auto border-b pb-8">
              <h2 className="text-4xl font-black text-slate-900 mt-2">About Delhi Public Model School</h2>
              <p className="text-slate-500 text-sm mt-3">Committed to academic excellence, leadership, and moral enlightenment since 2004.</p>
            </div>
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="h-64 sm:h-80 w-full overflow-hidden rounded-2xl shadow-inner relative bg-indigo-50 border">
                <img 
                  src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" 
                  alt="Delhi Public Model School Campus" 
                  className="w-full h-full object-cover rounded-2xl"
                />
              </div>
              <div className="space-y-4">
                <span className="text-xs font-black uppercase text-indigo-600 tracking-wider">Overview Section 1</span>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">1. About School</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Delhi Public Model School is an English Medium, Co-educational Senior Secondary Institution affiliated with CBSE, New Delhi under the National Public Education Trust. Operating foundational, primary, middle, and senior streams with modern robotic laboratories, sports infrastructure, and automated ERP workflows.
                </p>
                <div className="flex flex-wrap gap-2 text-[10px] font-bold text-indigo-900">
                  <span className="bg-indigo-50 px-2.5 py-1 rounded-md">✓ CBSE Affiliation 2130098</span>
                  <span className="bg-indigo-50 px-2.5 py-1 rounded-md">✓ 10-Acre Campus</span>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-3">
              <h3 className="text-xl font-black text-slate-900">2. History</h3>
              <p className="text-slate-600 text-sm leading-relaxed">Established in 2004 with 120 students, expanding over two decades to over 1,400 students across 16 classes with alumni serving globally across civil services, medicine, engineering, and research.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-3">
                <h3 className="text-xl font-black text-slate-900">3. Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed">To empower every child with intellectual agility, moral courage, emotional resilience, and scientific curiosity through individualized mentoring.</p>
              </div>
              <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-3">
                <h3 className="text-xl font-black text-slate-900">4. Vision</h3>
                <p className="text-slate-600 text-sm leading-relaxed">To be acknowledged nationally as a transformative center of academic and ethical leadership, bridging Indian values with 21st-century technological innovation.</p>
              </div>
            </div>
            <div className="bg-indigo-900 text-white rounded-3xl p-8 lg:p-12 shadow-xl grid grid-cols-1 md:grid-cols-4 gap-8 items-center">
              <div className="text-center space-y-3">
                <div className="w-28 h-28 bg-amber-400 rounded-full mx-auto flex items-center justify-center text-4xl font-black text-indigo-950 shadow-inner">Dr</div>
                <h4 className="font-bold text-lg">Dr. V. K. Sharma</h4>
                <p className="text-xs text-amber-300 font-semibold uppercase font-black">Principal, Ph.D.</p>
              </div>
              <div className="md:col-span-3 space-y-3">
                <h3 className="text-2xl font-black text-amber-400">5. Message from the Principal's Desk</h3>
                <p className="text-slate-200 text-sm leading-relaxed">"Dear Parents and Students, Welcome to Delhi Public Model School. We believe schooling ignites inquiry, self-discipline, and character. Our modern ERP provides transparent academic tracking."</p>
              </div>
            </div>
          </div>
        )}

        {/* SUBPAGES */}
        {currentPath === '/about/infrastructure' && (
          <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
            <h2 className="text-3xl font-black text-slate-900">School Infrastructure (Section 11)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Smart Classrooms with Digital Interactive Boards', 'Separate Physics, Chemistry, Biology & STEM Labs', 'Central Knowledge Library with 20,000+ Volumes', 'Computer & Robotics AI Hub', 'Olympic Standard Athletic & Sports Grounds', 'GPS Fleet of 25+ Buses with CCTV'].map((t, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm font-semibold">{t}</div>
              ))}
            </div>
          </div>
        )}

        {currentPath === '/about/facilities' && (
          <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
            <h2 className="text-3xl font-black text-slate-900">Campus Facilities (Section 12)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['24/7 Campus Health Infirmary & Resident Nurse', '800-Seat Acoustic Multi-Purpose Auditorium', 'Hygienic Organic Dining Cafeteria', 'Music, Classical Dance & Fine Arts Studio'].map((f, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-bold text-indigo-950">{f}</div>
              ))}
            </div>
          </div>
        )}

        {currentPath === '/about/achievements' && (
          <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
            <h2 className="text-3xl font-black text-slate-900">Achievements (Section 13)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['100% CBSE Class 12 Board Pass Result', 'National Science Olympiad Gold Medalist (Arjun Sharma)', 'State Athletics & Junior Football Championship Trophy'].map((a, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-bold text-amber-800 bg-amber-50">{a}</div>
              ))}
            </div>
          </div>
        )}

        {currentPath === '/about/rules' && (
          <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
            <h2 className="text-3xl font-black text-slate-900">School Code & Rules (Section 14)</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div className="p-6 bg-white rounded-2xl border shadow-sm space-y-2">
                <h4 className="font-bold text-slate-900">Attendance & Absence Rules (Section 32)</h4>
                <p className="text-slate-600">Minimum 75% attendance mandatory. Absentees receive automated notifications upon teacher lock.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl border shadow-sm space-y-2">
                <h4 className="font-bold text-slate-900">Examination AB Policy (Section 36)</h4>
                <p className="text-slate-600">Students absent from exams receive 'AB' status and are excluded from rank calculations.</p>
              </div>
            </div>
          </div>
        )}

        {currentPath === '/about/faculty' && (
          <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
            <h2 className="text-3xl font-black text-slate-900">Faculty Directory (Section 15)</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { n: 'Dr. V. K. Sharma', r: 'Principal', q: 'M.Sc., Ph.D.', wa: '9876543210', mail: 'principal@dpms.edu', fb: '#', ln: '#', ig: '#' },
                { n: 'Mrs. Sunita Verma', r: 'Vice Principal', q: 'M.Sc., M.Ed.', wa: '9876543211', mail: 'viceprincipal@dpms.edu', fb: '#', ln: '#', ig: '#' },
                { n: 'Mr. Rakesh Kapoor', r: 'HOD Maths', q: 'M.Sc., B.Ed.', wa: '9876543212', mail: 'maths@dpms.edu', fb: '#', ln: '#', ig: '#' },
                { n: 'Mrs. Anjali Sen', r: 'Class Teacher (1-A)', q: 'M.A., B.Ed.', wa: '9876543213', mail: 'anjali@dpms.edu', fb: '#', ln: '#', ig: '#' },
              ].map((f, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
                  <div className="w-16 h-16 bg-indigo-100 text-indigo-900 rounded-full mx-auto flex items-center justify-center font-bold text-lg">
                    {f.n.split(' ')?.[0]?.[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{f.n}</h4>
                    <p className="text-xs text-indigo-600 font-bold">{f.r}</p>
                    <p className="text-xs text-slate-400">{f.q}</p>
                  </div>
                  <div className="flex justify-center gap-2 pt-2 border-t text-xs">
                    <a href={`https://wa.me/91${f.wa}`} className="text-emerald-600 font-bold">WA</a>
                    <a href={`mailto:${f.mail}`} className="text-blue-600 font-bold">Mail</a>
                    <a href={f.fb} className="text-indigo-600 font-bold">FB</a>
                    <a href={f.ln} className="text-sky-700 font-bold">LN</a>
                    <a href={f.ig} className="text-rose-600 font-bold">IG</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentPath === '/about/gallery' && (
          <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
            <h2 className="text-3xl font-black text-slate-900">Media Gallery (Section 16)</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Annual Sports Meet', 'Science Fair 2026', 'Robotics Workshop', 'Independence Day Gala'].map((g, i) => (
                <div key={i} className="h-44 bg-white rounded-2xl border p-4 flex items-end font-bold shadow-sm">{g}</div>
              ))}
            </div>
          </div>
        )}

        {/* ================= VIEW: BLOG LIST & SINGLE POST ================= */}
        {currentPath === '/blog' && (
          <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
            <h2 className="text-3xl font-black text-slate-900">School Blog & Educational Insights (Section 76)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts.map((blog) => (
                <div key={blog.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-3 hover:shadow-md transition flex flex-col justify-between">
                  <div className="space-y-2">
                    <span className="text-xs text-indigo-600 font-bold">{blog.date} • {blog.readTime}</span>
                    <h3 className="text-lg font-bold text-slate-900 leading-snug">{blog.title}</h3>
                    <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed">{blog.excerpt}</p>
                  </div>
                  <div className="pt-4 border-t border-slate-100 mt-4 flex justify-between items-center">
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold uppercase">By {blog.author}</span>
                    <button
                      onClick={() => navigateTo(`/blog/${blog.id}`, blog)}
                      className="text-indigo-600 font-bold text-xs hover:underline flex items-center gap-1"
                    >
                      Read Full Post →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SINGLE BLOG POST */}
        {currentPath.startsWith('/blog/') && selectedBlog && (
          <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
            <article className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <span className="font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">{selectedBlog.readTime}</span>
                <span className="text-slate-400 font-semibold">{selectedBlog.date}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">{selectedBlog.title}</h1>
              
              <div className="p-4 bg-slate-50 border rounded-2xl flex items-center gap-4 text-xs">
                <div className="w-10 h-10 bg-indigo-900 text-white font-black rounded-full flex items-center justify-center">
                  {selectedBlog.author.split(' ')?.[0]?.[0]}
                </div>
                <div>
                  <p className="font-bold text-slate-800">{selectedBlog.author}</p>
                  <p className="text-slate-500 font-medium">{selectedBlog.authorRole}</p>
                </div>
              </div>

              <div className="text-slate-700 leading-relaxed space-y-4 text-sm pt-4">
                <p className="font-medium text-slate-900 border-l-4 border-indigo-600 pl-4 py-1 italic">
                  "{selectedBlog.excerpt}"
                </p>
                <p>{selectedBlog.content}</p>
              </div>

              <div className="pt-6 border-t flex justify-between items-center text-xs">
                <button onClick={() => navigateTo('/blog')} className="text-indigo-600 font-bold hover:underline">← Back to All Posts</button>
                <span className="text-slate-400 font-mono">Permalink: {currentPath}</span>
              </div>
            </article>
          </div>
        )}

        {/* ================= VIEW: RESOURCES SUBPAGES ================= */}
        {currentPath === '/resources/academics' && (
          <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
            <h2 className="text-3xl font-black text-slate-900">Academic Framework & Curriculum (Section 17)</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {['Foundational Wing (Pre-Nur - UKG)', 'Primary Wing (Class 1 - 5)', 'Middle Wing (Class 6 - 8)', 'Senior Secondary Wing (Class 9 - 12)'].map((w, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-bold text-slate-900">{w}</div>
              ))}
            </div>
          </div>
        )}

        {currentPath === '/resources/campus-life' && (
          <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
            <h2 className="text-3xl font-black text-slate-900">Campus Life & Activities (Section 11)</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Robotics & Innovation Clubs', 'Athletics & Physical Training Leagues', 'Literary & Dramatics Societies'].map((c, i) => (
                <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-semibold">{c}</div>
              ))}
            </div>
          </div>
        )}

        {currentPath === '/resources/examinations' && (
          <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
            <h2 className="text-3xl font-black text-slate-900">Examinations & Assessments (Section 33)</h2>
            <div className="p-6 bg-white rounded-2xl border shadow-sm space-y-4">
              <p className="text-sm text-slate-600">The school conducts Quarterly, Mid-Term, Half-Yearly, and Annual Examinations alongside continuous unit assessments.</p>
              <button onClick={() => navigateTo('/portal/student-login')} className="px-4 py-2 bg-indigo-900 text-white font-bold text-xs rounded-lg">Check Student Report Card →</button>
            </div>
          </div>
        )}

        {currentPath === '/news' && (
          <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
            <h2 className="text-3xl font-black text-slate-900">News & Event Calendar (Section 71, Section 73)</h2>
            <div className="p-6 bg-white rounded-2xl border shadow-sm">Annual Board Examination Schedule & Gazetted Holidays Calendar active.</div>
          </div>
        )}

        {/* ================= VIEW: CONTACT US ================= */}
        {currentPath === '/contact' && (
          <div className="max-w-7xl mx-auto py-12 px-6 space-y-12">
            <div className="text-center max-w-3xl mx-auto border-b pb-8">
              <h2 className="text-4xl font-black text-slate-900 mt-2">Contact Us & Campus Inquiry (Section 78)</h2>
              <p className="text-slate-500 text-sm mt-3">We welcome parents and guardians for admissions consultations and campus tours.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Send an Official Message</h3>
                {contactSubmitted ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center space-y-2">
                    <span className="text-2xl">✓</span>
                    <h4 className="font-bold text-base">Inquiry Successfully Submitted!</h4>
                    <p className="text-xs text-emerald-700">Our admissions desk will contact you at {phone} within 24 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    {captchaError && (
                      <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 text-xs rounded-xl font-semibold">
                        {captchaError}
                      </div>
                    )}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700">First Name *</label>
                        <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full mt-1 p-2.5 border rounded-xl text-xs bg-slate-50 outline-none" placeholder="e.g. Rajesh" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700">Last Name *</label>
                        <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full mt-1 p-2.5 border rounded-xl text-xs bg-slate-50 outline-none" placeholder="e.g. Sharma" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                        <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full mt-1 p-2.5 border rounded-xl text-xs bg-slate-50 outline-none" placeholder="+91 98765 43210" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700">Email Address *</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 p-2.5 border rounded-xl text-xs bg-slate-50 outline-none" placeholder="parent@example.com" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700">Subject *</label>
                      <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full mt-1 p-2.5 border rounded-xl text-xs bg-slate-50 font-bold text-slate-800">
                        <option value="Admissions Inquiry">Admissions Inquiry (Session 2026–27)</option>
                        <option value="Fee Query & Receipts">Fee Query & Online Payment</option>
                        <option value="Transport & Bus Route">Transportation & Bus Route</option>
                        <option value="Principal Appointment">Request Appointment with Principal</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700">Your Message *</label>
                      <textarea rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full mt-1 p-2.5 border rounded-xl text-xs bg-slate-50 outline-none" placeholder="Please provide student details..." />
                    </div>
                    {/* Spam Math Captcha */}
                    <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2 font-bold text-indigo-950">
                        <span>🛡️ Anti-Spam Verification:</span>
                        <span>What is 7 + 5 = ?</span>
                      </div>
                      <input type="number" required value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} className="w-20 p-2 border rounded-xl text-center font-bold bg-white" placeholder="Answer" />
                    </div>
                    <button type="submit" className="w-full py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-xl shadow-lg transition text-xs">
                      Submit Official Inquiry →
                    </button>
                  </form>
                )}
              </div>
              <div className="space-y-6">
                <div className="bg-indigo-950 text-white p-8 rounded-3xl shadow-sm space-y-4">
                  <h3 className="text-xl font-bold text-amber-400 font-black">Campus Contact Details</h3>
                  <div className="space-y-3 text-xs text-slate-300">
                    <p>📍 <strong>Address:</strong> Sector 14, Knowledge Corridor, Near Metro Station, New Delhi 110001</p>
                    <p>📞 <strong>Phone:</strong> +91 98765 43210 / 011-23456789</p>
                    <p>✉️ <strong>Admissions:</strong> admissions@delhipublicmodel.edu.in</p>
                  </div>
                </div>
                <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm h-64">
                  <iframe
                    title="Campus Location Google Map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.09262729584!2d77.10249019999999!3d28.7040592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    className="w-full h-full border-0"
                    allowFullScreen=""
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW: STUDENT LOGIN ================= */}
        {currentPath === '/portal/student-login' && (
          <div className="max-w-md mx-auto py-16 px-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold">👨‍👩‍👦</div>
                <h2 className="text-2xl font-black text-slate-900">Parent & Student Portal</h2>
                <p className="text-xs text-slate-500">Sign in using your Student ID & Password (Section 18)</p>
              </div>
              {authError && <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl font-semibold text-center">{authError}</div>}
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Student ID / Admission No / Mobile</label>
                  <input type="text" required value={loginUsername} onChange={(e) => { setLoginUsername(e.target.value); setLoginRole('STUDENT'); }} className="w-full mt-1 p-2.5 border rounded-xl text-sm bg-slate-50" placeholder="e.g. ST001 or 9876543210" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <input type="password" required value={loginPassword} onChange={(e) => { setLoginPassword(e.target.value); setLoginRole('STUDENT'); }} className="w-full mt-1 p-2.5 border rounded-xl text-sm bg-slate-50" placeholder="••••••••" />
                </div>
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
                  <strong>Demo Student Credentials:</strong><br />
                  Login accepts: <code className="font-bold">ST001</code> / Password: <code className="font-bold">StudentPass2026!</code>
                </div>
                <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md transition text-sm">
                  Sign In to Student Dashboard →
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= VIEW: STAFF LOGIN ================= */}
        {currentPath === '/portal/admin-login' && (
          <div className="max-w-md mx-auto py-16 px-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 bg-indigo-100 text-indigo-900 rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold">🔐</div>
                <h2 className="text-2xl font-black text-slate-900">School ERP Staff Login</h2>
                <p className="text-xs text-slate-500">Principal, Accountant & Faculty Portals</p>
              </div>
              {authError && <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl font-semibold text-center">{authError}</div>}
              {/* Role Toggle */}
              <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold text-slate-600">
                <button type="button" onClick={() => setLoginRole('TEACHER')} className={`flex-1 py-2 text-center rounded-xl transition ${loginRole === 'TEACHER' ? 'bg-white text-indigo-950 shadow-sm' : ''}`}>Faculty / Teacher</button>
                <button type="button" onClick={() => setLoginRole('ADMIN')} className={`flex-1 py-2 text-center rounded-xl transition ${loginRole === 'ADMIN' ? 'bg-white text-indigo-950 shadow-sm' : ''}`}>Admin / Principal</button>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Username</label>
                  <input type="text" required value={loginUsername} onChange={(e) => setLoginUsername(e.target.value)} className="w-full mt-1 p-2.5 border rounded-xl text-sm bg-slate-50" placeholder="e.g. admin or teacher" />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Password</label>
                  <input type="password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="w-full mt-1 p-2.5 border rounded-xl text-sm bg-slate-50" placeholder="••••••••" />
                </div>
                <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900">
                  <strong>Demo Staff Credentials:</strong><br />
                  • Admin: admin / <code className="font-bold">AdminPassword2026!</code><br />
                  • Teacher: teacher / <code className="font-bold">TeacherPass2026!</code>
                </div>
                <button type="submit" className="w-full py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-xl shadow-md transition text-sm">
                  Sign In to Staff Portal →
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ================= VIEW: STUDENT DASHBOARD ================= */}
        {currentPath === '/portal/student-dashboard' && (
          <div className="max-w-7xl mx-auto py-10 px-6 space-y-8">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-amber-400 text-indigo-950 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner">AS</div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-black text-slate-900">Welcome, Rajesh Sharma</h2>
                    <span className="text-xs bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded font-bold uppercase">Parent Account</span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-500 font-bold">Linked Child:</span>
                    <select value={selectedChild} onChange={(e) => setSelectedChild(e.target.value)} className="p-1 border rounded bg-slate-50 text-xs font-bold">
                      <option value="Arjun Sharma">Arjun Sharma (Class 1-A, ST001)</option>
                      <option value="Karan Sharma">Karan Sharma (Class 5-B, ST002)</option>
                    </select>
                  </div>
                </div>
              </div>
              <button onClick={handleLogout} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm">Logout</button>
            </div>

            {/* Profile Bar */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
              <div><span className="text-slate-400 font-bold">Child Name:</span> <p className="font-bold text-slate-800">{selectedChild}</p></div>
              <div><span className="text-slate-400 font-bold">Father:</span> <p className="font-bold text-slate-800">{currentUser?.father || 'Rajesh Sharma'}</p></div>
              <div><span className="text-slate-400 font-bold">Mother:</span> <p className="font-bold text-slate-800">{currentUser?.mother || 'Neha Sharma'}</p></div>
              <div><span className="text-slate-400 font-bold">Student Aadhaar (Section 22):</span> <p className="font-bold font-mono text-indigo-900">{currentUser?.aadhaar || 'XXXX XXXX XXXX 4321'}</p></div>
            </div>

            {/* 1. REPORT CARD WITH LIVE FILTER & 9 SUBJECTS */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
              <div className="bg-indigo-950 text-white p-6 flex justify-between items-center">
                <div>
                  <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Master Plan Section 122 & Section 43</span>
                  <h3 className="text-2xl font-black">Student Academic Report Card & Progress</h3>
                  <p className="text-xs text-slate-300 mt-1">Filtered by: <strong className="text-amber-400">{activeReportExam}</strong> Examination</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => window.print()} className="px-4 py-2 bg-white/10 text-white text-xs font-bold rounded-xl border border-white/20">Print Report Card</button>
                  <button onClick={() => alert('Downloading official PDF report card...')} className="px-4 py-2 bg-amber-500 text-white text-xs font-bold rounded-xl shadow">Download PDF</button>
                </div>
              </div>

              {/* Dynamic Summary Cards */}
              <div className="p-6 bg-slate-50 border-b grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-2xl border text-center">
                  <p className="text-xs text-slate-400 font-bold">TOTAL MARKS</p>
                  <p className="text-xl font-black text-slate-900">{totalObt} / {totalMax}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border text-center">
                  <p className="text-xs text-slate-400 font-bold">PERCENTAGE</p>
                  <p className="text-xl font-black text-indigo-900">{percentage}%</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border text-center">
                  <p className="text-xs text-slate-400 font-bold">GRADE</p>
                  <p className="text-xl font-black text-emerald-600">{grade}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border text-center">
                  <p className="text-xs text-slate-400 font-bold">CLASS RANK (Section 54)</p>
                  <p className="text-xl font-black text-amber-600">Rank #2 (Top 5)</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border text-center">
                  <p className="text-xs text-slate-400 font-bold">STATUS</p>
                  <p className="text-xl font-black text-emerald-700">PASS</p>
                </div>
              </div>

              {/* Live Interactive Exam Filters */}
              <div className="p-6 space-y-6">
                <div className="flex flex-wrap gap-2 border-b pb-4">
                  {['All Examinations', 'Quarterly', 'Mid-Term', 'Half-Yearly', 'Annual', 'Class Tests', 'Practical'].map((exam) => (
                    <button
                      key={exam}
                      onClick={() => setActiveReportExam(exam)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${activeReportExam === exam ? 'bg-indigo-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                    >
                      {exam}
                    </button>
                  ))}
                </div>

                {/* 9 Subjects Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-sm font-bold text-slate-800">
                    Subject Assessment Breakdown for {activeReportExam} ({getCurrentExamSubjects().length} Subjects Listed):
                  </h4>
                  {getCurrentExamSubjects().map((sub) => (
                    <div key={sub.name} className="border rounded-2xl overflow-hidden bg-white">
                      <div
                        onClick={() => setExpandedSubject(expandedSubject === sub.name ? null : sub.name)}
                        className="p-4 bg-slate-50 hover:bg-slate-100 cursor-pointer flex justify-between items-center transition"
                      >
                        <span className="font-bold text-slate-900 text-sm">{sub.name}</span>
                        <div className="flex items-center gap-4 text-xs font-bold">
                          <span className="text-indigo-900">{sub.totalObt} / {sub.totalMax}</span>
                          <span className="text-emerald-600 font-extrabold">{((sub.totalObt / sub.totalMax) * 100).toFixed(1)}%</span>
                          <span className="text-slate-400">{expandedSubject === sub.name ? '▲' : '▼'}</span>
                        </div>
                      </div>
                      {expandedSubject === sub.name && (
                        <div className="p-4 bg-white border-t">
                          <table className="w-full text-xs text-left">
                            <thead className="bg-slate-100 font-bold text-slate-700">
                              <tr>
                                <th className="p-2">Assessment Component</th>
                                <th className="p-2">Max Marks</th>
                                <th className="p-2">Marks Obtained</th>
                                <th className="p-2">Percentage</th>
                              </tr>
                            </thead>
                            <tbody>
                              {sub.components.map((c, idx) => (
                                <tr key={idx} className="border-b">
                                  <td className="p-2 font-semibold text-slate-800">{c.name}</td>
                                  <td className="p-2">{c.max}</td>
                                  <td className="p-2 font-bold text-indigo-900">{c.obt}</td>
                                  <td className="p-2 font-bold text-emerald-600">{((c.obt / c.max) * 100).toFixed(1)}%</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* PARENT FEE DESK */}
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Fee Management & Ledger (Section 57)</span>
                  <h3 className="text-2xl font-black text-slate-900">Student 12-Month Itemized Fee Table</h3>
                  <p className="text-xs text-slate-500 mt-1">Full academic session (April 2026 to March 2027) with individual fee types, paid/unpaid statuses and checkout triggers.</p>
                </div>
                <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
                  Outstanding Dues: {calculateSelectedFeeTotal() > 0 ? "₹" + calculateSelectedFeeTotal() : "₹0"}
                </span>
              </div>

              {/* Complete 12-Month Ledger Table */}
              <div className="border rounded-2xl overflow-hidden bg-white shadow-sm">
                <table className="w-full text-xs text-left">
                  <thead className="bg-indigo-950 text-white font-bold">
                    <tr>
                      <th className="p-3">Select</th>
                      <th className="p-3">Fee Type</th>
                      <th className="p-3">Period / Month</th>
                      <th className="p-3">Due Date</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Status</th>
                      <th className="p-3">Receipt / Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feeLedgerList.map((fee) => (
                      <tr key={fee.id} className="border-b hover:bg-slate-50">
                        <td className="p-3 text-center">
                          {!fee.paid ? (
                            <input
                              type="checkbox"
                              checked={selectedFeeIds.includes(fee.id)}
                              onChange={(e) => {
                                if (e.target.checked) setSelectedFeeIds([...selectedFeeIds, fee.id]);
                                else setSelectedFeeIds(selectedFeeIds.filter((id) => id !== fee.id));
                              }}
                              className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                            />
                          ) : (
                            <span className="text-emerald-600 font-bold">✓</span>
                          )}
                        </td>
                        <td className="p-3 font-semibold text-slate-900">{fee.type}</td>
                        <td className="p-3 font-bold">{fee.month}</td>
                        <td className="p-3 text-slate-500">{fee.due}</td>
                        <td className="p-3 font-bold">₹{fee.amount}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${fee.paid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
                            {fee.paid ? 'Paid' : 'Unpaid'}
                          </span>
                        </td>
                        <td className="p-3">
                          {fee.paid ? (
                            <button onClick={() => alert(`Receipt downloaded for ${fee.type} (${fee.month})`)} className="text-indigo-600 font-bold hover:underline">
                              Download Receipt
                            </button>
                          ) : (
                            <button onClick={() => { setSelectedFeeIds([fee.id]); setQrGenerated(true); }} className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-[10px]">
                              Pay Now
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Dynamic QR & Payment Flow */}
              {!qrGenerated && !paymentDone && (
                <button
                  onClick={() => setQrGenerated(true)}
                  disabled={selectedFeeIds.length === 0}
                  className={`w-full py-3.5 font-bold rounded-2xl shadow-lg transition text-sm ${selectedFeeIds.length > 0 ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
                >
                  Pay Selected Fees (₹{calculateSelectedFeeTotal() > 0 ? calculateSelectedFeeTotal() : "0"}) via Dynamic Single-Order UPI QR
                </button>
              )}

              {qrGenerated && !paymentDone && (
                <div className="text-center p-6 border rounded-3xl bg-slate-50 space-y-4">
                  <h4 className="font-bold text-slate-900">Student-Specific Single-Order UPI QR Code (Section 63, Section 67)</h4>
                  <div className="w-48 h-48 bg-white border-4 border-indigo-900 rounded-2xl mx-auto flex items-center justify-center font-mono font-bold text-indigo-950 p-2 shadow-md">
                    [DYNAMIC QR CODE]<br />upi://pay?pa=schoolfees@okaxis&am={calculateSelectedFeeTotal()}&tr=order_st001
                  </div>
                  <p className="text-xs text-slate-500">Amount: <strong className="text-indigo-900">₹{calculateSelectedFeeTotal() > 0 ? calculateSelectedFeeTotal() : "0"}</strong> | Settles oldest unpaid fees via strict FIFO allocation.</p>
                  <button onClick={() => { setFeeLedgerList(prev => prev.map(f => selectedFeeIds.includes(f.id) ? { ...f, paid: true } : f)); setPaymentDone(true); }} className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow">
                    Simulate Server Webhook Payment Verification
                  </button>
                </div>
              )}

              {paymentDone && (
                <div className="p-6 bg-emerald-50 text-emerald-900 rounded-3xl text-center space-y-3 border border-emerald-200">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center font-bold text-2xl">✓</div>
                  <h4 className="font-bold text-base">Payment Verified via Server-side Webhook (Section 69)!</h4>
                  <p className="text-xs text-slate-600">Selected fees marked as Paid. Automatic Ledger Updated.</p>
                  <button onClick={() => alert('Official Computer-Generated PDF Receipt Downloaded (Section 73)')} className="px-4 py-2 bg-white text-emerald-700 font-bold rounded-xl border text-xs shadow-sm">
                    📥 Download PDF Receipt (Section 73)
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= VIEW: FACULTY / TEACHER DASHBOARD ================= */}
        {currentPath === '/portal/faculty-dashboard' && (
          <div className="max-w-7xl mx-auto py-10 px-6 space-y-8 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-indigo-900 text-white rounded-2xl flex items-center justify-center font-black text-2xl shadow-md">👩‍🏫</div>
                <div>
                  <h2 className="text-xl font-black text-slate-900">Welcome, Mrs. Anjali Sen</h2>
                  <p className="text-xs text-slate-500">Designation: Class Teacher | Class 1-A Coordinator | Employee ID: EMP004</p>
                </div>
              </div>
              <button onClick={handleLogout} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm">Logout</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Daily Attendance marking */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <h4 className="font-bold text-slate-900 text-sm">Class 1-A Attendance Sheet (Section 17)</h4>
                  <button
                    onClick={() => { setAttendanceLocked(true); alert('Attendance Locked.'); }}
                    disabled={attendanceLocked}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${attendanceLocked ? 'bg-slate-200 text-slate-500' : 'bg-emerald-600 text-white hover:bg-emerald-700'}`}
                  >
                    {attendanceLocked ? 'Locked' : 'Lock & Dispatch Alerts'}
                  </button>
                </div>
                <table className="w-full text-xs text-left border rounded-xl overflow-hidden">
                  <thead className="bg-slate-100 font-bold text-slate-700">
                    <tr>
                      <th className="p-2">Student</th>
                      <th className="p-2">Roll</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-bold text-slate-900">Arjun Sharma (ST001)</td>
                      <td className="p-2">01</td>
                      <td className="p-2">
                        <select disabled={attendanceLocked} className="border p-1 rounded bg-slate-50 font-bold">
                          <option>Present</option>
                          <option>Absent (AB)</option>
                          <option>Late</option>
                          <option>Leave</option>
                        </select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Classwork / Homework */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
                <h4 className="font-bold text-slate-900 text-sm border-b pb-2">Upload Daily Classwork & Homework (Section 20)</h4>
                {classworkStatus && <p className="text-xs bg-emerald-50 text-emerald-800 p-2 rounded font-bold">{classworkStatus}</p>}
                <form
                  onSubmit={(e) => { e.preventDefault(); setClassworkStatus('Uploaded successfully!'); }}
                  className="space-y-3"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <input required className="p-2 border rounded-xl text-xs bg-slate-50" placeholder="Subject" />
                    <input required className="p-2 border rounded-xl text-xs bg-slate-50" placeholder="Topic" />
                  </div>
                  <textarea required className="w-full p-2 border rounded-xl text-xs bg-slate-50" rows={2} placeholder="Homework instructions..." />
                  <button type="submit" className="w-full py-2 bg-indigo-900 text-white font-bold rounded-xl text-xs">Publish Homework</button>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ================= VIEW: EXECUTIVE ADMIN DASHBOARD ================= */}
        {currentPath === '/portal/admin-dashboard' && (
          <div className="max-w-7xl mx-auto py-10 px-6 space-y-8 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <div>
                <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Master Plan Section 92 Executive Control Room</span>
                <h2 className="text-xl font-black text-slate-900">Administrator Command Center (Delhi Public Model School)</h2>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => setShowAddStudentModal(true)} 
                  className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl shadow-sm"
                >
                  ➕ Add New Student Profile
                </button>
                <button onClick={handleLogout} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl">Logout Session</button>
              </div>
            </div>

            {/* 10 ADMIN KPI CARDS */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {[
                { label: 'TOTAL STUDENTS', val: `${1420 + studentRoster.length - 1}`, color: 'border-indigo-600 text-indigo-950' },
                { label: 'TOTAL FACULTY', val: '68', color: 'border-blue-600 text-blue-950' },
                { label: 'PRESENT TODAY', val: '1,385', color: 'border-emerald-600 text-emerald-950' },
                { label: 'ABSENT TODAY', val: '35', color: 'border-rose-600 text-rose-950' },
                { label: 'PENDING FEES', val: '₹4,85,000', color: 'border-amber-600 text-amber-950' },
                { label: 'FEES COLLECTED', val: '₹18,40,000', color: 'border-teal-600 text-teal-950' },
                { label: 'UPCOMING EXAMS', val: '4 Assessments', color: 'border-violet-600 text-violet-950' },
                { label: 'UPCOMING EVENTS', val: '3 Events', color: 'border-sky-600 text-sky-950' },
                { label: 'NEW ADMISSIONS', val: `${42 + studentRoster.length - 1} Applicants`, color: 'border-fuchsia-600 text-fuchsia-950' },
                { label: 'LEAVE REQUESTS', val: '6 Pending', color: 'border-orange-600 text-orange-950' },
              ].map((card, idx) => (
                <div key={idx} className={`p-4 bg-white rounded-2xl border-l-4 shadow-sm ${card.color}`}>
                  <p className="text-xs text-slate-400 font-bold">{card.label}</p>
                  <p className="text-lg font-black mt-1">{card.val}</p>
                </div>
              ))}
            </div>

            {/* LIVE SEARCH & FILTER */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-slate-900">Student Search & Multi-Criteria Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="Search by Student Name, ID, Admission No, Mobile..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className="p-2.5 border rounded-xl text-xs bg-slate-50 outline-none"
                />
                <select
                  value={adminClassFilter}
                  onChange={(e) => setAdminClassFilter(e.target.value)}
                  className="p-2.5 border rounded-xl text-xs bg-slate-50 font-bold"
                >
                  <option value="ALL">All Classes (Pre-Nursery to Class 12)</option>
                  <option value="Class 1">Class 1</option>
                  <option value="Class 2">Class 2</option>
                </select>
                <div className="flex gap-2">
                  <button onClick={() => alert('Excel / CSV Student Bulk Import initiated.')} className="flex-1 px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl">📁 Import Excel (Section 24)</button>
                  <button onClick={() => alert('Exporting Master Student Report to PDF.')} className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl border">Export PDF</button>
                </div>
              </div>
            </div>

            {/* LIVE ROSTER TABLE */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <div className="flex justify-between items-center border-b pb-3">
                <h3 className="text-base font-bold text-slate-900">Enrolled Student Profiles (PostgreSQL §23)</h3>
                <span className="text-xs bg-indigo-50 text-indigo-900 px-3 py-1 rounded-full font-bold">Total: {studentRoster.length}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 font-bold text-slate-700">
                    <tr>
                      <th className="p-3">Student ID</th>
                      <th className="p-3">Full Name</th>
                      <th className="p-3">Class & Section</th>
                      <th className="p-3">Roll No</th>
                      <th className="p-3">Father / Guardian</th>
                      <th className="p-3">Contact Mobile</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {studentRoster.map((st, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="p-3 font-mono font-bold text-indigo-900">{st.id}</td>
                        <td className="p-3 font-bold text-slate-900">{st.name}</td>
                        <td className="p-3">{st.class}</td>
                        <td className="p-3">{st.roll}</td>
                        <td className="p-3">{st.parent}</td>
                        <td className="p-3 font-mono">{st.mobile}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* POPUP MODAL: ADD STUDENT PROFILE */}
            {showAddStudentModal && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white p-6 md:p-8 rounded-3xl border shadow-2xl max-w-lg w-full space-y-4">
                  <div className="flex justify-between items-center border-b pb-3">
                    <h4 className="font-bold text-indigo-950 text-base">Register New Student Profile</h4>
                    <button onClick={() => setShowAddStudentModal(false)} className="font-bold text-slate-400 hover:text-slate-700">✕</button>
                  </div>

                  {addStudentSuccess && (
                    <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold">
                      {addStudentSuccess}
                    </div>
                  )}

                  <form onSubmit={handleAddNewStudent} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700">Student Name *</label>
                        <input required value={newStudentData.name} onChange={e => setNewStudentData({ ...newStudentData, name: e.target.value })} className="w-full mt-1 p-2 border rounded-xl text-xs bg-slate-50" placeholder="e.g. Rahul Sharma" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700">Roll Number *</label>
                        <input required value={newStudentData.roll} onChange={e => setNewStudentData({ ...newStudentData, roll: e.target.value })} className="w-full mt-1 p-2 border rounded-xl text-xs bg-slate-50" placeholder="e.g. 12" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-bold text-slate-700">Class & Section *</label>
                        <input required value={newStudentData.className} onChange={e => setNewStudentData({ ...newStudentData, className: e.target.value })} className="w-full mt-1 p-2 border rounded-xl text-xs bg-slate-50" placeholder="e.g. Class 1-A" />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-slate-700">Father's Name *</label>
                        <input required value={newStudentData.father} onChange={e => setNewStudentData({ ...newStudentData, father: e.target.value })} className="w-full mt-1 p-2 border rounded-xl text-xs bg-slate-50" placeholder="Guardian Name" />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700">Parent Mobile (Portal Login) *</label>
                      <input required type="tel" value={newStudentData.mobile} onChange={e => setNewStudentData({ ...newStudentData, mobile: e.target.value })} className="w-full mt-1 p-2 border rounded-xl text-xs bg-slate-50" placeholder="+91 98765 43210" />
                    </div>

                    <div className="pt-2 flex justify-end gap-3 border-t">
                      <button type="button" onClick={() => setShowAddStudentModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-bold rounded-xl">Cancel</button>
                      <button type="submit" className="px-5 py-2 bg-indigo-900 text-white text-xs font-bold rounded-xl shadow-md hover:bg-indigo-800">Save & Enrol Student</button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= GLOBAL SECTIONS (EXCEPT HOME & BLOG) ================= */}
        {shouldRenderGlobalSections() && (
          <div className="space-y-16 mt-16 border-t pt-16">
            <section className="max-w-7xl mx-auto px-6">
              <div className="bg-indigo-950 text-white rounded-3xl p-8 lg:p-12 shadow-2xl grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
                <div><p className="text-3xl sm:text-4xl font-black text-amber-400">1,420+</p><p className="text-xs text-slate-300 font-bold mt-1">Enrolled Students</p></div>
                <div><p className="text-3xl sm:text-4xl font-black text-amber-400">68+</p><p className="text-xs text-slate-300 font-bold mt-1">Certified Educators</p></div>
                <div><p className="text-3xl sm:text-4xl font-black text-amber-400">100%</p><p className="text-xs text-slate-300 font-bold mt-1">CBSE Pass Rate</p></div>
                <div><p className="text-3xl sm:text-4xl font-black text-amber-400">10 Acres</p><p className="text-xs text-slate-300 font-bold mt-1">Lush Green Campus</p></div>
                <div><p className="text-3xl sm:text-4xl font-black text-amber-400">20+ Yrs</p><p className="text-xs text-slate-300 font-bold mt-1">Educational Legacy</p></div>
              </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 text-center space-y-6 pb-12">
              <h2 className="text-4xl font-black text-slate-900">Join the Delhi Public Model School Family</h2>
              <p className="text-slate-500 text-sm max-w-xl mx-auto">Admissions are open for Pre-Nursery through Class 11 for the academic session 2026–27.</p>
              <div className="flex justify-center gap-4">
                <button onClick={() => navigateTo('/contact')} className="px-6 py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-bold text-xs rounded-xl shadow-lg">Submit Admission Inquiry</button>
                <button onClick={() => navigateTo('/contact')} className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-xl shadow-lg">Book Campus Tour</button>
              </div>
            </section>
          </div>
        )}

      </main>

      {/* 4. FOOTER (4 FULL COLUMNS VERBATIM) */}
      <footer className="bg-indigo-950 text-slate-300 py-12 px-6 border-t border-indigo-900 text-xs w-full">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 leading-relaxed">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-indigo-900 rounded-xl flex items-center justify-center text-white font-black text-lg">DP</div>
              <h4 className="text-white font-bold text-sm">Delhi Public Model School</h4>
            </div>
            <p className="text-amber-400 font-bold uppercase tracking-wider text-xs">Discipline • Excellence • Integrity</p>
            <p className="text-slate-400">CBSE Affiliated Senior Secondary Institution committed to values, athletic distinction, and academic rigor.</p>
            <div className="flex gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition">🔵 Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition">📸 Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-white transition">🔴 YouTube</a>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm">About Us Subpages (Section 10)</h4>
            <p onClick={() => navigateTo('/about/infrastructure')} className="hover:text-white cursor-pointer">School Infrastructure (Section 11)</p>
            <p onClick={() => navigateTo('/about/facilities')} className="hover:text-white cursor-pointer">Campus Facilities (Section 12)</p>
            <p onClick={() => navigateTo('/about/achievements')} className="hover:text-white cursor-pointer">Student Achievements (Section 13)</p>
            <p onClick={() => navigateTo('/about/rules')} className="hover:text-white cursor-pointer">School Code & Rules (Section 14)</p>
            <p onClick={() => navigateTo('/about/faculty')} className="hover:text-white cursor-pointer">Faculty Directory (Section 15)</p>
            <p onClick={() => navigateTo('/about/gallery')} className="hover:text-white cursor-pointer">Media Gallery (Section 16)</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm">Resources & Portals</h4>
            <p onClick={() => navigateTo('/portal/student-login')} className="hover:text-white cursor-pointer">Parent & Student Portal (Section 18)</p>
            <p onClick={() => navigateTo('/portal/admin-login')} className="hover:text-white cursor-pointer">Admin Command Center (Section 92)</p>
            <p onClick={() => navigateTo('/resources/academics')} className="hover:text-white cursor-pointer">Curriculum Framework (Section 17)</p>
            <p onClick={() => navigateTo('/blog')} className="hover:text-white cursor-pointer">Educational Blog (Section 76)</p>
          </div>

          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Contact Campus</h4>
            <p>📍 Sector 14, Knowledge Corridor, New Delhi 110001</p>
            <p>📞 Phone: +91 98765 43210</p>
            <p>✉️ Email: info@delhipublicmodel.edu.in</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10 text-center text-xs text-slate-500">
          <p>© 2026 Delhi Public Model School. All Rights Reserved. Enterprise School ERP Platform.</p>
        </div>
      </footer>
    </div>
  );
}
