import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useInsertDocument } from '../hooks/useInsertDocument';
import { useAuthValue } from '../contexts/useAuthValue';
import RecordForm, { RecordValues } from '../components/RecordForm';
import { fadeUp, stagger } from '../lib/motion';

export default function Registration() {
  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { insertDocument, response } = useInsertDocument('posts');

  const handleSubmit = (values: RecordValues) => {
    insertDocument({
      ...values,
      uid: user?.uid,
      createdBy: user?.displayName,
    });
    navigate('/submissions');
  };

  return (
    <div className="section">
      <motion.div
        className="mx-auto max-w-2xl"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.header className="mb-10" variants={fadeUp}>
          <p className="eyebrow">New entry</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-display text-[var(--fg)]">
            Create a record
          </h1>
          <p className="measure mt-3 text-[var(--fg-muted)]">
            Four fields. Export it as an ID card, certificate or profile sheet when you are done.
          </p>
        </motion.header>

        <motion.div variants={fadeUp}>
          <RecordForm
            submitLabel="Create record"
            submitting={Boolean(response.loading)}
            submitError={response.error}
            onSubmit={handleSubmit}
            onCancel={() => navigate('/submissions')}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
