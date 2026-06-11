// src/lib/mockData.ts
// Demo posts shown when Supabase is not configured or unreachable.

export interface MockPost {
  id: string;
  title: string;
  post_type: 'tutorial' | 'article' | 'snippet';
  tags: string[];
  created_at: string;
  excerpt?: string;
  author: string;
}

export const MOCK_POSTS: MockPost[] = [
  {
    id: '1',
    title: 'React 19 — нові можливості компілятора',
    post_type: 'tutorial',
    tags: ['react', 'javascript', 'frontend'],
    created_at: '2026-05-10T10:00:00Z',
    excerpt: 'Огляд ключових змін у React 19: автоматична мемоізація, серверні компоненти, use() хук і покращення щодо Suspense.',
    author: 'vizarce',
  },
  {
    id: '2',
    title: 'Rust ownership за 5 хвилин',
    post_type: 'article',
    tags: ['rust', 'systems', 'ownership'],
    created_at: '2026-05-14T08:30:00Z',
    excerpt: 'Коротке пояснення системи власності у Rust: borrow checker, lifetime, copy vs move.',
    author: 'vizarce',
  },
  {
    id: '3',
    title: 'useDebounce — TypeScript хук',
    post_type: 'snippet',
    tags: ['typescript', 'hooks', 'react'],
    created_at: '2026-05-18T14:20:00Z',
    excerpt: 'Простий та типізований useDebounce hook для React з налаштовуваною затримкою.',
    author: 'vizarce',
  },
  {
    id: '4',
    title: 'Docker + Go: мінімальний production image',
    post_type: 'tutorial',
    tags: ['go', 'docker', 'devops'],
    created_at: '2026-05-22T09:15:00Z',
    excerpt: 'Як зібрати Go-додаток у multi-stage Docker образ розміром менше 10 МБ.',
    author: 'vizarce',
  },
  {
    id: '5',
    title: 'SQL WINDOW FUNCTIONS — практичний гід',
    post_type: 'article',
    tags: ['sql', 'postgresql', 'data'],
    created_at: '2026-05-28T11:00:00Z',
    excerpt: 'ROW_NUMBER, RANK, LEAD, LAG, SUM OVER — реальні приклади з поясненнями.',
    author: 'vizarce',
  },
  {
    id: '6',
    title: 'Python dataclass vs Pydantic v2',
    post_type: 'article',
    tags: ['python', 'pydantic', 'typing'],
    created_at: '2026-06-01T07:45:00Z',
    excerpt: 'Порівняння dataclass і Pydantic v2 для валідації даних у Python-проектах.',
    author: 'vizarce',
  },
  {
    id: '7',
    title: 'CSS scroll-driven animations без JS',
    post_type: 'snippet',
    tags: ['css', 'animation', 'frontend'],
    created_at: '2026-06-05T15:30:00Z',
    excerpt: 'Нативні CSS scroll-driven animations: animation-timeline, view(), scroll().',
    author: 'vizarce',
  },
  {
    id: '8',
    title: 'Kotlin Coroutines: від нуля до продакшну',
    post_type: 'tutorial',
    tags: ['kotlin', 'coroutines', 'android'],
    created_at: '2026-06-08T10:00:00Z',
    excerpt: 'Покрокове введення в корутини Kotlin: launch, async, Flow, CoroutineScope.',
    author: 'vizarce',
  },
];
