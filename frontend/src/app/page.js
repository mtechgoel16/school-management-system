'use client';
import { useState } from 'react';

export default function SchoolWebsite() {
  const [activePortal, setActivePortal] = useState(null); // 'admin' | 'teacher' | 'parent' | null
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col justify-between">
      
      {/* 1. TOP BAR (§6) */}
      <div className="bg-indigo-950 text-slate-300 text-xs py-2 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-6">
            <span>📞 +91 98765 43210</span>
            <span>✉️ contact@delhipublicmodel.edu.in</span>
            <span className="hidden md:inline">📍 Knowledge Park, New Delhi, India</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">CBSE Affiliation No: 2130098</span>
            <div className="flex gap-2">
              <a href="#" className="hover:text-white">FB</a>
              <a href="#" className="hover:text-white">IG</a>
              <a href="#" className="hover:text-white">YT</a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER & NAVIGATION (§5, §6) */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-indigo-900 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">
              DP
            </div>
            <div>
              <h1 className="text-xl font-black text-indigo-950 leading-tight tracking-tight">DELHI PUBLIC MODEL SCHOOL</h1>
              <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider">Discipline • Excellence • Integrity</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
            {['Home', 'About Us', 'Academics', 'Campus Life', 'Examinations', 'News & Events', 'Contact Us'].map((nav) => (
              <button
                key={nav}
                onClick={() => setActiveTab(nav.toLowerCase().replace(/ & /g, '-').replace(/\s+/g, '-'))}
                className="hover:text-indigo-600 transition"
              >
                {nav}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePortal('parent')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-xs font-bold transition shadow-sm"
            >
              Fee Portal
            </button>
            <button
              onClick={() => setActivePortal('admin')}
              className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold transition shadow-sm"
            >
              ERP Login
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO BANNER (§7) */}
      <section className="relative bg-gradient-to-r from-indigo-950 via-indigo-900 to-indigo-900 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-400/30">
              Admissions Open For Session 2026–27
            </div>
            <h2 className="text-4xl sm:text-5xl font-black leading-tight">
              Shaping Tomorrow's Visionaries With Excellence
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Equipping young minds with holistic academics, world-class athletic facilities, robotic innovation labs, and moral leadership.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <button onClick={() => alert('Online Admission Enquiry Form initiated.')} className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg transition">
                Apply for Admission
              </button>
              <button onClick={() => setActivePortal('teacher')} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl backdrop-blur transition">
                Faculty Portal
              </button>
            </div>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-amber-400 border-b border-white/10 pb-2">Institutional Notice Board (§74)</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition cursor-pointer">
                <span className="text-xs text-amber-300 font-bold">📢 MAR 2026</span>
                <p className="font-semibold text-slate-100">Annual Examination 2026 Date Sheet Released for Classes 1 to 12.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition cursor-pointer">
                <span className="text-xs text-amber-300 font-bold">📢 MAR 2026</span>
                <p className="font-semibold text-slate-100">Parent-Teacher Meeting (PTM) scheduled for Saturday, 10:00 AM.</p>
              </div>
              <div className="p-3 bg-white/5 rounded-xl hover:bg-white/10 transition cursor-pointer">
                <span className="text-xs text-amber-300 font-bold">📢 FEB 2026</span>
                <p className="font-semibold text-slate-100">Tuition Fee Due Date reminder: Pay via online dynamic QR without late fees.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US (§7) */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">Our Distinctions</span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Why Delhi Public Model School?</h2>
          <p className="text-slate-500 text-sm mt-2">Providing a safe, technology-enabled campus rooted in Indian values.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: '🎓', title: 'CBSE Academic Rigor', desc: 'Continuous assessments, periodic tests, and comprehensive report cards.' },
            { icon: '🤖', title: 'Smart STEM Labs', desc: 'Robotics, high-speed computer labs, and smart digital classroom infrastructure.' },
            { icon: '🛡️', title: 'Secure & Safe Campus', desc: 'CCTV surveillance, audited transport tracking, and strict visitor governance.' },
            { icon: '🏆', title: 'Athletics & Extra-Curricular', desc: 'Cricket ground, basketball courts, martial arts, and classical music/dance.' },
            { icon: '📱', title: 'Digital Parent ERP', desc: 'Instant WhatsApp notifications, online fee ledgers, and live attendance tracking.' },
            { icon: '👩‍🏫', title: 'Dedicated Faculty', desc: 'Certified and experienced teachers focused on personalized child development.' },
          ].map((card, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <span className="text-3xl">{card.icon}</span>
              <h3 className="text-lg font-bold text-slate-900 mt-3">{card.title}</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PRINCIPAL'S MESSAGE (§9) */}
      <section className="bg-slate-100 py-16 px-6 border-y border-slate-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="bg-indigo-900 text-white rounded-2xl p-8 text-center space-y-3">
            <div className="w-24 h-24 bg-amber-400 rounded-full mx-auto flex items-center justify-center text-4xl shadow-inner font-bold text-indigo-950">
              Dr
            </div>
            <h4 className="font-bold text-lg">Dr. V. K. Sharma</h4>
            <p className="text-xs text-amber-300 font-semibold uppercase">Principal, M.Sc., Ph.D., B.Ed.</p>
          </div>
          <div className="md:col-span-2 space-y-4">
            <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">Leadership Note</span>
            <h3 className="text-2xl font-black text-slate-900">Nurturing Intellect and Character</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              "Welcome to Delhi Public Model School. We believe education is not the learning of facts, but the training of the mind to think critically. Our integrated digital management system ensures parents, educators, and children remain connected in real time."
            </p>
            <div className="pt-2 flex gap-4 text-sm font-bold text-indigo-900">
              <span>✓ 100% CBSE Board Results</span>
              <span>✓ 1:25 Teacher-Student Ratio</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CAMPUS GALLERY PREVIEW (§16) */}
      <section className="py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="flex justify-between items-end mb-8">
          <div>
            <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">Campus Highlights</span>
            <h3 className="text-2xl font-black text-slate-900 mt-1">Life at DPMS</h3>
          </div>
          <button onClick={() => alert('Viewing full gallery')} className="text-indigo-600 text-sm font-bold hover:underline">
            View All Albums →
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Science Exhibition', tag: 'Academics', bg: 'bg-emerald-100 text-emerald-800' },
            { label: 'Annual Sports Meet', tag: 'Athletics', bg: 'bg-amber-100 text-amber-800' },
            { label: 'Robotics Workshop', tag: 'Technology', bg: 'bg-indigo-100 text-indigo-800' },
            { label: 'Independence Day Gala', tag: 'Cultural', bg: 'bg-rose-100 text-rose-800' },
          ].map((item, idx) => (
            <div key={idx} className="h-44 bg-white rounded-2xl border border-slate-200 p-4 flex flex-col justify-between shadow-sm hover:shadow transition">
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full w-max ${item.bg}`}>{item.tag}</span>
              <p className="font-bold text-slate-800 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. MODAL: ERP PORTALS SWITCHER (§25, §31, §86) */}
      {activePortal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-indigo-950 uppercase tracking-wide">
                  {activePortal === 'admin' && 'Admin & Principal Command Center (§86)'}
                  {activePortal === 'teacher' && 'Teacher Attendance & Marks Entry Desk (§32, §44)'}
                  {activePortal === 'parent' && 'Parent Fee Checkout & Report Card (§43, §57)'}
                </h3>
                <p className="text-xs text-slate-500">Connected to Central PostgreSQL & Deterministic Financial Ledger</p>
              </div>
              <button
                onClick={() => setActivePortal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center font-bold text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* A. ADMIN MODAL CONTENT */}
            {activePortal === 'admin' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-indigo-50 border-l-4 border-indigo-600 rounded-xl">
                    <p className="text-xs text-slate-500 font-bold">TOTAL ENROLLED</p>
                    <p className="text-2xl font-black text-indigo-950">1,420</p>
                  </div>
                  <div className="p-4 bg-emerald-50 border-l-4 border-emerald-600 rounded-xl">
                    <p className="text-xs text-slate-500 font-bold">PRESENT TODAY</p>
                    <p className="text-2xl font-black text-emerald-900">1,385</p>
                  </div>
                  <div className="p-4 bg-rose-50 border-l-4 border-rose-600 rounded-xl">
                    <p className="text-xs text-slate-500 font-bold">ABSENT TODAY</p>
                    <p className="text-2xl font-black text-rose-900">35</p>
                  </div>
                  <div className="p-4 bg-amber-50 border-l-4 border-amber-600 rounded-xl">
                    <p className="text-xs text-slate-500 font-bold">COLLECTION RATE</p>
                    <p className="text-2xl font-black text-amber-900">94.8%</p>
                  </div>
                </div>

                <div className="border rounded-xl p-4 bg-slate-50">
                  <h4 className="font-bold text-slate-800 text-sm mb-3">Today's Absent Students Screen (§38)</h4>
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-200 text-slate-700 font-bold">
                      <tr>
                        <th className="p-2">Student ID</th>
                        <th className="p-2">Name</th>
                        <th className="p-2">Class</th>
                        <th className="p-2">Parent Contact</th>
                        <th className="p-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b bg-white">
                        <td className="p-2 font-mono">ST001</td>
                        <td className="p-2 font-bold">Arjun Sharma</td>
                        <td className="p-2">Class 1-A</td>
                        <td className="p-2">+91 9876543210</td>
                        <td className="p-2">
                          <button onClick={() => alert('WhatsApp absent notice dispatched to Rajesh Sharma')} className="px-2.5 py-1 bg-emerald-600 text-white rounded font-bold hover:bg-emerald-700">
                            WhatsApp Alert
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* B. TEACHER MODAL CONTENT */}
            {activePortal === 'teacher' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-slate-100 p-3 rounded-xl text-xs">
                  <div>
                    <span className="font-bold">Assigned Class:</span> Class 1 - Section A | <span className="font-bold">Academic Year:</span> 2026–27
                  </div>
                  <button onClick={() => alert('Attendance Submitted and Locked. Alerts triggered to absent parents.')} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg">
                    Submit & Lock Attendance (§35)
                  </button>
                </div>
                <table className="w-full text-xs text-left border rounded-xl overflow-hidden">
                  <thead className="bg-slate-200 text-slate-700 font-bold">
                    <tr>
                      <th className="p-2">Roll</th>
                      <th className="p-2">Student ID</th>
                      <th className="p-2">Student Name</th>
                      <th className="p-2">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b bg-white">
                      <td className="p-2 font-bold">01</td>
                      <td className="p-2 font-mono">ST001</td>
                      <td className="p-2 font-semibold">Arjun Sharma</td>
                      <td className="p-2">
                        <select className="border p-1 rounded font-bold">
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
            )}

            {/* C. PARENT MODAL CONTENT */}
            {activePortal === 'parent' && (
              <div className="space-y-6">
                <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-slate-900">Arjun Sharma (ST001)</h4>
                    <p className="text-xs text-slate-500">Class 1-A | Father: Rajesh Sharma</p>
                  </div>
                  <span className="px-3 py-1 bg-amber-200 text-amber-900 text-xs font-black rounded-full">Dues Pending: ₹2,000</span>
                </div>

                <div className="space-y-3">
                  <h5 className="font-bold text-sm text-slate-800">Fee Ledger & Breakdown (§57)</h5>
                  <div className="border rounded-xl p-3 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold">Tuition Fee - March 2026</p>
                      <p className="text-slate-400">Due Date: 10-Mar-2026</p>
                    </div>
                    <span className="font-bold text-rose-600">₹1,000.00 (Pending)</span>
                  </div>
                  <div className="border rounded-xl p-3 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold">Tuition Fee - April 2026</p>
                      <p className="text-slate-400">Due Date: 10-Apr-2026</p>
                    </div>
                    <span className="font-bold text-rose-600">₹1,000.00 (Pending)</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => alert('Dynamic UPI Order Generated: upi://pay?pa=schoolfees@okaxis&am=2000.00. Settling March & April via strict FIFO rules (§59).')}
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg transition text-sm"
                  >
                    Pay ₹2,000 via Dynamic UPI QR Code (§63)
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. FOOTER (§8) */}
      <footer className="bg-indigo-950 text-slate-300 py-12 px-6 border-t border-indigo-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 text-xs leading-relaxed">
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Delhi Public Model School</h4>
            <p className="text-slate-400">A premier CBSE educational institution committed to academic brilliance and value-centric character building.</p>
            <p className="text-slate-400">Affiliation Code: CBSE/AFF/2026</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm">Quick Links</h4>
            <p className="hover:text-white cursor-pointer">Academic Calendar 2026–27</p>
            <p className="hover:text-white cursor-pointer">Annual Examination Timetable</p>
            <p className="hover:text-white cursor-pointer">Fee Regulations & Waivers</p>
            <p className="hover:text-white cursor-pointer">School Safety & Bus Routes</p>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-bold text-sm">Portals & Login</h4>
            <p onClick={() => setActivePortal('admin')} className="hover:text-white cursor-pointer">Admin Command Center</p>
            <p onClick={() => setActivePortal('teacher')} className="hover:text-white cursor-pointer">Faculty Attendance Desk</p>
            <p onClick={() => setActivePortal('parent')} className="hover:text-white cursor-pointer">Parent Online Fee Desk</p>
            <p className="hover:text-white cursor-pointer">Staff Payroll Login</p>
          </div>
          <div className="space-y-3">
            <h4 className="text-white font-bold text-sm">Contact Campus</h4>
            <p>📍 Sector 14, Knowledge Corridor, New Delhi 110001</p>
            <p>📞 Phone: +91 98765 43210 / 011-23456789</p>
            <p>✉️ Email: info@delhipublicmodel.edu.in</p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-white/10 text-center text-xs text-slate-500 flex flex-wrap justify-between items-center gap-4">
          <p>© 2026 Delhi Public Model School. All Rights Reserved. Enterprise School ERP Platform.</p>
          <div className="flex gap-4 text-slate-400">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms of Service</span>
            <span className="hover:text-white cursor-pointer">Aadhaar Governance</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
