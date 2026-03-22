import { useState } from 'react';
import { DollarSign, Download, FileText, Calendar } from 'lucide-react';
import { payoutStatements } from '../../data/payouts';
import { currentPartner } from '../../data/partners';
import Toast from '../../components/Toast';

export default function Payouts() {
  const [toast, setToast] = useState({ show: false, message: '' });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-qr-navy">Payout Statements</h2>
        <p className="text-sm text-slate-500 mt-1">
          Download your residual and bonus payout statements for {currentPartner.company}.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {payoutStatements.map((ps, i) => (
          <div
            key={ps.id}
            className={`flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors ${
              i < payoutStatements.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >            <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800">{ps.description}</p>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(ps.date)}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  PDF &middot; {ps.size}
                </span>
              </div>
            </div>
            <button
              onClick={() => setToast({ show: true, message: `Download would start in production: ${ps.file}` })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-qr-green border border-qr-green/30 hover:bg-qr-green hover:text-white transition-all flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        ))}
      </div>

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: '' })} />
    </div>
  );
}
function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}