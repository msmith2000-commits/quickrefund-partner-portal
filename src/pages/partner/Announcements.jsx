import { AlertTriangle, Megaphone } from 'lucide-react';
import { announcements } from '../../data/announcements';

export default function Announcements() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-qr-navy">Announcements</h2>
        <p className="text-sm text-slate-500 mt-1">Company news, updates, and important notices from QuickRefund.</p>
      </div>

      <div className="space-y-4">
        {announcements.map(a => (
          <div
            key={a.id}
            className={`bg-white rounded-2xl border shadow-sm overflow-hidden ${
              a.important ? 'border-amber-200' : 'border-slate-200'
            }`}
          >
            {a.important && (
              <div className="bg-amber-50 border-b border-amber-100 px-6 py-2 flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Important</span>
              </div>
            )}            <div className="p-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <h3 className="text-base font-semibold text-slate-800">{a.title}</h3>
                <span className="text-xs text-slate-400 flex-shrink-0">{formatDate(a.date)}</span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{a.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}