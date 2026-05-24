// src/pages/Sandbox.tsx
import { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark';

export default function Sandbox() {
  const [code, setCode] = useState(`console.log("Hello, VIdevX!");`);
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState('');

  const runCode = async () => {
    setOutput('Виконання...');
    try {
      const res = await fetch('https://emkc.org/api/v2/piston/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: language,
          version: '*',
          files: [{ content: code }],
        }),
      });
      const data = await res.json();
      setOutput(data.run?.output || data.message || 'Помилка виконання');
    } catch (err) {
      setOutput('Помилка з\'єднання з API');
    }
  };

  const getLangExtension = () => {
    if (language === 'javascript') return javascript();
    if (language === 'python') return python();
    return javascript();
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-3">
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="bg-white/10 p-2 rounded">
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
        </select>
        <CodeMirror
          value={code}
          onChange={(val) => setCode(val)}
          height="400px"
          theme={oneDark}
          extensions={[getLangExtension()]}
          className="border border-white/20 rounded-lg overflow-hidden"
        />
        <button onClick={runCode} className="bg-purple-500 px-6 py-2 rounded-lg font-mono hover:bg-purple-600 transition">
          Запустити код 🚀
        </button>
      </div>
      <div className="bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-white/10 font-mono text-sm">
        <h3 className="text-cyan-400 mb-2">Вивід:</h3>
        <pre className="whitespace-pre-wrap text-green-300">{output}</pre>
      </div>
    </div>
  );
}