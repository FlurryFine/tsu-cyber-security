import { useState, useRef } from 'react';
import { Shield, Target, Newspaper, ExternalLink, BookOpen } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../translations';

export function Homepage() {
  const { language } = useTheme();
  const t = translations[language];
  const [showNews, setShowNews] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const newsRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const newsWebsites = [
    {
      name: 'SecurityLab',
      url: 'https://www.securitylab.ru/',
      description: language === 'en'
        ? 'Russian cybersecurity news portal covering vulnerabilities, incidents, and security research'
        : 'Российский портал новостей кибербезопасности, охватывающий уязвимости, инциденты и исследования безопасности',
    },
    {
      name: 'Хабр - Информационная безопасность',
      url: 'https://habr.com/ru/hub/infosecurity/',
      description: language === 'en'
        ? 'Russian tech community hub with articles on information security and cybersecurity'
        : 'Российское IT-сообщество со статьями по информационной безопасности и кибербезопасности',
    },
    {
      name: 'Anti-Malware.ru',
      url: 'https://www.anti-malware.ru/',
      description: language === 'en'
        ? 'Russian information security portal with news, analytics, and expert opinions'
        : 'Российский портал информационной безопасности с новостями, аналитикой и мнениями экспертов',
    },
  ];

  const cards = [
    {
      to: '/threats',
      icon: Shield,
      iconBg: 'bg-blue-500 group-hover:bg-blue-600',
      border: 'border-blue-100 hover:border-blue-300',
      title: t.exploreThreats,
      desc: language === 'en'
        ? 'Learn about different types of cybersecurity threats from social engineering to technical attacks'
        : 'Изучите различные типы киберугроз от социальной инженерии до технических атак',
      delay: 0.3,
      fromX: -40,
    },
    {
      to: '/owasp-lab',
      icon: Target,
      iconBg: 'bg-purple-500 group-hover:bg-purple-600',
      border: 'border-purple-100 hover:border-purple-300',
      title: t.exploreLab,
      desc: language === 'en'
        ? 'Practice identifying and exploiting OWASP Top 10 vulnerabilities in a safe environment'
        : 'Практикуйтесь в выявлении и эксплуатации уязвимостей OWASP Top 10 в безопасной среде',
      delay: 0.4,
      fromX: 0,
    },
    {
      to: '/articles',
      icon: BookOpen,
      iconBg: 'bg-red-500 group-hover:bg-red-600',
      border: 'border-red-100 hover:border-red-300',
      title: t.articles,
      desc: language === 'en'
        ? 'Read in-depth articles about OWASP Top 10 vulnerabilities and security best practices'
        : 'Читайте подробные статьи об уязвимостях OWASP Top 10 и лучших практиках безопасности',
      delay: 0.5,
      fromX: 40,
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#ffffff]">
      <div className="max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            key={location.key + '-logo'}
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 150, damping: 12 }}
            className="inline-block mb-6"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 bg-blue-200 rounded-full blur-xl opacity-40"
              />
              {logoError ? (
                <div className="w-28 h-28 mx-auto relative z-10 flex items-center justify-center rounded-full bg-blue-100">
                  <Shield className="w-14 h-14 text-blue-500" />
                </div>
              ) : (
                <img
                  src="/src/imports/Picsart_26-05-03_16-55-19-299.png"
                  alt="TSU Logo"
                  className="w-28 h-28 mx-auto object-contain relative z-10"
                  onError={() => setLogoError(true)}
                />
              )}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.h1
              key={t.welcomeTitle}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="text-5xl font-bold text-gray-800 mb-4"
            >
              {t.welcomeTitle}
            </motion.h1>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.p
              key={t.welcomeDescription}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, delay: 0.05 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto"
            >
              {t.welcomeDescription}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.to}
                initial={{ opacity: 0, x: card.fromX, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ delay: card.delay, duration: 0.4, type: 'spring', stiffness: 120 }}
                whileHover={{ scale: 1.03, y: -6 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to={card.to}
                  className={`block bg-white rounded-2xl shadow-lg p-7 hover:shadow-xl transition-all border-2 ${card.border} group`}
                >
                  <div className="flex items-center gap-4 mb-3">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      className={`p-3 ${card.iconBg} rounded-xl transition-colors`}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <AnimatePresence mode="wait">
                      <motion.h2
                        key={card.title}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 6 }}
                        transition={{ duration: 0.2 }}
                        className="text-xl font-bold text-gray-800"
                      >
                        {card.title}
                      </motion.h2>
                    </AnimatePresence>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={card.desc}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-gray-600"
                    >
                      {card.desc}
                    </motion.p>
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Анимация новостной кнопки */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (!showNews) {
                setShowNews(true);
                setTimeout(() => {
                  newsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 380);
              } else {
                setShowNews(false);
              }
            }}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            <motion.div
              animate={showNews ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Newspaper className="w-6 h-6" />
            </motion.div>
            <AnimatePresence mode="wait">
              <motion.span
                key={`news-btn-${language}`}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.2 }}
              >
                {t.viewNews}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        </motion.div>

        {/* Анимация секции новостей */}
        <AnimatePresence>
          {showNews && (
            <motion.div
              ref={newsRef}
              initial={{ opacity: 0, height: 0, y: 20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: 20 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="mt-8 bg-white rounded-2xl shadow-xl p-8 border-2 border-green-100 overflow-hidden"
            >
              <AnimatePresence mode="wait">
                <motion.h3
                  key={t.newsWebsites}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.2 }}
                  className="text-2xl font-bold text-gray-800 mb-6"
                >
                  {t.newsWebsites}
                </motion.h3>
              </AnimatePresence>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left p-4 text-gray-700 font-semibold">
                        {language === 'en' ? 'Website' : 'Сайт'}
                      </th>
                      <th className="text-left p-4 text-gray-700 font-semibold">
                        {language === 'en' ? 'Description' : 'Описание'}
                      </th>
                      <th className="text-left p-4 text-gray-700 font-semibold">
                        {language === 'en' ? 'Link' : 'Ссылка'}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {newsWebsites.map((site, index) => (
                      <motion.tr
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.08, duration: 0.25 }}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="p-4 font-semibold text-gray-800">{site.name}</td>
                        <td className="p-4 text-gray-600">{site.description}</td>
                        <td className="p-4">
                          <a
                            href={site.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-700 transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                            {t.visit}
                          </a>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}