import { useFetchDocument } from '../hooks/useFetchDocument';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
  TagIcon,
  UserIcon,
  DocumentArrowDownIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline';
import { useAuthValue } from '../contexts/useAuthValue';
import { useDeleteDocument } from '../hooks/useDeleteDocument';

import { generateIDCard, generateCertificate, generateProfileSheet, UserData } from '../utils/pdfGenerator';

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthValue();
  const { document: post, loading, error } = useFetchDocument('posts', id);
  const { deleteDocument } = useDeleteDocument('posts');
  const [generatingPDF, setGeneratingPDF] = useState<string | null>(null);

  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete "${post?.title}"?`)) {
      try {
        await deleteDocument(id);
        navigate('/submissions');
      } catch (error) {
        console.error('Error deleting document:', error);
      }
    }
  };

  const pdfGenerators = {
    id: generateIDCard,
    certificate: generateCertificate,
    profile: generateProfileSheet,
  };

  const handleGeneratePDF = async (type: keyof typeof pdfGenerators) => {
    if (!post) return;

    const userData = post as unknown as UserData;
    setGeneratingPDF(type);
    try {
      await pdfGenerators[type](userData);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setGeneratingPDF(null);
    }
  };

  const isOwner = user && post && user.uid === post.uid;

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-[var(--fg-muted)]">Loading user details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 text-[var(--accent-fg)]">
            <ExclamationTriangleIcon className="h-full w-full" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-[var(--fg)]">Error loading user</h3>
          <p className="mt-2 text-sm text-[var(--fg-muted)]">{error}</p>
          <div className="mt-6">
            <Link
              to="/submissions"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Submissions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 text-[var(--fg-subtle)]">
            <DocumentTextIcon className="h-full w-full" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-[var(--fg)]">User not found</h3>
          <p className="mt-2 text-sm text-[var(--fg-muted)]">
            The user you are re looking for does not exist or has been removed.
          </p>
          <div className="mt-6">
            <Link
              to="/submissions"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[var(--accent)] hover:bg-[var(--accent-hover)]"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Submissions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header with Navigation */}
      <div className="bg-[var(--surface)] shadow-sm border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/submissions"
              className="inline-flex items-center text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Submissions
            </Link>

            {isOwner && (
              <div className="flex space-x-2">
                <Link
                  to={`/posts/edit/${post.id}`}
                  className="inline-flex items-center px-3 py-1.5 border border-[var(--border)] rounded-md text-sm font-medium text-[var(--fg)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] transition-colors duration-200"
                >
                  <PencilIcon className="h-4 w-4 mr-1.5" />
                  Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center px-3 py-1.5 border border-[var(--accent)]/20 rounded-md text-sm font-medium text-[var(--accent-fg)] bg-[var(--surface)] hover:bg-[var(--accent)]/10 transition-colors duration-200"
                >
                  <TrashIcon className="h-4 w-4 mr-1.5" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[var(--surface)] rounded-lg shadow-sm overflow-hidden">
          {/* Profile Header */}
          <div className="px-6 py-8 sm:px-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[var(--border-hairline)] shadow-lg"
                    onError={(e) => {
                      e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.title)}&background=8b5cf6&color=fff&size=128`;
                    }}
                  />
                  <div className="absolute -bottom-2 -right-2 bg-[var(--accent)] rounded-full p-2">
                    <UserIcon className="h-4 w-4 text-white" />
                  </div>
                </div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-[var(--fg)] mb-2">
                  {post.title}
                </h1>

                {/* Metadata */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-[var(--fg-muted)]">
                  {post.createdAt && (
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 mr-1.5" />
                      <span>
                        Registered{' '}
                        {new Date(post.createdAt.seconds * 1000).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex items-center">
                      <TagIcon className="h-4 w-4 mr-1.5" />
                      <span>
                        {post.tags.length} tag{post.tags.length !== 1 ? 's' : ''}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="border-t border-[var(--border)]">
            {/* User Details Section */}
            <div className="px-6 py-6 sm:px-8">
              <h2 className="text-lg font-semibold text-[var(--fg)] mb-4">User Details</h2>

              <div className="bg-[var(--surface-alt)]/50 rounded-lg p-4">
                {post.body ? (
                  <p className="text-[var(--fg)] leading-relaxed whitespace-pre-wrap">
                    {post.body}
                  </p>
                ) : (
                  <p className="text-[var(--fg-muted)] italic">
                    No description provided for this user.
                  </p>
                )}
              </div>
            </div>

            {/* Document Generation Section */}
            <div className="border-t border-[var(--border)] px-6 py-6 sm:px-8 bg-[var(--surface-alt)]">
              <h2 className="text-lg font-semibold text-[var(--fg)] mb-2">Generate Documents</h2>
              <p className="text-sm text-[var(--fg-muted)] mb-4">
                Export this user&apos;s information as a PDF document
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={() => handleGeneratePDF('id')}
                  disabled={generatingPDF !== null}
                  className="inline-flex items-center justify-center px-4 py-3 border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--fg)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                  {generatingPDF === 'id' ? 'Generating...' : 'ID Card'}
                </button>

                <button
                  onClick={() => handleGeneratePDF('certificate')}
                  disabled={generatingPDF !== null}
                  className="inline-flex items-center justify-center px-4 py-3 border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--fg)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                  {generatingPDF === 'certificate' ? 'Generating...' : 'Certificate'}
                </button>

                <button
                  onClick={() => handleGeneratePDF('profile')}
                  disabled={generatingPDF !== null}
                  className="inline-flex items-center justify-center px-4 py-3 border border-[var(--border)] rounded-lg text-sm font-medium text-[var(--fg)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <DocumentArrowDownIcon className="h-5 w-5 mr-2" />
                  {generatingPDF === 'profile' ? 'Generating...' : 'Profile Sheet'}
                </button>
              </div>
            </div>

            {/* Tags Section */}
            {post.tags && post.tags.length > 0 && (
              <div className="border-t border-[var(--border)] px-6 py-6 sm:px-8">
                <h2 className="text-lg font-semibold text-[var(--fg)] mb-4">Tags</h2>

                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-[var(--accent)]/20 text-[var(--accent-fg)] border border-[var(--accent)]/30"
                    >
                      <span className="mr-1">#</span>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Actions Section (for mobile) */}
            {isOwner && (
              <div className="border-t border-[var(--border)] px-6 py-6 sm:px-8 sm:hidden">
                <h2 className="text-lg font-semibold text-[var(--fg)] mb-4">Actions</h2>

                <div className="flex space-x-3">
                  <Link
                    to={`/posts/edit/${post.id}`}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-[var(--border)] rounded-md text-sm font-medium text-[var(--fg)] bg-[var(--surface)] hover:bg-[var(--surface-alt)]"
                  >
                    <PencilIcon className="h-4 w-4 mr-2" />
                    Edit User
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex-1 inline-flex justify-center items-center px-4 py-2 border border-[var(--accent)]/20 rounded-md text-sm font-medium text-[var(--accent-fg)] bg-[var(--surface)] hover:bg-[var(--accent)]/10"
                  >
                    <TrashIcon className="h-4 w-4 mr-2" />
                    Delete User
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Info Card */}
        <div className="mt-6 bg-[var(--surface-alt)] border border-[var(--border)] rounded-lg p-4">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <InformationCircleIcon className="h-5 w-5 text-[var(--accent)]" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-[var(--accent-fg)]">
                This user profile was created through the CadastRAR system. All information is
                managed securely and can be updated by the user owner.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
