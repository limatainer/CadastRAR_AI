import { Link, useNavigate } from 'react-router-dom';
import { useAuthValue } from '../contexts/useAuthValue';
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import { useDeleteDocument } from '../hooks/useDeleteDocument';
import { useState } from 'react';
import {
  MagnifyingGlassIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import EmailVerificationBanner from '../components/EmailVerificationBanner';
import { Timestamp } from 'firebase/firestore';
import { AnimatePresence, motion } from 'motion/react';
import { fadeUp, stagger } from '../lib/motion';

export default function Submissions() {
  const { user } = useAuthValue();
  const uid = user?.uid;
  const { documents: posts, error, loading } = useFetchDocuments('posts', null, uid);
  const { deleteDocument } = useDeleteDocument('posts');

  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      try {
        await deleteDocument(id);
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <EmailVerificationBanner />
      <div className="bg-[var(--surface)] shadow-sm border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold leading-7 text-[var(--fg)] sm:text-3xl sm:truncate">
                Submissions Dashboard
              </h1>
              <p className="mt-1 text-sm text-[var(--fg-muted)]">Manage your submitted users</p>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Link
                to="/posts/create"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2  focus:ring-[var(--accent)] transition-colors duration-200"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Register New User
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="mt-6">
            <form onSubmit={handleSubmit} className="max-w-md">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-[var(--fg-subtle)]" />
                </div>
                <input
                  type="text"
                  placeholder="Search by tag..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-[var(--border)] rounded-md leading-5 bg-[var(--surface)] text-[var(--fg)] placeholder-[var(--fg-subtle)]  focus:outline-none focus:placeholder-[var(--fg-subtle)] focus:ring-1 focus:ring-[var(--accent)] focus:border-[var(--accent)]"
                />
                <button type="submit" className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--accent)]"></div>
            <span className="ml-3 text-[var(--fg-muted)]">Loading submissions...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-[var(--accent)]/10 border border-red-200  rounded-md p-4">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Empty State */}
        {posts && posts.length === 0 && !loading && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto h-24 w-24 text-[var(--fg-subtle)]">
              <DocumentTextIcon className="h-full w-full" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-[var(--fg)]">No submissions yet</h3>
            <p className="mt-2 text-sm text-[var(--fg-muted)]">
              Get started by creating your first user registration.
            </p>
            <div className="mt-6">
              <Link
                to="/posts/create"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Register New User
              </Link>
            </div>
          </motion.div>
        )}

        {/* Data Table */}
        {posts && posts.length > 0 && (
          <div className="bg-[var(--surface)] shadow-sm rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-[var(--fg)] mb-4">
                Your Submissions ({posts.length})
              </h3>

              {/* Desktop Table */}
              <div className="hidden md:block">
                <table className="min-w-full divide-y divide-[var(--border)] ">
                  <thead className="bg-[var(--surface-alt)]">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-[var(--fg-muted)] uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <motion.tbody
                    className="bg-[var(--surface)] divide-y divide-[var(--border)] "
                    variants={stagger}
                    initial="hidden"
                    animate="visible"
                  >
                    <AnimatePresence initial={false}>
                      {posts.map((post) => (
                        <motion.tr
                          key={post.id}
                          layout
                          variants={fadeUp}
                          exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
                          className="hover:bg-[var(--surface-alt)] transition-colors duration-150"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-[var(--fg)]">{post.title}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-[var(--fg-muted)]">
                            {post.createdAt
                              ? new Date(
                                  post.createdAt instanceof Timestamp
                                    ? post.createdAt.seconds * 1000
                                    : post.createdAt
                                ).toLocaleDateString()
                              : 'Unknown'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                              Active
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex justify-end space-x-2">
                              <Link
                                to={`/posts/${post.id}`}
                                className="inline-flex items-center px-3 py-1 border border-[var(--border)] rounded-md text-xs font-medium text-[var(--fg)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] transition-colors duration-150"
                                title="View details"
                              >
                                <EyeIcon className="h-4 w-4 mr-1" />
                                View
                              </Link>
                              <Link
                                to={`/posts/edit/${post.id}`}
                                className="inline-flex items-center px-3 py-1 border border-[var(--border)] rounded-md text-xs font-medium text-[var(--fg)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] transition-colors duration-150"
                                title="Edit user"
                              >
                                <PencilIcon className="h-4 w-4 mr-1" />
                                Edit
                              </Link>
                              <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => handleDelete(post.id, post.title)}
                                className="inline-flex items-center px-3 py-1 border border-red-300 rounded-md text-xs font-medium text-red-600 bg-[var(--surface)] hover:bg-red-50 transition-colors duration-150"
                                title="Delete user"
                              >
                                <TrashIcon className="h-4 w-4 mr-1" />
                                Delete
                              </motion.button>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </motion.tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <motion.div
                className="md:hidden space-y-4"
                variants={stagger}
                initial="hidden"
                animate="visible"
              >
                <AnimatePresence initial={false}>
                  {posts.map((post) => (
                    <motion.div
                      key={post.id}
                      layout
                      variants={fadeUp}
                      exit={{ opacity: 0, x: -24, transition: { duration: 0.2 } }}
                      className="border border-[var(--border)] rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="text-sm font-medium text-[var(--fg)]">{post.title}</h4>
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-[var(--accent)]/10 text-[var(--accent)]">
                          Active
                        </span>
                      </div>
                      <p className="text-xs text-[var(--fg-muted)] mb-3">
                        Created:{' '}
                        {post.createdAt
                          ? new Date(
                              post.createdAt instanceof Timestamp
                                ? post.createdAt.seconds * 1000
                                : post.createdAt
                            ).toLocaleDateString()
                          : 'Unknown'}
                      </p>
                      <div className="flex space-x-2">
                        <Link
                          to={`/posts/${post.id}`}
                          className="flex-1 inline-flex justify-center items-center px-3 py-1 border border-[var(--border)] rounded-md text-xs font-medium text-[var(--fg)]"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View
                        </Link>
                        <Link
                          to={`/posts/edit/${post.id}`}
                          className="flex-1 inline-flex justify-center items-center px-3 py-1 border border-[var(--border)] rounded-md text-xs font-medium text-[var(--fg)]"
                        >
                          <PencilIcon className="h-4 w-4 mr-1" />
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          className="flex-1 inline-flex justify-center items-center px-3 py-1 border border-red-300 rounded-md text-xs font-medium text-red-600"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
