import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  ArrowDownTrayIcon,
} from '@heroicons/react/24/outline';
import { useFetchDocument } from '../hooks/useFetchDocument';
import { useAuthValue } from '../contexts/useAuthValue';
import { useDeleteDocument } from '../hooks/useDeleteDocument';
import { generateDocument } from '../utils/pdfGenerator';
import DocumentPreview, {
  DOC_LABELS,
  DOC_SIZES,
  DocFormat,
  DocumentData,
} from '../components/documents';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { fadeUp, stagger } from '../lib/motion';

const FORMATS: DocFormat[] = ['id', 'certificate', 'profile'];

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthValue();
  const { document: post, loading, error } = useFetchDocument('posts', id);
  const { deleteDocument } = useDeleteDocument('posts');

  const [format, setFormat] = useState<DocFormat>('id');
  const [exporting, setExporting] = useState<DocFormat | null>(null);
  const [exportError, setExportError] = useState('');

  const handleDelete = async () => {
    if (!window.confirm(`Delete "${post?.title}"? This cannot be undone.`)) return;
    try {
      await deleteDocument(id);
      navigate('/submissions');
    } catch (err) {
      console.error('Error deleting document:', err);
    }
  };

  const handleExport = async () => {
    if (!post) return;
    setExporting(format);
    setExportError('');
    try {
      await generateDocument(format, post as unknown as DocumentData);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setExportError('Could not build that PDF. Please try again.');
    } finally {
      setExporting(null);
    }
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
        <div className="text-center">
          <h1 className="font-display text-3xl font-semibold text-[var(--fg)]">
            Record not found
          </h1>
          <p className="mt-3 text-[var(--fg-muted)]">
            The record you are looking for does not exist or has been removed.
          </p>
          <Link to="/submissions" className="btn mt-6 px-5 py-2.5">
            Back to records
          </Link>
        </div>
      </div>
    );
  }

  const isOwner = user && post.uid === user.uid;
  const preview = DOC_SIZES[format];

  return (
    <motion.div
      className="section"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <div className="shell-wide">
        <motion.div variants={fadeUp}>
          <Link
            to="/submissions"
            className="focus-ring inline-flex items-center gap-1.5 rounded-[var(--radius)] text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
          >
            <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
            All records
          </Link>
        </motion.div>

        <motion.header
          className="mt-6 flex flex-wrap items-end justify-between gap-6 border-b border-[var(--border-hairline)] pb-8"
          variants={fadeUp}
        >
          <div className="flex items-center gap-5">
            {post.image ? (
              <img
                src={post.image}
                alt=""
                className="h-20 w-20 rounded-[var(--radius)] border border-[var(--border-hairline)] object-cover"
              />
            ) : null}
            <div>
              <p className="eyebrow">Record</p>
              <h1 className="mt-1.5 font-display text-4xl font-semibold tracking-display text-[var(--fg)]">
                {post.title}
              </h1>
            </div>
          </div>

          {isOwner ? (
            <div className="flex gap-2">
              <Link to={`/posts/edit/${post.id}`} className="btn-ghost px-4 py-2 text-sm">
                <PencilIcon className="mr-1.5 h-4 w-4" aria-hidden="true" />
                Edit
              </Link>
              <button onClick={handleDelete} className="btn-danger px-4 py-2 text-sm">
                <TrashIcon className="mr-1.5 h-4 w-4" aria-hidden="true" />
                Delete
              </button>
            </div>
          ) : null}
        </motion.header>

        <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <motion.div variants={fadeUp}>
            <p className="measure text-lg leading-relaxed text-[var(--fg)]">{post.body}</p>

            {post.tags?.length ? (
              <ul className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <li key={tag}>
                    <Link
                      to={`/search?q=${encodeURIComponent(tag)}`}
                      className="focus-ring inline-block rounded-full border border-[var(--border-hairline)] bg-[var(--surface-alt)] px-3 py-1 text-sm text-[var(--fg-muted)] hover:text-[var(--fg)]"
                    >
                      {tag}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-[var(--fg-subtle)]">
              Registered by {post.createdBy}
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="font-display text-xl font-semibold text-[var(--fg)]">Export</h2>
              <div
                role="tablist"
                aria-label="Document format"
                className="flex rounded-[var(--radius)] border border-[var(--border-hairline)] p-0.5"
              >
                {FORMATS.map((f) => (
                  <button
                    key={f}
                    role="tab"
                    aria-selected={format === f}
                    onClick={() => setFormat(f)}
                    className={`focus-ring rounded-[calc(var(--radius)-2px)] px-3 py-1.5 text-sm transition-colors ${
                      format === f
                        ? 'bg-[var(--accent)] text-[var(--accent-fg)]'
                        : 'text-[var(--fg-muted)] hover:text-[var(--fg)]'
                    }`}
                  >
                    {DOC_LABELS[f]}
                  </button>
                ))}
              </div>
            </div>

            {/* Scaled to fit; this is the exact markup the PDF rasterises. */}
            <div className="mt-5 overflow-hidden rounded-[var(--radius)] border border-[var(--border-hairline)] bg-[var(--surface-alt)] p-4">
              <div
                className="mx-auto origin-top-left"
                style={{
                  width: preview.width,
                  height: preview.height,
                  transform: `scale(${Math.min(1, 520 / preview.width)})`,
                  marginBottom:
                    preview.height * Math.min(1, 520 / preview.width) - preview.height,
                }}
              >
                <DocumentPreview format={format} data={post as unknown as DocumentData} />
              </div>
            </div>

            <button
              onClick={handleExport}
              disabled={exporting !== null}
              className="btn mt-4 w-full px-5 py-3"
            >
              <ArrowDownTrayIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              {exporting ? 'Building PDF…' : `Download ${DOC_LABELS[format].toLowerCase()}`}
            </button>

            {exportError ? (
              <Alert tone="danger" className="mt-3">
                {exportError}
              </Alert>
            ) : null}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
