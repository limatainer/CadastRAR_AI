import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc, DocumentData } from 'firebase/firestore';

export const useFetchDocument = (docCollection: string, id: string) => {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadDocument = async () => {
      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        setDocument(docSnap.data());
      } catch (error: any) {
        console.error('Fetch document error:', error);
        setError(error.message);
      }

      setLoading(false);
    };

    loadDocument();
  }, [docCollection, id]);


  return { document, loading, error };
};
