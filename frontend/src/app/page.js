'use client';
import { useState } from 'react';

export default function Home() {
  const [tab, setTab] = useState('admin');
  return (
    <div className="max-w-5xl mx-auto p-6 font-sans">
      <header className="flex justify-between items-center py-4 border-b">
        <h1 className="text-xl font-bold text-indigo-900">Delhi Public Model School ERP</h1>
        <div className="flex gap-2">
          {['admin', 'teacher', 'parent'].map(t => (
            <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded text-sm capitalize ${tab === t ? 'bg-indigo-600 text-white' : 'bg-slate-200'}`}>
              {t}
            </button>
          ))}
        </div>
      </header>
      <main className="mt-8">
        {tab === 'admin' && (
          <div className="grid grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded shadow">Total Students: 1,420</div>
            <div className="p-4 bg-white rounded shadow">Present Today: 1,385</div>
            <div className="p-4 bg-white rounded shadow">Absent: 35</div>
          </div>
        )}
        {tab === 'teacher' && <div className="p-4 bg-white rounded shadow">Teacher Attendance Sheet (Class 1-A)</div>}
        {tab === 'parent' && <div className="p-4 bg-white rounded shadow">Student: Arjun Sharma (ST001) - Pending Fee: ₹2,000</div>}
      </main>
    </div>
  );
}
