'use client';
export default function CampusLifePage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8 animate-fade-in">
      <h2 className="text-3xl font-black text-slate-900">Campus Life & Activities (Section 11)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['Robotics & Innovation Clubs', 'Athletics & Physical Training Leagues', 'Literary & Dramatics Societies'].map((c, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-semibold">{c}</div>
        ))}
      </div>
    </div>
  );
}
