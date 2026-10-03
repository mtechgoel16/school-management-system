'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StudentDashboardPage() {
  const [selectedChild, setSelectedChild] = useState('Arjun Sharma');
  const [activeReportExam, setActiveReportExam] = useState('Annual');
  const [expandedSubject, setExpandedSubject] = useState('Hindi');
  const [selectedFeeIds, setSelectedFeeIds] = useState(['M11', 'M12']);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

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

  // 1. TOP ROWS: Annual, One-Time & Optional Charges
  const [annualFees, setAnnualFees] = useState([
    { id: 'A01', type: 'Annual Fee (Upfront Plan)', category: 'Annual / One-Time', period: 'Academic Session 2026–27', due: '10-Apr-2026', amount: 11000, paid: true },
    { id: 'A02', type: 'Transport Charge (Yearly Option - Optional)', category: 'Optional Transport', period: 'Academic Session 2026–27', due: '10-Apr-2026', amount: 8000, paid: true },
    { id: 'A03', type: 'Activity & Sports Fee', category: 'Annual / One-Time', period: 'Academic Session 2026–27', due: '10-Jul-2026', amount: 600, paid: true },
    { id: 'A04', type: 'Examination Fee', category: 'Annual / One-Time', period: 'Academic Session 2026–27', due: '10-Sep-2026', amount: 500, paid: true }
  ]);

  // 2. BOTTOM ROWS: Month-wise Fees (Chronological April 2026 to March 2027)
  const [monthlyFees, setMonthlyFees] = useState([
    { id: 'M01', type: 'Tuition Fee (Monthly Plan)', category: 'Monthly Fee', period: 'April 2026', due: '10-Apr-2026', amount: 1000, paid: true },
    { id: 'M02', type: 'Tuition Fee (Monthly Plan)', category: 'Monthly Fee', period: 'May 2026', due: '10-May-2026', amount: 1000, paid: true },
    { id: 'M03', type: 'Tuition Fee (Monthly Plan)', category: 'Monthly Fee', period: 'June 2026', due: '10-Jun-2026', amount: 1000, paid: true },
    { id: 'M04', type: 'Transport Charge (Monthly Option - Optional)', category: 'Monthly Transport', period: 'June 2026', due: '10-Jun-2026', amount: 800, paid: true },
    { id: 'M05', type: 'Tuition Fee (Monthly Plan)', category: 'Monthly Fee', period: 'July 2026', due: '10-Jul-2026', amount: 1000, paid: true },
    { id: 'M06', type: 'Tuition Fee (Monthly Plan)', category: 'Monthly Fee', period: 'August 2026', due: '10-Aug-2026', amount: 1000, paid: true },
    { id: 'M07', type: 'Tuition Fee (Monthly Plan)', category: 'Monthly Fee', period: 'September 2026', due: '10-Sep-2026', amount: 1000, paid: true },
    { id: 'M08', type: 'Tuition Fee (Monthly Plan)', category: 'Monthly Fee', period: 'October 2026', due: '10-Oct-2026', amount: 1000, paid: true },
    { id: 'M09', type: 'Tuition Fee (Monthly Plan)', category: 'Monthly Fee', period: 'November 2026', due: '10-Nov-2026', amount: 1000, paid: true },
    { id: 'M10', type: 'Tuition Fee (Monthly Plan)', category: 'Monthly Fee', period: 'December 2026', due: '10-Dec-2026', amount: 1000, paid: true },
    { id: 'M11', type: 'Tuition Fee (Monthly Plan)', category: 'Monthly Fee', period: 'January 2027', due: '10-Jan-2027', amount: 1000, paid: true },
    { id: 'M12', type: 'Tuition Fee (Monthly Plan)', category: 'Monthly Fee', period: 'February 2027', due: '10-Feb-2027', amount: 1000, paid: false },
    { id: 'M13', type: 'Tuition Fee (Monthly Plan)', category: 'Monthly Fee', period: 'March 2027', due: '10-Mar-2027', amount: 1000, paid: false },
    { id: 'M14', type: 'Transport Charge (Monthly Option - Optional)', category: 'Monthly Transport', period: 'March 2027', due: '10-Mar-2027', amount: 800, paid: false }
  ]);

  const allFees = [...annualFees, ...monthlyFees];

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
    return allFees.filter(f => selectedFeeIds.includes(f.id)).reduce((sum, item) => sum + item.amount, 0);
  };

  const toggleSelectFee = (id) => {
    if (selectedFeeIds.includes(id)) {
      setSelectedFeeIds(selectedFeeIds.filter(item => item !== id));
    } else {
      setSelectedFeeIds([...selectedFeeIds, id]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8 animate-fade-in">
      
      {/* 1. PARENT WELCOME & CHILD SELECTOR */}
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
              <select value={selectedChild} onChange={(e) => setSelectedChild(e.target.value)} className="p-1 border rounded bg-slate-50 text-xs font-bold text-slate-800">
                <option value="Arjun Sharma">Arjun Sharma (Class 1-A, ST001)</option>
                <option value="Karan Sharma">Karan Sharma (Class 5-B, ST002)</option>
              </select>
            </div>
          </div>
        </div>
        <Link href="/" className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-sm transition">
          Logout
        </Link>
      </div>

      {/* 2. PROFILE DETAILS BAR */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div><span className="text-slate-400 font-bold">Child Name:</span> <p className="font-bold text-slate-800">{selectedChild}</p></div>
        <div><span className="text-slate-400 font-bold">Father:</span> <p className="font-bold text-slate-800">Rajesh Sharma</p></div>
        <div><span className="text-slate-400 font-bold">Mother:</span> <p className="font-bold text-slate-800">Neha Sharma</p></div>
        <div><span className="text-slate-400 font-bold">Student Aadhaar (Section 22):</span> <p className="font-bold font-mono text-indigo-900">XXXX XXXX XXXX 4321</p></div>
      </div>

      {/* 3. REPORT CARD WITH LIVE FILTER & 9 SUBJECTS ACCORDION */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
        <div className="bg-indigo-950 text-white p-6 flex justify-between items-center">
          <div>
            <span className="text-xs uppercase font-bold text-amber-400 tracking-wider">Master Plan Section 122 & Section 43</span>
            <h3 className="text-2xl font-black">Student Academic Report Card & Progress</h3>
            <p className="text-xs text-slate-300 mt-1">Filtered by: <strong className="text-amber-400">{activeReportExam}</strong> Examination</p>
          </div>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl border border-white/20 transition">
              Print Report Card
            </button>
            <button onClick={() => alert('Downloading official PDF report card...')} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow transition">
              Download PDF
            </button>
          </div>
        </div>

        {/* Dynamic Summary Cards */}
        <div className="p-6 bg-slate-50 border-b grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-2xl border text-center shadow-sm">
            <p className="text-xs text-slate-400 font-bold">TOTAL MARKS</p>
            <p className="text-xl font-black text-slate-900">{totalObt} / {totalMax}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border text-center shadow-sm">
            <p className="text-xs text-slate-400 font-bold">PERCENTAGE</p>
            <p className="text-xl font-black text-indigo-900">{percentage}%</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border text-center shadow-sm">
            <p className="text-xs text-slate-400 font-bold">GRADE</p>
            <p className="text-xl font-black text-emerald-600">{grade}</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border text-center shadow-sm">
            <p className="text-xs text-slate-400 font-bold">CLASS RANK (Section 54)</p>
            <p className="text-xl font-black text-amber-600">Rank #2 (Top 5)</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border text-center shadow-sm">
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
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  activeReportExam === exam ? 'bg-indigo-900 text-white shadow-md' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {exam}
              </button>
            ))}
          </div>

          {/* 9 Subjects Breakdown Accordion */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-slate-800">
              Subject Assessment Breakdown for {activeReportExam} ({getCurrentExamSubjects().length} Subjects Listed):
            </h4>
            {getCurrentExamSubjects().map((sub) => (
              <div key={sub.name} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
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
                  <div className="p-4 bg-white border-t border-slate-100">
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
                          <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
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

          {/* General Performance Matrix */}
          <div className="mt-8 border-t pt-6 space-y-4">
            <h4 className="text-sm font-bold text-slate-900">General Performance Evaluation (Section 50, Section 51):</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <p className="font-bold text-indigo-950">Personal Development</p>
                <p className="text-slate-600">Prayer: <strong className="text-emerald-700">A-1</strong></p>
                <p className="text-slate-600">Lunch Manners: <strong className="text-emerald-700">A-1</strong></p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <p className="font-bold text-indigo-950">Social Development</p>
                <p className="text-slate-600">Discipline: <strong className="text-emerald-700">A-1</strong></p>
                <p className="text-slate-600">Cooperation: <strong className="text-emerald-700">A-1</strong></p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <p className="font-bold text-indigo-950">Language Development</p>
                <p className="text-slate-600">Conversation: <strong className="text-emerald-700">A-2</strong></p>
                <p className="text-slate-600">Expression: <strong className="text-emerald-700">A-1</strong></p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                <p className="font-bold text-indigo-950">Physical Development</p>
                <p className="text-slate-600">Motor Skills: <strong className="text-emerald-700">A-1</strong></p>
                <p className="text-slate-600">Athletics: <strong className="text-emerald-700">A-1</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. PARENT FEE DESK: EXACT SEQUENCED FEE TABLE */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Fee Management & Ledger (Section 57)</span>
            <h3 className="text-2xl font-black text-slate-900">Student Itemized Fee Table</h3>
            <p className="text-xs text-slate-500 mt-1">Structured with Annual, Optional & One-time charges first, followed by month-by-month billing schedules.</p>
          </div>
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">
            Outstanding Dues: {calculateSelectedFeeTotal() > 0 ? "₹" + calculateSelectedFeeTotal() : "₹0"}
          </span>
        </div>

        {/* Unified Table Structure */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm">
          <table className="w-full text-xs text-left">
            <thead className="bg-indigo-950 text-white font-bold">
              <tr>
                <th className="p-3">Select</th>
                <th className="p-3">Fee Type</th>
                <th className="p-3">Billing Cycle / Month</th>
                <th className="p-3">Due Date</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Receipt / Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              
              {/* SECTION HEADER 1: ANNUAL & OPTIONAL CHARGES */}
              <tr className="bg-indigo-50/70 border-b border-indigo-100">
                <td colSpan={7} className="px-4 py-2 font-black text-indigo-950 text-[11px] uppercase tracking-wider">
                  ⭐ Top Rows: Annual, One-Time & Optional Charges
                </td>
              </tr>
              {annualFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50 bg-white">
                  <td className="p-3 text-center">
                    {!fee.paid ? (
                      <input
                        type="checkbox"
                        checked={selectedFeeIds.includes(fee.id)}
                        onChange={() => toggleSelectFee(fee.id)}
                        className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                      />
                    ) : (
                      <span className="text-emerald-600 font-bold">✓</span>
                    )}
                  </td>
                  <td className="p-3 font-bold text-slate-900">{fee.type}</td>
                  <td className="p-3 text-slate-600 font-medium">{fee.period}</td>
                  <td className="p-3 text-slate-500">{fee.due}</td>
                  <td className="p-3 font-bold text-slate-900">₹{fee.amount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      fee.paid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {fee.paid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td className="p-3">
                    {fee.paid ? (
                      <button onClick={() => alert(`Receipt downloaded for ${fee.type}`)} className="text-indigo-600 font-bold hover:underline">
                        Download Receipt
                      </button>
                    ) : (
                      <button onClick={() => { setSelectedFeeIds([fee.id]); setQrGenerated(true); }} className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-[10px] shadow-sm transition">
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {/* SECTION HEADER 2: MONTHLY FEES */}
              <tr className="bg-slate-100 border-t-2 border-b border-slate-200">
                <td colSpan={7} className="px-4 py-2 font-black text-slate-800 text-[11px] uppercase tracking-wider">
                  📅 Month-Wise Fee Schedules (Session 2026–27)
                </td>
              </tr>
              {monthlyFees.map((fee) => (
                <tr key={fee.id} className="hover:bg-slate-50 bg-white">
                  <td className="p-3 text-center">
                    {!fee.paid ? (
                      <input
                        type="checkbox"
                        checked={selectedFeeIds.includes(fee.id)}
                        onChange={() => toggleSelectFee(fee.id)}
                        className="w-4 h-4 text-indigo-600 rounded cursor-pointer"
                      />
                    ) : (
                      <span className="text-emerald-600 font-bold">✓</span>
                    )}
                  </td>
                  <td className="p-3 font-semibold text-slate-900">{fee.type}</td>
                  <td className="p-3 font-bold text-indigo-950">{fee.period}</td>
                  <td className="p-3 text-slate-500">{fee.due}</td>
                  <td className="p-3 font-bold text-slate-900">₹{fee.amount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                      fee.paid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {fee.paid ? 'Paid' : 'Unpaid'}
                    </span>
                  </td>
                  <td className="p-3">
                    {fee.paid ? (
                      <button onClick={() => alert(`Receipt downloaded for ${fee.type} (${fee.period})`)} className="text-indigo-600 font-bold hover:underline">
                        Download Receipt
                      </button>
                    ) : (
                      <button onClick={() => { setSelectedFeeIds([fee.id]); setQrGenerated(true); }} className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg text-[10px] shadow-sm transition">
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
            className={`w-full py-3.5 font-bold rounded-2xl shadow-lg transition text-sm ${
              selectedFeeIds.length > 0 ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            Pay Selected Fees (₹{calculateSelectedFeeTotal() > 0 ? calculateSelectedFeeTotal().toLocaleString() : "0"}) via Dynamic Single-Order UPI QR
          </button>
        )}

        {qrGenerated && !paymentDone && (
          <div className="text-center p-6 border border-slate-200 rounded-3xl bg-slate-50 space-y-4">
            <h4 className="font-bold text-slate-900">Student-Specific Single-Order UPI QR Code (Section 63, Section 67)</h4>
            <div className="w-48 h-48 bg-white border-4 border-indigo-900 rounded-2xl mx-auto flex items-center justify-center font-mono font-bold text-indigo-950 p-2 shadow-md">
              [DYNAMIC QR CODE]<br />upi://pay?pa=schoolfees@okaxis&am={calculateSelectedFeeTotal()}&tr=order_st001
            </div>
            <p className="text-xs text-slate-500">
              Amount: <strong className="text-indigo-900">₹{calculateSelectedFeeTotal().toLocaleString()}</strong> | Settles oldest unpaid fees via strict FIFO allocation.
            </p>
            <button
              onClick={() => {
                setMonthlyFees(prev => prev.map(f => selectedFeeIds.includes(f.id) ? { ...f, paid: true } : f));
                setAnnualFees(prev => prev.map(f => selectedFeeIds.includes(f.id) ? { ...f, paid: true } : f));
                setPaymentDone(true);
              }}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs shadow transition"
            >
              Simulate Server Webhook Payment Verification
            </button>
          </div>
        )}

        {paymentDone && (
          <div className="p-6 bg-emerald-50 text-emerald-900 rounded-3xl text-center space-y-3 border border-emerald-200">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center font-bold text-2xl">✓</div>
            <h4 className="font-bold text-base">Payment Verified via Server-side Webhook (Section 69)!</h4>
            <p className="text-xs text-slate-600">Selected fees marked as Paid. Automatic Ledger Updated.</p>
            <button onClick={() => alert('Official Computer-Generated PDF Receipt Downloaded (Section 73)')} className="px-4 py-2 bg-white text-emerald-700 font-bold rounded-xl border border-emerald-200 text-xs shadow-sm hover:bg-emerald-50 transition">
              📥 Download PDF Receipt (Section 73)
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
