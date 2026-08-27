import { NavLink } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function Privacy() {
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
            <h1 className="font-display text-4xl font-semibold tracking-display text-[var(--fg)] mb-2">Privacy Policy</h1>
            <p className="text-[var(--fg-muted)] txtComments">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="space-y-6 text-[var(--fg-muted)]">
            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">
                1. Information We Collect
              </h2>
              <p>
                When you sign up, we collect your name and email address. When you create records,
                we store the data you enter (name, avatar URL, description, tags) in Firestore. We
                do not collect payment information directly &mdash; payments are processed by
                Stripe.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">
                2. How We Use Your Data
              </h2>
              <p>
                Your data is used solely to provide and improve the service: storing your records,
                generating PDFs, and sending password reset emails. We do not sell, trade, or rent
                your data to third parties.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">3. Data Storage</h2>
              <p>
                All data is stored in Google Firebase Firestore. Access is controlled by Firestore
                security rules that restrict each user to their own documents. You own the data you
                create and can delete your account at any time.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">4. Authentication</h2>
              <p>
                We use Firebase Authentication with email and password. Passwords are hashed and
                never stored in plaintext. We do not log passwords.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">5. AI Assistance</h2>
              <p>
                The AI bio feature makes a single call to Google Gemini using an API key stored on
                the client. Your record data (name and description) is sent to Google for this
                single call. No data is used to train Google models.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">6. Analytics</h2>
              <p>
                We do not use analytics, tracking pixels, cookies for tracking, or third-party
                profiling. The &ldquo;theme&rdquo; setting is stored in your browser&rsquo;s
                localStorage and does not leave your device.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">7. Your Rights</h2>
              <p>
                You have the right to access, correct, or delete your personal data. You can delete
                your records at any time. To delete your entire account, contact us at{' '}
                <a href="mailto:support@cadastrar.vercel.app" className="text-[var(--accent)]">
                  support@cadastrar.vercel.app
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">
                8. Children&rsquo;s Privacy
              </h2>
              <p>
                The service is not intended for users under 16. We do not knowingly collect personal
                information from children.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">
                9. Changes to This Policy
              </h2>
              <p>
                We may update this policy. Any changes will be posted on this page with an updated
                &ldquo;Last updated&rdquo; date.
              </p>
            </section>

            <section>
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)] mb-3">10. Contact</h2>
              <p>
                Questions about this policy? Contact:{' '}
                <a href="mailto:support@cadastrar.vercel.app" className="text-[var(--accent)]">
                  support@cadastrar.vercel.app
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
