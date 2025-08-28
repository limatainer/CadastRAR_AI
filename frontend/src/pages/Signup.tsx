import { useEffect, useState, useCallback, useRef } from 'react';
import { useAuthenticationSimple } from '../hooks/useAuthenticationSimple';
import { useAuthValue } from '../contexts/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom';
import Logo from '/logo.png';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { validatePasswordSecurity, clearPasswordFromMemory } from '../utils/passwordSecurity';
export default function Signup() {
  // Form state
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState<string>('');
  const [securityErrors, setSecurityErrors] = useState<string[]>([]);
  const passwordRef = useRef<string>('');

  // Hooks
  const { signup, error: authError, isLoading, clearError } = useAuthenticationSimple();
  const { user } = useAuthValue();
  const navigate = useNavigate();

  // Handle form submission with remember me functionality
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting || isLoading) return;
    
    setIsSubmitting(true);
    clearError();

    // Client-side validation
    if (password !== confirmPassword) {
      setValidationError('As senhas não coincidem.');
      setIsSubmitting(false);
      return;
    }

    // Security validation
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
        password
      };
      
      const user = await signup(credentials, { rememberMe });
      
      if (user) {
        // Clear password from memory
        clearPasswordFromMemory(passwordRef);
        // Signup successful - navigation will be handled by useEffect
      }
    } catch (error) {
      console.error('Signup submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [displayName, email, password, confirmPassword, rememberMe, signup, isSubmitting, isLoading, clearError]);

  // Handle navigation after successful authentication
  useEffect(() => {
    if (user && !isLoading && !isSubmitting) {
      navigate('/submissions', { replace: true });
    }
  }, [user, navigate, isLoading, isSubmitting]);

  // Prevent form submission if already submitting
  const isFormDisabled = isSubmitting || isLoading;

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <NavLink
          to="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img className="w-16 h-16 mr-2" src={Logo} alt="logo" />
          Welcome to CadastRAR
        </NavLink>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your name
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Your full name"
                  required
                  onChange={(e) => setDisplayName(e.target.value)}
                  value={displayName}
                />
              </label>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </label>

              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
                <input
                  type="password"
                  name="password"
                  id="password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => {
                    const newPassword = e.target.value;
                    setPassword(newPassword);
                    passwordRef.current = newPassword;
                    // Clear security errors when user starts typing
                    if (securityErrors.length > 0) {
                      setSecurityErrors([]);
                    }
                  }}
                  value={password}
                />
              </label>
              
              <PasswordStrengthMeter password={password} />

              <label
                htmlFor="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  autoComplete="new-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  value={confirmPassword}
                />
              </label>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="terms"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    I accept the{' '}
                    <a
                      className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    htmlFor="remember"
                    className="font-light text-gray-500 dark:text-gray-300"
                  >
                    Manter-me conectado
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className={`w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-opacity ${
                  isFormDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
                }`}
                disabled={isFormDisabled}
              >
                {isFormDisabled ? 'Criando conta...' : 'Criar conta'}
              </button>
              
              {(authError || validationError || securityErrors.length > 0) && (
                <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-lg dark:bg-red-800/20 dark:text-red-400 dark:border-red-800" role="alert">
                  {authError || validationError}
                  {securityErrors.map((error, index) => (
                    <div key={index} className="mt-1">{error}</div>
                  ))}
                </div>
              )}

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{' '}
                <NavLink
                  to="/login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
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
