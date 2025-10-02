import { useState } from 'react';
import { useInsertDocument } from '../hooks/useInsertDocument';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../contexts/AuthContext';
import { generateUserDescription, isGeminiConfigured } from '../services/gemini';
import { SparklesIcon } from '@heroicons/react/24/outline';

export default function Registration() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState('');
  const [formError, setFormError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const { user } = useAuthValue();
  const navigate = useNavigate();
  const { insertDocument, response } = useInsertDocument('posts');

  const handleGenerateDescription = async () => {
    if (!title || !tags) {
      setFormError('Please enter a name and at least one tag before generating description');
      return;
    }

    if (!isGeminiConfigured()) {
      setFormError('AI feature not configured. Please add VITE_GEMINI_API_KEY to your .env file');
      return;
    }

    setIsGenerating(true);
    setFormError('');

    try {
      const tagsArray = tags.split(',').map((tag) => tag.trim());
      const description = await generateUserDescription(title, tagsArray);
      setBody(description);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Failed to generate description');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    try {
      new URL(image);
    } catch (error) {
      setFormError(`The image must be a valid URL. ${error}`);
      return;
    }

    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) {
      setFormError('All fields are required');
      return;
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user?.uid,
      createdBy: user?.displayName,
    });

    navigate('/submissions');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h2 className="mb-6 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
        Register user
      </h2>
      <p className="mb-6 text-lg font-light text-gray-500 dark:text-gray-400">
        User information
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Name:
          </label>
          <input
            type="text"
            required
            placeholder="User name"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Avatar Image URL:
          </label>
          <input
            type="text"
            required
            placeholder="Add a image url"
            onChange={(e) => setImage(e.target.value)}
            value={image}
            className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm font-medium text-gray-900 dark:text-white">
              Details:
            </label>
            {isGeminiConfigured() && (
              <button
                type="button"
                onClick={handleGenerateDescription}
                disabled={isGenerating || !title || !tags}
                className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <SparklesIcon className="w-4 h-4 mr-1" />
                {isGenerating ? 'Generating...' : 'Generate with AI'}
              </button>
            )}
          </div>
          <textarea
            required
            placeholder="Person description (or use AI to generate)"
            onChange={(e) => setBody(e.target.value)}
            value={body}
            rows={4}
            className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          ></textarea>
          {isGeminiConfigured() && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Tip: Fill in name and tags, then click "Generate with AI" for an auto-generated description
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Tags:
          </label>
          <input
            type="text"
            required
            placeholder="Add key tags separated by comas"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
            className="w-full px-3 py-2 border rounded-md bg-gray-100 dark:bg-gray-700 dark:text-white"
          />
        </div>
        {!response.loading && (
          <button className="inline-flex justify-center items-center py-2 px-4 m-2 text-base font-medium text-white rounded-lg bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800">
            Submit
          </button>
        )}
        {response.loading && (
          <button
            className="inline-flex justify-center items-center py-2 px-4 m-2 text-base font-medium text-white rounded-lg bg-blue-600 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            disabled
          >
            Loading...
          </button>
        )}
        {(response.error || formError) && (
          <p className="mt-4 text-red-500 dark:text-red-400">
            {response.error || formError}
          </p>
        )}
      </form>
    </div>
  );
}
