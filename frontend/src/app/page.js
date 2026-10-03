'use client';

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
