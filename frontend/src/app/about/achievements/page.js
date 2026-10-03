'use client';
export default function AchievementsPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8 animate-fade-in">
      <h2 className="text-3xl font-black text-slate-900">Achievements (Section 13)</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {['100% CBSE Class 12 Board Pass Result', 'National Science Olympiad Gold Medalist (Arjun Sharma)', 'State Athletics & Junior Football Championship Trophy'].map((a, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-bold text-amber-800 bg-amber-50">{a}</div>
        ))}
      </div>
    </div>
  );
}
