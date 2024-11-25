import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../components/common/sidebar'; // Corrected path to sidebar
import '../styles/globals.css';

// Pages that don't require authentication
const publicPages = ['/login'];

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const isPublicPage = publicPages.includes(router.pathname);

      if (!isLoggedIn && !isPublicPage) {
        router.push('/login');
      }

      if (isLoggedIn && router.pathname === '/login') {
        router.push('/');
      }
    }
  }, [router.pathname]);

  const isPublicPage = publicPages.includes(router.pathname);

  return isPublicPage ? (
    <Component {...pageProps} />
  ) : (
    <div className="flex w-full h-screen">
      <Sidebar />
      <main className="w-full bg-gray-100 min-h-screen p-4 overflow-auto">
        <Component {...pageProps} />
      </main>
    </div>
  );
}

export default MyApp;
