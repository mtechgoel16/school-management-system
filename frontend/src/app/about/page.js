'use client';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12 animate-fade-in">
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
