import { Transaction } from '../utils/types';

interface Props {
  transactions: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => Promise<void>;
}

export default function TransactionTable({ transactions, onEdit, onDelete }: Props) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 overflow-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left border-b border-slate-200 dark:border-slate-800">
            <th className="p-2">Date</th>
            <th className="p-2">Type</th>
            <th className="p-2">Category</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Description</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx) => (
            <tr key={tx._id} className="border-b border-slate-100 dark:border-slate-800">
              <td className="p-2">{new Date(tx.date).toLocaleDateString()}</td>
              <td className="p-2 capitalize">{tx.type}</td>
              <td className="p-2">{tx.category}</td>
              <td className={`p-2 font-semibold ${tx.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>${tx.amount.toFixed(2)}</td>
              <td className="p-2">{tx.description}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => onEdit(tx)} className="text-indigo-500">Edit</button>
                <button onClick={() => onDelete(tx._id)} className="text-rose-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
