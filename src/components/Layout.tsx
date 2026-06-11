// src/components/Layout.tsx
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Moon, Sun, Terminal, LogOut } from 'lucide-react';
import { useTheme } from './theme-provider';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-gray-950 dark:via-indigo-950 dark:to-gray-950 transition-colors duration-300">
      <nav className="backdrop-blur-md bg-white/10 dark:bg-black/30 border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="w-8 h-8 text-cyan-400 animate-pulse" />
            <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              VIdevX
            </span>
          </div>

          <div className="hidden md:flex gap-6 text-white/80 font-mono">
            <Link to="/" className="hover:text-cyan-400 transition">Dashboard</Link>
            <Link to="/new-post" className="hover:text-cyan-400 transition">Створити пост</Link>
            <Link to="/sandbox" className="hover:text-cyan-400 transition">Пісочниця</Link>
          </div>

          <div className="flex gap-3 items-center">
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 rounded-full bg-white/10 hover:bg-white/20">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            {user ? (
              <div className="flex gap-2 items-center">
                <span className="text-sm text-white/70">{user.email}</span>
                <button onClick={signOut} className="p-2 rounded-full bg-red-500/20 hover:bg-red-500/40">
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="bg-cyan-500 px-4 py-2 rounded-lg font-mono text-sm hover:bg-cyan-600 transition shadow-lg shadow-cyan-500/30">
                  Вхід / GitHub
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8 animate-fade-in">
        {children}
      </main>
    </div>
  );
}