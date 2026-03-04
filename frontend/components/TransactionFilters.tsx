interface Props {
  filters: {
    search: string;
    category: string;
    startDate: string;
    endDate: string;
    sortBy: string;
    sortOrder: string;
  };
  onChange: (key: string, value: string) => void;
}

export default function TransactionFilters({ filters, onChange }: Props) {
  return (
    <div className="grid md:grid-cols-6 gap-2 bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
      <input className="p-2 rounded bg-slate-100 dark:bg-slate-800" placeholder="Search" value={filters.search} onChange={(e) => onChange('search', e.target.value)} />
      <input className="p-2 rounded bg-slate-100 dark:bg-slate-800" placeholder="Category" value={filters.category} onChange={(e) => onChange('category', e.target.value)} />
      <input className="p-2 rounded bg-slate-100 dark:bg-slate-800" type="date" value={filters.startDate} onChange={(e) => onChange('startDate', e.target.value)} />
      <input className="p-2 rounded bg-slate-100 dark:bg-slate-800" type="date" value={filters.endDate} onChange={(e) => onChange('endDate', e.target.value)} />
      <select className="p-2 rounded bg-slate-100 dark:bg-slate-800" value={filters.sortBy} onChange={(e) => onChange('sortBy', e.target.value)}>
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>
      <select className="p-2 rounded bg-slate-100 dark:bg-slate-800" value={filters.sortOrder} onChange={(e) => onChange('sortOrder', e.target.value)}>
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </div>
  );
}
