'use client';
import { useState } from 'react';

export default function StudentLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if ((username === 'ST001' || username === 'ADM1024') && password === 'StudentPass2026!') {
      window.location.href = '/portal/student-dashboard';
    } else {
      setError('Invalid credentials. Use ST001 / StudentPass2026!');
    }
  };

  return (
    <div className="max-w-md mx-auto py-16 px-6 animate-fade-in">
      <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-amber-100 text-amber-800 rounded-2xl mx-auto flex items-center justify-center text-3xl font-bold">👨‍👩‍👦</div>
          <h2 className="text-2xl font-black text-slate-900">Parent & Student Portal</h2>
          <p className="text-xs text-slate-500">Sign in using your Student ID & Password (Section 18)</p>
        </div>
        {error && <div className="p-3 bg-rose-50 text-rose-700 text-xs rounded-xl font-semibold text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
          <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full p-2.5 border rounded-xl text-sm bg-slate-50" placeholder="Student ID (e.g. ST001)" />
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full p-2.5 border rounded-xl text-sm bg-slate-50" placeholder="Password" />
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900">
            Login: <strong>ST001</strong> / Password: <strong>StudentPass2026!</strong>
          </div>
          <button type="submit" className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md text-sm">Sign In to Student Dashboard →</button>
        </form>
      </div>
    </div>
  );
}
