import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    try {
      await signup(name, email, password);
      router.push('/dashboard');
    } catch {
      setError('Failed to create account');
    }
  };

  return (
    <div className="min-h-screen grid place-items-center p-4">
      <form className="w-full max-w-sm p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3" onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold">Create account</h1>
        {error && <p className="text-rose-500 text-sm">{error}</p>}
        <input className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full p-2 rounded bg-slate-100 dark:bg-slate-800" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full bg-indigo-500 text-white p-2 rounded">Sign up</button>
        <p className="text-sm">Already have an account? <Link className="text-indigo-500" href="/auth/login">Login</Link></p>
      </form>
    </div>
  );
}
