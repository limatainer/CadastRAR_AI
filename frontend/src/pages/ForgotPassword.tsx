import { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { sendPasswordResetEmail, AuthError } from 'firebase/auth';
import { auth } from '@/firebase/config';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import Logo from '/logo.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
    },
    [email, isSubmitting]
  );

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (error) setError('');
    },
    [error]
  );

  if (isSubmitted) {
    return (
      <section className="page-center">
        <div className="max-w-md w-full surface-card">
          <div className="p-6 space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[var(--accent)]/20 flex items-center justify-center mx-auto">
              <EnvelopeIcon className="w-8 h-8 text-[var(--accent)]" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-[var(--fg)]">Check your email</h1>
            <p className="text-[var(--fg-muted)]">
              A password reset link has been sent to your email.
            </p>
            <NavLink to="/login" className="btn w-full mt-4">
              Back to login
            </NavLink>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-center">
      <div className="max-w-md w-full surface-card">
        <div className="p-6 space-y-6">
          <header className="text-center">
            <NavLink
              to="/"
              className="flex items-center justify-center mb-6 font-display text-2xl font-semibold text-[var(--fg)]"
            >
              <img className="w-16 h-16 mr-2" src={Logo} alt="CadastRAR" />
              CadastRAR
            </NavLink>
            <h1 className="font-display text-2xl font-semibold leading-tight tracking-display text-[var(--fg)] md:text-2xl">
              Reset your password
            </h1>
          </header>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-[var(--fg)]">
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                className="input"
                placeholder="name@company.com"
                onChange={handleEmailChange}
                value={email}
                required
              />
            </div>

            <button
              type="submit"
              className={`btn w-full py-2.5 text-sm font-medium ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send reset link'}
            </button>

            {error && (
              <div
                className="rounded-[var(--radius)] border border-[var(--danger)] bg-[var(--danger-subtle)] p-3 text-sm text-[var(--danger)]"
                role="alert"
              >
                {error}
              </div>
            )}

            <p className="text-sm font-light text-[var(--fg-muted)] text-center">
              <NavLink to="/login" className="font-medium text-[var(--accent)] hover:underline">
                Back to login
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
