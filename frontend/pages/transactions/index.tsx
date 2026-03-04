import { useEffect, useMemo, useState } from 'react';
import Layout from '../../components/Layout';
import TransactionForm from '../../components/TransactionForm';
import TransactionTable from '../../components/TransactionTable';
import TransactionFilters from '../../components/TransactionFilters';
import { useProtectedRoute } from '../../hooks/useProtectedRoute';
import api from '../../utils/api';
import { Pagination, Transaction } from '../../utils/types';

const defaultFilters = {
  search: '',
  category: '',
  startDate: '',
  endDate: '',
  sortBy: 'date',
  sortOrder: 'desc'
};

export default function TransactionsPage() {
  const { user, loading } = useProtectedRoute();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [filters, setFilters] = useState(defaultFilters);
  const [pagination, setPagination] = useState<Pagination>({ total: 0, page: 1, limit: 10, totalPages: 1 });

  const query = useMemo(() => {
    const params = new URLSearchParams({
      ...Object.fromEntries(Object.entries(filters).filter(([, value]) => value)),
      page: String(pagination.page),
      limit: String(pagination.limit)
    });
    return params.toString();
  }, [filters, pagination.page, pagination.limit]);

  const loadTransactions = async () => {
    const { data } = await api.get(`/transactions?${query}`);
    setTransactions(data.transactions);
    setPagination(data.pagination);
  };

  useEffect(() => {
    if (user) loadTransactions();
  }, [user, query]);

  const handleSubmit = async (payload: Omit<Transaction, '_id'>) => {
    if (editing) {
      await api.put(`/transactions/${editing._id}`, payload);
      setEditing(null);
    } else {
      await api.post('/transactions', payload);
    }
    loadTransactions();
  };

  const handleDelete = async (id: string) => {
    await api.delete(`/transactions/${id}`);
    loadTransactions();
  };

  const exportCSV = () => {
    const headers = ['Amount', 'Category', 'Type', 'Date', 'Description'];
    const rows = transactions.map((tx) => [tx.amount, tx.category, tx.type, tx.date, tx.description]);
    const csvContent = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transactions.csv';
    link.click();
  };

  if (loading || !user) return <div className="min-h-screen grid place-items-center">Loading...</div>;

  return (
    <Layout>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <button onClick={exportCSV} className="bg-emerald-500 text-white px-3 py-2 rounded">Export CSV</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 mb-4">
        <div className="lg:col-span-1">
          <TransactionForm initial={editing || undefined} onSubmit={handleSubmit} onCancel={() => setEditing(null)} />
        </div>
        <div className="lg:col-span-2 space-y-4">
          <TransactionFilters
            filters={filters}
            onChange={(key, value) => {
              setPagination((prev) => ({ ...prev, page: 1 }));
              setFilters((prev) => ({ ...prev, [key]: value }));
            }}
          />
          <TransactionTable transactions={transactions} onEdit={setEditing} onDelete={handleDelete} />
          <div className="flex justify-between items-center text-sm">
            <p>Page {pagination.page} of {pagination.totalPages}</p>
            <div className="space-x-2">
              <button
                disabled={pagination.page <= 1}
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page - 1 }))}
                className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-800 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                disabled={pagination.page >= pagination.totalPages}
                onClick={() => setPagination((prev) => ({ ...prev, page: prev.page + 1 }))}
                className="px-3 py-1 rounded bg-slate-200 dark:bg-slate-800 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
