export default function StatusBadge({ status }) {
  const styles = {
    Active: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    Inactive: 'bg-slate-50 text-slate-500 border border-slate-200',
    Pending: 'bg-amber-50 text-amber-700 border border-amber-200',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.Inactive}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === 'Active' ? 'bg-emerald-500' :
        status === 'Pending' ? 'bg-amber-500' : 'bg-slate-400'
      }`} />
      {status}
    </span>
  );
}
