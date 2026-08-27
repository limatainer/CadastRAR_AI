import { useState } from 'react';
import { useAuthenticationSimple } from '../hooks/useAuthenticationSimple';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

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

    if (!success) {
      setMessage('Error sending email. Please try again later.');
    }
    setMessage('Verification email sent! Check your inbox.');

    setIsSending(false);
  };

  return (
    <div className="bg-yellow-50 dark:bg-yellow-950/30 border-l-4 border-yellow-400 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-[var(--accent-fg)]">
            Your email has not been verified yet. Please check your inbox at{' '}
            <strong>{user.email}</strong>
          </p>
          {message && <p className="text-sm mt-2 text-[var(--accent-fg)]">{message}</p>}
          <button
            onClick={handleResend}
            disabled={isSending}
            className="mt-2 text-sm font-medium text-[var(--accent-fg)] underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? 'Sending...' : 'Resend verification email'}
          </button>
        </div>
      </div>
    </div>
  );
}
