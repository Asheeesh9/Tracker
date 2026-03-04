import { formatINR } from '../utils/currency';

interface SummaryCardsProps {
  income: number;
  expense: number;
}

export default function SummaryCards({ income, expense }: SummaryCardsProps) {
  const balance = income - expense;

  const cards = [
    { label: 'Total Balance', value: balance, color: 'text-indigo-500' },
    { label: 'Total Income', value: income, color: 'text-emerald-500' },
    { label: 'Total Expenses', value: expense, color: 'text-rose-500' }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div key={card.label} className="bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-500">{card.label}</p>
          <p className={`text-2xl font-bold ${card.color}`}>{formatINR(card.value)}</p>
        </div>
      ))}
    </div>
  );
}
