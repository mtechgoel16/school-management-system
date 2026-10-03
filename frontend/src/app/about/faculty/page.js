'use client';
export default function FacultyPage() {
  const faculty = [
    { n: 'Dr. V. K. Sharma', r: 'Principal', q: 'M.Sc., Ph.D.', wa: '9876543210', mail: 'principal@dpms.edu', fb: '#', ln: '#', ig: '#' },
    { n: 'Mrs. Sunita Verma', r: 'Vice Principal', q: 'M.Sc., M.Ed.', wa: '9876543211', mail: 'viceprincipal@dpms.edu', fb: '#', ln: '#', ig: '#' },
    { n: 'Mr. Rakesh Kapoor', r: 'HOD Maths', q: 'M.Sc., B.Ed.', wa: '9876543212', mail: 'maths@dpms.edu', fb: '#', ln: '#', ig: '#' },
    { n: 'Mrs. Anjali Sen', r: 'Class Teacher (1-A)', q: 'M.A., B.Ed.', wa: '9876543213', mail: 'anjali@dpms.edu', fb: '#', ln: '#', ig: '#' },
  ];
  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-8 animate-fade-in">
      <h2 className="text-3xl font-black text-slate-900">Faculty Directory (Section 15)</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {faculty.map((f, i) => (
          <div key={i} className="p-6 bg-white rounded-2xl border border-slate-200 shadow-sm text-center space-y-3">
            <div className="w-16 h-16 bg-indigo-100 text-indigo-900 rounded-full mx-auto flex items-center justify-center font-bold text-lg">
              {f.n.split(' ')?.[0]?.[0]}
            </div>
            <div>
              <h4 className="font-bold text-slate-900">{f.n}</h4>
              <p className="text-xs text-indigo-600 font-bold">{f.r}</p>
              <p className="text-xs text-slate-400">{f.q}</p>
            </div>
            <div className="flex justify-center gap-2 pt-2 border-t text-xs">
              <a href={"https://wa.me/91" + f.wa} className="text-emerald-600 font-bold">WA</a>
              <a href={"mailto:" + f.mail} className="text-blue-600 font-bold">Mail</a>
              <a href={f.fb} className="text-indigo-600 font-bold">FB</a>
              <a href={f.ln} className="text-sky-700 font-bold">LN</a>
              <a href={f.ig} className="text-rose-600 font-bold">IG</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
