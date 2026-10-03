'use client';
import { useState } from 'react';

export default function FacultyDashboardPage() {
  const [locked, setLocked] = useState(false);
  const [homeworkStatus, setHomeworkStatus] = useState('');

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <h2 className="text-xl font-black text-slate-900">Welcome, Mrs. Anjali Sen (Class Teacher 1-A)</h2>
        <a href="/" className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl">Logout</a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h4 className="font-bold text-slate-900 text-sm">Class 1-A Attendance Sheet (Section 17)</h4>
            <button onClick={() => setLocked(true)} disabled={locked} className={"px-3 py-1.5 rounded-lg text-xs font-bold text-white " + (locked ? 'bg-slate-300' : 'bg-emerald-600')}>{locked ? 'Locked' : 'Lock Attendance'}</button>
          </div>
          <table className="w-full text-xs text-left border rounded-xl">
            <thead className="bg-slate-100 font-bold"><tr><th className="p-2">Student</th><th className="p-2">Status</th></tr></thead>
            <tbody>
              <tr className="border-b"><td className="p-2 font-bold">Arjun Sharma (ST001)</td><td className="p-2"><select disabled={locked} className="p-1 border rounded bg-slate-50"><option>Present</option><option>Absent</option></select></td></tr>
            </tbody>
          </table>
        </div>
        <div className="bg-white p-6 rounded-3xl border shadow-sm space-y-4">
          <h4 className="font-bold text-slate-900 text-sm border-b pb-2">Upload Daily Classwork & Homework (Section 20)</h4>
          {homeworkStatus && <p className="text-xs bg-emerald-50 text-emerald-800 p-2 rounded font-bold">{homeworkStatus}</p>}
          <form onSubmit={e => { e.preventDefault(); setHomeworkStatus('Homework Published to Live Portal!'); }} className="space-y-3">
            <input required className="w-full p-2 border rounded-xl text-xs bg-slate-50" placeholder="Topic & Subject" />
            <textarea required className="w-full p-2 border rounded-xl text-xs bg-slate-50" rows={3} placeholder="Homework instructions..." />
            <button type="submit" className="w-full py-2 bg-indigo-900 text-white font-bold rounded-xl text-xs">Publish Homework</button>
          </form>
        </div>
      </div>
    </div>
  );
}
