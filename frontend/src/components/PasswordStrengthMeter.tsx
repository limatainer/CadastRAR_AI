import { useMemo } from 'react';
import { 
  validatePasswordStrength, 
  getPasswordStrengthLabel, 
  getPasswordStrengthColor 
} from '../utils/passwordSecurity';

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

export default function PasswordStrengthMeter({ password, className = '' }: PasswordStrengthMeterProps) {
  const strength = useMemo(() => validatePasswordStrength(password), [password]);

  if (!password) return null;

  const strengthPercentage = (strength.score / 4) * 100;
  const strengthColor = getPasswordStrengthColor(strength.score);
  const strengthLabel = getPasswordStrengthLabel(strength.score);

  return (
    <div className={`mt-2 ${className}`}>
      {/* Strength bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            strength.score <= 1 ? 'bg-red-600' :
            strength.score <= 2 ? 'bg-orange-500' :
            strength.score <= 3 ? 'bg-yellow-500' :
            'bg-green-600'
          }`}
          style={{ width: `${strengthPercentage}%` }}
        />
      </div>

      {/* Strength label */}
      <div className="flex justify-between items-center mt-1">
        <span className={`text-sm font-medium ${strengthColor}`}>
          Strength: {strengthLabel}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          {strength.score}/4
        </span>
      </div>

      {/* Feedback */}
      {strength.feedback.length > 0 && (
        <div className="mt-2 text-xs text-gray-600 dark:text-gray-400">
          <ul className="list-disc list-inside space-y-1">
            {strength.feedback.map((feedback, index) => (
              <li key={index}>{feedback}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Valid indicator */}
      {strength.isValid && (
        <div className="mt-1 flex items-center text-xs text-green-600">
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Secure password
        </div>
      )}
    </div>
  );
}