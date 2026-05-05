import { Home, Shield, Target, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../translations';

interface SidebarProps {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const { language } = useTheme();
  const t = translations[language];
  const isHomepage = location.pathname === '/';
  const visible = isOpen && !isHomepage;

  const navItems = [
    { path: '/', label: t.homepage, icon: Home },
    { path: '/threats', label: t.threatTypes, icon: Shield },
    { path: '/owasp-lab', label: t.owaspLab, icon: Target },
    { path: '/articles', label: t.articles, icon: BookOpen },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: visible ? 256 : 0 }}
      transition={{ duration: 0.25, ease: 'easeInOut' }}
      className="overflow-hidden shrink-0 bg-[var(--bg-primary)]"
    >
      <div className="w-64 h-full border-r border-[var(--border-primary)] flex flex-col overflow-hidden">
        {/* Navigation items */}
        <nav className="p-4 space-y-1 flex-1 overflow-y-auto">
          {navItems.map(({ path, label, icon: Icon }, index) => (
            <motion.div
              key={path}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.04, duration: 0.2 }}
            >
              <Link
                to={path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive(path)
                    ? 'bg-[var(--accent-primary)] text-[var(--accent-text)] shadow-sm'
                    : 'text-[var(--text-primary)] hover:bg-[var(--hover-bg)] hover:translate-x-1'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <AnimatePresence mode="wait">
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 4 }}
                    transition={{ duration: 0.15 }}
                  >
                    {label}
                  </motion.span>
                </AnimatePresence>
              </Link>
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
}