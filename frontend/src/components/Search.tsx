import { useFetchDocuments } from '../hooks/useFetchDocuments';
import { useQuery } from '../hooks/useQuery';
import { Link } from 'react-router-dom';
import SearchDetail from '../pages/SearchDetail';

export default function Search() {
  const query = useQuery();
  const search = query.get('q');

  const { documents: posts } = useFetchDocuments('posts', search);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--surface-alt)] p-4">
      <h1 className="text-3xl font-bold text-[var(--fg)] mb-6">Search Results: {search}</h1>
      <div className="w-full max-w-3xl bg-[var(--surface)] rounded-lg shadow-md p-6">
        {posts && posts.length === 0 && (
          <div className="text-center">
            <p className="text-lg text-[var(--fg)] mb-4">
              Could not find any match for this search
            </p>
            <Link
              to="/submissions"
              className="inline-block py-2 px-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)]
               text-[var(--accent-fg)] rounded-[var(--radius)] font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]  "
            >
              Back
            </Link>
          </div>
        )}
        {posts && posts.length > 0 && (
          <div className="space-y-4">
            {posts.map((post) => (
              <SearchDetail key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
