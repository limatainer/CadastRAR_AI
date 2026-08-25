import { useState, useEffect } from 'react';
import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

export type EntitlementStatus = 'loading' | 'trial' | 'expired' | 'paid';

export interface Entitlement {
  status: EntitlementStatus;
  daysLeft: number | null;
  paidAt: Date | null;
}

export const useEntitlement = (uid: string | null | undefined): Entitlement => {
  const [status, setStatus] = useState<EntitlementStatus>('loading');
  const [daysLeft, setDaysLeft] = useState<number | null>(null);
  const [paidAt, setPaidAt] = useState<Date | null>(null);

  useEffect(() => {
    if (!uid) {
      setStatus('trial');
      setDaysLeft(null);
      setPaidAt(null);
      return;
    }

    const unsub = onSnapshot(
      doc(db, 'users', uid),
      (snap) => {
        if (!snap.exists()) {
          setStatus('trial');
          return;
        }

        const data = snap.data() as {
          entitlement?: string;
          createdAt?: Timestamp;
          paidAt?: Timestamp | Date | string | null;
        };

        if (data.entitlement === 'paid') {
          setStatus('paid');
          setDaysLeft(null);
          const pa = data.paidAt;
          if (pa && typeof (pa as Timestamp).toDate === 'function') {
            setPaidAt((pa as Timestamp).toDate());
          } else if (pa && typeof pa === 'string') {
            setPaidAt(new Date(pa));
          } else if (pa instanceof Date) {
            setPaidAt(pa);
          } else {
            setPaidAt(null);
          }
          return;
        }

        const createdAt = data.createdAt;
        if (!createdAt) {
          setStatus('trial');
          return;
        }

        const created = createdAt.toDate();
        const trialEnd = new Date(created.getTime() + 7 * 24 * 60 * 60 * 1000);
        const now = new Date();
        const diffMs = trialEnd.getTime() - now.getTime();
        const remaining = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

        if (remaining > 0) {
          setStatus('trial');
          setDaysLeft(remaining);
        } else {
          setStatus('expired');
          setDaysLeft(0);
        }
        setPaidAt(null);
      },
      (err) => {
        console.warn('Entitlement listener error:', err);
        setStatus('trial');
      }
    );

    return () => unsub();
  }, [uid]);

  return { status, daysLeft, paidAt };
};
