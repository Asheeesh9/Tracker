import { useEffect, useState } from 'react';
import Layout from '../../components/Layout';
import SummaryCards from '../../components/SummaryCards';
import Charts from '../../components/Charts';
import { useProtectedRoute } from '../../hooks/useProtectedRoute';
import api from '../../utils/api';
import { Transaction } from '../../utils/types';

interface AnalyticsResponse {
  summary: { _id: string; total: number }[];
  monthly: { _id: { year: number; month: number }; income: number; expense: number }[];
  category: { _id: string; total: number }[];
}

export default function DashboardPage() {
  const { loading, user } = useProtectedRoute();
  const [recent, setRecent] = useState<Transaction[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);

  useEffect(() => {
    const load = async () => {
      const [txRes, analyticsRes] = await Promise.all([
        api.get('/transactions?limit=5'),
        api.get('/transactions/analytics')
      ]);
      setRecent(txRes.data.transactions);
      setAnalytics(analyticsRes.data);
    };

    if (user) load();
  }, [user]);

  if (loading || !user || !analytics) return <div className="min-h-screen grid place-items-center">Loading...</div>;

  const income = analytics.summary.find((item) => item._id === 'income')?.total || 0;
  const expense = analytics.summary.find((item) => item._id === 'expense')?.total || 0;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <SummaryCards income={income} expense={expense} />
      <Charts monthly={analytics.monthly} category={analytics.category} />

      <div className="mt-6 bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800">
        <h3 className="font-semibold mb-3">Recent Transactions</h3>
        <div className="space-y-2">
          {recent.map((tx) => (
            <div key={tx._id} className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-2">
              <div>
                <p className="font-medium">{tx.category}</p>
                <p className="text-xs text-slate-500">{new Date(tx.date).toLocaleDateString()} • {tx.description || 'No notes'}</p>
              </div>
              <p className={tx.type === 'income' ? 'text-emerald-500 font-semibold' : 'text-rose-500 font-semibold'}>
                {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
