import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuthenticationSimple } from '../hooks/useAuthenticationSimple';
import { useAuthValue } from '../contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearPasswordFromMemory } from '../utils/passwordSecurity';

import Logo from '/logo.png';

export default function Login() {
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordRef = useRef<string>('');
  
  // Hooks
  const { login, error: authError, isLoading, clearError } = useAuthenticationSimple();
  const { user } = useAuthValue();
  const navigate = useNavigate();

  // Handle form submission with remember me functionality
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || isLoading) return;
    
    setIsSubmitting(true);
    clearError();

    try {
      const credentials = { email, password };
      const user = await login(credentials, { rememberMe });
      
      if (user) {
        // Clear password from memory
        clearPasswordFromMemory(passwordRef);
        // Login successful - navigation will be handled by useEffect
      }
    } catch (error) {
      console.error('Login submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [email, password, rememberMe, login, isSubmitting, isLoading, clearError]);

  // Handle navigation after successful authentication
  useEffect(() => {
    if (user && !isLoading && !isSubmitting) {
      navigate('/submissions', { replace: true });
    }
  }, [user, navigate, isLoading, isSubmitting]);

  // Clear form errors when user starts typing
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (authError) clearError();
  }, [authError, clearError]);

  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    passwordRef.current = newPassword;
    if (authError) clearError();
  }, [authError, clearError]);

  const handleRememberMeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  }, []);

  // Prevent form submission if already submitting
  const isFormDisabled = isSubmitting || isLoading;

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6">
          <header className="text-center">
            <NavLink
              to="/"
              className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              Welcome Back
              <img className="w-16 h-16 mr-2" src={Logo} alt="logo" />
            </NavLink>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to continue
            </h1>
          </header>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                onChange={handleEmailChange}
                value={email}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={handlePasswordChange}
                value={password}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="text-gray-500 dark:text-gray-300"
                  >
                    Remember me
                  </label>
                </div>
              </div>
              <NavLink
                to="/forgot-password"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Forgot password?
              </NavLink>
            </div>
            <button
              type="submit"
              className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-opacity ${
                isFormDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
              }`}
              disabled={isFormDisabled}
            >
              {isFormDisabled ? 'Entrando...' : 'Entrar'}
            </button>
            {authError && (
              <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg dark:bg-red-800/20 dark:text-red-400 dark:border-red-800" role="alert">
                {authError}
              </div>
            )}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Don’t have an account yet?{' '}
              <NavLink
                to="/register"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Sign up
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
