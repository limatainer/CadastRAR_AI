import { createContext } from 'react';
import { User } from 'firebase/auth';

export interface AuthContextType {
  user: User | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
