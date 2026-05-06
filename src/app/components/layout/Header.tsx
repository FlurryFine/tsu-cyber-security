import { useState } from 'react';
import { Menu, Search, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLocation } from 'react-router';
import { useTheme } from '../../context/ThemeContext';
import { useBSOD } from '../../context/BSODContext';
import { translations } from '../../translations';

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const location = useLocation();
  const { language, setLanguage } = useTheme();
  const { triggerBSOD } = useBSOD();
  const [searchQuery, setSearchQuery] = useState('');
  const t = translations[language];
  const isHomepage = location.pathname === '/';

  const EASTER_EGG_PHRASES = ['bsod_guards', 'bsod_guard'];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (EASTER_EGG_PHRASES.includes(val.toLowerCase())) {
      setSearchQuery('');
      triggerBSOD();
      return;
    }
    const xssPattern = /<script|alert\(|onerror=|javascript:|onload=/i;
    if (xssPattern.test(val)) {
      setSearchQuery('');
      alert("А ты быстро учишься, но так делать на этом сайте не надо.😉");
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const wikiUrl = language === 'ru'
        ? `https://ru.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`
        : `https://en.wikipedia.org/wiki/${encodeURIComponent(searchQuery)}`;
      window.open(wikiUrl, '_blank');
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ru' : 'en');
  };

  return (
    <header className="select-none h-16 border-b border-[var(--border-primary)] bg-[var(--bg-primary)] px-4 md:px-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-2 md:gap-4">
        {!isHomepage && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onMenuClick}
            className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-[var(--text-primary)]" />
          </motion.button>
        )}
        <div className="flex items-center gap-2">
          <motion.img
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            src="/src/imports/Picsart_26-05-03_16-55-19-299.png"
            alt="TSU Logo"
            className="w-10 h-10 object-contain"
          />
          <motion.h1
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="font-semibold text-[var(--text-primary)]"
          >
            {t.appName}
          </motion.h1>
        </div>
        <form onSubmit={handleSearch} className="relative md:hidden ml-1">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-secondary)]" />
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t.search}
            className="pl-8 pr-3 py-1.5 bg-[var(--input-bg)] border border-[var(--border-primary)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] w-36"
          />
        </form>
      </div>

      <div className="flex items-center gap-3">
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-secondary)]" />
          <input
            type="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder={t.search}
            className="pl-10 pr-4 py-2 bg-[var(--input-bg)] border border-[var(--border-primary)] rounded-lg text-sm text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] w-64"
          />
        </form>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleLanguage}
          className="flex items-center gap-2 px-3 py-2 hover:bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg transition-colors relative overflow-hidden"
          aria-label="Toggle language"
        >
          <Globe className="w-4 h-4 text-[var(--text-primary)]" />
          <div className="relative w-6 h-5 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={language}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 flex items-center justify-center text-sm text-[var(--text-primary)] font-medium"
              >
                {language.toUpperCase()}
              </motion.span>
            </AnimatePresence>
          </div>
        </motion.button>
      </div>
    </header>
  );
}
