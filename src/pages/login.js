import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'; // Import toastify
import 'react-toastify/dist/ReactToastify.css'; // Import styles for toastify

// Set base URL for axios (using environment variable)
axios.defaults.baseURL = "https://apis-admin-dm.vercel.app/";

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Make login request to backend
      const response = await axios.post('/api/Auth/login', { username, password });

      if (response.status === 200) {
        // On success, store login status and navigate to dashboard
        localStorage.setItem('isLoggedIn', 'true');
        toast.success('Login successful!'); // Show success toast
        router.push('/dashboard');
      } else {
        setError(response.data.message || 'Login failed');
        toast.error('Login failed!'); // Show error toast
      }
    } catch (err) {
      // Handle errors from server or network
      if (err.response) {
        const status = err.response.status;
        if (status === 401) {
          setError('Invalid credentials');
          toast.error('Invalid credentials'); // Show error toast
        } else if (status === 500) {
          setError('Server error. Please try again later.');
          toast.error('Server error. Please try again later.');
        } else {
          setError('An unexpected error occurred.');
          toast.error('An unexpected error occurred.');
        }
      } else {
        setError('Unable to connect. Please check your internet connection.');
        toast.error('Unable to connect. Please check your internet connection.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/honey-img.jpg')" }} // Apply background image
    >
      <div className="max-w-md w-full mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              aria-label="Username"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="Password"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm transition duration-300 ease-in-out">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 disabled:opacity-50 flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader border-t-transparent border-4 border-white w-4 h-4 rounded-full animate-spin"></div>
            ) : (
              'Login'
            )}
          </button>
        </form>
      </div>

      {/* Toast container */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop />
    </div>
  );
}
