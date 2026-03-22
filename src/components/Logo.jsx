export default function Logo({ size = 'default' }) {
  const textSize = size === 'large' ? 'text-2xl' : 'text-xl';
  const subtextSize = size === 'large' ? 'text-base' : 'text-sm';

  return (
    <div className="flex items-center gap-2.5">
      <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-qr-green">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`${textSize} font-bold text-qr-navy leading-tight tracking-tight`}>
          Quick<span className="text-qr-green">Refund</span>
        </span>
        <span className={`${subtextSize} font-medium text-slate-400 leading-tight -mt-0.5`}>
          Partner Portal
        </span>
      </div>
    </div>
  );
}
