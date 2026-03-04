import { useState } from 'react';
import { Transaction } from '../utils/types';

const categories = [
  'H Meal',
  'UH Meal',
  'H Snack',
  'UH Snack',
  'Clothes',
  'Recharge',
  'Snr Party',
  'Travel',
  'Laundry',
  'Haircut',
  'Outing',
  'Travelling (food)',
  'Miscellaneous',
  'Charity',
  'Grocery',
  'Vivek',
  'Papa'
];

const CUSTOM_CATEGORY_VALUE = '__custom__';

interface Props {
  initial?: Partial<Transaction>;
  onSubmit: (payload: Omit<Transaction, '_id'>) => Promise<void>;
  onCancel?: () => void;
}

export default function TransactionForm({ initial, onSubmit, onCancel }: Props) {
  const initialCategory = initial?.category || categories[0];
  const initialIsCustom = !categories.includes(initialCategory);

  const [form, setForm] = useState({
    amount: initial?.amount || 0,
    category: initialIsCustom ? CUSTOM_CATEGORY_VALUE : initialCategory,
    type: initial?.type || 'expense',
    date: initial?.date ? initial.date.slice(0, 10) : new Date().toISOString().slice(0, 10),
    description: initial?.description || ''
  });
  const [customCategory, setCustomCategory] = useState(initialIsCustom ? initialCategory : '');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (form.amount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    const finalCategory = form.category === CUSTOM_CATEGORY_VALUE ? customCategory.trim() : form.category;

    if (!finalCategory) {
      setError('Please select a category or create a new one');
      return;
    }

    setError('');
    await onSubmit({ ...form, category: finalCategory, amount: Number(form.amount), date: form.date });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 space-y-3">
      <h3 className="font-semibold">{initial ? 'Edit' : 'Add'} Transaction</h3>
      {error && <p className="text-rose-500 text-sm">{error}</p>}
      <input className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800" type="number" min="0" step="0.01" placeholder="Amount" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} required />
      <select className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
        {categories.map((cat) => <option key={cat}>{cat}</option>)}
        <option value={CUSTOM_CATEGORY_VALUE}>+ Create new category</option>
      </select>
      {form.category === CUSTOM_CATEGORY_VALUE && (
        <input
          className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800"
          type="text"
          placeholder="Enter new category"
          value={customCategory}
          onChange={(e) => setCustomCategory(e.target.value)}
          required
        />
      )}
      <select className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as 'income' | 'expense' })}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <input className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} required />
      <textarea className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <div className="flex gap-2">
        <button type="submit" className="bg-indigo-500 text-white px-3 py-2 rounded">Save</button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="bg-slate-200 dark:bg-slate-700 px-3 py-2 rounded">Cancel</button>
        )}
      </div>
    </form>
  );
}
