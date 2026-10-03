'use client';
export default function FacilitiesPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8 animate-fade-in">
      <h2 className="text-3xl font-black text-slate-900">Campus Facilities (Section 12)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {['24/7 Campus Health Infirmary & Resident Nurse', '800-Seat Acoustic Multi-Purpose Auditorium', 'Hygienic Organic Dining Cafeteria', 'Music, Classical Dance & Fine Arts Studio'].map((f, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border shadow-sm font-bold text-indigo-950">{f}</div>
        ))}
      </div>
    </div>
  );
}
