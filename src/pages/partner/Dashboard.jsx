import { useNavigate } from 'react-router-dom';
import {
  FileText,
  FolderOpen,
  DollarSign,
  Link2,
  Building2,
  TrendingUp,
  Users,
  MousePointerClick,
  ArrowUpRight,
  AlertTriangle,
} from 'lucide-react';
import { currentPartner } from '../../data/partners';
import { announcements } from '../../data/announcements';
import { merchants } from '../../data/merchants';
import { referralStats } from '../../data/referralStats';
import { payoutStatements } from '../../data/payouts';

const quickCards = [
  { label: 'Documents', icon: FileText, to: '/documents', color: 'bg-blue-50 text-blue-600', desc: 'Browse resources & guides' },
  { label: 'My Documents', icon: FolderOpen, to: '/my-documents', color: 'bg-violet-50 text-violet-600', desc: 'Your partner materials' },
  { label: 'Payout Statements', icon: DollarSign, to: '/payouts', color: 'bg-emerald-50 text-emerald-600', desc: 'View & download payouts' },
  { label: 'Referral Stats', icon: Link2, to: '/referral-stats', color: 'bg-amber-50 text-amber-600', desc: 'Track referral performance' },
  { label: 'My Merchants', icon: Building2, to: '/merchants', color: 'bg-rose-50 text-rose-600', desc: 'View referred merchants' },
];
export default function Dashboard() {
  const navigate = useNavigate();
  const partnerMerchants = merchants[currentPartner.id] || [];
  const activeMerchants = partnerMerchants.filter(m => m.status === 'Active').length;
  const recentAnnouncements = announcements.slice(0, 3);
  const latestPayout = payoutStatements[0];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Welcome */}
      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-qr-navy mb-1">
              Welcome back, {currentPartner.contact.split(' ')[0]}
            </h2>
            <p className="text-slate-500">
              Here's what's happening with {currentPartner.company}.
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase font-medium tracking-wide">Partner since</p>
            <p className="text-sm font-semibold text-slate-700">August 2025</p>
          </div>
        </div>
      </div>
      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-5">
        <MetricCard label="Active Merchants" value={activeMerchants} icon={Users} change="+2 this month" positive />
        <MetricCard label="Total Referral Clicks" value={referralStats.totalClicks.toLocaleString()} icon={MousePointerClick} change="+8.5% vs last month" positive />
        <MetricCard label="Conversions" value={referralStats.totalConversions} icon={TrendingUp} change={`${referralStats.conversionRate}% rate`} positive />
        <MetricCard label="Latest Payout" value={latestPayout.date.slice(0, 7).replace('-', '/')} icon={DollarSign} change={latestPayout.description.split(' ').slice(0, 2).join(' ')} />
      </div>

      {/* Quick Access Cards */}
      <div>
        <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide mb-4">Quick Access</h3>
        <div className="grid grid-cols-5 gap-4">
          {quickCards.map(card => (
            <button
              key={card.to}
              onClick={() => navigate(card.to)}
              className="group bg-white rounded-2xl border border-slate-200 p-5 text-left hover:shadow-md hover:shadow-qr-green/5 hover:border-qr-green/20 hover:-translate-y-1 transition-all"
            >
              <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
                <card.icon className="w-5 h-5" />
              </div>
              <p className="text-sm font-semibold text-slate-800 mb-0.5">{card.label}</p>
              <p className="text-xs text-slate-400">{card.desc}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Recent Announcements */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-slate-800 uppercase tracking-wide">Recent Announcements</h3>
          <button onClick={() => navigate('/announcements')} className="text-sm text-qr-green font-medium hover:text-qr-green-dark flex items-center gap-1">
            View All <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="space-y-3">
          {recentAnnouncements.map(a => (
            <div
              key={a.id}
              className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-sm transition-shadow cursor-pointer"
              onClick={() => navigate('/announcements')}
            >
              <div className="flex items-start gap-3">
                {a.important && (
                  <span className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium border border-amber-200 flex-shrink-0 mt-0.5">
                    <AlertTriangle className="w-3 h-3" /> Important
                  </span>
                )}
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">{a.title}</h4>
                  <p className="text-sm text-slate-500 line-clamp-2">{a.body}</p>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0 mt-0.5">{formatDate(a.date)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function MetricCard({ label, value, icon: Icon, change, positive }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</span>
        <Icon className="w-4 h-4 text-slate-300" />
      </div>
      <p className="text-2xl font-bold text-slate-900 mb-1">{value}</p>
      <p className={`text-xs font-medium ${positive ? 'text-emerald-600' : 'text-slate-400'}`}>
        {change}
      </p>
    </div>
  );
}

function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}