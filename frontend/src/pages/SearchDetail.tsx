import { Link } from 'react-router-dom';
import { FirestoreDocument } from '../types/common';

interface SearchDetailProps {
  post: FirestoreDocument;
}

export default function SearchDetail({ post }: SearchDetailProps) {
  return (
    <div className="bg-[var(--surface)] rounded-lg shadow-md p-4 mb-4">
      <div className="flex items-center mb-4">
        <img src={post.image} alt={post.title} className="w-24 h-24 object-cover rounded-lg mr-4" />
        <h2 className="text-2xl font-bold text-[var(--fg)]">{post.title}</h2>
      </div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-[var(--fg)]">por: {post.createdBy}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag: string) => (
            <p
              key={tag}
              className="inline-block bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 rounded-full text-sm font-medium"
            >
              <span>#</span>
              {tag}
            </p>
          ))}
        </div>
      </div>
      <Link
        to={`/posts/${post.id}`}
        className="inline-block py-2 px-4 bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-[var(--accent-fg)] rounded-[var(--radius)] font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-[var(--accent)]  "
      >
        Ver mais
      </Link>
    </div>
  );
}
