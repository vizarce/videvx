// src/pages/Sandbox.tsx
import { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { cpp } from '@codemirror/lang-cpp';
import { java } from '@codemirror/lang-java';
import { rust } from '@codemirror/lang-rust';
import { php } from '@codemirror/lang-php';
import { sql } from '@codemirror/lang-sql';
import { StreamLanguage } from '@codemirror/language';
import { go } from '@codemirror/legacy-modes/mode/go';
import { ruby } from '@codemirror/legacy-modes/mode/ruby';
import { shell } from '@codemirror/legacy-modes/mode/shell';
import { lua } from '@codemirror/legacy-modes/mode/lua';
import { r } from '@codemirror/legacy-modes/mode/r';
import { kotlin } from '@codemirror/legacy-modes/mode/clike';
import { csharp } from '@codemirror/legacy-modes/mode/clike';
import { oneDark } from '@codemirror/theme-one-dark';
import { Play, Terminal, Loader2, Trash2 } from 'lucide-react';
import type { Extension } from '@codemirror/state';

interface LangConfig {
  label: string;
  runtimeLabel: string;
  judge0Id: number;
  extension: () => Extension;
  defaultCode: string;
  fileExt: string;
}

const LANGUAGES: Record<string, LangConfig> = {
  javascript: {
    label: 'JavaScript',
    runtimeLabel: 'Node.js 22',
    judge0Id: 102,
    extension: () => javascript(),
    fileExt: 'js',
    defaultCode: `// JavaScript — VIdevX Sandbox
const greet = (name) => \`Hello, \${name}!\`;

console.log(greet('VIdevX'));

// Fibonacci
function fib(n) {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
console.log('Fib(10):', fib(10));`,
  },
  typescript: {
    label: 'TypeScript',
    runtimeLabel: 'TypeScript 5.6',
    judge0Id: 101,
    extension: () => javascript({ typescript: true }),
    fileExt: 'ts',
    defaultCode: `// TypeScript — VIdevX Sandbox
interface User {
  name: string;
  age: number;
}

const greet = (user: User): string =>
  \`Hello, \${user.name}! You are \${user.age} years old.\`;

const user: User = { name: 'VIdevX', age: 1 };
console.log(greet(user));`,
  },
  python: {
    label: 'Python',
    runtimeLabel: 'Python 3.13',
    judge0Id: 109,
    extension: () => python(),
    fileExt: 'py',
    defaultCode: `# Python — VIdevX Sandbox
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

for i in range(10):
    print(f"fib({i}) = {fibonacci(i)}")`,
  },
  java: {
    label: 'Java',
    runtimeLabel: 'JDK 17',
    judge0Id: 91,
    extension: () => java(),
    fileExt: 'java',
    defaultCode: `// Java — VIdevX Sandbox
public class Main {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        System.out.println("Hello from VIdevX!");
        for (int i = 0; i < 10; i++) {
            System.out.println("fib(" + i + ") = " + fibonacci(i));
        }
    }
}`,
  },
  c: {
    label: 'C',
    runtimeLabel: 'GCC 14',
    judge0Id: 103,
    extension: () => cpp(),
    fileExt: 'c',
    defaultCode: `// C — VIdevX Sandbox
#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("Hello from VIdevX!\\n");
    for (int i = 0; i < 10; i++) {
        printf("fib(%d) = %d\\n", i, fibonacci(i));
    }
    return 0;
}`,
  },
  cpp: {
    label: 'C++',
    runtimeLabel: 'G++ 14',
    judge0Id: 105,
    extension: () => cpp(),
    fileExt: 'cpp',
    defaultCode: `// C++ — VIdevX Sandbox
#include <iostream>
#include <vector>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    std::cout << "Hello from VIdevX!" << std::endl;
    for (int i = 0; i < 10; i++) {
        std::cout << "fib(" << i << ") = " << fibonacci(i) << std::endl;
    }
    return 0;
}`,
  },
  go: {
    label: 'Go',
    runtimeLabel: 'Go 1.23',
    judge0Id: 107,
    extension: () => StreamLanguage.define(go),
    fileExt: 'go',
    defaultCode: `// Go — VIdevX Sandbox
package main

import "fmt"

func fibonacci(n int) int {
	if n <= 1 {
		return n
	}
	return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
	fmt.Println("Hello from VIdevX!")
	for i := 0; i < 10; i++ {
		fmt.Printf("fib(%d) = %d\\n", i, fibonacci(i))
	}
}`,
  },
  rust: {
    label: 'Rust',
    runtimeLabel: 'Rust 1.85',
    judge0Id: 108,
    extension: () => rust(),
    fileExt: 'rs',
    defaultCode: `// Rust — VIdevX Sandbox
fn fibonacci(n: u64) -> u64 {
    match n {
        0 | 1 => n,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    println!("Hello from VIdevX!");
    for i in 0..10 {
        println!("fib({}) = {}", i, fibonacci(i));
    }
}`,
  },
  php: {
    label: 'PHP',
    runtimeLabel: 'PHP 8.3',
    judge0Id: 98,
    extension: () => php(),
    fileExt: 'php',
    defaultCode: `<?php
// PHP — VIdevX Sandbox
function fibonacci(int $n): int {
    if ($n <= 1) return $n;
    return fibonacci($n - 1) + fibonacci($n - 2);
}

echo "Hello from VIdevX!\\n";
for ($i = 0; $i < 10; $i++) {
    echo "fib($i) = " . fibonacci($i) . "\\n";
}`,
  },
  ruby: {
    label: 'Ruby',
    runtimeLabel: 'Ruby 2.7',
    judge0Id: 72,
    extension: () => StreamLanguage.define(ruby),
    fileExt: 'rb',
    defaultCode: `# Ruby — VIdevX Sandbox
def fibonacci(n)
  return n if n <= 1
  fibonacci(n - 1) + fibonacci(n - 2)
end

puts "Hello from VIdevX!"
10.times { |i| puts "fib(#{i}) = #{fibonacci(i)}" }`,
  },
  csharp: {
    label: 'C#',
    runtimeLabel: 'Mono 6.6',
    judge0Id: 51,
    extension: () => StreamLanguage.define(csharp),
    fileExt: 'cs',
    defaultCode: `// C# — VIdevX Sandbox
using System;

class Program {
    static int Fibonacci(int n) {
        if (n <= 1) return n;
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }

    static void Main() {
        Console.WriteLine("Hello from VIdevX!");
        for (int i = 0; i < 10; i++) {
            Console.WriteLine($"fib({i}) = {Fibonacci(i)}");
        }
    }
}`,
  },
  bash: {
    label: 'Bash',
    runtimeLabel: 'Bash 5',
    judge0Id: 46,
    extension: () => StreamLanguage.define(shell),
    fileExt: 'sh',
    defaultCode: `#!/bin/bash
# Bash — VIdevX Sandbox
echo "Hello from VIdevX!"

fibonacci() {
  local n=$1
  if [ "$n" -le 1 ]; then echo $n; return; fi
  local a=$(fibonacci $((n-1)))
  local b=$(fibonacci $((n-2)))
  echo $((a + b))
}

for i in $(seq 0 9); do
  echo "fib($i) = $(fibonacci $i)"
done`,
  },
  lua: {
    label: 'Lua',
    runtimeLabel: 'Lua 5.3',
    judge0Id: 64,
    extension: () => StreamLanguage.define(lua),
    fileExt: 'lua',
    defaultCode: `-- Lua — VIdevX Sandbox
local function fibonacci(n)
  if n <= 1 then return n end
  return fibonacci(n - 1) + fibonacci(n - 2)
end

print("Hello from VIdevX!")
for i = 0, 9 do
  print(string.format("fib(%d) = %d", i, fibonacci(i)))
end`,
  },
  r: {
    label: 'R',
    runtimeLabel: 'R 4.4',
    judge0Id: 99,
    extension: () => StreamLanguage.define(r),
    fileExt: 'r',
    defaultCode: `# R — VIdevX Sandbox
fibonacci <- function(n) {
  if (n <= 1) return(n)
  fibonacci(n - 1) + fibonacci(n - 2)
}

cat("Hello from VIdevX!\\n")
for (i in 0:9) {
  cat(sprintf("fib(%d) = %d\\n", i, fibonacci(i)))
}`,
  },
  kotlin: {
    label: 'Kotlin',
    runtimeLabel: 'Kotlin 2.1',
    judge0Id: 111,
    extension: () => StreamLanguage.define(kotlin),
    fileExt: 'kt',
    defaultCode: `// Kotlin — VIdevX Sandbox
fun fibonacci(n: Int): Int {
    if (n <= 1) return n
    return fibonacci(n - 1) + fibonacci(n - 2)
}

fun main() {
    println("Hello from VIdevX!")
    for (i in 0..9) {
        println("fib($i) = \${fibonacci(i)}")
    }
}`,
  },
  sql: {
    label: 'SQL',
    runtimeLabel: 'SQLite 3.27',
    judge0Id: 82,
    extension: () => sql(),
    fileExt: 'sql',
    defaultCode: `-- SQL — VIdevX Sandbox
CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, role TEXT);

INSERT INTO users VALUES (1, 'Alice', 'admin');
INSERT INTO users VALUES (2, 'Bob', 'developer');
INSERT INTO users VALUES (3, 'Charlie', 'designer');

SELECT name, role FROM users ORDER BY name;`,
  },
};

const LANG_GROUPS = [
  { label: 'Web', langs: ['javascript', 'typescript', 'php'] },
  { label: 'Systems', langs: ['c', 'cpp', 'rust', 'go'] },
  { label: 'General', langs: ['python', 'java', 'csharp', 'kotlin', 'ruby'] },
  { label: 'Scripting', langs: ['bash', 'lua', 'r'] },
  { label: 'Data', langs: ['sql'] },
];

export default function Sandbox() {
  const sandboxApiUrl = import.meta.env.VITE_SANDBOX_API_URL ?? 'https://ce.judge0.com';
  const [langKey, setLangKey] = useState('javascript');
  const [code, setCode] = useState(LANGUAGES.javascript.defaultCode);
  const [stdin, setStdin] = useState('');
  const [output, setOutput] = useState('');
  const [stderr, setStderr] = useState('');
  const [running, setRunning] = useState(false);
  const [exitCode, setExitCode] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);
  const [statusText, setStatusText] = useState<string | null>(null);

  const handleLangChange = useCallback((key: string) => {
    setLangKey(key);
    setCode(LANGUAGES[key].defaultCode);
    setOutput('');
    setStderr('');
    setExitCode(null);
    setElapsed(null);
    setStatusText(null);
  }, []);

  const runCode = async () => {
    setRunning(true);
    setOutput('');
    setStderr('');
    setExitCode(null);
    setElapsed(null);
    setStatusText(null);
    const lang = LANGUAGES[langKey];
    const start = Date.now();
    try {
      const res = await fetch(`${sandboxApiUrl}/submissions?base64_encoded=false&wait=true`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language_id: lang.judge0Id,
          source_code: code,
          stdin: stdin || undefined,
        }),
      });
      if (!res.ok) {
        let details = '';
        try {
          const errorData = await res.json();
          details = errorData.message ? `\n${errorData.message}` : '';
        } catch {
          // Fall back to the HTTP status when the backend does not return JSON.
        }
        setOutput(`HTTP ${res.status}: ${res.statusText}${details}`);
        return;
      }
      const data = await res.json();
      setElapsed(Date.now() - start);
      setOutput(data.stdout ?? data.message ?? '');
      setStderr([data.compile_output, data.stderr].filter(Boolean).join('\n'));
      setExitCode(typeof data.exit_code === 'number' ? data.exit_code : data.status?.id === 3 ? 0 : null);
      setStatusText(data.status?.description ?? null);
    } catch {
      setOutput('Помилка з\'єднання з Sandbox API. Перевірте мережу або VITE_SANDBOX_API_URL.');
    } finally {
      setRunning(false);
    }
  };

  const lang = LANGUAGES[langKey];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3 flex-wrap">
        <Terminal className="text-cyan-400 w-6 h-6" />
        <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Пісочниця
        </h1>
        <span className="text-xs font-mono text-white/40 ml-auto">Powered by Judge0 CE</span>
      </div>

      {/* Language selector */}
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-3 flex flex-wrap gap-2">
        {LANG_GROUPS.map((group) => (
          <div key={group.label} className="flex items-center gap-1 flex-wrap">
            <span className="text-xs text-white/30 font-mono mr-1">{group.label}:</span>
            {group.langs.map((key) => (
              <button
                key={key}
                onClick={() => handleLangChange(key)}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition ${
                  langKey === key
                    ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
                    : 'bg-white/10 hover:bg-white/20 text-white/70'
                }`}
              >
                {LANGUAGES[key].label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Editor + Output */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Left: editor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-white/50">
              {lang.label} · main.{lang.fileExt}
            </span>
            <button
              onClick={() => setCode(lang.defaultCode)}
              className="flex items-center gap-1 text-xs text-white/40 hover:text-white/70 transition"
              title="Скинути до прикладу"
            >
              <Trash2 className="w-3 h-3" /> скинути
            </button>
          </div>

          <CodeMirror
            value={code}
            onChange={(val) => setCode(val)}
            height="380px"
            theme={oneDark}
            extensions={[lang.extension()]}
            className="border border-white/20 rounded-lg overflow-hidden text-sm"
          />

          {/* Stdin */}
          <div>
            <label className="text-xs font-mono text-white/40 mb-1 block">stdin (необов'язково)</label>
            <textarea
              value={stdin}
              onChange={(e) => setStdin(e.target.value)}
              rows={2}
              placeholder="Введіть дані для stdin..."
              className="w-full bg-black/30 border border-white/10 rounded-lg p-2 font-mono text-xs text-white/70 resize-none focus:outline-none focus:border-cyan-500/50"
            />
          </div>

          <button
            onClick={runCode}
            disabled={running}
            className="flex items-center gap-2 bg-purple-500 px-6 py-2 rounded-lg font-mono hover:bg-purple-600 transition disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-purple-500/30"
          >
            {running ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            {running ? 'Виконання...' : 'Запустити'}
          </button>
        </div>

        {/* Right: output */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-white/50">Вивід</span>
            {(exitCode !== null || statusText) && (
              <span className={`text-xs font-mono px-2 py-0.5 rounded ${exitCode === 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {exitCode !== null ? `exit ${exitCode}` : statusText}
                {statusText && exitCode !== null ? ` · ${statusText}` : ''}
                {elapsed !== null ? ` · ${elapsed}ms` : ''}
              </span>
            )}
          </div>

          <div className="bg-black/50 backdrop-blur-sm rounded-lg border border-white/10 font-mono text-sm overflow-auto h-[380px]">
            {!output && !stderr && !running && (
              <div className="flex flex-col items-center justify-center h-full text-white/20">
                <Play className="w-8 h-8 mb-2" />
                <span className="text-xs">Натисніть «Запустити» щоб виконати код</span>
              </div>
            )}
            {(output || stderr) && (
              <div className="p-4 space-y-3">
                {output && (
                  <div>
                    <span className="text-cyan-400 text-xs">stdout</span>
                    <pre className="whitespace-pre-wrap text-green-300 mt-1">{output}</pre>
                  </div>
                )}
                {stderr && (
                  <div>
                    <span className="text-red-400 text-xs">stderr</span>
                    <pre className="whitespace-pre-wrap text-red-300 mt-1">{stderr}</pre>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Info panel */}
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3 text-xs font-mono text-white/40 space-y-1">
            <div>🔧 Runtime: <span className="text-white/60">{lang.runtimeLabel}</span></div>
            <div>🌐 API: <span className="text-white/60">{sandboxApiUrl}</span></div>
            <div>📝 Підтримувані мови: <span className="text-white/60">JavaScript, TypeScript, Python, Java, C, C++, Go, Rust, PHP, Ruby, C#, Bash, Lua, R, Kotlin, SQL</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}