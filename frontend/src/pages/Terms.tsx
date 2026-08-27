import { NavLink } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function Terms() {
  return (
    <div className="bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="bg-[var(--surface)] rounded-[var(--radius)] shadow border border-[var(--border)] p-8">
          <div className="mb-8">
            <NavLink
              to="/"
              className="text-[var(--accent)] hover:text-[var(--accent-hover)] inline-flex items-center gap-2 mb-4"
            >
              <ChevronLeftIcon className="w-5 h-5" />
              Back to Home
            </NavLink>
            <h1 className="font-display text-4xl font-semibold tracking-display text-[var(--fg)] mb-2">Terms and Conditions</h1>
            <p className="text-[var(--fg-muted)] txtComments">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6 text-[var(--fg-muted)]">
            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing and using CadastRAR, you accept and agree to be bound by the terms and
                provision of this agreement. If you do not agree to these terms, please do not use
                this service.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">2. User Accounts</h2>
              <p>
                When you create an account with us, you are responsible for maintaining the security
                of your account and are fully responsible for all activities that occur under the
                account. You must notify us immediately of any unauthorized use of your account.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">3. Free Trial</h2>
              <p>
                New users receive a 7-day free trial upon signup. No payment information is
                collected during signup or the trial period. After the trial expires, full write
                access is suspended until payment is made. Existing data remains readable.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">4. Payment Terms</h2>
              <p>
                The service is purchased via a one-time payment of &euro;50. This is not a
                subscription. There are no recurring charges. After payment, your account receives
                lifetime write access.
              </p>
              <p className="mt-2">
                <strong>Data access after payment failure:</strong> If for any reason your payment
                fails, you retain read access to all previously created data. You may complete
                payment at any time to restore write access.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">
                5. Right of Withdrawal (EU Consumers)
              </h2>
              <p>
                Under EU law, you have the right to withdraw from this contract within 14 days
                without giving any reason. The withdrawal period will expire 14 days after the day
                of conclusion of the contract.
              </p>
              <p className="mt-2">
                To exercise the right of withdrawal, you must inform us of your decision to withdraw
                by sending a written notice to{' '}
                <a href="mailto:support@cadastrar.vercel.app" className="text-[var(--accent)]">
                  support@cadastrar.vercel.app
                </a>
                .
              </p>
              <p className="mt-2">
                <strong>Limitation:</strong> By purchasing, you acknowledge and agree that the
                service begins immediately and that you waive your right of withdrawal once access
                to the paid features has been granted.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">6. VAT</h2>
              <p>
                For EU consumers, VAT at the applicable rate will be added to the payment in
                accordance with EU VAT regulations and the reverse charge mechanism where
                applicable.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">7. Prohibited Uses</h2>
              <p>
                You may not use the service for illegal purposes or to store data that is unlawful,
                harmful, defamatory, or that violates third-party rights.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">8. Disclaimer</h2>
              <p>
                The service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo;
                basis. We do not warrant that the service will be uninterrupted or error-free.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">
                9. Limitation of Liability
              </h2>
              <p>
                To the maximum extent permitted by law, we shall not be liable for any indirect,
                incidental, special, consequential, or punitive damages.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">10. Termination</h2>
              <p>
                We may terminate or suspend your access immediately, without prior notice, for any
                reason, including a breach of the terms.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
