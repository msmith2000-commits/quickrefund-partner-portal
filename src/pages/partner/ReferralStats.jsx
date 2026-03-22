import { useState } from 'react';
import { Copy, Check, MousePointerClick, TrendingUp, Percent, Link2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { referralStats } from '../../data/referralStats';

export default function ReferralStats() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralStats.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-xl font-bold text-qr-navy">Referral Stats</h2>
        <p className="text-sm text-slate-500 mt-1">Track your referral URL performance and conversion metrics.</p>
      </div>
      {/* Referral URL Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Link2 className="w-4 h-4 text-qr-green" />
          <span className="text-sm font-semibold text-slate-700">Your Referral URL</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3">
            <code className="text-sm text-qr-green font-medium">{referralStats.url}</code>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
              copied
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-qr-green text-white hover:bg-qr-green-dark shadow-md shadow-qr-green/20'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy URL'}
          </button>
        </div>
        <p className="text-xs text-slate-400 mt-2">Share this URL with merchants. Clicks and conversions are tracked automatically.</p>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-5">
        <StatCard label="Total Clicks" value={referralStats.totalClicks.toLocaleString()} icon={MousePointerClick} color="bg-blue-50 text-blue-600" />
        <StatCard label="Total Conversions" value={referralStats.totalConversions} icon={TrendingUp} color="bg-emerald-50 text-emerald-600" />
        <StatCard label="Conversion Rate" value={`${referralStats.conversionRate}%`} icon={Percent} color="bg-amber-50 text-amber-600" />
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-slate-700 mb-6">Clicks Over Time</h3>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={referralStats.monthlyClicks} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e2e8f0',
                  borderRadius: '0.75rem',
                  fontSize: '13px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                }}
              />
              <Bar dataKey="clicks" fill="#398D42" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>        <p className="text-xs text-slate-300 mt-3 italic">Data source TBD in production — referral tracking mechanism under discussion.</p>
      </div>
    </div>
  );
}

function StatCard({ label, value, icon: Icon, color }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</span>
        <div className={`w-8 h-8 rounded-lg ${color} flex items-center justify-center`}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <p className="text-3xl font-bold text-slate-900">{value}</p>
    </div>
  );
}