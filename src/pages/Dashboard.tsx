// src/pages/Dashboard.tsx
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Code, BookOpen, FileText, Hash } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  post_type: string;
  tags: string[];
  created_at: string;
}

export default function Dashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      let query = supabase.from('posts').select('*').eq('is_published', true).eq('moderation_status', 'approved');
      if (filter !== 'all') query = query.eq('post_type', filter);
      const { data } = await query.order('created_at', { ascending: false });
      if (data) setPosts(data);
    };
    fetchPosts();
  }, [filter]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'tutorial': return <BookOpen className="text-cyan-400" />;
      case 'snippet': return <Code className="text-purple-400" />;
      default: return <FileText className="text-white/70" />;
    }
  };

  return (
    <div>
      <div className="flex gap-4 mb-8 flex-wrap">
        {['all', 'tutorial', 'article', 'snippet'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-full font-mono text-sm transition backdrop-blur-sm ${
              filter === type ? 'bg-cyan-500 text-white shadow-lg' : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all hover:scale-[1.02] group"
          >
            <div className="flex items-center gap-2 mb-2">
              {getIcon(post.post_type)}
              <span className="text-xs font-mono text-cyan-300">{new Date(post.created_at).toLocaleDateString()}</span>
            </div>
            <h2 className="text-xl font-bold mb-2 group-hover:text-cyan-400 transition">{post.title}</h2>
            <div className="flex gap-2 mt-3">
              {post.tags?.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-white/10 px-2 py-1 rounded-full flex items-center gap-1">
                  <Hash className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}