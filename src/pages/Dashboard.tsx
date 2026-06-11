// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { MOCK_POSTS } from '../lib/mockData';
import type { MockPost } from '../lib/mockData';
import { Code, BookOpen, FileText, Hash, FlaskConical } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  post_type: string;
  tags: string[];
  created_at: string;
  excerpt?: string;
  author?: string;
}

// Check if Supabase is configured (URL is a real value, not placeholder)
const IS_SUPABASE_CONFIGURED =
  import.meta.env.VITE_SUPABASE_URL &&
  import.meta.env.VITE_SUPABASE_URL !== 'YOUR_SUPABASE_URL';

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState('all');
  const [demoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!IS_SUPABASE_CONFIGURED) {
        const filtered = filter === 'all'
          ? MOCK_POSTS
          : MOCK_POSTS.filter((p) => p.post_type === filter);
        setPosts(filtered);
        setDemoMode(true);
        return;
      }

      try {
        let query = supabase
          .from('posts')
          .select('*')
          .eq('is_published', true)
          .eq('moderation_status', 'approved');
        if (filter !== 'all') query = query.eq('post_type', filter);
        const { data, error } = await query.order('created_at', { ascending: false });

        if (error || !data || data.length === 0) {
          // Fall back to mock data if query fails or returns nothing
          const filtered = filter === 'all'
            ? MOCK_POSTS
            : MOCK_POSTS.filter((p: MockPost) => p.post_type === filter);
          setPosts(filtered);
          setDemoMode(true);
        } else {
          setPosts(data);
          setDemoMode(false);
        }
      } catch {
        const filtered = filter === 'all'
          ? MOCK_POSTS
          : MOCK_POSTS.filter((p: MockPost) => p.post_type === filter);
        setPosts(filtered);
        setDemoMode(true);
      }
    };
    fetchPosts();
  }, [filter]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'tutorial': return <BookOpen className="text-cyan-400 w-4 h-4" />;
      case 'snippet': return <Code className="text-purple-400 w-4 h-4" />;
      default: return <FileText className="text-white/70 w-4 h-4" />;
    }
  };

  const typeLabel: Record<string, string> = {
    tutorial: 'Туторіал',
    article: 'Стаття',
    snippet: 'Сніпет',
  };

  return (
    <div>
      {demoMode && (
        <div className="flex items-center gap-2 mb-6 text-sm font-mono backdrop-blur-md bg-amber-500/10 border border-amber-500/30 rounded-lg px-4 py-2 text-amber-300">
          <FlaskConical className="w-4 h-4 flex-shrink-0" />
          Демо-режим — показуються зразкові публікації. Підключіть Supabase для реального контенту.
        </div>
      )}

      <div className="flex gap-3 mb-8 flex-wrap">
        {['all', 'tutorial', 'article', 'snippet'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full font-mono text-sm transition backdrop-blur-sm ${
              filter === type ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {type === 'all' ? 'ВСЕ' : typeLabel[type]?.toUpperCase() ?? type.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all hover:scale-[1.02] group cursor-pointer"
          >
            <div className="flex items-center gap-2 mb-3">
              {getIcon(post.post_type)}
              <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded-full text-white/60">
                {typeLabel[post.post_type] ?? post.post_type}
              </span>
              <span className="text-xs font-mono text-white/30 ml-auto">
                {new Date(post.created_at).toLocaleDateString('uk-UA')}
              </span>
            </div>
            <h2 className="text-lg font-bold mb-2 group-hover:text-cyan-400 transition leading-snug">
              {post.title}
            </h2>
            {post.excerpt && (
              <p className="text-sm text-white/50 mb-3 line-clamp-2">{post.excerpt}</p>
            )}
            <div className="flex gap-2 flex-wrap mt-auto">
              {post.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-white/10 px-2 py-1 rounded-full flex items-center gap-1 text-white/60">
                  <Hash className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {posts.length === 0 && (
        <div className="text-center text-white/30 font-mono py-20">
          Публікацій не знайдено
        </div>
      )}
    </div>
  );
}