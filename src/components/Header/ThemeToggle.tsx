'use client';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
    >
      {currentTheme === 'dark' ? (
        <Sun
          size={20}
          className=" fill-textPrimary stroke-textPrimary hover:scale-125 duration-500"
        />
      ) : (
        <Moon
          size={18}
          className=" fill-textPrimary stroke-textPrimary hover:scale-125 duration-500"
        />
      )}
    </button>
  );
};

export default ThemeToggle;
