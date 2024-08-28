import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type ThemeType = "light" | "dark";

function useThemeToggle(): [ThemeType, Dispatch<SetStateAction<ThemeType>>] {
  const [theme, setTheme] = useState<ThemeType>(() =>
    localStorage.getItem('theme') ? (localStorage.getItem('theme') as ThemeType) : 'light'
  );


  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme ?? '');
  }, [theme]);

  return [theme, setTheme];
}

export default useThemeToggle;
