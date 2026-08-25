export default function Footer() {
  return (
    <footer className="bg-[var(--surface)] border-t border-[var(--border-hairline)] text-[var(--fg)] py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        <div className="text-sm text-[var(--fg-muted)]">
          &copy; {new Date().getFullYear()} LimaCodes. All rights reserved.
        </div>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="/privacy"
            className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            Privacy Policy
          </a>
          <a
            href="/terms"
            className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            Terms of Service
          </a>
          <a
            href="https://marianalima.tech"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}
