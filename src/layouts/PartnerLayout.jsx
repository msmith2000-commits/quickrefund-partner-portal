import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, FileText, FolderOpen, DollarSign,
  Link2, Building2, Megaphone, Settings, LogOut, Shield,
} from 'lucide-react';
import Logo from '../components/Logo';
import NotificationBell from '../components/NotificationBell';
import { currentPartner } from '../data/partners';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/documents', label: 'Documents', icon: FileText },
  { to: '/my-documents', label: 'My Documents', icon: FolderOpen },
  { to: '/payouts', label: 'Payout Statements', icon: DollarSign },
  { to: '/referral-stats', label: 'Referral Stats', icon: Link2 },
  { to: '/merchants', label: 'My Merchants', icon: Building2 },
  { to: '/announcements', label: 'Announcements', icon: Megaphone },
];

export default function PartnerLayout() {
  const location = useLocation();
  return (
    <div className="flex h-screen bg-slate-50">
      <aside className="w-[260px] bg-white border-r border-slate-200 flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-slate-100"><Logo /></div>
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <NavLink key={item.to} to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive ? 'bg-qr-green/10 text-qr-green border-l-3 border-qr-green'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'}`}>
              <item.icon className="w-[18px] h-[18px] flex-shrink-0" />
              {item.label}
            </NavLink>
          ))}
          <div className="pt-4 mt-4 border-t border-slate-100">
            <NavLink to="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition-all">
              <Shield className="w-[18px] h-[18px]" /> Admin Panel
            </NavLink>
          </div>
        </nav>
        <div className="px-3 py-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-qr-green/10 text-qr-green flex items-center justify-center text-sm font-semibold">
              {currentPartner.contact.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-800 truncate">{currentPartner.contact}</p>
              <p className="text-xs text-slate-400 truncate">{currentPartner.company}</p>
            </div>
          </div>
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 flex-shrink-0">
          <div><h1 className="text-lg font-semibold text-slate-800">{navItems.find(n => n.to === location.pathname)?.label || 'Partner Portal'}</h1></div>
          <div className="flex items-center gap-4">
            <NotificationBell />
            <div className="w-px h-6 bg-slate-200" />
            <button className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"><LogOut className="w-4 h-4" /> Sign Out</button>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-8"><Outlet /></main>
      </div>
    </div>
  );
}
