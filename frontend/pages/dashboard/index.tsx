import { useEffect, useMemo, useState } from 'react';
import Layout from '../../components/Layout';
import SummaryCards from '../../components/SummaryCards';
import Charts from '../../components/Charts';
import { useProtectedRoute } from '../../hooks/useProtectedRoute';
import api from '../../utils/api';
import { Transaction } from '../../utils/types';
import { formatINR } from '../../utils/currency';

interface AnalyticsResponse {
  summary: { _id: string; total: number }[];
  monthly: { _id: { year: number; month: number }; income: number; expense: number }[];
  category: { _id: string; total: number }[];
  categoryTotals: { _id: string; income: number; expense: number; total: number }[];
  categoryMonthlyTrend: { _id: { year: number; month: number }; amount: number }[];
  availableCategories: string[];
  selectedCategory: string;
}

const initialFilters = {
  range: 'all',
  startDate: '',
  endDate: '',
  category: ''
};

export default function DashboardPage() {
  const { loading, user } = useProtectedRoute();
  const [recent, setRecent] = useState<Transaction[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsResponse | null>(null);
  const [filters, setFilters] = useState(initialFilters);

  const analyticsQuery = useMemo(() => {
    const params = new URLSearchParams({
      ...Object.fromEntries(Object.entries(filters).filter(([, value]) => value))
    });
    return params.toString();
  }, [filters]);

  useEffect(() => {
    const load = async () => {
      const [txRes, analyticsRes] = await Promise.all([
        api.get('/transactions?limit=5'),
        api.get(`/transactions/analytics?${analyticsQuery}`)
      ]);
      setRecent(txRes.data.transactions);
      setAnalytics(analyticsRes.data);
    };

    if (user) load();
  }, [user, analyticsQuery]);

  if (loading || !user || !analytics) return <div className="min-h-screen grid place-items-center">Loading...</div>;

  const income = analytics.summary.find((item) => item._id === 'income')?.total || 0;
  const expense = analytics.summary.find((item) => item._id === 'expense')?.total || 0;

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 mb-4">
        <h3 className="font-semibold mb-3">Analytics Filters</h3>
        <div className="grid md:grid-cols-4 gap-2">
          <select
            className="p-2 rounded bg-slate-100 dark:bg-slate-800"
            value={filters.range}
            onChange={(e) => setFilters((prev) => ({ ...prev, range: e.target.value }))}
          >
            <option value="all">All Time</option>
            <option value="1m">Last 1 Month</option>
            <option value="2m">Last 2 Months</option>
            <option value="1y">Last 1 Year</option>
          </select>
          <input
            className="p-2 rounded bg-slate-100 dark:bg-slate-800"
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters((prev) => ({ ...prev, startDate: e.target.value }))}
          />
          <input
            className="p-2 rounded bg-slate-100 dark:bg-slate-800"
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters((prev) => ({ ...prev, endDate: e.target.value }))}
          />
          <select
            className="p-2 rounded bg-slate-100 dark:bg-slate-800"
            value={filters.category}
            onChange={(e) => setFilters((prev) => ({ ...prev, category: e.target.value }))}
          >
            <option value="">All Categories (Trend)</option>
            {analytics.availableCategories.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <SummaryCards income={income} expense={expense} />
      <Charts
        monthly={analytics.monthly}
        category={analytics.category}
        categoryTotals={analytics.categoryTotals}
        categoryMonthlyTrend={analytics.categoryMonthlyTrend}
        selectedCategory={analytics.selectedCategory}
      />

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
                {tx.type === 'income' ? '+' : '-'}{formatINR(tx.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
