/**
 * Password Security Utilities
 * Client-side password validation and security enhancements
 * Note: Firebase handles actual hashing/salting on the backend
 */

export interface PasswordStrength {
  score: number; // 0-4
  feedback: string[];
  isValid: boolean;
}

/**
 * Validates password strength with comprehensive security rules
 */
export const validatePasswordStrength = (password: string): PasswordStrength => {
  const feedback: string[] = [];
  let score = 0;

  // Length check
  if (password.length >= 8) {
    score += 1;
  } else {
    feedback.push('Use pelo menos 8 caracteres');
  }

  // Character variety checks
  if (/[a-z]/.test(password)) score += 0.5;
  else feedback.push('Inclua letras minúsculas');

  if (/[A-Z]/.test(password)) score += 0.5;
  else feedback.push('Inclua letras maiúsculas');

  if (/\d/.test(password)) score += 0.5;
  else feedback.push('Inclua números');

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) score += 0.5;
  else feedback.push('Inclua símbolos especiais');

  // Length bonus
  if (password.length >= 12) score += 0.5;
  if (password.length >= 16) score += 0.5;

  // Common patterns penalty
  if (/(.)\1{2,}/.test(password)) {
    score -= 0.5;
    feedback.push('Evite caracteres repetidos');
  }

  if (/123|abc|qwe|password|admin/i.test(password)) {
    score -= 1;
    feedback.push('Evite sequências e palavras comuns');
  }

  // Cap the score
  score = Math.max(0, Math.min(4, score));

  return {
    score,
    feedback,
    isValid: score >= 3 && password.length >= 8
  };
};

/**
 * Get password strength label
 */
export const getPasswordStrengthLabel = (score: number): string => {
  if (score <= 1) return 'Muito fraca';
  if (score <= 2) return 'Fraca';
  if (score <= 3) return 'Média';
  return 'Forte';
};

/**
 * Get password strength color
 */
export const getPasswordStrengthColor = (score: number): string => {
  if (score <= 1) return 'text-red-600';
  if (score <= 2) return 'text-orange-500';
  if (score <= 3) return 'text-yellow-500';
  return 'text-green-600';
};

/**
 * Secure password clearing utility
 * Attempts to clear password from memory (best effort)
 */
export const clearPasswordFromMemory = (passwordRef: React.MutableRefObject<string>) => {
  if (passwordRef.current) {
    // Overwrite with random data
    passwordRef.current = Array.from(
      { length: passwordRef.current.length }, 
      () => Math.random().toString(36).charAt(0)
    ).join('');
    
    // Clear reference
    passwordRef.current = '';
  }
};

/**
 * Additional security validations
 */
export const validatePasswordSecurity = (password: string, email?: string): string[] => {
  const errors: string[] = [];

  // Check if password contains email
  if (email && password.toLowerCase().includes(email.toLowerCase().split('@')[0])) {
    errors.push('Senha não pode conter parte do seu email');
  }

  // Check for common weak passwords
  const weakPasswords = [
    '123456', 'password', '123456789', '12345678', '12345',
    '1234567', 'admin', 'qwerty', 'abc123', 'password123'
  ];
  
  if (weakPasswords.some(weak => password.toLowerCase().includes(weak))) {
    errors.push('Senha muito comum, escolha algo mais único');
  }

  return errors;
};