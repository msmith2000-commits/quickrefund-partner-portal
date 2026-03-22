import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';

export default function Login() {
  const [email, setEmail] = useState('michael@evergreenpay.com');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-qr-navy relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -left-20 w-96 h-96 rounded-full bg-qr-green blur-3xl" />
          <div className="absolute bottom-20 right-10 w-72 h-72 rounded-full bg-qr-green blur-3xl" />
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-qr-green">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Quick<span className="text-qr-green">Refund</span></span>
          </div>
          <h1 className="text-4xl font-extrabold text-white leading-tight mb-4" style={{ fontFamily: "'Lato', sans-serif" }}>Your Partner<br />Command Center</h1>
          <p className="text-lg text-slate-300 max-w-md leading-relaxed">Access documents, track referrals, view payouts, and manage your merchants — all in one place.</p>
        </div>
        <div className="relative z-10">
          <p className="text-sm text-slate-400 font-medium tracking-wide uppercase" style={{ letterSpacing: '0.15em', fontFamily: "'Lato', sans-serif" }}>Click. Refund. Done.</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-10"><Logo size="large" /></div>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome back</h2>
            <p className="text-slate-500">Sign in to your partner account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-qr-green/30 focus:border-qr-green transition-all" placeholder="you@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-lg border border-slate-200 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-qr-green/30 focus:border-qr-green transition-all" placeholder="Enter your password" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-qr-green focus:ring-qr-green" />
                <span className="text-sm text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-qr-green font-medium hover:text-qr-green-dark transition-colors">Forgot password?</button>
            </div>
            <button type="submit" className="w-full py-3 px-4 bg-qr-green text-white font-semibold rounded-lg hover:bg-qr-green-dark hover:-translate-y-0.5 active:translate-y-0 transition-all shadow-md shadow-qr-green/20">Sign In</button>
          </form>
          <p className="mt-8 text-center text-sm text-slate-400">Don't have an account? Contact your QuickRefund representative.</p>
          <div className="mt-12 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-300">Prototype — No real authentication. Clicking "Sign In" navigates to the demo dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
