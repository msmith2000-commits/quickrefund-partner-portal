import logoImg from '../assets/quickrefund-logo.png';

export default function Logo({ size = 'default', variant = 'color' }) {
  const height = size === 'large' ? 'h-12' : 'h-9';

  return (
    <div className="flex flex-col items-start gap-1">
      <img
        src={logoImg}
        alt="QuickRefund"
        className={`${height} w-auto object-contain`}
      />
      <span className={`${size === 'large' ? 'text-sm' : 'text-xs'} font-semibold text-slate-400 tracking-wide uppercase`}>
        Partner Portal
      </span>
    </div>
  );
}