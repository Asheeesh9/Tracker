import Sidebar from './Sidebar';
import { useTheme } from '../hooks/useTheme';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen md:flex">
      <Sidebar />
      <main className="flex-1 p-4 md:p-8">
        <div className="flex justify-end mb-4">
          <button
            onClick={toggleTheme}
            className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-800 transition"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
        {children}
      </main>
    </div>
  );
}
