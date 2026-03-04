import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/dashboard');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form className="w-full max-w-sm p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold">Login</h1>
        {error && <p className="text-rose-500 text-sm">{error}</p>}
        <input className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-indigo-500 text-white p-2 rounded">Login</button>
        <p className="text-sm">No account? <Link className="text-indigo-500" href="/auth/signup">Sign up</Link></p>
      </form>
    </div>
  );
}
