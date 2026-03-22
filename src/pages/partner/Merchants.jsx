import { useState } from 'react';
import { Search, Building2, ExternalLink, ChevronRight, ArrowLeft } from 'lucide-react';
import { merchants, subPartners } from '../../data/merchants';
import { currentPartner, partners } from '../../data/partners';
import StatusBadge from '../../components/StatusBadge';

export default function Merchants() {
  const [search, setSearch] = useState('');
  const [activeView, setActiveView] = useState('direct');
  const [selectedSubPartner, setSelectedSubPartner] = useState(null);

  const [demoPartner, setDemoPartner] = useState('P005');
  const partner = partners.find(p => p.id === demoPartner);
  const isParent = partner?.type === 'Parent';
  const partnerMerchants = merchants[demoPartner] || [];
  const partnerSubPartners = subPartners[demoPartner] || [];

  const filteredMerchants = partnerMerchants.filter(m =>
    m.company.toLowerCase().includes(search.toLowerCase()) ||
    m.website.toLowerCase().includes(search.toLowerCase())
  );

  const subPartnerMerchants = selectedSubPartner ? (merchants[selectedSubPartner.id] || []) : [];
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-qr-navy">My Merchants</h2>
          <p className="text-sm text-slate-500 mt-1">
            Merchants referred by {partner?.company || currentPartner.company}.
          </p>
        </div>

        {/* Demo partner toggle */}
        <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-lg p-1">
          <button
            onClick={() => { setDemoPartner('P005'); setActiveView('direct'); setSelectedSubPartner(null); }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              demoPartner === 'P005' ? 'bg-qr-green text-white' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Standard Partner
          </button>
          <button
            onClick={() => { setDemoPartner('P001'); setActiveView('direct'); setSelectedSubPartner(null); }}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
              demoPartner === 'P001' ? 'bg-qr-green text-white' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Parent Partner
          </button>
        </div>
      </div>
      {/* Tabs for Parent Partner */}
      {isParent && (
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg p-1 w-fit">
          <button
            onClick={() => { setActiveView('direct'); setSelectedSubPartner(null); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'direct' ? 'bg-qr-green text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            My Direct Merchants
          </button>
          <button
            onClick={() => { setActiveView('subpartners'); setSelectedSubPartner(null); }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'subpartners' ? 'bg-qr-green text-white shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            My Sub-Partners
          </button>
        </div>
      )}

      {/* Direct Merchants View */}
      {activeView === 'direct' && (
        <>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search merchants..."              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-qr-green/30 focus:border-qr-green transition-all"
            />
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Company</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Website</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredMerchants.map((m, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                          <Building2 className="w-4 h-4 text-slate-400" />
                        </div>
                        <span className="text-sm font-medium text-slate-800">{m.company}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <a href={`https://${m.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-qr-green hover:text-qr-green-dark flex items-center gap-1">
                        {m.website} <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="px-5 py-3.5"><StatusBadge status={m.status} /></td>
                  </tr>
                ))}              </tbody>
            </table>

            {filteredMerchants.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-10 h-10 text-slate-200 mx-auto mb-2" />
                <p className="text-sm text-slate-400">No merchants found.</p>
              </div>
            )}
          </div>

          <p className="text-xs text-slate-400">
            Showing {filteredMerchants.length} of {partnerMerchants.length} merchants
          </p>
        </>
      )}

      {/* Sub-Partners View */}
      {activeView === 'subpartners' && !selectedSubPartner && (
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Company</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Contact</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Merchants</th>
                <th className="w-10"></th>
              </tr>
            </thead>            <tbody>
              {partnerSubPartners.map((sp) => (
                <tr
                  key={sp.id}
                  className="border-b border-slate-50 hover:bg-slate-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedSubPartner(sp)}
                >
                  <td className="px-5 py-3.5">
                    <span className="text-sm font-medium text-slate-800">{sp.company}</span>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-600">{sp.contact}</td>
                  <td className="px-5 py-3.5"><StatusBadge status={sp.status} /></td>
                  <td className="px-5 py-3.5 text-sm text-slate-600">{sp.merchantCount}</td>
                  <td className="px-5 py-3.5"><ChevronRight className="w-4 h-4 text-slate-300" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Sub-Partner Merchant Detail */}
      {activeView === 'subpartners' && selectedSubPartner && (
        <>
          <button
            onClick={() => setSelectedSubPartner(null)}
            className="flex items-center gap-2 text-sm text-qr-green font-medium hover:text-qr-green-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Sub-Partners
          </button>
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
            <h3 className="text-base font-semibold text-slate-800 mb-1">{selectedSubPartner.company}</h3>
            <p className="text-sm text-slate-500">Contact: {selectedSubPartner.contact} &middot; {selectedSubPartner.merchantCount} merchants</p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Company</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Website</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                </tr>
              </thead>
              <tbody>
                {subPartnerMerchants.map((m, i) => (
                  <tr key={i} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5 text-sm font-medium text-slate-800">{m.company}</td>
                    <td className="px-5 py-3.5">
                      <a href={`https://${m.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-qr-green hover:text-qr-green-dark flex items-center gap-1">
                        {m.website} <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                    <td className="px-5 py-3.5"><StatusBadge status={m.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-xs text-slate-300 italic">Read-only view — this is {selectedSubPartner.company}'s merchant list.</p>
        </>
      )}
    </div>
  );
}