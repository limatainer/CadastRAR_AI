import { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { sendPasswordResetEmail, AuthError } from 'firebase/auth';
import { auth } from '../firebase/config';
import Logo from '/logo.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setError('');

    try {
      await sendPasswordResetEmail(auth, email);
      setIsSubmitted(true);
    } catch (err) {
      const error = err as AuthError;
      let errorMessage = 'An error occurred, please try again later.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many attempts. Please try again later.';
      }

      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [email, isSubmitting]);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (error) setError('');
  }, [error]);

  if (isSubmitted) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-6">
            <header className="text-center">
              <NavLink
                to="/"
                className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
              >
                Password Reset
                <img className="w-16 h-16 mr-2" src={Logo} alt="logo" />
              </NavLink>
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Check your email
              </h1>
            </header>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                We sent a password reset link to <strong>{email}</strong>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Check your email and click the link to reset your password. If you don't see the email, check your spam folder.
              </p>
            </div>
            <div className="text-center">
              <NavLink
                to="/login"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Back to login
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-6">
          <header className="text-center">
            <NavLink
              to="/"
              className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
              Reset Password
              <img className="w-16 h-16 mr-2" src={Logo} alt="logo" />
            </NavLink>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password?
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Enter your email and we'll send you a link to reset your password.
            </p>
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
            <button
              type="submit"
              className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-opacity ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
              }`}
              disabled={isSubmitting}
            >
{isSubmitting ? 'Sending...' : 'Send reset link'}
            </button>
            {error && (
              <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg dark:bg-red-800/20 dark:text-red-400 dark:border-red-800" role="alert">
                {error}
              </div>
            )}
            <div className="text-center">
              <NavLink
                to="/login"
                className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Back to login
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}