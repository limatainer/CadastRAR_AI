import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useFetchDocument } from '../hooks/useFetchDocument';
import { useUpdateDocument } from '../hooks/useUpdateDocument';
import { useAuthValue } from '../contexts/AuthContext';
import {
  ArrowLeftIcon,
  PhotoIcon,
  UserIcon,
  TagIcon,
  DocumentTextIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  EyeIcon,
} from '@heroicons/react/24/outline';

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthValue();
  const { document: post, loading, error } = useFetchDocument('posts', id || '');
  const { updateDocument, response } = useUpdateDocument('posts');

  const [formData, setFormData] = useState({
    title: '',
    image: '',
    body: '',
    tags: '',
  });

  const [formError, setFormError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [touched, setTouched] = useState({
    title: false,
    image: false,
    body: false,
    tags: false,
  });

  useEffect(() => {
    if (post) {
      const newFormData = {
        title: post.title || '',
        image: post.image || '',
        body: post.body || '',
        tags: post.tags?.join(', ') || '',
      };
      setFormData(newFormData);
      setImagePreview(post.image || '');
    }
  }, [post]);

  useEffect(() => {
    if (post && user && post.uid !== user.uid) {
      navigate('/submissions');
    }
  }, [post, user, navigate]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === 'image') {
      setImagePreview(value);
    }

    if (formError) {
      setFormError('');
    }
  };

  const handleInputBlur = (field: string) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const isValidImageUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const getFieldErrors = () => {
    const errors: Record<string, string> = {};

    if (touched.title && !formData.title.trim()) {
      errors.title = 'Name is required';
    }

    if (touched.image && formData.image) {
      if (!isValidImageUrl(formData.image)) {
        errors.image = 'Please enter a valid URL';
      }
    }

    if (touched.body && !formData.body.trim()) {
      errors.body = 'User details are required';
    }

    if (touched.tags && !formData.tags.trim()) {
      errors.tags = 'At least one tag is required';
    }

    return errors;
  };

  const fieldErrors = getFieldErrors();
  const hasErrors = Object.keys(fieldErrors).length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    setTouched({
      title: true,
      image: true,
      body: true,
      tags: true,
    });

    if (!formData.title.trim() || !formData.body.trim() || !formData.tags.trim()) {
      setFormError('Please fill in all required fields');
      return;
    }

    if (formData.image && !isValidImageUrl(formData.image)) {
      setFormError('Please enter a valid image URL');
      return;
    }

    try {
      const tagsArray = formData.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const updateData = {
        title: formData.title.trim(),
        image: formData.image.trim(),
        body: formData.body.trim(),
        tags: tagsArray,
        updatedAt: new Date(),
      };

      await updateDocument(id, updateData);

      if (!response.error) {
        navigate('/submissions');
      }
    } catch (error) {
      setFormError('Failed to update user. Please try again.');
      console.error('Update error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-[var(--fg-muted)]">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-24 w-24 text-[var(--accent-fg)] mx-auto" />
          <h3 className="mt-4 text-lg font-medium text-[var(--fg)]">{error || 'User not found'}</h3>
          <p className="mt-2 text-sm text-[var(--fg-muted)]">
            The user you are trying to edit does not exist or you do not have permission to edit it.
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
      {/* Header */}
      <div className="bg-[var(--surface)] shadow-sm border-b border-[var(--border)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to={`/posts/${id}`}
              className="inline-flex items-center text-sm font-medium text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Details
            </Link>

            <div className="flex items-center space-x-2">
              <Link
                to={`/posts/${id}`}
                className="inline-flex items-center px-3 py-1.5 border border-[var(--border)] rounded-md text-sm font-medium text-[var(--fg)] bg-[var(--surface)] hover:bg-[var(--surface-alt)]"
              >
                <EyeIcon className="h-4 w-4 mr-1.5" />
                Preview
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[var(--surface)] rounded-lg shadow-sm">
          {/* Form Header */}
          <div className="px-6 py-6 border-b border-[var(--border)]">
            <h1 className="text-2xl font-bold text-[var(--fg)]">Edit User: {post.title}</h1>
            <p className="mt-1 text-sm text-[var(--fg-muted)]">
              Update the information below to modify the user profile.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-[var(--fg)] mb-2">
                <UserIcon className="h-4 w-4 inline mr-1.5" />
                Name <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                onBlur={() => handleInputBlur('title')}
                placeholder="Enter user's full name"
                className={`block w-full rounded-md border-0 py-2.5 px-3 text-[var(--fg)] shadow-sm ring-1 ring-inset placeholder:text-[var(--fg-subtle)] focus:ring-2 focus:ring-inset sm:text-sm transition-colors duration-200 ${
                  fieldErrors.title
                    ? 'ring-[var(--accent)]/30 focus:ring-[var(--accent)] bg-[var(--accent)]/10'
                    : 'ring-[var(--border)] focus:ring-[var(--accent)] bg-[var(--surface)]'
                }`}
              />
              {fieldErrors.title && (
                <p className="mt-1 text-sm text-[var(--accent-fg)] flex items-center">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {fieldErrors.title}
                </p>
              )}
            </div>

            {/* Image URL Field */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-[var(--fg)] mb-2">
                <PhotoIcon className="h-4 w-4 inline mr-1.5" />
                Profile Image URL
              </label>
              <input
                id="image"
                type="url"
                value={formData.image}
                onChange={(e) => handleInputChange('image', e.target.value)}
                onBlur={() => handleInputBlur('image')}
                placeholder="https://example.com/image.jpg"
                className={`block w-full rounded-md border-0 py-2.5 px-3 text-[var(--fg)] shadow-sm ring-1 ring-inset placeholder:text-[var(--fg-subtle)] focus:ring-2 focus:ring-inset sm:text-sm transition-colors duration-200 ${
                  fieldErrors.image
                    ? 'ring-[var(--accent)]/30 focus:ring-[var(--accent)] bg-[var(--accent)]/10'
                    : 'ring-[var(--border)] focus:ring-[var(--accent)] bg-[var(--surface)]'
                }`}
              />
              {fieldErrors.image && (
                <p className="mt-1 text-sm text-[var(--accent-fg)] flex items-center">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {fieldErrors.image}
                </p>
              )}

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-[var(--fg)]">Preview:</span>
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className="text-sm text-[var(--accent)] hover:text-[var(--accent-hover)]"
                    >
                      {showPreview ? 'Hide' : 'Show'} Preview
                    </button>
                  </div>
                  {showPreview && (
                    <div className="flex justify-center">
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 border-[var(--border)]"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.title)}&background=8b5cf6&color=fff&size=128`;
                        }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Details Field */}
            <div>
              <label htmlFor="body" className="block text-sm font-medium text-[var(--fg)] mb-2">
                <DocumentTextIcon className="h-4 w-4 inline mr-1.5" />
                User Details <span className="text-[var(--accent)]">*</span>
              </label>
              <textarea
                id="body"
                rows={4}
                value={formData.body}
                onChange={(e) => handleInputChange('body', e.target.value)}
                onBlur={() => handleInputBlur('body')}
                placeholder="Enter detailed information about the user..."
                className={`block w-full rounded-md border-0 py-2.5 px-3 text-[var(--fg)] shadow-sm ring-1 ring-inset placeholder:text-[var(--fg-subtle)] focus:ring-2 focus:ring-inset sm:text-sm resize-none transition-colors duration-200 ${
                  fieldErrors.body
                    ? 'ring-[var(--accent)]/30 focus:ring-[var(--accent)] bg-[var(--accent)]/10'
                    : 'ring-[var(--border)] focus:ring-[var(--accent)] bg-[var(--surface)]'
                }`}
              />
              {fieldErrors.body && (
                <p className="mt-1 text-sm text-[var(--accent-fg)] flex items-center">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {fieldErrors.body}
                </p>
              )}
              <p className="mt-1 text-xs text-[var(--fg-muted)]">
                {formData.body.length}/500 characters
              </p>
            </div>

            {/* Tags Field */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-[var(--fg)] mb-2">
                <TagIcon className="h-4 w-4 inline mr-1.5" />
                Tags <span className="text-[var(--accent)]">*</span>
              </label>
              <input
                id="tags"
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                onBlur={() => handleInputBlur('tags')}
                placeholder="tag1, tag2, tag3"
                className={`block w-full rounded-md border-0 py-2.5 px-3 text-[var(--fg)] shadow-sm ring-1 ring-inset placeholder:text-[var(--fg-subtle)] focus:ring-2 focus:ring-inset sm:text-sm transition-colors duration-200 ${
                  fieldErrors.tags
                    ? 'ring-[var(--accent)]/30 focus:ring-[var(--accent)] bg-[var(--accent)]/10'
                    : 'ring-[var(--border)] focus:ring-[var(--accent)] bg-[var(--surface)]'
                }`}
              />
              {fieldErrors.tags && (
                <p className="mt-1 text-sm text-[var(--accent-fg)] flex items-center">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {fieldErrors.tags}
                </p>
              )}
              <p className="mt-1 text-xs text-[var(--fg-muted)]">
                Separate tags with commas (e.g., developer, frontend, react)
              </p>
            </div>

            {/* Error Messages */}
            {(response.error || formError) && (
              <div className="bg-[var(--accent)]/10 border border-red-200  rounded-md p-4">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 text-[var(--accent-fg)] mr-2" />
                  <p className="text-sm text-[var(--accent-fg)]">{response.error || formError}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {response.loading === false && !response.error && !formError && (
              <div className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-md p-4">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-[var(--accent-fg)] mr-2" />
                  <p className="text-sm text-[var(--accent-fg)]">User updated successfully!</p>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row-reverse gap-3 pt-6 border-t border-[var(--border)]">
              <button
                type="submit"
                disabled={response.loading || hasErrors}
                className={`inline-flex justify-center items-center px-6 py-2.5 border border-transparent rounded-md text-sm font-medium text-white shadow-sm transition-colors duration-200 ${
                  response.loading || hasErrors
                    ? 'bg-[var(--fg-subtle)] cursor-not-allowed'
                    : 'bg-[var(--accent)] hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2  focus:ring-[var(--accent)]'
                }`}
              >
                {response.loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Updating...
                  </>
                ) : (
                  'Update User'
                )}
              </button>

              <Link
                to={`/posts/${id}`}
                className="inline-flex justify-center items-center px-6 py-2.5 border border-[var(--border)] rounded-md text-sm font-medium text-[var(--fg)] bg-[var(--surface)] hover:bg-[var(--surface-alt)] transition-colors duration-200"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
