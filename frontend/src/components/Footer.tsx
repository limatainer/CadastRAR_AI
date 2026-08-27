import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="glass border-t border-[var(--glass-border)] text-[var(--fg)] py-10">
      <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-bold text-lg text-[var(--fg)]">CadastRAR</div>
          <p className="mt-2 text-sm text-[var(--fg-muted)] max-w-xs">
            A precision instrument for recording people and generating documents. No subscription,
            ever.
          </p>
        </div>

        <nav aria-label="Legal" className="md:justify-self-center">
          <h2 className="text-sm font-semibold text-[var(--fg)] mb-3">Legal</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                to="/privacy"
                className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors focus-ring rounded"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                to="/terms"
                className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors focus-ring rounded"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </nav>

        <div className="md:justify-self-end">
          <h2 className="text-sm font-semibold text-[var(--fg)] mb-3">Connect</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://marianalima.tech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors focus-ring rounded"
              >
                Contact
              </a>
            </li>
            <li>
              <Link
                to="/about"
                className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors focus-ring rounded"
              >
                How it works
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8 pt-6 border-t border-[var(--border-hairline)] text-sm text-[var(--fg-muted)]">
        <a
          href="https://marianalima.tech"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer hover:text-[var(--fg)] hover:underline transition-colors focus-ring rounded"
        >
          &copy; {new Date().getFullYear()} LimaCodes (Mariana Lima). All rights reserved.
        </a>
      </div>
    </footer>
  );
}
