import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/transactions', label: 'Transactions' }
];

export default function Sidebar() {
  const router = useRouter();
  const { logout, user } = useAuth();

  return (
    <aside className="w-full md:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4">
      <h2 className="text-xl font-bold mb-6">Expense Tracker</h2>
      <div className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-3 py-2 rounded-lg transition ${
              router.pathname.startsWith(link.href)
                ? 'bg-indigo-500 text-white'
                : 'hover:bg-slate-200 dark:hover:bg-slate-800'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <div className="mt-8 text-sm text-slate-500">Signed in as {user?.name}</div>
      <button
        onClick={() => {
          logout();
          router.push('/auth/login');
        }}
        className="mt-4 w-full bg-slate-800 dark:bg-slate-700 text-white py-2 rounded-lg"
      >
        Logout
      </button>
    </aside>
  );
}
