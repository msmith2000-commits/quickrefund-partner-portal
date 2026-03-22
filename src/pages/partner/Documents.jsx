import { useState } from 'react';
import { FileText, Film, Download, Search, Filter } from 'lucide-react';
import { generalDocuments, documentCategories } from '../../data/documents';
import Toast from '../../components/Toast';

export default function Documents() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [toast, setToast] = useState({ show: false, message: '' });

  const filtered = generalDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === 'All' || doc.category === category;
    return matchesSearch && matchesCategory;
  });

  const grouped = filtered.reduce((acc, doc) => {
    if (!acc[doc.category]) acc[doc.category] = [];
    acc[doc.category].push(doc);
    return acc;
  }, {});
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-qr-navy">General Documents</h2>
          <p className="text-sm text-slate-500 mt-1">Browse product guides, sales resources, FAQs, and training materials.</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-qr-green/30 focus:border-qr-green transition-all"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />          {documentCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                category === cat
                  ? 'bg-qr-green text-white'
                  : 'bg-white border border-slate-200 text-slate-600 hover:border-qr-green/30 hover:text-qr-green'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Document Groups */}
      {Object.entries(grouped).map(([cat, docs]) => (
        <div key={cat}>
          <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wide mb-3">{cat}</h3>
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            {docs.map((doc, i) => (
              <div
                key={doc.id}
                className={`flex items-center gap-4 px-5 py-4 hover:bg-slate-50 transition-colors ${
                  i < docs.length - 1 ? 'border-b border-slate-100' : ''
                }`}
              >                <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  doc.type === 'MP4' ? 'bg-violet-50' : 'bg-red-50'
                }`}>
                  {doc.type === 'MP4'
                    ? <Film className="w-5 h-5 text-violet-500" />
                    : <FileText className="w-5 h-5 text-red-500" />
                  }
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{doc.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{doc.type} &middot; {doc.size} &middot; Uploaded {formatDate(doc.date)}</p>
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
        </div>
      ))}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <FileText className="w-12 h-12 text-slate-200 mx-auto mb-3" />
          <p className="text-sm text-slate-400">No documents match your search.</p>
        </div>
      )}
      <Toast message={toast.message} show={toast.show} onClose={() => setToast({ show: false, message: '' })} />
    </div>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}