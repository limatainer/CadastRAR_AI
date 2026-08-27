import { Link } from 'react-router-dom';
import { useFetchDocuments } from '../hooks/useFetchDocuments';
import { useQuery } from '../hooks/useQuery';
import SearchDetail from '../pages/SearchDetail';

export default function Search() {
  const query = useQuery();
  const search = query.get('q');
  const { documents: posts } = useFetchDocuments('posts', search);

  return (
    <div className="section">
      <div className="shell">
        <p className="eyebrow">Search</p>
        <h1 className="mt-2 font-display text-4xl font-semibold tracking-display text-[var(--fg)]">
          {search}
        </h1>

        {posts && posts.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-[var(--fg-muted)]">No records match that tag.</p>
            <Link to="/submissions" className="btn mt-6 px-5 py-2.5">
              Back to records
            </Link>
          </div>
        ) : null}

        {posts && posts.length > 0 ? (
          <ul className="mt-10">
            {posts.map((post) => (
              <SearchDetail key={post.id} post={post} />
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
