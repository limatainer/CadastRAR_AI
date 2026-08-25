import { initializeTestEnvironment, assertFails, assertSucceeds } from '@firebase/rules-unit-testing';
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  serverTimestamp,
  Timestamp,
} from 'firebase/firestore';

const env = await initializeTestEnvironment({
  projectId: 'cadastrar-rules-test',
  auth: { uid: 'admin', token: { email: 'admin@test.com' } },
  firestore: {
    host: 'localhost:8080',
    port: 8080,
  },
});

await env.withSecurityRulesDisabled(async (context) => {
  const adminDb = getFirestore(context.firestore());
  await setDoc(doc(adminDb, 'users', 'admin'), { createdAt: serverTimestamp() });
});

const now = Timestamp.now();
const sevenDaysAgo = Timestamp.fromMillis(now.toMillis() - 6 * 24 * 60 * 60 * 1000);
const eightDaysAgo = Timestamp.fromMillis(now.toMillis() - 8 * 24 * 60 * 60 * 1000);

const users = {
  trial: { uid: 'trial-user', data: { displayName: 'Trial', email: 'trial@test.com', createdAt: sevenDaysAgo } },
  expired: { uid: 'expired-user', data: { displayName: 'Expired', email: 'expired@test.com', createdAt: eightDaysAgo } },
  paid: { uid: 'paid-user', data: { displayName: 'Paid', email: 'paid@test.com', createdAt: eightDaysAgo, entitlement: 'paid' } },
};

await env.withSecurityRulesDisabled(async (context) => {
  const adminDb = getFirestore(context.firestore());
  await Promise.all(
    Object.values(users).map((u) => setDoc(doc(adminDb, 'users', u.uid), u.data))
  );
});

const trialDb = getFirestore(env.authenticatedContext('trial-user').firestore());
const expiredDb = getFirestore(env.authenticatedContext('expired-user').firestore());
const paidDb = getFirestore(env.authenticatedContext('paid-user').firestore());

const post = {
  title: 'Test Person',
  image: 'https://example.com/img.jpg',
  body: 'A test description.',
  tags: ['test'],
  createdBy: 'Test Person',
  createdAt: serverTimestamp(),
};

console.log('\n  Firestore Security Rules Tests\n');

// 1. Trial user can create a post
try {
  await assertSucceeds(addDoc(collection(trialDb, 'posts'), { ...post, uid: 'trial-user' }));
  console.log('    \u2713 Trial user can create a post');
} catch (e) {
  console.log('    \u2717 Trial user can create a post');
  console.log('      ' + (e instanceof Error ? e.message : String(e)));
  process.exitCode = 1;
}

// 2. Expired user (8 days) cannot create
try {
  await assertFails(addDoc(collection(expiredDb, 'posts'), { ...post, uid: 'expired-user' }));
  console.log('    \u2713 Expired user cannot create a post');
} catch (e) {
  console.log('    \u2717 Expired user cannot create a post');
  console.log('      ' + (e instanceof Error ? e.message : String(e)));
  process.exitCode = 1;
}

// 3. Expired user with entitlement: 'paid' can create
try {
  await assertSucceeds(addDoc(collection(paidDb, 'posts'), { ...post, uid: 'paid-user' }));
  console.log('    \u2713 Paid user can create a post');
} catch (e) {
  console.log('    \u2717 Paid user can create a post');
  console.log('      ' + (e instanceof Error ? e.message : String(e)));
  process.exitCode = 1;
}

await env.cleanup();
console.log('\n  Done.\n');
