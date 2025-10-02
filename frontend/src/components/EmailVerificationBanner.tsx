import { useState } from 'react';
import { useAuthenticationSimple } from '../hooks/useAuthenticationSimple';

export default function EmailVerificationBanner() {
  const { user, resendVerificationEmail } = useAuthenticationSimple();
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');

  if (!user || user.emailVerified) {
    return null;
  }

  const handleResend = async () => {
    setIsSending(true);
    setMessage('');

    const success = await resendVerificationEmail();

    if (success) {
      setMessage('Verification email sent! Check your inbox.');
    } else {
      setMessage('Error sending email. Please try again later.');
    }

    setIsSending(false);
  };

  return (
    <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-yellow-700 dark:text-yellow-200">
            Your email has not been verified yet. Please check your inbox at <strong>{user.email}</strong>
          </p>
          {message && (
            <p className="text-sm mt-2 text-yellow-700 dark:text-yellow-200">
              {message}
            </p>
          )}
          <button
            onClick={handleResend}
            disabled={isSending}
            className="mt-2 text-sm font-medium text-yellow-700 dark:text-yellow-200 hover:text-yellow-600 dark:hover:text-yellow-300 underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? 'Sending...' : 'Resend verification email'}
          </button>
        </div>
      </div>
    </div>
  );
}
