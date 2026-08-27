import { Link } from 'react-router-dom';
import { FirestoreDocument } from '../types/common';

export default function SearchDetail({ post }: { post: FirestoreDocument }) {
  return (
    <li className="flex flex-wrap items-center gap-5 border-b border-[var(--border-hairline)] py-5">
      <img
        src={post.image}
        alt=""
        className="h-16 w-16 flex-shrink-0 rounded-[var(--radius)] border border-[var(--border-hairline)] object-cover"
        loading="lazy"
      />
      <div className="min-w-0 flex-1">
        <Link
          to={`/posts/${post.id}`}
          className="focus-ring rounded-[var(--radius)] font-display text-xl font-medium text-[var(--fg)] hover:text-[var(--accent)]"
        >
          {post.title}
        </Link>
        <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-[var(--fg-subtle)]">
          {post.createdBy}
          {post.tags?.length ? ` · ${post.tags.slice(0, 3).join(' · ')}` : ''}
        </p>
      </div>
    </li>
  );
}
