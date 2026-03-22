import { useState } from 'react';
import { FileText, Download, FolderOpen } from 'lucide-react';
import { partnerDocuments } from '../../data/documents';
import { currentPartner } from '../../data/partners';
import Toast from '../../components/Toast';

export default function MyDocuments() {
  const [toast, setToast] = useState({ show: false, message: '' });

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-qr-navy">My Documents</h2>
        <p className="text-sm text-slate-500 mt-1">
          Partner-specific materials for {currentPartner.company}.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {partnerDocuments.map((doc, i) => (
          <div
            key={doc.id}
            className={`flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors ${
              i < partnerDocuments.length - 1 ? 'border-b border-slate-100' : ''
            }`}
          >            <div className="w-10 h-10 rounded-lg bg-qr-green-light flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-qr-green" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">{doc.title}</p>
              <p className="text-xs text-slate-400 mt-0.5">
                <span className="inline-flex items-center px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-medium mr-2">{doc.category}</span>
                {doc.type} &middot; {doc.size} &middot; {formatDate(doc.date)}
              </p>
            </div>
            <button
              onClick={() => setToast({ show: true, message: `Download would start in production: ${doc.title}` })}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-qr-green border border-qr-green/30 hover:bg-qr-green hover:text-white transition-all flex-shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          </div>
        ))}
      </div>

      {partnerDocuments.length === 0 && (
        <div className="text-center py-16">
          <FolderOpen className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No partner-specific documents yet.</p>
        </div>
      )}

      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: '' })} />
    </div>
  );
}
function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}