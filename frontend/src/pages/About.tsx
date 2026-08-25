import { NavLink } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

export default function About() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)]">
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
            <h1 className="text-4xl font-extrabold text-[var(--fg)] mb-2">About CadastRAR</h1>
            <p className="text-[var(--fg-muted)]">Built by Mariana Lima in Lisbon.</p>
          </div>

          <div className="space-y-8 text-[var(--fg-muted)]">
            <section>
              <h2 className="text-2xl font-semibold text-[var(--fg)] mb-4">What it is</h2>
              <p>
                CadastRAR is a tool for recording people. A user registers other people as records
                &mdash; name, avatar URL, description, tags &mdash; optionally with AI-assistance,
                then exports the result as a PDF.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--fg)] mb-4">
                What it does, in facts
              </h2>
              <ul className="list-disc pl-6 space-y-2">
                <li>4 fields per record: name, avatar URL, description, tags.</li>
                <li>3 export formats: ID card, certificate, profile sheet.</li>
                <li>AI writes a 2&ndash;3 sentence bio via a single Gemini call.</li>
                <li>Free 7-day trial. One-time payment of &euro;50 after. No subscription.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--fg)] mb-4">What it is not</h2>
              <p>
                CadastRAR is not a CRM, a marketing platform, or an enterprise product. It does not
                auto-sync data, send emails, or integrate with third-party software. It is a focused
                tool for a specific need.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-[var(--fg)] mb-4">Why it exists</h2>
              <p>
                Recording people for ID cards, certificates, or profile sheets is error-prone when
                done manually. Spreadsheets lose formatting. Re-typing between templates wastes
                time. CadastRAR exists to make this sequence reproducible and fast.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
