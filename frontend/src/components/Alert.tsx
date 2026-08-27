import { ReactNode } from 'react';
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';

type Tone = 'danger' | 'success' | 'warning';

const TONES = {
  danger: {
    Icon: ExclamationTriangleIcon,
    fg: 'var(--danger)',
    bg: 'var(--danger-subtle)',
    border: 'var(--danger)',
  },
  success: {
    Icon: CheckCircleIcon,
    fg: 'var(--accent)',
    bg: 'var(--accent-subtle)',
    border: 'var(--accent)',
  },
  warning: {
    Icon: InformationCircleIcon,
    fg: 'var(--warning-fg)',
    bg: 'var(--warning-bg)',
    border: 'var(--warning-border)',
  },
} as const;

/**
 * Fill and text always come from the same tone entry, so the "white text
 * on a near-white background" class of bug cannot be reintroduced here.
 * The icon carries the meaning alongside colour (WCAG 1.4.1).
 */
export default function Alert({
  tone = 'danger',
  children,
  className = '',
}: {
  tone?: Tone;
  children: ReactNode;
  className?: string;
}) {
  const { Icon, fg, bg, border } = TONES[tone];

  return (
    <div
      role={tone === 'danger' ? 'alert' : 'status'}
      className={`flex items-start gap-2.5 rounded-[var(--radius)] border p-3 text-sm ${className}`}
      style={{ color: fg, background: bg, borderColor: border }}
    >
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <div className="min-w-0">{children}</div>
    </div>
  );
}
