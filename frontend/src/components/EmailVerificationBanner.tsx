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

    setMessage(
      success
        ? 'Verification email sent! Check your inbox.'
        : 'Error sending email. Please try again later.'
    );
    setIsSending(false);
  };

  return (
    <div className="bg-[var(--warning-bg)] border-l-4 border-[var(--warning-border)] p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <ExclamationTriangleIcon className="h-5 w-5" style={{ color: 'var(--warning-icon)' }} />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-[var(--warning-fg)]">
            Your email has not been verified yet. Please check your inbox at{' '}
            <strong>{user.email}</strong>
          </p>
          {message && <p className="text-sm mt-2 text-[var(--warning-fg)]">{message}</p>}
          <button
            onClick={handleResend}
            disabled={isSending}
            className="mt-2 text-sm font-medium text-[var(--warning-fg)] underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSending ? 'Sending...' : 'Resend verification email'}
          </button>
        </div>
      </div>
    </div>
  );
}
