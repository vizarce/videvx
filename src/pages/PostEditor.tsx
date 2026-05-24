// src/pages/PostEditor.tsx
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import 'highlight.js/styles/atom-one-dark.css';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Імпортуємо мови з highlight.js
import js from 'highlight.js/lib/languages/javascript';
import python from 'highlight.js/lib/languages/python';
import java from 'highlight.js/lib/languages/java';
import cpp from 'highlight.js/lib/languages/cpp';
import go from 'highlight.js/lib/languages/go';
import rust from 'highlight.js/lib/languages/rust';
import csharp from 'highlight.js/lib/languages/csharp';
import php from 'highlight.js/lib/languages/php';
import ruby from 'highlight.js/lib/languages/ruby';
import swift from 'highlight.js/lib/languages/swift';
import kotlin from 'highlight.js/lib/languages/kotlin';
import sql from 'highlight.js/lib/languages/sql';
import html from 'highlight.js/lib/languages/xml';      // HTML
import css from 'highlight.js/lib/languages/css';
import scss from 'highlight.js/lib/languages/scss';
import json from 'highlight.js/lib/languages/json';
import yaml from 'highlight.js/lib/languages/yaml';
import markdown from 'highlight.js/lib/languages/markdown';
import bash from 'highlight.js/lib/languages/bash';
import powershell from 'highlight.js/lib/languages/powershell';
import dockerfile from 'highlight.js/lib/languages/dockerfile';
import nginx from 'highlight.js/lib/languages/nginx';

// Створюємо екземпляр lowlight та реєструємо мови
const lowlight = createLowlight();
lowlight.register('javascript', js);
lowlight.register('python', python);
lowlight.register('java', java);
lowlight.register('cpp', cpp);
lowlight.register('go', go);
lowlight.register('rust', rust);
lowlight.register('csharp', csharp);
lowlight.register('go', go);
lowlight.register('rust', rust);
lowlight.register('php', php);
lowlight.register('ruby', ruby);
lowlight.register('swift', swift);
lowlight.register('kotlin', kotlin);
lowlight.register('sql', sql);
lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('scss', scss);
lowlight.register('json', json);
lowlight.register('yaml', yaml);
lowlight.register('markdown', markdown);
lowlight.register('bash', bash);
lowlight.register('powershell', powershell);
lowlight.register('dockerfile', dockerfile);
lowlight.register('nginx', nginx);

export default function PostEditor() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [postType, setPostType] = useState('article');
  const [isPrivate, setIsPrivate] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      CodeBlockLowlight.configure({ lowlight }), // передаємо підготовлений lowlight
    ],
    content: '<p>Напишіть ваш контент або вставте код...</p>',
  });

  const handlePublish = async () => {
    if (!user) return;
    const content = editor?.getHTML();
    const { error } = await supabase.from('posts').insert({
      title,
      content,
      post_type: postType,
      is_private: isPrivate,
      is_published: true,
      moderation_status: isPrivate ? 'approved' : 'pending',
      author_id: user.id,
      tags: ['react', 'demo'],
    });
    if (!error) navigate('/');
    else console.error(error);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <input
        type="text"
        placeholder="Заголовок..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-2xl font-bold focus:outline-none focus:border-cyan-500"
      />
      <div className="flex gap-4">
        <select value={postType} onChange={(e) => setPostType(e.target.value)} className="bg-white/10 rounded p-2">
          <option value="article">Стаття</option>
          <option value="tutorial">Туторіал</option>
          <option value="snippet">Код-сніпет</option>
        </select>
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={isPrivate} onChange={(e) => setIsPrivate(e.target.checked)} />
          Приватна нотатка
        </label>
      </div>
      <div className="prose prose-invert max-w-none border border-white/10 rounded-lg p-4 bg-black/20">
        <EditorContent editor={editor} />
      </div>
      <button onClick={handlePublish} className="bg-cyan-500 px-6 py-2 rounded-lg font-mono hover:bg-cyan-600 transition">
        Опублікувати
      </button>
    </div>
  );
}