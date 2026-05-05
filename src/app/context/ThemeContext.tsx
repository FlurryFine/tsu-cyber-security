import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ru';

interface ThemeContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('ru');

  return (
    <ThemeContext.Provider value={{ language, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
