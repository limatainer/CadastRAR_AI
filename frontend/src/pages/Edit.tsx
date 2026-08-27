import { useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { useFetchDocument } from '../hooks/useFetchDocument';
import { useUpdateDocument } from '../hooks/useUpdateDocument';
import { useAuthValue } from '../contexts/useAuthValue';
import RecordForm, { RecordValues } from '../components/RecordForm';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { fadeUp, stagger } from '../lib/motion';

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthValue();
  const { document: post, loading, error } = useFetchDocument('posts', id || '');
  const { updateDocument, response } = useUpdateDocument('posts');

  // Only the owner may edit; the Firestore rules enforce this too.
  useEffect(() => {
    if (post && user && post.uid !== user.uid) navigate('/submissions');
  }, [post, user, navigate]);

  const initial = useMemo(
    () =>
      post
        ? {
            title: post.title || '',
            image: post.image || '',
            body: post.body || '',
            tags: post.tags || [],
          }
        : undefined,
    [post]
  );

  const handleSubmit = async (values: RecordValues) => {
    await updateDocument(id, { ...values, updatedAt: new Date() });
    navigate('/submissions');
  };

  if (loading) {
    return (
      <div className="page-center">
        <Spinner label="Loading record" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="page-center">
        <Alert tone="danger">{error || 'That record does not exist or has been removed.'}</Alert>
      </div>
    );
  }

  return (
    <div className="section">
      <motion.div
        className="mx-auto max-w-2xl"
        variants={stagger}
        initial="hidden"
        animate="visible"
      >
        <motion.header className="mb-10" variants={fadeUp}>
          <p className="eyebrow">Editing</p>
          <h1 className="mt-2 font-display text-4xl font-semibold tracking-display text-[var(--fg)]">
            {post.title}
          </h1>
        </motion.header>

        <motion.div variants={fadeUp}>
          <RecordForm
            initial={initial}
            submitLabel="Save changes"
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
