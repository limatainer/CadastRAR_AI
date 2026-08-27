import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuthenticationSimple } from '@/hooks/useAuthenticationSimple';
import { useAuthValue } from '@/contexts/useAuthValue';
import { NavLink, useNavigate } from 'react-router-dom';
import { clearPasswordFromMemory } from '@/utils/passwordSecurity';

import Logo from '/logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const passwordRef = useRef<string>('');

  const { login, error: authError, isLoading, clearError } = useAuthenticationSimple();
  const { user } = useAuthValue();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isSubmitting || isLoading) return;

      setIsSubmitting(true);
      clearError();

      try {
        const credentials = { email, password };
        const user = await login(credentials, { rememberMe });

        if (user) {
          clearPasswordFromMemory(passwordRef);
        }
      } catch (error) {
        console.error('Login submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, password, rememberMe, login, isSubmitting, isLoading, clearError]
  );

  useEffect(() => {
    if (user && !isLoading && !isSubmitting) {
      navigate('/submissions', { replace: true });
    }
  }, [user, navigate, isLoading, isSubmitting]);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      if (authError) clearError();
    },
    [authError, clearError]
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newPassword = e.target.value;
      setPassword(newPassword);
      passwordRef.current = newPassword;
      if (authError) clearError();
    },
    [authError, clearError]
  );

  const handleRememberMeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
  }, []);

  const isFormDisabled = isSubmitting || isLoading;

  return (
    <section className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-6 py-8">
      <div className="max-w-md w-full bg-[var(--surface)] rounded-[var(--radius)] shadow border border-[var(--border)]">
        <div className="p-6 space-y-6">
          <header className="text-center">
            <NavLink
              to="/"
              className="flex items-center justify-center mb-6 text-2xl font-semibold text-[var(--fg)]"
            >
              <img className="w-16 h-16 mr-2" src={Logo} alt="CadastRAR" />
              CadastRAR
            </NavLink>
            <h1 className="text-xl font-bold leading-tight tracking-tight text-[var(--fg)] md:text-2xl">
              Sign in to continue
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
                className="w-full bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--fg)] sm:text-sm rounded-[var(--radius)] focus:ring-[var(--accent)] focus:border-[var(--accent)] block p-2.5"
                placeholder="name@mail.com"
                onChange={handleEmailChange}
                value={email}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-[var(--fg)]">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                placeholder="strong password"
                className="w-full bg-[var(--surface-alt)] border border-[var(--border)] text-[var(--fg)] sm:text-sm rounded-[var(--radius)] focus:ring-[var(--accent)] focus:border-[var(--accent)] block p-2.5"
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
                    className="w-4 h-4 border border-[var(--border)] rounded bg-[var(--surface-alt)] focus:ring-[var(--accent)]"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-[var(--fg-muted)]">
                    Remember me
                  </label>
                </div>
              </div>
              <NavLink
                to="/forgot-password"
                className="text-sm font-medium text-[var(--accent)] hover:underline"
              >
                Forgot password?
              </NavLink>
            </div>
            <button
              type="submit"
              className={`btn w-full py-2.5 text-sm font-medium ${
                isFormDisabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isFormDisabled}
            >
              {isFormDisabled ? 'Signing in...' : 'Sign in'}
            </button>
            {authError && (
              <div
                className="p-3 text-sm text-[var(--accent-fg)] bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-[var(--radius)]"
                role="alert"
              >
                {authError}
              </div>
            )}
            <p className="text-sm font-light text-[var(--fg-muted)]">
              Don &apos;t have an account yet?{' '}
              <NavLink to="/register" className="font-medium text-[var(--accent)] hover:underline">
                Sign up
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
