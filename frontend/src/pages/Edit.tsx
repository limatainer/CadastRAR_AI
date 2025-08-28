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
  EyeIcon
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
    tags: ''
  });
  
  const [formError, setFormError] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const [showPreview, setShowPreview] = useState(false);
  const [touched, setTouched] = useState({
    title: false,
    image: false,
    body: false,
    tags: false
  });

  useEffect(() => {
    if (post) {
      const newFormData = {
        title: post.title || '',
        image: post.image || '',
        body: post.body || '',
        tags: post.tags?.join(', ') || ''
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
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'image') {
      setImagePreview(value);
    }

    if (formError) {
      setFormError('');
    }
  };

  const handleInputBlur = (field: string) => {
    setTouched(prev => ({
      ...prev,
      [field]: true
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
      tags: true
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
        updatedAt: new Date()
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
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <ExclamationTriangleIcon className="h-24 w-24 text-red-400 mx-auto" />
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            {error || 'User not found'}
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            The user you are trying to edit does not exist or you do not have permission to edit it.
          </p>
          <div className="mt-6">
            <Link
              to="/submissions"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              to={`/posts/${id}`}
              className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to Details
            </Link>
            
            <div className="flex items-center space-x-2">
              <Link
                to={`/posts/${id}`}
                className="inline-flex items-center px-3 py-1.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
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
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
          {/* Form Header */}
          <div className="px-6 py-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Edit User: {post.title}
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Update the information below to modify the user profile.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <UserIcon className="h-4 w-4 inline mr-1.5" />
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                onBlur={() => handleInputBlur('title')}
                placeholder="Enter user's full name"
                className={`block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm transition-colors duration-200 ${
                  fieldErrors.title
                    ? 'ring-red-300 dark:ring-red-600 focus:ring-red-500 bg-red-50 dark:bg-red-900/10'
                    : 'ring-gray-300 dark:ring-gray-600 focus:ring-purple-600 bg-white dark:bg-gray-700'
                }`}
              />
              {fieldErrors.title && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {fieldErrors.title}
                </p>
              )}
            </div>

            {/* Image URL Field */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                className={`block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm transition-colors duration-200 ${
                  fieldErrors.image
                    ? 'ring-red-300 dark:ring-red-600 focus:ring-red-500 bg-red-50 dark:bg-red-900/10'
                    : 'ring-gray-300 dark:ring-gray-600 focus:ring-purple-600 bg-white dark:bg-gray-700'
                }`}
              />
              {fieldErrors.image && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {fieldErrors.image}
                </p>
              )}
              
              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Preview:</span>
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-500"
                    >
                      {showPreview ? 'Hide' : 'Show'} Preview
                    </button>
                  </div>
                  {showPreview && (
                    <div className="flex justify-center">
                      <img
                        src={imagePreview}
                        alt="Profile preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
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
              <label htmlFor="body" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <DocumentTextIcon className="h-4 w-4 inline mr-1.5" />
                User Details <span className="text-red-500">*</span>
              </label>
              <textarea
                id="body"
                rows={4}
                value={formData.body}
                onChange={(e) => handleInputChange('body', e.target.value)}
                onBlur={() => handleInputBlur('body')}
                placeholder="Enter detailed information about the user..."
                className={`block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm resize-none transition-colors duration-200 ${
                  fieldErrors.body
                    ? 'ring-red-300 dark:ring-red-600 focus:ring-red-500 bg-red-50 dark:bg-red-900/10'
                    : 'ring-gray-300 dark:ring-gray-600 focus:ring-purple-600 bg-white dark:bg-gray-700'
                }`}
              />
              {fieldErrors.body && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {fieldErrors.body}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                {formData.body.length}/500 characters
              </p>
            </div>

            {/* Tags Field */}
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                <TagIcon className="h-4 w-4 inline mr-1.5" />
                Tags <span className="text-red-500">*</span>
              </label>
              <input
                id="tags"
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                onBlur={() => handleInputBlur('tags')}
                placeholder="tag1, tag2, tag3"
                className={`block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm transition-colors duration-200 ${
                  fieldErrors.tags
                    ? 'ring-red-300 dark:ring-red-600 focus:ring-red-500 bg-red-50 dark:bg-red-900/10'
                    : 'ring-gray-300 dark:ring-gray-600 focus:ring-purple-600 bg-white dark:bg-gray-700'
                }`}
              />
              {fieldErrors.tags && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
                  <ExclamationTriangleIcon className="h-4 w-4 mr-1" />
                  {fieldErrors.tags}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Separate tags with commas (e.g., developer, frontend, react)
              </p>
            </div>

            {/* Error Messages */}
            {(response.error || formError) && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md p-4">
                <div className="flex items-center">
                  <ExclamationTriangleIcon className="h-5 w-5 text-red-400 mr-2" />
                  <p className="text-sm text-red-800 dark:text-red-200">
                    {response.error || formError}
                  </p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {response.loading === false && !response.error && !formError && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md p-4">
                <div className="flex items-center">
                  <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
                  <p className="text-sm text-green-800 dark:text-green-200">
                    User updated successfully!
                  </p>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row-reverse gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
              <button
                type="submit"
                disabled={response.loading || hasErrors}
                className={`inline-flex justify-center items-center px-6 py-2.5 border border-transparent rounded-md text-sm font-medium text-white shadow-sm transition-colors duration-200 ${
                  response.loading || hasErrors
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
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
                className="inline-flex justify-center items-center px-6 py-2.5 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200"
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
