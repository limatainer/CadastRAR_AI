import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { Stripe } from 'stripe';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = express();
const port = process.env.PORT || 3001;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

app.use(cors());

if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
  console.error('FIREBASE_SERVICE_ACCOUNT env var is required');
  process.exit(1);
}

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post(
  '/stripe-webhook',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const sig = req.headers['stripe-signature'] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err: any) {
      console.error('Webhook signature verification failed:', err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    console.log('Received Stripe event:', event.type);

    if (
      event.type === 'checkout.session.completed' ||
      event.type === 'checkout.session.async_payment_succeeded'
    ) {
      const session = event.data.object as Stripe.Checkout.Session;

      if (session.payment_status !== 'paid') {
        console.log('Payment not paid, ignoring');
        res.status(200).json({ received: true });
        return;
      }

      const uid = session.client_reference_id;

      if (uid) {
        db.collection('users')
          .doc(uid)
          .update({
            entitlement: 'paid',
            paidAt: new Date(),
            stripeSessionId: session.id,
          })
          .then(() => {
            console.log(`User ${uid} marked as paid`);
          })
          .catch((err) => {
            console.error('Failed to update user entitlement:', err);
          });
      }
    }

    res.status(200).json({ received: true });
  }
);

app.listen(port, () => {
  console.log(`Stripe webhook server running on port ${port}`);
});
