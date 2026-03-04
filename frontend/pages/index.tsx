import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      router.replace(user ? '/dashboard' : '/auth/login');
    }
  }, [loading, user, router]);

  return <div className="min-h-screen grid place-items-center">Loading...</div>;
}
