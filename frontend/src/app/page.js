'use client';

export default function HomePage() {
  return (
    <div className="space-y-16 py-6 animate-fade-in">
      
      {/* 1. HERO BANNER */}
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-950 rounded-3xl p-12 text-white grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-xl">
        <div className="space-y-6">
          <span className="bg-amber-400/20 text-amber-300 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-400/30">Admissions Open 2026–27</span>
          <h2 className="text-3xl sm:text-5xl font-black leading-tight">Shaping Tomorrow's Visionaries With Excellence</h2>
          <p className="text-slate-300 text-sm leading-relaxed">CBSE Affiliated Senior Secondary Institution integrating academic rigor with smart digital classrooms, composite science labs, and global ERP connectivity.</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur space-y-4 shadow-2xl">
          <h3 className="text-lg font-bold text-amber-400 border-b pb-2">Institutional Notice Board</h3>
          <div className="space-y-2 text-xs">
            <p className="font-semibold text-slate-100">📢 Annual Board & Term Examination 2026 Date Sheet Released.</p>
            <p className="font-semibold text-slate-100">📢 Parent-Teacher Meeting (PTM) Scheduled for Result Verification.</p>
          </div>
        </div>
      </section>

      {/* 2. WELCOME / ABOUT SCHOOL */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-slate-900">Welcome to Delhi Public Model School</h2>
          <p className="text-slate-600 text-sm leading-relaxed">Providing high-standard CBSE secondary education with integrated robotics labs, full-size cricket pitch, high-speed computer center, and dynamic GPS bus fleet tracking systems.</p>
        </div>
        <div className="bg-indigo-900 text-white p-8 rounded-3xl shadow-lg">
          <h3 className="text-lg font-bold">Principal Note</h3>
          <p className="text-slate-300 text-xs italic mt-2">"True schooling is not simply about academic syllabus, but training the mind to critically think, discover, and innovate with character."</p>
          <p className="text-xs font-bold text-amber-400 mt-4">— Dr. V. K. Sharma, Principal</p>
        </div>
      </section>

      {/* 3. SCHOOL STATISTICS COUNTER */}
      <section className="bg-indigo-950 text-white rounded-3xl p-8 lg:p-12 shadow-2xl grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
        <div><p className="text-3xl sm:text-4xl font-black text-amber-400">1,420+</p><p className="text-xs text-slate-300 font-bold mt-1">Enrolled Students</p></div>
        <div><p className="text-3xl sm:text-4xl font-black text-amber-400">68+</p><p className="text-xs text-slate-300 font-bold mt-1">Certified Educators</p></div>
        <div><p className="text-3xl sm:text-4xl font-black text-amber-400">100%</p><p className="text-xs text-slate-300 font-bold mt-1">CBSE Pass Rate</p></div>
        <div><p className="text-3xl sm:text-4xl font-black text-amber-400">10 Acres</p><p className="text-xs text-slate-300 font-bold mt-1">Lush Green Campus</p></div>
        <div><p className="text-3xl sm:text-4xl font-black text-amber-400">20+ Yrs</p><p className="text-xs text-slate-300 font-bold mt-1">Educational Legacy</p></div>
      </section>
    </div>
  );
}
