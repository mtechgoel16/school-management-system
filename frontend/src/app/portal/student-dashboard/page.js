'use client';
import { useState } from 'react';

export default function StudentDashboardPage() {
  const [activeReportExam, setActiveReportExam] = useState('Annual');
  const [expandedSubject, setExpandedSubject] = useState('Hindi');
  const [selectedFeeIds, setSelectedFeeIds] = useState(['F11', 'F12']);
  const [qrGenerated, setQrGenerated] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  const examResultsData = {
    'Annual': [
      { name: 'Hindi', components: [{ name: 'Written', max: 10, obt: 10 }, { name: 'Oral', max: 5, obt: 4 }, { name: 'Dictation', max: 5, obt: 5 }], totalMax: 20, totalObt: 19 },
      { name: 'English', components: [{ name: 'Written', max: 60, obt: 54 }, { name: 'Oral', max: 10, obt: 9 }, { name: 'Dictation', max: 10, obt: 9 }], totalMax: 80, totalObt: 72 },
      { name: 'Mathematics', components: [{ name: 'Written Theory', max: 70, obt: 69 }, { name: 'Mental Maths', max: 10, obt: 10 }], totalMax: 80, totalObt: 79 },
      { name: 'Science', components: [{ name: 'Theory', max: 60, obt: 56 }, { name: 'Practical Lab', max: 20, obt: 19 }], totalMax: 80, totalObt: 75 },
      { name: 'Social Science', components: [{ name: 'Theory Exam', max: 80, obt: 72 }, { name: 'History Project', max: 20, obt: 18 }], totalMax: 100, totalObt: 90 },
      { name: 'EVS', components: [{ name: 'Environmental Studies', max: 30, obt: 29 }, { name: 'Field Activity', max: 20, obt: 19 }], totalMax: 50, totalObt: 48 },
      { name: 'Computer Science', components: [{ name: 'Python Theory', max: 50, obt: 48 }, { name: 'Lab Practical', max: 50, obt: 49 }], totalMax: 100, totalObt: 97 },
      { name: 'Physical Education', components: [{ name: 'Athletics', max: 50, obt: 49 }, { name: 'Motor Skills', max: 50, obt: 48 }], totalMax: 100, totalObt: 97 },
      { name: 'General Knowledge & Arts', components: [{ name: 'GK Written', max: 25, obt: 24 }, { name: 'Drawing & Art', max: 25, obt: 25 }], totalMax: 50, totalObt: 49 }
    ]
  };

  const [feeLedgerList, setFeeLedgerList] = useState([
    { id: 'F01', type: 'Tuition Fee (Monthly Plan)', month: 'April 2026', due: '10-Apr-2026', amount: 1000, paid: true },
    { id: 'F02', type: 'Tuition Fee (Monthly Plan)', month: 'May 2026', due: '10-May-2026', amount: 1000, paid: true },
    { id: 'F03', type: 'Transport Charge (Monthly Option)', month: 'June 2026', due: '10-Jun-2026', amount: 800, paid: true },
    { id: 'F11', type: 'Tuition Fee (Monthly Plan)', month: 'February 2027', due: '10-Feb-2027', amount: 1000, paid: false },
    { id: 'F12', type: 'Tuition Fee (Monthly Plan)', month: 'March 2027', due: '10-Mar-2027', amount: 1000, paid: false },
  ]);

  const selectedTotal = feeLedgerList.filter(f => selectedFeeIds.includes(f.id)).reduce((s, i) => s + i.amount, 0);

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-8 animate-fade-in">
      <div className="flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-amber-400 text-indigo-950 rounded-2xl flex items-center justify-center font-black text-2xl shadow-inner">AS</div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Arjun Sharma (Class 1-A)</h2>
            <p className="text-xs text-slate-500">Student ID: ST001 | Admission No: ADM1024 | Aadhaar: XXXX XXXX XXXX 4321</p>
          </div>
        </div>
        <a href="/" className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl shadow-sm">Logout</a>
      </div>

      <div className="bg-white rounded-3xl border overflow-hidden shadow-lg">
        <div className="bg-indigo-950 text-white p-6 flex justify-between items-center">
          <h3 className="text-xl font-black">CBSE Academic Report Card & Progress (9 Core Subjects)</h3>
        </div>
        <div className="p-6 space-y-3">
          {examResultsData['Annual'].map(sub => (
            <div key={sub.name} className="border rounded-2xl overflow-hidden bg-white">
              <div onClick={() => setExpandedSubject(expandedSubject === sub.name ? null : sub.name)} className="p-4 bg-slate-50 cursor-pointer flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">{sub.name}</span>
                <span className="text-xs font-bold text-indigo-900">{sub.totalObt} / {sub.totalMax}</span>
              </div>
              {expandedSubject === sub.name && (
                <div className="p-4 border-t text-xs">
                  {sub.components.map((c, i) => (
                    <div key={i} className="flex justify-between border-b py-1">
                      <span>{c.name}</span>
                      <span className="font-bold">{c.obt} / {c.max}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-8 rounded-3xl border shadow-lg space-y-6">
        <h3 className="text-2xl font-black text-slate-900">12-Month Itemized Fee Table (Section 57)</h3>
        <table className="w-full text-xs text-left border">
          <thead className="bg-indigo-950 text-white font-bold">
            <tr>
              <th className="p-3">Select</th>
              <th className="p-3">Fee Type</th>
              <th className="p-3">Period</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {feeLedgerList.map(fee => (
              <tr key={fee.id} className="border-b">
                <td className="p-3 text-center">
                  {!fee.paid ? (
                    <input type="checkbox" checked={selectedFeeIds.includes(fee.id)} onChange={e => {
                      if (e.target.checked) setSelectedFeeIds([...selectedFeeIds, fee.id]);
                      else setSelectedFeeIds(selectedFeeIds.filter(id => id !== fee.id));
                    }} />
                  ) : <span className="text-emerald-600 font-bold">✓</span>}
                </td>
                <td className="p-3 font-semibold">{fee.type}</td>
                <td className="p-3">{fee.month}</td>
                <td className="p-3 font-bold">₹{fee.amount}</td>
                <td className="p-3"><span className={"px-2 py-0.5 rounded text-[10px] font-bold " + (fee.paid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800')}>{fee.paid ? 'PAID' : 'UNPAID'}</span></td>
              </tr>
            ))}
          </tbody>
        </table>

        {!qrGenerated && !paymentDone && (
          <button onClick={() => setQrGenerated(true)} className="w-full py-3.5 bg-indigo-600 text-white font-bold rounded-2xl shadow text-sm">
            Pay Selected Dues (₹{selectedTotal}) via Dynamic UPI QR Code
          </button>
        )}

        {qrGenerated && !paymentDone && (
          <div className="text-center p-6 border rounded-3xl bg-slate-50 space-y-3">
            <h4 className="font-bold text-slate-900">Single-Order Dynamic UPI QR Code (Section 63)</h4>
            <div className="w-44 h-44 bg-white border-4 border-indigo-900 rounded-2xl mx-auto flex items-center justify-center font-mono font-bold text-xs p-2">
              [DYNAMIC UPI QR]<br />upi://pay?pa=schoolfees@okaxis&am={selectedTotal}
            </div>
            <button onClick={() => { setFeeLedgerList(prev => prev.map(f => selectedFeeIds.includes(f.id) ? { ...f, paid: true } : f)); setPaymentDone(true); }} className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl text-xs shadow">Simulate Server Webhook Payment Verification</button>
          </div>
        )}

        {paymentDone && (
          <div className="p-6 bg-emerald-50 text-emerald-900 rounded-3xl text-center space-y-2 border border-emerald-200">
            <h4 className="font-bold">Payment Verified via Server Webhook!</h4>
            <p className="text-xs">Selected fees marked as Paid. Automatic Ledger Updated.</p>
          </div>
        )}
      </div>
    </div>
  );
}
