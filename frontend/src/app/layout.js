'use client';
import './globals.css';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }) {
  const [currentPath, setCurrentPath] = useState('/');
  const [aboutDropdown, setAboutDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);

  useEffect(() => {
    setCurrentPath(window.location.pathname || '/');
    const handlePop = () => setCurrentPath(window.location.pathname || '/');
    
    // Custom listener to force instantaneous React state updates on route change
    window.addEventListener('popstate', handlePop);
    window.addEventListener('locationchange', handlePop);
    
    return () => {
      window.removeEventListener('popstate', handlePop);
      window.removeEventListener('locationchange', handlePop);
    };
  }, []);

  const navigateTo = (path) => {
    setCurrentPath(path);
    setAboutDropdown(false);
    setResourcesDropdown(false);
    window.history.pushState({}, '', path);
    window.dispatchEvent(new Event('locationchange')); // Triggers instant render (No cache/refresh needed!)
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
          {/* Header Top Bar */}
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

          {/* Main Header */}
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
                
                {/* About Us Subpages Dropdown */}
                <div className="relative py-2 group" onMouseEnter={() => setAboutDropdown(true)} onMouseLeave={() => setAboutDropdown(false)}>
                  <button onClick={() => navigateTo('/about')} className="hover:text-indigo-600 flex items-center gap-1">About Us ▼</button>
                  {aboutDropdown && (
                    <div className="absolute left-0 mt-1 w-64 bg-white border rounded-2xl shadow-2xl py-2 text-xs z-50">
                      <button onClick={() => navigateTo('/about')} className="w-full text-left px-4 py-2 font-bold text-indigo-950 hover:bg-slate-50">🏛️ Main About Us Page (Section 9)</button>
                      <button onClick={() => navigateTo('/about/infrastructure')} className="w-full text-left px-4 py-2 hover:bg-slate-50">🏫 School Infrastructure (Section 11)</button>
                      <button onClick={() => navigateTo('/about/facilities')} className="w-full text-left px-4 py-2 hover:bg-slate-50">🔬 Facilities (Section 12)</button>
                      <button onClick={() => navigateTo('/about/achievements')} className="w-full text-left px-4 py-2 hover:bg-slate-50">🏆 Achievements (Section 13)</button>
                      <button onClick={() => navigateTo('/about/rules')} className="w-full text-left px-4 py-2 hover:bg-slate-50">📜 School Rules (Section 14)</button>
                      <button onClick={() => navigateTo('/about/faculty')} className="w-full text-left px-4 py-2 hover:bg-slate-50">👩‍🏫 Faculty Directory (Section 15)</button>
                      <button onClick={() => navigateTo('/about/gallery')} className="w-full text-left px-4 py-2 hover:bg-slate-50">🖼️ Campus Media Gallery (Section 16)</button>
                    </div>
                  )}
                </div>

                <button onClick={() => navigateTo('/blog')} className="hover:text-indigo-600">Blog</button>

                {/* Resources Dropdown */}
                <div className="relative py-2 group" onMouseEnter={() => setResourcesDropdown(true)} onMouseLeave={() => setResourcesDropdown(false)}>
                  <button onClick={() => navigateTo('/resources/academics')} className="hover:text-indigo-600 flex items-center gap-1">Resources ▼</button>
                  {resourcesDropdown && (
                    <div className="absolute left-0 mt-1 w-56 bg-white border rounded-2xl shadow-2xl py-2 text-xs z-50">
                      <button onClick={() => navigateTo('/resources/academics')} className="w-full text-left px-4 py-2 hover:bg-slate-50">📚 Academics Framework (Section 17)</button>
                      <button onClick={() => navigateTo('/resources/campus-life')} className="w-full text-left px-4 py-2 hover:bg-slate-50">🌳 Campus Life (Section 11)</button>
                      <button onClick={() => navigateTo('/resources/examinations')} className="w-full text-left px-4 py-2 hover:bg-slate-50">📝 Examinations & Reports (Section 42)</button>
                    </div>
                  )}
                </div>

                <button onClick={() => navigateTo('/news')} className="hover:text-indigo-600">News & Events</button>
                <button onClick={() => navigateTo('/contact')} className="hover:text-indigo-600">Contact Us</button>
              </nav>

              <div className="flex items-center gap-2">
                <button onClick={() => navigateTo('/portal/student-login')} className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold transition shadow-sm">Parent & Student Portal</button>
                <button onClick={() => navigateTo('/portal/admin-login')} className="px-4 py-2 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl text-xs font-bold transition shadow-sm">Admin Board</button>
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
