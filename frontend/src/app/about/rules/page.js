'use client';
export default function RulesPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8 animate-fade-in">
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
