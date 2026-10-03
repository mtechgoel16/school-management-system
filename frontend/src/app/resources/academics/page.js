'use client';
export default function ResourcesAcademicsPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8 animate-fade-in">
      <h2 className="text-3xl font-black text-slate-900">Academic Framework & Curriculum (Section 17)</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {['Foundational Wing (Pre-Nur - UKG)', 'Primary Wing (Class 1 - 5)', 'Middle Wing (Class 6 - 8)', 'Senior Secondary Wing (Class 9 - 12)'].map((w, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-bold text-slate-900">{w}</div>
        ))}
      </div>
    </div>
  );
}
