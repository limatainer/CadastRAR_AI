import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { FirestoreDocument } from '../types/common';

export const useFetchDocuments = (docCollection: string, search: string | null = null, uid: string | null = null) => {
  const [documents, setDocuments] = useState<FirestoreDocument[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // Don't fetch if uid is required but not available (user logged out)
    if (!uid && docCollection === 'posts' && !search) {
      setDocuments([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    const collectionRef = collection(db, docCollection);
    let q;

    try {
      if (search) {
        q = query(
          collectionRef,
          where('tags', 'array-contains', search),
          orderBy('createdAt', 'desc')
        );
      } else if (uid) {
        q = query(
          collectionRef,
          where('uid', '==', uid),
          orderBy('createdAt', 'desc')
        );
      } else {
        q = query(collectionRef, orderBy('createdAt', 'desc'));
      }

      const unsubscribe = onSnapshot(
        q,
        (querySnapshot) => {
          if (querySnapshot.empty) {
            setDocuments([]);
          } else {
            setDocuments(
              querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
              }))
            );
          }
          setLoading(false);
        },
        (error) => {
          console.error('Error fetching documents: ', error);
          setError(error.message);
          setLoading(false);
        }
      );

      return () => {
        unsubscribe();
      };
    } catch (error: any) {
      console.error('Error in try-catch: ', error);
      setError(error.message);
      setLoading(false);
    }
  }, [docCollection, search, uid]);

  return { documents, loading, error };
};
