'use client';

import { useTheme } from 'next-themes';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-xl text-gray-500 hover:text-indigo-500
                 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
      aria-label="Toggle theme"
    >
      {theme === 'dark'
        ? <SunIcon className="w-5 h-5" />
        : <MoonIcon className="w-5 h-5" />}
    </button>
  );
}
