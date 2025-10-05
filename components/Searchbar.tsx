// components/SearchBar.tsx
'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import useDebounce from '../hooks/useDebounce';

type User = { id: number; name?: string | null; username?: string | null; image?: string | null };
type Post = { id: number; title?: string | null; content?: string | null; likesCount?: number; author?: User };

export default function SearchBar() {
  const [term, setTerm] = useState('');
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const debounced = useDebounce(term, 300);
  const router = useRouter();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!debounced) {
      setUsers([]);
      setPosts([]);
      return;
    }
    setLoading(true);
    fetch(`/api/search?query=${encodeURIComponent(debounced)}&type=all&limit=6`)
      .then((r) => r.json())
      .then((data) => {
        setUsers(data.users ?? []);
        setPosts(data.posts ?? []);
      })
      .catch((e) => {
        console.error('search error', e);
      })
      .finally(() => {
        setLoading(false);
        setOpen(true);
      });
  }, [debounced]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (!(e.target instanceof Node)) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDoc);
    return () => document.removeEventListener('click', onDoc);
  }, []);

  function onSubmit(e?: React.FormEvent) {
    e?.preventDefault();
    if (!term.trim()) return;
    router.push(`/explore?query=${encodeURIComponent(term.trim())}`);
    setOpen(false);
  }

  return (
    <div ref={ref} className="relative w-full max-w-xl">
      <form onSubmit={onSubmit} className="flex items-center">
        <input
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          onFocus={() => term && setOpen(true)}
          placeholder="Search users, posts, files..."
          className="w-full rounded-lg border px-4 py-2 bg-black/60 text-white placeholder:text-gray-400"
        />
        <button type="submit" className="ml-2 rounded px-3 py-2 bg-gray-700 text-white">
          🔍
        </button>
      </form>

      {open && (users.length > 0 || posts.length > 0) && (
        <div className="absolute right-0 left-0 mt-2 z-50 max-h-80 overflow-auto rounded bg-white/5 backdrop-blur p-2 shadow-lg">
          {loading && <div className="py-2 px-3 text-sm">Searching…</div>}
          {users.length > 0 && (
            <div className="mb-2">
              <div className="text-xs px-3 text-gray-300">People</div>
              {users.map((u) => (
                <div key={u.id} className="cursor-pointer flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded"
                  onClick={() => router.push(`/profile/${u.id}`)}>
                  <img src={u.image ?? '/default-avatar.png'} alt="" className="h-8 w-8 rounded-full object-cover"/>
                  <div>
                    <div className="text-sm">{u.name ?? u.username}</div>
                    <div className="text-xs text-gray-400">@{u.username}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {posts.length > 0 && (
            <div>
              <div className="text-xs px-3 text-gray-300">Posts</div>
              {posts.map((p) => (
                <div key={p.id} className="cursor-pointer px-3 py-2 hover:bg-white/10 rounded" onClick={() => router.push(`/post/${p.id}`)}>
                  <div className="text-sm font-medium">{p.title ?? p.content?.slice(0, 80) ?? 'Untitled'}</div>
                  <div className="text-xs text-gray-400">{p.author?.name ?? `@${p.author?.username}` } • {p.likesCount ?? 0} likes</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
