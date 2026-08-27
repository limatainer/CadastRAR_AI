import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuthenticationSimple } from '@/hooks/useAuthenticationSimple';
import { useAuthValue } from '@/contexts/useAuthValue';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '/logo.png';
import PasswordStrengthMeter from '@/components/PasswordStrengthMeter';
import { validatePasswordSecurity, clearPasswordFromMemory } from '@/utils/passwordSecurity';

export default function Signup() {
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  const [securityErrors, setSecurityErrors] = useState<string[]>([]);
  const passwordRef = useRef<string>('');

  const { signup, error: authError, isLoading, clearError } = useAuthenticationSimple();
  const { user } = useAuthValue();
  const navigate = useNavigate();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (isSubmitting || isLoading) return;

      setIsSubmitting(true);
      clearError();

      if (password !== confirmPassword) {
        setValidationError('Passwords do not match.');
        setIsSubmitting(false);
        return;
      }

      const passwordSecurityErrors = validatePasswordSecurity(password, email);
      if (passwordSecurityErrors.length > 0) {
        setSecurityErrors(passwordSecurityErrors);
        setIsSubmitting(false);
        return;
      }

      setValidationError('');
      setSecurityErrors([]);

      try {
        const credentials = {
          displayName: displayName.trim(),
          email,
          password,
        };

        const user = await signup(credentials, { rememberMe });

        if (user) {
          clearPasswordFromMemory(passwordRef);
        }
      } catch (error) {
        console.error('Signup submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      displayName,
      email,
      password,
      confirmPassword,
      rememberMe,
      signup,
      isSubmitting,
      isLoading,
      clearError,
    ]
  );

  useEffect(() => {
    if (user && !isLoading && !isSubmitting) {
      navigate('/submissions', { replace: true });
    }
  }, [user, navigate, isLoading, isSubmitting]);

  const isFormDisabled = isSubmitting || isLoading;

  return (
    <section className="bg-[var(--bg)]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <NavLink to="/" className="flex items-center mb-6 font-display text-2xl font-semibold text-[var(--fg)]">
          <img className="w-16 h-16 mr-2" src={Logo} alt="CadastRAR" />
          CadastRAR
        </NavLink>
        <div className="w-full surface-card md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="font-display text-2xl font-semibold leading-tight tracking-display text-[var(--fg)] md:text-2xl">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="website"
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
              />

              <div>
                <label htmlFor="name" className="block mb-2 text-sm font-medium text-[var(--fg)]">
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="input"
                  placeholder="Your full name"
                  required
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                />
              </div>

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
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-[var(--fg)]"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="Password"
                  className="input"
                  required
                  onChange={(e) => {
                    const newPassword = e.target.value;
                    setPassword(newPassword);
                    passwordRef.current = newPassword;
                    if (securityErrors.length > 0) {
                      setSecurityErrors([]);
                    }
                  }}
                  value={password}
                />
              </div>

              <PasswordStrengthMeter password={password} />

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-[var(--fg)]"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  autoComplete="new-password"
                  placeholder="Confirm Password"
                  className="input"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-[var(--border)] bg-[var(--surface)] accent-[var(--accent)] focus:ring-[var(--accent)]"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="text-[var(--fg-muted)]">
                    I accept the{' '}
                    <NavLink
                      to="/terms"
                      className="font-medium text-[var(--accent)] hover:underline"
                    >
                      Terms and Conditions
                    </NavLink>{' '}
                    and{' '}
                    <NavLink
                      to="/privacy"
                      className="font-medium text-[var(--accent)] hover:underline"
                    >
                      Privacy Policy
                    </NavLink>
                  </label>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-[var(--border)] bg-[var(--surface)] accent-[var(--accent)] focus:ring-[var(--accent)]"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-[var(--fg-muted)]">
                    Keep me connected
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className={`btn w-full py-2.5 text-sm font-medium ${isFormDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isFormDisabled}
              >
                {isFormDisabled ? 'Creating account...' : 'Create account'}
              </button>

              {authError && (
                <div
                  className="rounded-[var(--radius)] border border-[var(--danger)] bg-[var(--danger-subtle)] p-3 text-sm text-[var(--danger)]"
                  role="alert"
                >
                  {authError}
                  {securityErrors.map((error, index) => (
                    <div key={index} className="mt-1">
                      {error}
                    </div>
                  ))}
                </div>
              )}

              {validationError && (
                <div
                  className="rounded-[var(--radius)] border border-[var(--danger)] bg-[var(--danger-subtle)] p-3 text-sm text-[var(--danger)]"
                  role="alert"
                >
                  {validationError}
                </div>
              )}

              <p className="text-sm font-light text-[var(--fg-muted)]">
                Already have an account?{' '}
                <NavLink to="/login" className="font-medium text-[var(--accent)] hover:underline">
                  Login here
                </NavLink>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
