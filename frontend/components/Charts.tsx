import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';
import { formatINR } from '../utils/currency';

interface ChartsProps {
  monthly: { _id: { year: number; month: number }; income: number; expense: number }[];
  category: { _id: string; total: number }[];
  categoryTotals: { _id: string; income: number; expense: number }[];
  categoryMonthlyTrend: { _id: { year: number; month: number }; amount: number }[];
  selectedCategory: string;
}

const colors = ['#6366f1', '#f43f5e', '#10b981', '#f59e0b', '#06b6d4', '#8b5cf6'];

export default function Charts({ monthly, category, categoryTotals, categoryMonthlyTrend, selectedCategory }: ChartsProps) {
  const monthlyData = monthly.map((item) => ({
    name: `${item._id.month}/${item._id.year}`,
    income: item.income,
    expense: item.expense
  }));

  const categoryBreakdownData = categoryTotals.map((item) => ({
    name: item._id,
    income: item.income,
    expense: item.expense
  }));

  const trendData = categoryMonthlyTrend.map((item) => ({
    name: `${item._id.month}/${item._id.year}`,
    amount: item.amount
  }));

  return (
    <div className="grid lg:grid-cols-2 gap-4 mt-6">
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 h-80">
        <h3 className="font-semibold mb-2">Income vs Expense (Monthly)</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `₹${value}`} />
            <Tooltip formatter={(value: number) => formatINR(value)} />
            <Legend />
            <Bar dataKey="income" fill="#10b981" />
            <Bar dataKey="expense" fill="#f43f5e" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 h-80">
        <h3 className="font-semibold mb-2">Expense by Category</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie data={category} dataKey="total" nameKey="_id" outerRadius={100} label>
              {category.map((entry, index) => (
                <Cell key={entry._id} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatINR(value)} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 h-80">
        <h3 className="font-semibold mb-2">Category-wise Income vs Expense</h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart data={categoryBreakdownData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `₹${value}`} />
            <Tooltip formatter={(value: number) => formatINR(value)} />
            <Legend />
            <Bar dataKey="income" fill="#10b981" />
            <Bar dataKey="expense" fill="#f43f5e" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 h-80">
        <h3 className="font-semibold mb-2">
          {selectedCategory ? `${selectedCategory} Trend by Month` : 'Overall Trend by Month'}
        </h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={trendData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis tickFormatter={(value) => `₹${value}`} />
            <Tooltip formatter={(value: number) => formatINR(value)} />
            <Line type="monotone" dataKey="amount" stroke="#6366f1" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
