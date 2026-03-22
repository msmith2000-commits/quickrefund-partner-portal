import { useState, useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

export default function Toast({ message, show, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-slide-up">
      <div className="flex items-center gap-3 bg-white border border-slate-200 shadow-lg rounded-xl px-4 py-3">
        <CheckCircle className="w-5 h-5 text-qr-green flex-shrink-0" />
        <span className="text-sm font-medium text-slate-700">{message}</span>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600 ml-2">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
