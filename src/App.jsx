import { Routes, Route, Navigate } from 'react-router-dom';
import PartnerLayout from './layouts/PartnerLayout';
import Login from './pages/Login';
import Dashboard from './pages/partner/Dashboard';
import Documents from './pages/partner/Documents';
import MyDocuments from './pages/partner/MyDocuments';
import Payouts from './pages/partner/Payouts';
import ReferralStats from './pages/partner/ReferralStats';
import Merchants from './pages/partner/Merchants';
import Announcements from './pages/partner/Announcements';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route element={<PartnerLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/my-documents" element={<MyDocuments />} />
        <Route path="/payouts" element={<Payouts />} />
        <Route path="/referral-stats" element={<ReferralStats />} />
        <Route path="/merchants" element={<Merchants />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/admin" element={<AdminPlaceholder />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function AdminPlaceholder() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-qr-green/10 flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#398D42" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <h2 className="text-xl font-bold text-qr-navy mb-2">Admin Panel</h2>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          The admin panel (Partner Management, Document Management, Payout Upload, Announcement Management) will be built in the next phase.
        </p>
        <p className="text-xs text-slate-300 mt-4 italic">Coming in Phase 2 of the prototype build.</p>
      </div>
    </div>
  );
}

export default App;
