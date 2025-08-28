/**
 * Simple Authentication Hook - Working version with Remember Me
 */

import { useState, useEffect, useCallback } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  onAuthStateChanged,
  User
} from 'firebase/auth';

import { auth } from '../firebase/config';

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials extends LoginCredentials {
  displayName: string;
}

interface LoginOptions {
  rememberMe?: boolean;
}

export const useAuthenticationSimple = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Firebase Auth state listener - this is critical for proper auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false); // Always set loading to false once we know auth state
    });

    return () => unsubscribe();
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(async (
    credentials: LoginCredentials, 
    options: LoginOptions = {}
  ): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Set persistence based on remember me
      if (options.rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }

      // Sign in
      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      return userCredential.user;
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro, por favor tente mais tarde.';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Usuário não encontrado.';
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'Email ou senha incorretos.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido.';
      }
      
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (
    credentials: SignupCredentials,
    options: LoginOptions = {}
  ): Promise<User | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // Set persistence based on remember me
      if (options.rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }

      // Create user
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      // Update profile
      await updateProfile(userCredential.user, {
        displayName: credentials.displayName
      });

      return userCredential.user;
    } catch (error: any) {
      let errorMessage = 'Ocorreu um erro, por favor tente mais tarde.';
      
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'E-mail já cadastrado.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'A senha precisa conter pelo menos 6 caracteres.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Email inválido.';
      }
      
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      await signOut(auth);
    } catch (error: any) {
      console.error('Logout error:', error);
      setError('Erro ao fazer logout.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    // State
    user,
    isLoading,
    error,
    isAuthenticated: Boolean(user),
    
    // Actions
    login,
    signup,
    logout,
    clearError,
    
    // Firebase auth instance (for compatibility)
    auth
  };
};