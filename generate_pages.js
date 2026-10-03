const fs = require('fs');
const path = require('path');

const ROOT = "frontend/src/app";

// Ensure all 21 modular directories exist
const DIRS = [
  `${ROOT}/about/infrastructure`,
  `${ROOT}/about/facilities`,
  `${ROOT}/about/achievements`,
  `${ROOT}/about/rules`,
  `${ROOT}/about/faculty`,
  `${ROOT}/about/gallery`,
  `${ROOT}/blog/[id]`,
  `${ROOT}/resources/academics`,
  `${ROOT}/resources/campus-life`,
  `${ROOT}/resources/examinations`,
  `${ROOT}/news`,
  `${ROOT}/contact`,
  `${ROOT}/portal/student-login`,
  `${ROOT}/portal/admin-login`,
  `${ROOT}/portal/student-dashboard`,
  `${ROOT}/portal/faculty-dashboard`,
  `${ROOT}/portal/admin-dashboard`,
];

DIRS.forEach(dir => {
  if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
  }
});

const FILES = {};

// 1. GLOBAL LAYOUT (frontend/src/app/layout.js)
FILES[`${ROOT}/layout.js`] = `'use client';
import './globals.css';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const [currentPath, setCurrentPath] = useState('/');
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname || '/');
    const handlePop = () => setCurrentPath(window.location.pathname || '/');
    window.addEventListener('popstate', handlePop);
    return () => window.removeEventListener('popstate', handlePop);
  }, []);

  const navigateTo = (path) => {
    setCurrentPath(path);
    setAboutDropdown(false);
    setResourcesDropdown(false);
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderBreadcrumbs = () => {
    if (currentPath === '/') return null;
    const segments = currentPath.split('/').filter(Boolean);
    return (
      <div className="bg-slate-200 border-b border-slate-300 py-3.5 px-6 text-xs text-slate-700 font-bold shadow-inner w-full">
        <div className="max-w-7xl mx-auto flex items-center gap-2 overflow-x-auto whitespace-nowrap">
          <span onClick={() => navigateTo('/')} className="hover:text-indigo-600 hover:underline cursor-pointer">Home</span>
          {segments.map((seg, idx) => {
            const path = '/' + segments.slice(0, idx + 1).join('/');
            const isLast = idx === segments.length - 1;
            let label = seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');
            if (seg === 'portal') label = 'Portal';
            if (seg === 'about') label = 'About Us';
            if (seg === 'resources') label = 'Resources';
            return (
              <span key={path} className="flex items-center gap-2">
                <span className="text-slate-400">/</span>
                {isLast ? (
                  <span className="text-indigo-950 font-black">{label}</span>
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

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased font-sans min-h-screen flex flex-col justify-between m-0 p-0 w-full overflow-x-hidden">
        <div>
          {/* Top Contact Bar */}
          <div className="bg-indigo-950 text-slate-300 text-xs py-2 px-6 border-b border-indigo-900 w-full">
            <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
              <div className="flex items-center gap-6">
                <span>📞 +91 98765 43210</span>
                <span>✉️ info@delhipublicmodel.edu.in</span>
              </div>
              <div className="flex gap-4 items-center">
                <span className="text-amber-400 font-bold">CBSE Affiliation: 2130098</span>
                <div className="flex gap-3">
                  <a href="https://facebook.com" target="_blank" className="hover:text-white">FB</a>
                  <a href="https://instagram.com" target="_blank" className="hover:text-white">IG</a>
                </div>
              </div>
            </div>
          </div>

          {/* Main Navigation Header */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm w-full">
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
              <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigateTo('/')}>
                <div className="w-12 h-12 bg-indigo-900 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-md">DP</div>
                <div>
                  <h1 className="text-xl font-black text-indigo-950 tracking-tight leading-tight">DELHI PUBLIC MODEL SCHOOL</h1>
                  <p className="text-xs text-amber-600 font-semibold uppercase tracking-wider">Discipline • Excellence • Integrity</p>
                </div>
              </div>

              <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700">
                <button onClick={() => navigateTo('/')} className="hover:text-indigo-600">Home</button>
                
                {/* About Us 6 Subpages Dropdown */}
                <div className="relative py-2 group" onMouseEnter={() => setAboutDropdown(true)} onMouseLeave={() => setAboutDropdown(false)}>
                  <button onClick={() => navigateTo('/about')} className="hover:text-indigo-600 flex items-center gap-1">About Us ▼</button>
                  {aboutDropdown && (
                    <div className="absolute left-0 mt-1 w-64 bg-white border rounded-2xl shadow-2xl py-2 text-xs z-50">
                      <button onClick={() => navigateTo('/about')} className="w-full text-left px-4 py-2 font-bold text-indigo-950 hover:bg-slate-50">Overview</button>
                      <button onClick={() => navigateTo('/about/infrastructure')} className="w-full text-left px-4 py-2 hover:bg-slate-50">School Infrastructure</button>
                      <button onClick={() => navigateTo('/about/facilities')} className="w-full text-left px-4 py-2 hover:bg-slate-50">Facilities</button>
                      <button onClick={() => navigateTo('/about/achievements')} className="w-full text-left px-4 py-2 hover:bg-slate-50">Achievements</button>
                      <button onClick={() => navigateTo('/about/rules')} className="w-full text-left px-4 py-2 hover:bg-slate-50">School Rules</button>
                      <button onClick={() => navigateTo('/about/faculty')} className="w-full text-left px-4 py-2 hover:bg-slate-50">Faculty Directory</button>
                      <button onClick={() => navigateTo('/about/gallery')} className="w-full text-left px-4 py-2 hover:bg-slate-50">Media Gallery</button>
                    </div>
                  )}
                </div>

                <button onClick={() => navigateTo('/blog')} className="hover:text-indigo-600">Blog</button>

                {/* Resources Dropdown */}
                <div className="relative py-2 group" onMouseEnter={() => setResourcesDropdown(true)} onMouseLeave={() => setResourcesDropdown(false)}>
                  <button onClick={() => navigateTo('/resources/academics')} className="hover:text-indigo-600 flex items-center gap-1">Resources ▼</button>
                  {resourcesDropdown && (
                    <div className="absolute left-0 mt-1 w-56 bg-white border rounded-2xl shadow-2xl py-2 text-xs z-50">
                      <button onClick={() => navigateTo('/resources/academics')} className="w-full text-left px-4 py-2 hover:bg-slate-50">Academics Framework</button>
                      <button onClick={() => navigateTo('/resources/campus-life')} className="w-full text-left px-4 py-2 hover:bg-slate-50">Campus Life</button>
                      <button onClick={() => navigateTo('/resources/examinations')} className="w-full text-left px-4 py-2 hover:bg-slate-50">Examinations</button>
                    </div>
                  )}
                </div>

                <button onClick={() => navigateTo('/news')} className="hover:text-indigo-600">News & Events</button>
                <button onClick={() => navigateTo('/contact')} className="hover:text-indigo-600">Contact Us</button>
              </nav>

              <div className="flex items-center gap-2">
                <button onClick={() => navigateTo('/portal/student-login')} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold">Student Portal</button>
                <button onClick={() => navigateTo('/portal/admin-login')} className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold">Staff Login</button>
              </div>
            </div>
          </header>

          {/* Dynamic Breadcrumbs */}
          {renderBreadcrumbs()}

          {/* Individual Page Child View */}
          <main className="w-full min-h-[60vh]">{children}</main>
        </div>

        {/* Global 4-Column Footer */}
        <footer className="bg-indigo-950 text-slate-300 py-12 px-6 border-t border-indigo-900 text-xs w-full mt-16">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-indigo-900 rounded-xl flex items-center justify-center text-white font-black text-lg">DP</div>
                <h4 className="text-white font-bold text-sm">Delhi Public Model School</h4>
              </div>
              <p className="text-amber-400 font-bold uppercase tracking-wider text-xs">Discipline • Excellence • Integrity</p>
              <p className="text-slate-400">CBSE Affiliated Senior Secondary Institution committed to values, athletic distinction, and academic rigor.</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-bold text-sm mb-2">About Us</h4>
              <p onClick={() => navigateTo('/about/infrastructure')} className="hover:text-white cursor-pointer">Infrastructure</p>
              <p onClick={() => navigateTo('/about/facilities')} className="hover:text-white cursor-pointer">Facilities</p>
              <p onClick={() => navigateTo('/about/achievements')} className="hover:text-white cursor-pointer">Achievements</p>
              <p onClick={() => navigateTo('/about/rules')} className="hover:text-white cursor-pointer">School Code & Rules</p>
              <p onClick={() => navigateTo('/about/faculty')} className="hover:text-white cursor-pointer">Faculty Directory</p>
              <p onClick={() => navigateTo('/about/gallery')} className="hover:text-white cursor-pointer">Media Gallery</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-white font-bold text-sm mb-2">Resources & Portals</h4>
              <p onClick={() => navigateTo('/portal/student-login')} className="hover:text-white cursor-pointer">Parent & Student Portal</p>
              <p onClick={() => navigateTo('/portal/admin-login')} className="hover:text-white cursor-pointer">Admin Command Center</p>
              <p onClick={() => navigateTo('/resources/academics')} className="hover:text-white cursor-pointer">Curriculum Framework</p>
              <p onClick={() => navigateTo('/blog')} className="hover:text-white cursor-pointer">Educational Blog</p>
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
      </body>
    </html>
  );
}
`;

// 2. HOME PAGE (frontend/src/app/page.js) - 14 SECTIONS VERBATIM
FILES[`${ROOT}/page.js`] = `'use client';

export default function HomePage() {
  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-16 py-8 w-full animate-fade-in">
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
          <span className="text-indigo-600 font-bold text-xs uppercase tracking-widest">Section 3: Vision</span>
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
      <section className="bg-slate-100 py-16 px-6 border-y border-slate-200 w-full">
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
      <section className="bg-slate-100 py-16 px-6 border-y border-slate-200 w-full">
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
      <section className="bg-slate-100 py-16 px-6 border-y border-slate-200 w-full">
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
      <section className="bg-slate-100 py-16 px-6 border-y border-slate-200 w-full">
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
  );
}
`;

// 3. ABOUT US MAIN PAGE (frontend/src/app/about/page.js)
FILES[`${ROOT}/about/page.js`] = `'use client';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12">
      <div className="text-center max-w-3xl mx-auto border-b pb-8">
        <h2 className="text-4xl font-black text-slate-900 mt-2">About Delhi Public Model School</h2>
        <p className="text-slate-500 text-sm mt-3">Committed to academic excellence, leadership, and moral enlightenment since 2004.</p>
      </div>
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="h-64 sm:h-80 w-full overflow-hidden rounded-2xl shadow-inner relative bg-indigo-50 border">
          <img src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80" alt="Campus" className="w-full h-full object-cover rounded-2xl" />
        </div>
        <div className="space-y-4">
          <span className="text-xs font-black uppercase text-indigo-600 tracking-wider">Overview Section 1</span>
          <h3 className="text-2xl font-black text-slate-900 leading-tight">1. About School</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Delhi Public Model School is an English Medium, Co-educational Senior Secondary Institution affiliated with CBSE, New Delhi under the National Public Education Trust. Operating foundational, primary, middle, and senior streams with modern robotic laboratories, sports infrastructure, and automated ERP workflows.
          </p>
        </div>
      </div>
      <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-3">
        <h3 className="text-xl font-black text-slate-900">2. History</h3>
        <p className="text-slate-600 text-sm leading-relaxed">Established in 2004 with 120 students, expanding over two decades to over 1,400 students across 16 classes with alumni serving globally.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-3">
          <h3 className="text-xl font-black text-slate-900">3. Mission</h3>
          <p className="text-slate-600 text-sm leading-relaxed">To empower every child with intellectual agility, moral courage, emotional resilience, and scientific curiosity.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border shadow-sm space-y-3">
          <h3 className="text-xl font-black text-slate-900">4. Vision</h3>
          <p className="text-slate-600 text-sm leading-relaxed">To be acknowledged nationally as a transformative center of academic and ethical leadership.</p>
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
          <p className="text-slate-200 text-sm leading-relaxed">"Dear Parents and Students, Welcome to Delhi Public Model School. We believe schooling ignites inquiry, self-discipline, and character."</p>
        </div>
      </div>
    </div>
  );
}
`;

// 4. ABOUT SUBPAGES
FILES[`${ROOT}/about/infrastructure/page.js`] = `'use client';
export default function InfrastructurePage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
      <h2 className="text-3xl font-black text-slate-900">School Infrastructure (Section 11)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Smart Classrooms with Digital Interactive Boards', 'Separate Physics, Chemistry, Biology & STEM Labs', 'Central Knowledge Library with 20,000+ Volumes', 'Computer & Robotics AI Hub', 'Olympic Standard Athletic & Sports Grounds', 'GPS Fleet of 25+ Buses with CCTV'].map((t, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm font-semibold">{t}</div>
        ))}
      </div>
    </div>
  );
}
`;

FILES[`${ROOT}/about/facilities/page.js`] = `'use client';
export default function FacilitiesPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
      <h2 className="text-3xl font-black text-slate-900">Campus Facilities (Section 12)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['24/7 Campus Health Infirmary & Resident Nurse', '800-Seat Acoustic Multi-Purpose Auditorium', 'Hygienic Organic Dining Cafeteria', 'Music, Classical Dance & Fine Arts Studio'].map((f, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-bold text-indigo-950">{f}</div>
        ))}
      </div>
    </div>
  );
}
`;

FILES[`${ROOT}/about/achievements/page.js`] = `'use client';
export default function AchievementsPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
      <h2 className="text-3xl font-black text-slate-900">Achievements (Section 13)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['100% CBSE Class 12 Board Pass Result', 'National Science Olympiad Gold Medalist (Arjun Sharma)', 'State Athletics & Junior Football Championship Trophy'].map((a, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-bold text-amber-800 bg-amber-50">{a}</div>
        ))}
      </div>
    </div>
  );
}
`;

FILES[`${ROOT}/about/rules/page.js`] = `'use client';
export default function RulesPage() {
  return (
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
  );
}
`;

FILES[`${ROOT}/about/faculty/page.js`] = `'use client';
export default function FacultyPage() {
  const faculty = [
    { n: 'Dr. V. K. Sharma', r: 'Principal', q: 'M.Sc., Ph.D.', wa: '9876543210', mail: 'principal@dpms.edu', fb: '#', ln: '#', ig: '#' },
    { n: 'Mrs. Sunita Verma', r: 'Vice Principal', q: 'M.Sc., M.Ed.', wa: '9876543211', mail: 'viceprincipal@dpms.edu', fb: '#', ln: '#', ig: '#' },
    { n: 'Mr. Rakesh Kapoor', r: 'HOD Maths', q: 'M.Sc., B.Ed.', wa: '9876543212', mail: 'maths@dpms.edu', fb: '#', ln: '#', ig: '#' },
    { n: 'Mrs. Anjali Sen', r: 'Class Teacher (1-A)', q: 'M.A., B.Ed.', wa: '9876543213', mail: 'anjali@dpms.edu', fb: '#', ln: '#', ig: '#' },
  ];
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
      <h2 className="text-3xl font-black text-slate-900">Faculty Directory (Section 15)</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {faculty.map((f, i) => (
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
              <a href={`https://wa.me/91\${f.wa}`} className="text-emerald-600 font-bold">WA</a>
              <a href={`mailto:\${f.mail}`} className="text-blue-600 font-bold">Mail</a>
              <a href={f.fb} className="text-indigo-600 font-bold">FB</a>
              <a href={f.ln} className="text-sky-700 font-bold">LN</a>
              <a href={f.ig} className="text-rose-600 font-bold">IG</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

FILES[`${ROOT}/about/gallery/page.js`] = `'use client';
export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
      <h2 className="text-3xl font-black text-slate-900">Media Gallery (Section 16)</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Annual Sports Meet', 'Science Fair 2026', 'Robotics Workshop', 'Independence Day Gala'].map((g, i) => (
          <div key={i} className="h-44 bg-white rounded-2xl border p-4 flex items-end font-bold shadow-sm">{g}</div>
        ))}
      </div>
    </div>
  );
}
`;

// 5. BLOG INDEX & DYNAMIC SINGLE POST
FILES[`${ROOT}/blog/page.js`] = `'use client';
export default function BlogIndexPage() {
  const blogPosts = [
    { id: 'ai-in-k12-classrooms', title: 'The Role of Artificial Intelligence in K-12 Classrooms', date: 'March 29, 2026', author: 'Dr. V. K. Sharma', excerpt: 'How guided AI tools assist teachers in personalizing assessments.' },
    { id: 'reading-habits-in-children', title: 'Cultivating Lifelong Reading Habits in Primary Schoolers', date: 'February 15, 2026', author: 'Mrs. Anjali Sen', excerpt: 'Early literacy routines build cognitive empathy, rich vocabularies, and analytical thinking.' },
    { id: 'athletics-and-board-exams', title: 'Balancing Athletics and Board Exams: A Topper’s Guide', date: 'January 10, 2026', author: 'Mr. Amit Chauhan', excerpt: 'Why structured physical activity enhances mental stamina, reduces exam anxiety.' }
  ];

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
      <h2 className="text-3xl font-black text-slate-900">School Blog & Educational Insights (Section 76)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogPosts.map((blog) => (
          <div key={blog.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs text-indigo-600 font-bold">{blog.date}</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">{blog.title}</h3>
              <p className="text-slate-600 text-xs mt-2">{blog.excerpt}</p>
            </div>
            <div className="pt-4 border-t mt-4 flex justify-between items-center">
              <span className="text-[10px] font-bold text-slate-500 uppercase">By {blog.author}</span>
              <a href={`/blog/\${blog.id}`} className="text-indigo-600 font-bold text-xs hover:underline">Read Full Post →</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
`;

FILES[`${ROOT}/blog/[id]/page.js`] = `'use client';
export default function SingleBlogPost({ params }) {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
      <article className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <h1 className="text-3xl font-black text-slate-900">Educational Article: {params?.id || 'School Insight'}</h1>
        <p className="text-slate-600 text-sm leading-relaxed">
          Comprehensive instructional research conducted by faculty mentors on modern learning methodologies, CBSE syllabus alignment, and student emotional wellbeing.
        </p>
        <a href="/blog" className="text-indigo-600 font-bold text-xs hover:underline">← Back to All Posts</a>
      </article>
    </div>
  );
}
`;

// 6. RESOURCES SUBPAGES & NEWS
FILES[`${ROOT}/resources/academics/page.js`] = `'use client';
export default function ResourcesAcademicsPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
      <h2 className="text-3xl font-black text-slate-900">Academic Framework & Curriculum (Section 17)</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['Foundational Wing (Pre-Nur - UKG)', 'Primary Wing (Class 1 - 5)', 'Middle Wing (Class 6 - 8)', 'Senior Secondary Wing (Class 9 - 12)'].map((w, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-bold text-slate-900">{w}</div>
        ))}
      </div>
    </div>
  );
}
`;

FILES[`${ROOT}/resources/campus-life/page.js`] = `'use client';
export default function CampusLifePage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
      <h2 className="text-3xl font-black text-slate-900">Campus Life & Activities (Section 11)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Robotics & Innovation Clubs', 'Athletics & Physical Training Leagues', 'Literary & Dramatics Societies'].map((c, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-semibold">{c}</div>
        ))}
      </div>
    </div>
  );
}
`;

FILES[`${ROOT}/resources/examinations/page.js`] = `'use client';
export default function ExaminationsPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
      <h2 className="text-3xl font-black text-slate-900">Examinations & Assessments (Section 33)</h2>
      <div className="p-6 bg-white rounded-2xl border shadow-sm space-y-4">
        <p className="text-sm text-slate-600">The school conducts Quarterly, Mid-Term, Half-Yearly, and Annual Examinations alongside continuous unit assessments.</p>
        <a href="/portal/student-login" className="inline-block px-4 py-2 bg-indigo-900 text-white font-bold text-xs rounded-lg">Check Student Report Card →</a>
      </div>
    </div>
  );
}
`;

FILES[`${ROOT}/news/page.js`] = `'use client';
export default function NewsPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8">
      <h2 className="text-3xl font-black text-slate-900">News & Event Calendar (Section 71, Section 73)</h2>
      <div className="p-6 bg-white rounded-2xl border shadow-sm">Annual Board Examination Schedule & Gazetted Holidays Calendar active.</div>
    </div>
  );
}
`;

// 7. CONTACT US PAGE
FILES[`${ROOT}/contact/page.js`] = `'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Admissions Inquiry');
  const [message, setMessage] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setCaptchaError('');
    if (parseInt(captchaInput, 10) !== 12) {
      setCaptchaError('Incorrect math verification. What is 7 + 5?');
      return;
    }
    setContactSubmitted(true);
  };

  return (
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
              <p className="text-xs text-emerald-700">Our admissions desk will contact you at \${phone} within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              {captchaError && <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 text-xs rounded-xl font-semibold">{captchaError}</div>}
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs bg-slate-50" placeholder="First Name" />
                <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs bg-slate-50" placeholder="Last Name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs bg-slate-50" placeholder="+91 98765 43210" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs bg-slate-50" placeholder="parent@example.com" />
              </div>
              <div>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs bg-slate-50 font-bold">
                  <option value="Admissions Inquiry">Admissions Inquiry (Session 2026–27)</option>
                  <option value="Fee Query & Online Payment">Fee Query & Online Payment</option>
                  <option value="Transport & Bus Route">Transportation & Bus Route</option>
                  <option value="Principal Appointment">Request Appointment with Principal</option>
                </select>
              </div>
              <textarea rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs bg-slate-50" placeholder="Please provide student details..." />
              <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
                <span className="font-bold text-indigo-950">🛡️ Anti-Spam Verification: What is 7 + 5 = ?</span>
                <input type="number" required value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} className="w-20 p-2 border rounded-xl text-center font-bold bg-white" placeholder="Answer" />
              </div>
              <button type="submit" className="w-full py-3 bg-indigo-900 text-white font-bold rounded-xl text-xs">Submit Official Inquiry →</button>
            </form>
          )}
        </div>
        <div className="space-y-6">
          <div className="bg-indigo-950 text-white p-8 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-amber-400 font-black">Campus Contact Details</h3>
            <div className="space-y-2 text-xs text-slate-300">
              <p>📍 <strong>Address:</strong> Sector 14, Knowledge Corridor, Near Metro Station, New Delhi 110001</p>
              <p>📞 <strong>Phone:</strong> +91 98765 43210 / 011-23456789</p>
              <p>✉️ <strong>Admissions:</strong> admissions@delhipublicmodel.edu.in</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm h-64">
            <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.09262729584!2d77.10249019999999!3d28.7040592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" className="w-full h-full border-0" allowFullScreen="" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}
`;

// 8. PORTALS LOGIN
FILES[`${ROOT}/portal/student-login/page.js`] = `'use client';
import { useState } from 'react';

export default function StudentLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if ((username === 'ST001' || username === 'ADM1024') && password === 'StudentPass2026!') {
      window.location.href = '/portal/student-dashboard';
    } else {
      setError('Invalid credentials. Use ST001 / StudentPass2026!');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold">👨‍👩‍👦</div>
          <h2 className="text-2xl font-black text-slate-900">Parent & Student Portal</h2>
          <p className="text-xs text-slate-500">Sign in using your Student ID & Password (Section 18)</p>
        </div>
        {error && <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl font-semibold text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2.5 border rounded-xl text-sm bg-slate-50" placeholder="Student ID (e.g. ST001)" />
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2.5 border rounded-xl text-sm bg-slate-50" placeholder="Password" />
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
            Login: <strong>ST001</strong> / Password: <strong>StudentPass2026!</strong>
          </div>
          <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md text-sm">Sign In to Student Dashboard →</button>
        </form>
      </div>
    </div>
  );
}
`;

FILES[`${ROOT}/portal/admin-login/page.js`] = `'use client';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'ADMIN' && username === 'admin' && password === 'AdminPassword2026!') {
      window.location.href = '/portal/admin-dashboard';
    } else if (role === 'TEACHER' && username === 'teacher' && password === 'TeacherPass2026!') {
      window.location.href = '/portal/faculty-dashboard';
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-6">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-900 rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold">🔐</div>
          <h2 className="text-2xl font-black text-slate-900">School ERP Staff Login</h2>
        </div>
        {error && <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl font-semibold text-center">{error}</div>}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold text-slate-600">
          <button type="button" onClick={() => setRole('TEACHER')} className={`flex-1 py-2 text-center rounded-xl transition \${role === 'TEACHER' ? 'bg-white text-indigo-950 shadow-sm' : ''}`}>Faculty / Teacher</button>
          <button type="button" onClick={() => setRole('ADMIN')} className={`flex-1 py-2 text-center rounded-xl transition \${role === 'ADMIN' ? 'bg-white text-indigo-950 shadow-sm' : ''}`}>Admin / Principal</button>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2.5 border rounded-xl text-sm bg-slate-50" placeholder="Username (e.g. admin or teacher)" />
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2.5 border rounded-xl text-sm bg-slate-50" placeholder="Password" />
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900">
            • Admin: admin / <strong>AdminPassword2026!</strong><br />• Teacher: teacher / <strong>TeacherPass2026!</strong>
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-xl shadow-md text-sm">Sign In to Staff Portal →</button>
        </form>
      </div>
    </div>
  );
}
`;

// 9. STUDENT & TEACHER DASHBOARDS
FILES[`${ROOT}/portal/student-dashboard/page.js`] = `'use client';
import { useState } from 'react';

export default function StudentDashboardPage() {
  const [activeReportExam, setActiveReportExam] = useState('Annual');
  const [expandedSubject, setExpandedSubject] = useState('Hindi');
  const [selectedFeeIds, setSelectedFeeIds] = useState(['F11', 'F12']);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

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
    ]
  };

  const [feeLedgerList, setFeeLedgerList] = useState([
    { id: 'F01', type: 'Tuition Fee (Monthly Plan)', month: 'April 2026', due: '10-Apr-2026', amount: 1000, paid: true },
    { id: 'F02', type: 'Tuition Fee (Monthly Plan)', month: 'May 2026', due: '10-May-2026', amount: 1000, paid: true },
    { id: 'F03', type: 'Transport Charge (Monthly Option)', month: 'June 2026', due: '10-Jun-2026', amount: 800, paid: true },
    { id: 'F11', type: 'Tuition Fee (Monthly Plan)', month: 'February 2027', due: '10-Feb-2027', amount: 1000, paid: false },
    { id: 'F12', type: 'Tuition Fee (Monthly Plan)', month: 'March 2027', due: '10-Mar-2027', amount: 1000, paid: false },
  ]);

  const selectedTotal = feeLedgerList.filter(f => selectedFeeIds.includes(f.id)).reduce((s, i) => s + i.amount, 0);

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-400 text-indigo-950 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner">AS</div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Arjun Sharma (Class 1-A)</h2>
            <p className="text-xs text-slate-500">Student ID: ST001 | Admission No: ADM1024 | Aadhaar: XXXX XXXX XXXX 4321</p>
          </div>
        </div>
        <a href="/" className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl shadow-sm">Logout</a>
      </div>

      <div className="bg-white rounded-3xl border overflow-hidden shadow-lg">
        <div className="bg-indigo-950 text-white p-6 flex justify-between items-center">
          <h3 className="text-xl font-black">CBSE Academic Report Card & Progress (9 Core Subjects)</h3>
        </div>
        <div className="p-6 space-y-3">
          {examResultsData['Annual'].map(sub => (
            <div key={sub.name} className="border rounded-2xl overflow-hidden bg-white">
              <div onClick={() => setExpandedSubject(expandedSubject === sub.name ? null : sub.name)} className="p-4 bg-slate-50 cursor-pointer flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">{sub.name}</span>
                <span className="text-xs font-bold text-indigo-900">{sub.totalObt} / {sub.totalMax}</span>
              </div>
              {expandedSubject === sub.name && (
                <div className="p-4 border-t text-xs">
                  {sub.components.map((c, i) => (
                    <div key={i} className="flex justify-between border-b py-1">
                      <span>{c.name}</span>
                      <span className="font-bold">{c.obt} / {c.max}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border shadow-lg space-y-6">
        <h3 className="text-2xl font-black text-slate-900">12-Month Itemized Fee Table (Section 57)</h3>
        <table className="w-full text-xs text-left border">
          <thead className="bg-indigo-950 text-white font-bold">
            <tr>
              <th className="p-3">Select</th>
              <th className="p-3">Fee Type</th>
              <th className="p-3">Period</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {feeLedgerList.map(fee => (
              <tr key={fee.id} className="border-b">
                <td className="p-3 text-center">
                  {!fee.paid ? (
                    <input type="checkbox" checked={selectedFeeIds.includes(fee.id)} onChange={e => {
                      if (e.target.checked) setSelectedFeeIds([...selectedFeeIds, fee.id]);
                      else setSelectedFeeIds(selectedFeeIds.filter(id => id !== fee.id));
                    }} />
                  ) : <span className="text-emerald-600 font-bold">✓</span>}
                </td>
                <td className="p-3 font-semibold">{fee.type}</td>
                <td className="p-3">{fee.month}</td>
                <td className="p-3 font-bold">₹{fee.amount}</td>
                <td className="p-3"><span className={`px-2 py-0.5 rounded text-[10px] font-bold \${fee.paid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{fee.paid ? 'PAID' : 'UNPAID'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        {!qrGenerated && !paymentDone && (
          <button onClick={() => setQrGenerated(true)} className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-2xl shadow text-sm">
            Pay Selected Dues (₹{selectedTotal}) via Dynamic UPI QR Code
          </button>
        )}

        {qrGenerated && !paymentDone && (
          <div className="text-center p-6 border rounded-3xl bg-slate-50 space-y-3">
            <h4 className="font-bold text-slate-900">Single-Order Dynamic UPI QR Code (Section 63)</h4>
            <div className="w-44 h-44 bg-white border-4 border-indigo-900 rounded-2xl mx-auto flex items-center justify-center font-mono font-bold text-xs p-2">
              [DYNAMIC UPI QR]<br />upi://pay?pa=schoolfees@okaxis&am={selectedTotal}
            </div>
            <button onClick={() => { setFeeLedgerList(prev => prev.map(f => selectedFeeIds.includes(f.id) ? { ...f, paid: true } : f)); setPaymentDone(true); }} className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow">Simulate Server Webhook Payment Verification</button>
          </div>
        )}

        {paymentDone && (
          <div className="p-6 bg-emerald-50 text-emerald-900 rounded-3xl text-center space-y-2 border border-emerald-200">
            <h4 className="font-bold">Payment Verified via Server Webhook!</h4>
            <p className="text-xs">Selected fees marked as Paid. Automatic Ledger Updated.</p>
          </div>
        )}
      </div>
    </div>
  );
}
`;

FILES[`${ROOT}/portal/faculty-dashboard/page.js`] = `'use client';
import { useState } from 'react';

export default function FacultyDashboardPage() {
  const [locked, setLocked] = useState(false);
  const [homeworkStatus, setHomeworkStatus] = useState('');

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">Welcome, Mrs. Anjali Sen (Class Teacher 1-A)</h2>
        <a href="/" className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl">Logout</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h4 className="font-bold text-slate-900 text-sm">Class 1-A Attendance Sheet (Section 17)</h4>
            <button onClick={() => setLocked(true)} disabled={locked} className={`px-3 py-1.5 rounded-lg text-xs font-bold text-white \${locked ? 'bg-slate-300' : 'bg-emerald-600'}`}>{locked ? 'Locked' : 'Lock Attendance'}</button>
          </div>
          <table className="w-full text-xs text-left border rounded-xl">
            <thead className="bg-slate-100 font-bold"><tr><th className="p-2">Student</th><th className="p-2">Status</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="p-2 font-bold">Arjun Sharma (ST001)</td><td className="p-2"><select disabled={locked} className="p-1 border rounded bg-slate-50"><option>Present</option><option>Absent</option></select></td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
          <h4 className="font-bold text-slate-900 text-sm border-b pb-2">Upload Daily Classwork & Homework (Section 20)</h4>
          {homeworkStatus && <p className="text-xs bg-emerald-50 text-emerald-800 p-2 rounded font-bold">{homeworkStatus}</p>}
          <form onSubmit={e => { e.preventDefault(); setHomeworkStatus('Homework Published to Live Portal!'); }} className="space-y-3">
            <input required className="w-full p-2 border rounded-xl text-xs bg-slate-50" placeholder="Topic & Subject" />
            <textarea required className="w-full p-2 border rounded-xl text-xs bg-slate-50" rows={3} placeholder="Homework instructions..." />
            <button type="submit" className="w-full py-2 bg-indigo-900 text-white font-bold rounded-xl text-xs">Publish Homework</button>
          </form>
        </div>
      </div>
    </div>
  );
}
`;

// 10. EXECUTIVE ADMIN DASHBOARD WITH COMPLETE STUDENT REGISTRATION FORM (VERBATIM FIELD STRUCTURE)
FILES[`${ROOT}/portal/admin-dashboard/page.js`] = `'use client';
import { useState } from 'react';

export default function AdminDashboardPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // 100% COMPLETE FORM DATA MATCHING YOUR DOCUMENT SCHEMA
  const [formData, setFormData] = useState({
    // Academic Details
    admissionNo: 'ADM-2026-1048',
    academicClass: 'Class 1',
    section: 'A',
    rollNumber: '',
    admissionDate: '2026-04-01',
    transport: false,
    
    // Personal Details
    firstName: '',
    lastName: '',
    dob: '',
    gender: 'M',
    bloodGroup: 'O+',
    aadhaarNumber: 'XXXX-XXXX-XXXX-4321',
    photo: null,
    
    // Guardian & Contact
    fatherName: '',
    motherName: '',
    primaryMobile: '',
    alternatePhone: '',
    email: '',
    address: '',
    city: 'Delhi NCR',
    pincode: '110001'
  });

  const [studentRoster, setStudentRoster] = useState([
    { id: 'ST001', adm: 'ADM-2026-1024', name: 'Arjun Sharma', class: 'Class 1-A', roll: '01', parent: 'Rajesh Sharma', phone: '9876543210' },
    { id: 'ST002', adm: 'ADM-2026-1025', name: 'Karan Sharma', class: 'Class 5-B', roll: '14', parent: 'Rajesh Sharma', phone: '9876543210' }
  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleRegisterStudent = (e) => {
    e.preventDefault();
    const newId = \`ST00\${studentRoster.length + 1}\`;
    const generatedAdm = \`ADM-2026-\${Math.floor(1000 + Math.random() * 9000)}\`;

    // Commit student into Active Roster
    setStudentRoster([
      ...studentRoster,
      {
        id: newId,
        adm: generatedAdm,
        name: \`\${formData.firstName} \${formData.lastName}\`,
        class: \`\${formData.academicClass}-\${formData.section}\`,
        roll: formData.rollNumber,
        parent: formData.fatherName,
        phone: formData.primaryMobile
      }
    ]);

    setSuccessMsg(\`✅ Student "\${formData.firstName} \${formData.lastName}" successfully registered with Admission No: \${generatedAdm} and ID: \${newId}! Credentials generated (Username: \${generatedAdm}, Password: Welcome@\${formData.rollNumber}).\`);

    setTimeout(() => {
      setSuccessMsg('');
      setShowAddModal(false);
    }, 4500);

    // Reset Form
    setFormData({
      admissionNo: \`ADM-2026-\${Math.floor(1000 + Math.random() * 9000)}\`,
      academicClass: 'Class 1',
      section: 'A',
      rollNumber: '',
      admissionDate: '2026-04-01',
      transport: false,
      firstName: '',
      lastName: '',
      dob: '',
      gender: 'M',
      bloodGroup: 'O+',
      aadhaarNumber: 'XXXX-XXXX-XXXX-4321',
      photo: null,
      fatherName: '',
      motherName: '',
      primaryMobile: '',
      alternatePhone: '',
      email: '',
      address: '',
      city: 'Delhi NCR',
      pincode: '110001'
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8">
      {/* Top Header */}
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">Master Plan Section 92</span>
          <h2 className="text-2xl font-black text-indigo-950">Administrator Command Center (v4)</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowAddModal(true)} className="px-5 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl shadow-md">
            ➕ Register New Student Profile (PostgreSQL §23)
          </button>
          <a href="/" className="px-4 py-2.5 bg-rose-600 text-white text-xs font-bold rounded-xl">Logout</a>
        </div>
      </div>

      {/* 10 Executive KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'TOTAL STUDENTS', val: \`\${1420 + studentRoster.length - 2}\`, color: 'border-indigo-600' },
          { label: 'TOTAL FACULTY', val: '68', color: 'border-blue-600' },
          { label: 'PRESENT TODAY', val: '1,385', color: 'border-emerald-600' },
          { label: 'ABSENT TODAY', val: '35', color: 'border-rose-600' },
          { label: 'PENDING FEES', val: '₹4,85,000', color: 'border-amber-600' },
          { label: 'FEES COLLECTED', val: '₹18,40,000', color: 'border-teal-600' },
          { label: 'UPCOMING EXAMS', val: '4 Assessments', color: 'border-violet-600' },
          { label: 'UPCOMING EVENTS', val: '3 Events', color: 'border-sky-600' },
          { label: 'NEW ADMISSIONS', val: \`\${42 + studentRoster.length - 2} Applicants\`, color: 'border-fuchsia-600' },
          { label: 'LEAVE REQUESTS', val: '6 Pending', color: 'border-orange-600' },
        ].map((c, i) => (
          <div key={i} className={\`p-4 bg-white rounded-2xl border-l-4 shadow-sm \${c.color}\`}>
            <p className="text-xs text-slate-400 font-bold">{c.label}</p>
            <p className="text-lg font-black mt-1 text-slate-800">{c.val}</p>
          </div>
        ))}
      </div>

      {/* Active Student Roster Table */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex justify-between items-center border-b pb-3">
          <h3 className="font-bold text-slate-900 text-sm">Enrolled Student Directory (PostgreSQL Connected)</h3>
          <span className="text-xs bg-indigo-50 text-indigo-900 font-bold px-3 py-1 rounded-full">Total Profiles: {studentRoster.length}</span>
        </div>
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 font-bold text-slate-700">
            <tr>
              <th className="p-3">Admission No</th>
              <th className="p-3">Student Name</th>
              <th className="p-3">Class & Section</th>
              <th className="p-3">Roll No</th>
              <th className="p-3">Guardian Name</th>
              <th className="p-3">Login Mobile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {studentRoster.map((s, i) => (
              <tr key={i} className="hover:bg-slate-50">
                <td className="p-3 font-mono font-bold text-indigo-900">{s.adm}</td>
                <td className="p-3 font-bold text-slate-900">{s.name}</td>
                <td className="p-3">{s.class}</td>
                <td className="p-3">{s.roll}</td>
                <td className="p-3">{s.parent}</td>
                <td className="p-3 font-mono">{s.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* COMPLETE STUDENT ADMISSION REGISTRATION FORM MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white p-6 md:p-8 rounded-3xl border shadow-2xl max-w-3xl w-full my-8">
            <div className="flex justify-between items-center border-b pb-3 mb-4">
              <div>
                <h4 className="font-bold text-indigo-950 text-base">New Student Admission Form (Section 21, 23)</h4>
                <p className="text-[11px] text-slate-500 font-semibold text-rose-500">Auto Student ID and secure default credentials will auto-provision on save.</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="font-bold text-slate-400 hover:text-slate-700">✕</button>
            </div>

            {successMsg && (
              <div className="p-4 mb-4 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-bold leading-relaxed">
                {successMsg}
              </div>
            )}

            <form onSubmit={handleRegisterStudent} className="space-y-6 text-xs">
              
              {/* SECTION A: ACADEMIC DETAILS */}
              <div className="space-y-3">
                <h5 className="font-bold uppercase tracking-wider text-indigo-600 border-b pb-1 text-[10px]">1. Academic & Enrollment Assignment</h5>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="font-bold text-slate-700">Academic Class *</label>
                    <select name="academicClass" value={formData.academicClass} onChange={handleChange} className="w-full mt-1 p-2 border rounded-xl bg-slate-50 font-bold">
                      {[...Array(12)].map((_, i) => (
                        <option key={i+1} value={`Class \${i+1}`}>Class \${i+1}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Section *</label>
                    <select name="section" value={formData.section} onChange={handleChange} className="w-full mt-1 p-2 border rounded-xl bg-slate-50 font-bold">
                      <option value="A">Section A</option>
                      <option value="B">Section B</option>
                      <option value="C">Section C</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Roll Number *</label>
                    <input required type="number" name="rollNumber" placeholder="e.g. 15" value={formData.rollNumber} onChange={handleChange} className="w-full mt-1 p-2 border rounded-xl bg-slate-50 font-bold" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Admission Date *</label>
                    <input type="date" name="admissionDate" value={formData.admissionDate} onChange={handleChange} className="w-full mt-1 p-2 border rounded-xl bg-slate-50" />
                  </div>
                </div>
              </div>

              {/* SECTION B: STUDENT PERSONAL INFORMATION */}
              <div className="space-y-3 border-t pt-4">
                <h5 className="font-bold uppercase tracking-wider text-indigo-600 border-b pb-1 text-[10px]">2. Student Personal Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-slate-700">First Name *</label>
                    <input required name="firstName" placeholder="Student First Name" value={formData.firstName} onChange={handleChange} className="w-full mt-1 p-2 border rounded-xl bg-slate-50" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Last Name *</label>
                    <input required name="lastName" placeholder="Student Last Name" value={formData.lastName} onChange={handleChange} className="w-full mt-1 p-2 border rounded-xl bg-slate-50" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Date of Birth *</label>
                    <input type="date" required name="dob" value={formData.dob} onChange={handleChange} className="w-full mt-1 p-2 border rounded-xl bg-slate-50" />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700">Gender *</la
