import { ReactNode } from 'react';

type FieldProps = {
  id: string;
  label: string;
  /** Persistent guidance. Placeholders are examples, never labels. */
  hint?: string;
  error?: string;
  required?: boolean;
  children: (props: {
    id: string;
    'aria-invalid': boolean;
    'aria-describedby': string | undefined;
  }) => ReactNode;
};

/**
 * Label + control + hint + error, wired together. The control is a render
 * prop so the same wiring serves inputs, textareas and anything else —
 * an invalid field can never ship without its error being announced.
 */
export default function Field({ id, label, hint, error, required, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
        {required ? (
          <span className="ml-1 text-[var(--danger)]" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children({ id, 'aria-invalid': Boolean(error), 'aria-describedby': describedBy })}
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-[var(--danger)]">
          {error}
        </p>
      ) : null}
      {hint ? (
        <p id={hintId} className="mt-1.5 text-sm text-[var(--fg-subtle)]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
