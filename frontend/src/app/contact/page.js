'use client';
import { useState } from 'react';

export default function ContactPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Admissions Inquiry');
  const [message, setMessage] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaError, setCaptchaError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    setCaptchaError('');
    if (parseInt(captchaInput, 10) !== 12) {
      setCaptchaError('Incorrect math verification. What is 7 + 5?');
      return;
    }
    setContactSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-6 space-y-12 animate-fade-in">
      <div className="text-center max-w-3xl mx-auto border-b pb-8">
        <h2 className="text-4xl font-black text-slate-900 mt-2">Contact Us & Campus Inquiry (Section 78)</h2>
        <p className="text-slate-500 text-sm mt-3">We welcome parents and guardians for admissions consultations and campus tours.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Send an Official Message</h3>
          {contactSubmitted ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-center space-y-2">
              <span className="text-2xl">✓</span>
              <h4 className="font-bold text-base">Inquiry Successfully Submitted!</h4>
              <p className="text-xs text-emerald-700">Our admissions desk will contact you at {" " + phone} within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              {captchaError && <div className="p-3 bg-rose-50 text-rose-700 border border-rose-200 text-xs rounded-xl font-semibold">{captchaError}</div>}
              <div className="grid grid-cols-2 gap-4">
                <input type="text" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs bg-slate-50" placeholder="First Name" />
                <input type="text" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs bg-slate-50" placeholder="Last Name" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs bg-slate-50" placeholder="+91 98765 43210" />
                <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs bg-slate-50" placeholder="parent@example.com" />
              </div>
              <div>
                <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs bg-slate-50 font-bold">
                  <option value="Admissions Inquiry">Admissions Inquiry (Session 2026–27)</option>
                  <option value="Fee Query & Online Payment">Fee Query & Online Payment</option>
                  <option value="Transport & Bus Route">Transportation & Bus Route</option>
                  <option value="Principal Appointment">Request Appointment with Principal</option>
                </select>
              </div>
              <textarea rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full p-2.5 border rounded-xl text-xs bg-slate-50" placeholder="Please provide student details..." />
              <div className="p-3.5 bg-indigo-50 border border-indigo-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
                <span className="font-bold text-indigo-950">🛡️ Anti-Spam Verification: What is 7 + 5 = ?</span>
                <input type="number" required value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} className="w-20 p-2 border rounded-xl text-center font-bold bg-white" placeholder="Answer" />
              </div>
              <button type="submit" className="w-full py-3 bg-indigo-900 text-white font-bold rounded-xl text-xs">Submit Official Inquiry →</button>
            </form>
          )}
        </div>
        <div className="space-y-6">
          <div className="bg-indigo-950 text-white p-8 rounded-3xl shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-amber-400 font-black">Campus Contact Details</h3>
            <div className="space-y-2 text-xs text-slate-300">
              <p>📍 <strong>Address:</strong> Sector 14, Knowledge Corridor, Near Metro Station, New Delhi 110001</p>
              <p>📞 <strong>Phone:</strong> +91 98765 43210 / 011-23456789</p>
              <p>✉️ <strong>Email:</strong> info@delhipublicmodel.edu.in</p>
            </div>
          </div>
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm h-64">
            <iframe title="Map" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112061.09262729584!2d77.10249019999999!3d28.7040592!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" className="w-full h-full border-0" allowFullScreen="" loading="lazy" />
          </div>
        </div>
      </div>
    </div>
  );
}
