export interface PasswordStrength {
  score: number;
  feedback: string[];
  isValid: boolean;
}

export const validatePasswordStrength = (password: string): PasswordStrength => {
  const feedback: string[] = [];
  let score = 0;

  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Use at least 8 characters');
  }

  if (/[a-z]/.test(password)) score += 0.5;
  else feedback.push('Include lowercase letters');

  if (/[A-Z]/.test(password)) score += 0.5;
  else feedback.push('Include uppercase letters');

  if (/\d/.test(password)) score += 0.5;
  else feedback.push('Include numbers');

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 0.5;
  else feedback.push('Include special symbols');

  if (password.length >= 12) score += 0.5;
  if (password.length >= 16) score += 0.5;

  if (/(.)\1{2,}/.test(password)) {
    score -= 0.5;
    feedback.push('Avoid repeated characters');
  }

  if (/123|abc|qwe|password|admin/i.test(password)) {
    score -= 1;
    feedback.push('Avoid sequences and common words');
  }

  score = Math.max(0, Math.min(4, score));

  return {
    score,
    feedback,
    isValid: score >= 3 && password.length >= 8
  };
};

export const getPasswordStrengthLabel = (score: number): string => {
  if (score <= 1) return 'Very weak';
  if (score <= 2) return 'Weak';
  if (score <= 3) return 'Medium';
  return 'Strong';
};

export const getPasswordStrengthColor = (score: number): string => {
  if (score <= 1) return 'text-red-600';
  if (score <= 2) return 'text-orange-500';
  if (score <= 3) return 'text-yellow-500';
  return 'text-green-600';
};

export const clearPasswordFromMemory = (passwordRef: React.MutableRefObject<string>) => {
  if (passwordRef.current) {
    passwordRef.current = Array.from(
      { length: passwordRef.current.length },
      () => Math.random().toString(36).charAt(0)
    ).join('');

    passwordRef.current = '';
  }
};

export const validatePasswordSecurity = (password: string, email?: string): string[] => {
  const errors: string[] = [];

  if (email && password.toLowerCase().includes(email.toLowerCase().split('@')[0])) {
    errors.push('Password cannot contain part of your email');
  }

  const weakPasswords = [
    '123456', 'password', '123456789', '12345678', '12345',
    '1234567', 'admin', 'qwerty', 'abc123', 'password123'
  ];

  if (weakPasswords.some(weak => password.toLowerCase().includes(weak))) {
    errors.push('Password too common, choose something more unique');
  }

  return errors;
};