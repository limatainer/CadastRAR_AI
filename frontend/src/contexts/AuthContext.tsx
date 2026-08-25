import { createContext, useContext, ReactNode } from 'react';
import { User } from 'firebase/auth';

interface AuthContextType {
  user: User | null;
}

interface AuthProviderProps {
  children: ReactNode;
  value: AuthContextType;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, value }: AuthProviderProps) {
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthValue(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthValue must be used within an AuthProvider');
  }
  return context;
}
