type SpinnerProps = {
  /** Announced to screen readers and shown beneath the indicator. */
  label?: string;
};

export default function Spinner({ label }: SpinnerProps) {
  return (
    <div className="text-center" role="status" aria-live="polite">
      <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[var(--border-hairline)] border-t-[var(--accent)]" />
      {label ? <p className="mt-3 text-sm text-[var(--fg-muted)]">{label}</p> : null}
      <span className="sr-only">{label ?? 'Loading'}</span>
    </div>
  );
}
