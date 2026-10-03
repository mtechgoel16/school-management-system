'use client';
export default function ExaminationsPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8 animate-fade-in">
      <h2 className="text-3xl font-black text-slate-900">Examinations & Assessments (Section 33)</h2>
      <div className="p-6 bg-white rounded-2xl border shadow-sm space-y-4">
        <p className="text-sm text-slate-600">The school conducts Quarterly, Mid-Term, Half-Yearly, and Annual Examinations alongside continuous unit assessments.</p>
        <a href="/portal/student-login" className="inline-block px-4 py-2 bg-indigo-900 text-white font-bold text-xs rounded-lg">Check Student Report Card →</a>
      </div>
    </div>
  );
}
