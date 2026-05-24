// src/pages/Login.tsx
import { useAuth } from '../context/AuthContext';
import { SiGithub } from 'react-icons/si';

export default function Login() {
  const { signInWithGitHub } = useAuth();

  return (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="backdrop-blur-lg bg-white/10 dark:bg-black/30 p-10 rounded-2xl border border-white/20 shadow-2xl text-center">
        <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Ласкаво просимо до VIdevX
        </h1>
        <button
          onClick={signInWithGitHub}
          className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-lg font-mono transition"
        >
          <SiGithub size={20} /> Увійти через GitHub
        </button>
        <p className="mt-4 text-sm text-white/50">Після входу ви зможете публікувати код, статті та тестувати в пісочниці.</p>
      </div>
    </div>
  );
}