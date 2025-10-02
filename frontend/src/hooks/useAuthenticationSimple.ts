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
  sendEmailVerification,
  User,
  AuthError
} from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

import { auth, db } from '../firebase/config';

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsLoading(false);
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
      if (options.rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      return userCredential.user;
    } catch (err) {
      const error = err as AuthError;
      let errorMessage = 'An error occurred, please try again later.';

      if (error.code === 'auth/user-not-found') {
        errorMessage = 'User not found.';
      } else if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = 'Incorrect email or password.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email.';
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
      if (options.rememberMe) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );

      await updateProfile(userCredential.user, {
        displayName: credentials.displayName
      });

      await setDoc(doc(db, 'users', userCredential.user.uid), {
        displayName: credentials.displayName,
        email: credentials.email,
        termsAccepted: true,
        termsAcceptedAt: serverTimestamp(),
        createdAt: serverTimestamp(),
        emailVerified: false
      });

      await sendEmailVerification(userCredential.user);

      return userCredential.user;
    } catch (err) {
      const error = err as AuthError;
      let errorMessage = 'An error occurred, please try again later.';

      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Email already registered.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Password must be at least 6 characters.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email.';
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
    } catch (err) {
      const error = err as AuthError;
      console.error('Logout error:', error);
      setError('Error logging out.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resendVerificationEmail = useCallback(async (): Promise<boolean> => {
    if (!user) {
      setError('No user logged in.');
      return false;
    }

    try {
      await sendEmailVerification(user);
      return true;
    } catch (err) {
      const error = err as AuthError;
      console.error('Resend verification error:', error);
      setError('Error sending verification email.');
      return false;
    }
  }, [user]);

  return {
    user,
    isLoading,
    error,
    isAuthenticated: Boolean(user),
    login,
    signup,
    logout,
    clearError,
    resendVerificationEmail,
    auth
  };
};
