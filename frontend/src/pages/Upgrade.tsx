import { useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuthValue } from '@/contexts/useAuthValue';
import { motion } from 'motion/react';
import { fadeUp, stagger } from '@/lib/motion';
import { Entitlement } from '@/hooks/useEntitlement';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const paymentLink = import.meta.env.VITE_STRIPE_PAYMENT_LINK || '';

export default function Upgrade({ entitlement }: { entitlement: Entitlement }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthValue();
  const paid = location.search.includes('paid=1');

  useEffect(() => {
    if (entitlement.status === 'paid') {
      navigate('/submissions', { replace: true });
    }
  }, [entitlement, navigate]);

  if (paid) {
    return (
      <div className="page-center">
        <motion.div
          className="max-w-md w-full text-center"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp}>
            <div className="w-16 h-16 rounded-full bg-[var(--accent)] flex items-center justify-center mx-auto mb-6">
              <CheckCircleIcon className="w-8 h-8 text-[var(--accent-fg)]" />
            </div>
          </motion.div>
          <motion.h1 className="text-3xl font-bold text-[var(--fg)] mb-4" variants={fadeUp}>
            Payment received!
          </motion.h1>
          <motion.p className="text-[var(--fg-muted)] mb-8" variants={fadeUp}>
            Your account has been upgraded. Full access is now active.
          </motion.p>
          <motion.div variants={fadeUp}>
            <NavLink to="/submissions" className="btn">
              Go to My Submissions
            </NavLink>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg)] py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          className="bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] p-8 md:p-12 shadow-xl"
          variants={stagger}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 className="text-4xl font-bold text-[var(--fg)] mb-2" variants={fadeUp}>
            Unlock your full account
          </motion.h1>
          <motion.p className="text-[var(--fg-muted)] mb-8" variants={fadeUp}>
            Your 7-day trial has expired. Pay once to keep creating records and exporting documents.
          </motion.p>

          <motion.div
            className="bg-[var(--surface-alt)] border border-[var(--border)] rounded-[var(--radius)] p-6 mb-8"
            variants={fadeUp}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="text-3xl font-bold text-[var(--accent)]">€50</span>
                <span className="text-[var(--fg-muted)] ml-2">one-time payment</span>
              </div>
              <span className="px-3 py-1 bg-[var(--accent)]/20 text-[var(--accent)] text-xs font-medium rounded-full">
                No subscription
              </span>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-[var(--fg-muted)]">
              <li className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-[var(--accent)] mr-2 flex-shrink-0" />
                Unlimited records while trial is active
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-[var(--accent)] mr-2 flex-shrink-0" />
                Export to PDF (ID card, certificate, profile sheet)
              </li>
              <li className="flex items-center">
                <CheckCircleIcon className="w-5 h-5 text-[var(--accent)] mr-2 flex-shrink-0" />
                One payment — never billed again
              </li>
            </ul>
          </motion.div>

          <motion.div className="text-center" variants={fadeUp}>
            <button
              onClick={() => {
                if (paymentLink && user) {
                  window.location.href =
                    paymentLink +
                    (paymentLink.includes('?') ? '&' : '?') +
                    'client_reference_id=' +
                    encodeURIComponent(user.uid);
                }
              }}
              className="btn w-full md:w-auto px-8 py-3 text-lg"
            >
              Pay €50 once
            </button>
            <p className="mt-4 text-xs text-[var(--fg-subtle)]">
              By completing payment you accept our{' '}
              <NavLink to="/terms" className="underline">
                Terms
              </NavLink>{' '}
              &{' '}
              <NavLink to="/privacy" className="underline">
                Privacy Policy
              </NavLink>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
