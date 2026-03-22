import { useState, useRef, useEffect } from 'react';
import { Bell, FileText, Megaphone, DollarSign } from 'lucide-react';
import { notifications as initialNotifications } from '../data/notifications';

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications] = useState(initialNotifications);
  const ref = useRef(null);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'payout': return <DollarSign className="w-4 h-4 text-qr-green" />;
      case 'announcement': return <Megaphone className="w-4 h-4 text-blue-500" />;
      case 'document': return <FileText className="w-4 h-4 text-amber-500" />;
      default: return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors"
      >
        <Bell className="w-5 h-5 text-slate-500" />
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-96 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
            <span className="text-xs text-slate-400">{unreadCount} unread</span>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.map(n => (
              <div
                key={n.id}
                className={`px-4 py-3 border-b border-slate-50 flex items-start gap-3 hover:bg-slate-50 transition-colors ${!n.read ? 'bg-qr-green-lightest' : ''}`}
              >
                <div className="mt-0.5 flex-shrink-0">{getIcon(n.type)}</div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm leading-snug ${!n.read ? 'text-slate-800 font-medium' : 'text-slate-600'}`}>{n.text}</p>
                  <p className="text-xs text-slate-400 mt-1">{n.time}</p>
                </div>
                {!n.read && <span className="w-2 h-2 rounded-full bg-qr-green mt-2 flex-shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
