import { useMemo } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import {
  validatePasswordStrength,
  getPasswordStrengthLabel,
  getPasswordStrengthColor,
} from '../utils/passwordSecurity';

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

export default function PasswordStrengthMeter({
  password,
  className = '',
}: PasswordStrengthMeterProps) {
  const strength = useMemo(() => validatePasswordStrength(password), [password]);

  if (!password) return null;

  const strengthPercentage = (strength.score / 4) * 100;
  const strengthColor = getPasswordStrengthColor(strength.score);
  const strengthLabel = getPasswordStrengthLabel(strength.score);

  return (
    <div className={`mt-2 ${className}`}>
      {/* Strength bar */}
      <div className="w-full border border-[var(--border)] rounded-full h-2 bg-[var(--surface-alt)] bg-[var(--surface-alt)]">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            strength.score <= 1
              ? 'bg-[var(--danger)]'
              : strength.score <= 3
                ? 'bg-[var(--warning-icon)]'
                : 'bg-[var(--success)]'
          }`}
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>

      {/* Strength label */}
      <div className="flex justify-between items-center mt-1">
        <span className={`text-sm font-medium ${strengthColor}`}>Strength: {strengthLabel}</span>
        <span className="text-xs text-[var(--fg-muted)]">{strength.score}/4</span>
      </div>

      {/* Feedback */}
      {strength.feedback.length > 0 && (
        <div className="mt-2 text-xs text-[var(--fg-muted)]">
          <ul className="list-disc list-inside space-y-1">
            {strength.feedback.map((feedback, index) => (
              <li key={index}>{feedback}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Valid indicator */}
      {strength.isValid && (
        <div className="mt-1 flex items-center text-xs text-[var(--success)]">
        <CheckIcon className="w-3 h-3 mr-1" />
        Secure password
        </div>
      )}
    </div>
  );
}
