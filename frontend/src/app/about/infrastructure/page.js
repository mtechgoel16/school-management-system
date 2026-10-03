'use client';
export default function InfrastructurePage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8 animate-fade-in">
      <h2 className="text-3xl font-black text-slate-900">School Infrastructure (Section 11)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Smart Classrooms with Digital Interactive Boards', 'Separate Physics, Chemistry, Biology & STEM Labs', 'Central Knowledge Library with 20,000+ Volumes', 'Computer & Robotics AI Hub', 'Olympic Standard Athletic & Sports Grounds', 'GPS Fleet of 25+ Buses with CCTV'].map((t, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm font-semibold">{t}</div>
        ))}
      </div>
    </div>
  );
}
