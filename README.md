# VI*dev*X

> **VI**sual **dev**eloper e**X**perience — платформа обміну досвідом для розробників

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?logo=tailwindcss)](https://tailwindcss.com)

---

## Що таке VIdevX?

VIdevX — це відкрита платформа для розробників, де можна:

- 📝 **Публікувати** статті, туторіали та code-сніпети
- 🏖️ **Запускати код** у браузері на 16+ мовах програмування (пісочниця)
- 🔐 **Автентифікуватись** через GitHub OAuth
- 🌙 **Перемикати** темну/світлу тему

---

## Функціональність

### 🏖️ Пісочниця (Code Sandbox)

Виконує код прямо в браузері без встановлення будь-чого. Підтримувані мови:

| Мова | Runtime | Підсвітка синтаксису |
|------|---------|----------------------|
| JavaScript | Node.js | ✅ |
| TypeScript | ts-node | ✅ |
| Python | CPython 3 | ✅ |
| Java | OpenJDK | ✅ |
| C | GCC | ✅ |
| C++ | G++ | ✅ |
| Go | Go | ✅ |
| Rust | rustc | ✅ |
| PHP | PHP CLI | ✅ |
| Ruby | MRI Ruby | ✅ |
| C# | .NET / Mono | ✅ |
| Bash | Bash | ✅ |
| Lua | Lua | ✅ |
| R | R | ✅ |
| Kotlin | kotlinc | ✅ |
| SQL | SQLite 3 | ✅ |

Підтримується **stdin**, відображається **exit-code** та час виконання.  
Код виконується через публічний [Piston API](https://github.com/engineer-man/piston) (emkc.org).

### 📰 Дашборд

Стрічка публікацій з фільтрацією за типом (`Туторіал`, `Стаття`, `Сніпет`).  
Без підключення Supabase автоматично активується **демо-режим** з зразковими публікаціями.

### ✍️ Редактор постів

Багатий WYSIWYG-редактор на базі [Tiptap](https://tiptap.dev) із підсвіткою коду для 20+ мов (highlight.js + lowlight).

---

## Швидкий старт

### Вимоги

- Node.js ≥ 20
- npm ≥ 10

### Встановлення

```bash
git clone https://github.com/vizarce/videvx.git
cd videvx
npm install
```

### Налаштування середовища

```bash
cp .env.example .env
```

Відкрийте `.env` та заповніть значення Supabase (або залиште плейсхолдери для демо-режиму):

```env
VITE_SUPABASE_URL=https://<your-project>.supabase.co
VITE_SUPABASE_ANON_KEY=<your-anon-key>
```

> **Без Supabase?** Застосунок запуститься у **демо-режимі** — пісочниця та дашборд (зразкові дані) працюватимуть повністю.

### Запуск

```bash
npm run dev
```

Відкрийте [http://localhost:5173](http://localhost:5173).

---

## Supabase (база даних)

Якщо хочете повноцінну роботу з постами, виконайте в [SQL Editor](https://app.supabase.com) Supabase:

```sql
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text,
  post_type text check (post_type in ('article','tutorial','snippet')) default 'article',
  tags text[] default '{}',
  is_published boolean default false,
  is_private boolean default false,
  moderation_status text default 'pending',
  author_id uuid references auth.users(id),
  created_at timestamptz default now()
);

-- Row Level Security
alter table posts enable row level security;

create policy "Public reads approved posts"
  on posts for select
  using (is_published = true and moderation_status = 'approved' and is_private = false);

create policy "Authors manage own posts"
  on posts for all
  using (auth.uid() = author_id);
```

Увімкніть GitHub OAuth: **Authentication → Providers → GitHub**.

---

## Скрипти

| Команда | Дія |
|---------|-----|
| `npm run dev` | Запуск dev-сервера |
| `npm run build` | Production build |
| `npm run preview` | Попередній перегляд build |
| `npm run lint` | Перевірка ESLint |

---

## Стек технологій

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** — стилізація
- **CodeMirror 6** — редактор коду у пісочниці (16+ мов)
- **Tiptap 3** — WYSIWYG редактор постів
- **Supabase** — PostgreSQL база даних + GitHub OAuth
- **Piston API** — виконання коду на сервері
- **React Router v7** — маршрутизація
- **lucide-react** — іконки

---

## Структура проекту

```
src/
├── components/
│   ├── Layout.tsx          # Навбар + обгортка
│   └── theme-provider.tsx  # Темна/світла тема
├── context/
│   └── AuthContext.tsx     # Supabase аутентифікація
├── lib/
│   ├── supabase.ts         # Supabase клієнт
│   └── mockData.ts         # Зразкові дані для демо-режиму
└── pages/
    ├── Dashboard.tsx       # Стрічка публікацій
    ├── Login.tsx           # Сторінка входу
    ├── PostEditor.tsx      # Редактор постів
    └── Sandbox.tsx         # Пісочниця
```

---

## Внесок у проект

Деталі у [CONTRIBUTING.md](CONTRIBUTING.md).

## Безпека

Деталі у [SECURITY.md](SECURITY.md).

## Ліцензія

[MIT](LICENSE) © 2026 vizarce

