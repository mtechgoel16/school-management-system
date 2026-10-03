'use client';
import { useState } from 'react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ADMIN');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (role === 'ADMIN' && username === 'admin' && password === 'AdminPassword2026!') {
      window.location.href = '/portal/admin-dashboard';
    } else if (role === 'TEACHER' && username === 'teacher' && password === 'TeacherPass2026!') {
      window.location.href = '/portal/faculty-dashboard';
    } else {
      setError('Invalid credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-6 animate-fade-in">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-indigo-100 text-indigo-900 rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold">🔐</div>
          <h2 className="text-2xl font-black text-slate-900">School ERP Staff Login</h2>
        </div>
        {error && <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl font-semibold text-center">{error}</div>}
        <div className="flex bg-slate-100 p-1.5 rounded-2xl text-xs font-bold text-slate-600">
          <button type="button" onClick={() => setRole('TEACHER')} className={"flex-1 py-2 text-center rounded-xl transition " + (role === 'TEACHER' ? 'bg-white text-indigo-950 shadow-sm' : '')}>Faculty / Teacher</button>
          <button type="button" onClick={() => setRole('ADMIN')} className={"flex-1 py-2 text-center rounded-xl transition " + (role === 'ADMIN' ? 'bg-white text-indigo-950 shadow-sm' : '')}>Admin / Principal</button>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2.5 border rounded-xl text-sm bg-slate-50" placeholder="Username" />
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2.5 border rounded-xl text-sm bg-slate-50" placeholder="Password" />
          <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900">
            • Admin: admin / <strong>AdminPassword2026!</strong><br />• Teacher: teacher / <strong>TeacherPass2026!</strong>
          </div>
          <button type="submit" className="w-full py-3 bg-indigo-900 hover:bg-indigo-800 text-white font-bold rounded-xl shadow-md text-sm">Sign In to Staff Portal →</button>
        </form>
      </div>
    </div>
  );
}
