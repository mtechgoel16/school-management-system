'use client';
export default function GalleryPage() {
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8 animate-fade-in">
      <h2 className="text-3xl font-black text-slate-900">Media Gallery (Section 16)</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {['Annual Sports Meet', 'Science Fair 2026', 'Robotics Workshop', 'Independence Day Gala'].map((g, i) => (
          <div key={i} className="h-44 bg-white rounded-2xl border p-4 flex items-end font-bold shadow-sm">{g}</div>
        ))}
      </div>
    </div>
  );
}
