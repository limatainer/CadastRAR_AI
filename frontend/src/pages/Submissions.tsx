import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import {
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { Timestamp } from 'firebase/firestore';
import { useAuthValue } from '../contexts/useAuthValue';
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import { useDeleteDocument } from '../hooks/useDeleteDocument';
import EmailVerificationBanner from '../components/EmailVerificationBanner';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { fadeUp, stagger } from '../lib/motion';

const formatDate = (createdAt?: Date | Timestamp) => {
  if (!createdAt) return '—';
  const d = createdAt instanceof Timestamp ? createdAt.toDate() : createdAt;
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
};

export default function Submissions() {
  const { user } = useAuthValue();
  const uid = user?.uid;
  const { documents: posts, error, loading } = useFetchDocuments('posts', null, uid);
  const { deleteDocument } = useDeleteDocument('posts');

  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    try {
      await deleteDocument(id);
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  };

  return (
    <div>
      <EmailVerificationBanner />

      <div className="section pb-10">
        <div className="shell-wide">
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--border-hairline)] pb-8">
            <div>
              <p className="eyebrow">Your archive</p>
              <h1 className="mt-2 font-display text-4xl font-semibold tracking-display text-[var(--fg)]">
                Records
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <form onSubmit={handleSearch} role="search" className="relative">
                <label htmlFor="record-search" className="sr-only">
                  Search records by tag
                </label>
                <MagnifyingGlassIcon
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--fg-subtle)]"
                  aria-hidden="true"
                />
                <input
                  id="record-search"
                  type="search"
                  className="input w-56 pl-9"
                  placeholder="Search by tag…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </form>

              <Link to="/posts/create" className="btn px-5 py-2.5">
                <PlusIcon className="mr-1.5 h-4 w-4" aria-hidden="true" />
                New record
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="py-20">
              <Spinner label="Loading records" />
            </div>
          ) : null}

          {error ? (
            <Alert tone="danger" className="mt-8">
              {error}
            </Alert>
          ) : null}

          {!loading && !error && posts?.length === 0 ? (
            <div className="py-20 text-center">
              <h2 className="font-display text-2xl font-semibold text-[var(--fg)]">
                No records yet
              </h2>
              <p className="measure mx-auto mt-3 text-[var(--fg-muted)]">
                Create your first record and export it as an ID card, certificate or profile
                sheet.
              </p>
              <Link to="/posts/create" className="btn mt-7 px-5 py-2.5">
                Create a record
              </Link>
            </div>
          ) : null}

          {posts && posts.length > 0 ? (
            <motion.ul
              className="mt-2"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <AnimatePresence mode="popLayout">
                {posts.map((post) => (
                  <motion.li
                    key={post.id}
                    layout
                    variants={fadeUp}
                    exit={{ opacity: 0, x: -12 }}
                    className="flex flex-wrap items-center gap-5 border-b border-[var(--border-hairline)] py-5"
                  >
                    <img
                      src={post.image}
                      alt=""
                      className="h-14 w-14 flex-shrink-0 rounded-[var(--radius)] border border-[var(--border-hairline)] bg-[var(--surface-alt)] object-cover"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.visibility = 'hidden';
                      }}
                    />

                    <div className="min-w-0 flex-1">
                      <Link
                        to={`/posts/${post.id}`}
                        className="focus-ring rounded-[var(--radius)] font-display text-xl font-medium text-[var(--fg)] hover:text-[var(--accent)]"
                      >
                        {post.title}
                      </Link>
                      <p className="mt-1 flex flex-wrap gap-x-3 font-mono text-xs uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
                        <span>{formatDate(post.createdAt)}</span>
                        {post.tags?.length ? <span>{post.tags.slice(0, 3).join(' · ')}</span> : null}
                      </p>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        to={`/posts/edit/${post.id}`}
                        className="btn-ghost px-3 py-2 text-sm"
                        aria-label={`Edit ${post.title}`}
                      >
                        <PencilIcon className="h-4 w-4" aria-hidden="true" />
                      </Link>
                      <button
                        onClick={() => handleDelete(post.id, post.title || 'this record')}
                        className="btn-danger px-3 py-2 text-sm"
                        aria-label={`Delete ${post.title}`}
                      >
                        <TrashIcon className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}
