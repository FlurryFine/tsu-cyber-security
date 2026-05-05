import { useState } from 'react';
import { ArrowLeft, Database, Eye, Search, MapPin, Mail, Phone, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { translations } from '../../../translations';

export function OSINT() {
  const { language } = useTheme();
  const t = translations[language];
  const [foundData, setFoundData] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const exposedData = language === 'en' ? [
    { id: 'linkedin', keyword: 'linkedin', icon: Search, label: 'LinkedIn Profile', info: 'Job title, colleagues, work history' },
    { id: 'facebook', keyword: 'facebook', icon: Search, label: 'Facebook Posts', info: 'Home address visible in photo metadata' },
    { id: 'email', keyword: 'email', icon: Mail, label: 'Email Address', info: 'Found in data breach database' },
    { id: 'phone', keyword: 'phone', icon: Phone, label: 'Phone Number', info: 'Listed in public directory' },
    { id: 'location', keyword: 'location', icon: MapPin, label: 'Home Location', info: 'Tagged in social media posts' },
    { id: 'github', keyword: 'github', icon: Search, label: 'GitHub Repository', info: 'Accidentally committed API keys' },
  ] : [
    { id: 'linkedin', keyword: 'linkedin', icon: Search, label: 'Профиль LinkedIn', info: 'Должность, коллеги, история работы' },
    { id: 'facebook', keyword: 'facebook', icon: Search, label: 'Посты Facebook', info: 'Домашний адрес виден в метаданных фото' },
    { id: 'email', keyword: 'email', icon: Mail, label: 'Email адрес', info: 'Найден в базе данных утечек' },
    { id: 'phone', keyword: 'phone', icon: Phone, label: 'Номер телефона', info: 'Указан в публичном справочнике' },
    { id: 'location', keyword: 'location', icon: MapPin, label: 'Местоположение дома', info: 'Отмечен в постах социальных сетей' },
    { id: 'github', keyword: 'github', icon: Search, label: 'Репозиторий GitHub', info: 'Случайно коммитнуты API ключи' },
  ];

  const handleSearch = () => {
    if (!searchQuery.trim() || searchQuery.length < 3) {
      return;
    }

    const query = searchQuery.toLowerCase();
    const matches = exposedData
      .filter(item => item.keyword.includes(query) && !foundData.includes(item.id))
      .map(item => item.id);

    if (matches.length > 0) {
      setFoundData([...foundData, ...matches]);
    }
    setSearchQuery('');
  };

  const handleReset = () => {
    setFoundData([]);
    setSearchQuery('');
  };

  const progress = (foundData.length / exposedData.length) * 100;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/threats" className="inline-flex items-center gap-2 text-[var(--accent-primary)] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          {t.backToThreatTypes}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="p-3 bg-yellow-100 rounded-lg"
          >
            <Database className="w-6 h-6 text-yellow-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'Level 3: OSINT' : 'Уровень 3: OSINT'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'Open Source Intelligence Gathering' : 'Сбор разведданных из открытых источников'}
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="prose max-w-none text-[var(--text-secondary)] mb-6"
        >
          <p>
            {language === 'en'
              ? 'OSINT (Open Source Intelligence) involves collecting information from publicly available sources. Attackers use this data to build detailed profiles for targeted attacks, credential stuffing, or social engineering campaigns.'
              : 'OSINT (Open Source Intelligence) включает сбор информации из публично доступных источников. Атакующие используют эти данные для создания детальных профилей для целевых атак, подбора учетных данных или кампаний социальной инженерии.'}
          </p>
          <h3 className="text-[var(--text-primary)]">
            {language === 'en' ? 'Common OSINT Sources:' : 'Распространенные источники OSINT:'}
          </h3>
          <ul className="text-[var(--text-secondary)]">
            <li>
              <strong>{language === 'en' ? 'Social Media:' : 'Социальные сети:'}</strong>{' '}
              {language === 'en' ? 'Personal information, relationships, locations, and schedules' : 'Личная информация, связи, местоположения и расписания'}
            </li>
            <li>
              <strong>{language === 'en' ? 'Data Breaches:' : 'Утечки данных:'}</strong>{' '}
              {language === 'en' ? 'Exposed passwords and email addresses from compromised databases' : 'Раскрытые пароли и email адреса из скомпрометированных баз данных'}
            </li>
            <li>
              <strong>{language === 'en' ? 'Public Records:' : 'Публичные записи:'}</strong>{' '}
              {language === 'en' ? 'Property ownership, court documents, business registrations' : 'Владение недвижимостью, судебные документы, регистрации бизнеса'}
            </li>
            <li>
              <strong>{language === 'en' ? 'Technical Footprints:' : 'Технические следы:'}</strong>{' '}
              {language === 'en' ? 'DNS records, SSL certificates, exposed repositories' : 'DNS записи, SSL сертификаты, раскрытые репозитории'}
            </li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <h2 className="text-[var(--text-primary)] mb-4">
          {language === 'en' ? 'OSINT Investigation Challenge' : 'Задача OSINT расследования'}
        </h2>
        <p className="text-[var(--text-secondary)] mb-6">
          {language === 'en'
            ? 'Try to find all exposed personal data about "John Smith" using common OSINT techniques. Enter search terms to discover what information is publicly available.'
            : 'Попробуйте найти все раскрытые личные данные о "Иване Смирнове", используя распространенные техники OSINT. Введите поисковые термины, чтобы узнать, какая информация публично доступна.'}
        </p>

        <div className="mb-6">
          <div className="flex gap-3">
            <motion.input
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileFocus={{ scale: 1.02 }}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder={language === 'en' ? "Enter search term (e.g., 'linkedin', 'email', 'location')..." : "Введите поисковый термин (напр., 'linkedin', 'email', 'location')..."}
              className="flex-1 px-4 py-3 bg-[var(--input-bg)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSearch}
              className="px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Eye className="w-4 h-4" />
              {language === 'en' ? 'Search' : 'Поиск'}
            </motion.button>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-[var(--text-secondary)] mb-2">
              <span>{language === 'en' ? 'Information Found:' : 'Найдена информация:'} {foundData.length}/{exposedData.length}</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-[var(--hover-bg)] rounded-full h-2">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
                className="bg-[var(--accent-primary)] h-2 rounded-full"
              />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {exposedData.map((item, index) => {
            const Icon = item.icon;
            const isFound = foundData.includes(item.id);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`p-4 border-2 rounded-lg transition-all ${
                  isFound
                    ? 'border-yellow-500 bg-yellow-50'
                    : 'border-[var(--border-primary)] opacity-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    animate={isFound ? { rotate: [0, 360] } : {}}
                    transition={isFound ? { duration: 0.5 } : {}}
                  >
                    <Icon className={`w-5 h-5 flex-shrink-0 ${isFound ? 'text-yellow-600' : 'text-gray-400'}`} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[var(--text-primary)]">
                        {isFound ? item.label : '???'}
                      </span>
                      {isFound && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="px-2 py-0.5 bg-yellow-200 text-yellow-800 rounded-full text-xs"
                        >
                          {language === 'en' ? 'EXPOSED' : 'РАСКРЫТО'}
                        </motion.span>
                      )}
                    </div>
                    {isFound && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="text-sm text-yellow-700"
                      >
                        {item.info}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {foundData.length === exposedData.length && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-300 rounded-xl p-6 text-center"
        >
          <h3 className="text-green-800 mb-4">{t.levelComplete}</h3>
          <p className="text-green-700 mb-4">
            {language === 'en'
              ? "You've discovered all publicly exposed information. This demonstrates how much data is available about individuals through simple searches."
              : 'Вы обнаружили всю публично раскрытую информацию. Это демонстрирует, сколько данных доступно об отдельных людях через простые поиски.'}
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity"
          >
            <RefreshCw className="w-4 h-4" />
            {t.restart}
          </motion.button>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-[var(--text-primary)] mb-4">{t.prevention}</h3>
        <div className="space-y-3 text-[var(--text-secondary)]">
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Review privacy settings' : 'Проверьте настройки конфиденциальности'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Limit public visibility on social media platforms'
                : 'Ограничьте публичную видимость на платформах социальных сетей'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Remove metadata' : 'Удаляйте метаданные'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Strip EXIF data from photos before posting'
                : 'Удаляйте EXIF данные из фотографий перед публикацией'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Use unique passwords' : 'Используйте уникальные пароли'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Prevent credential stuffing from data breaches'
                : 'Предотвратите подстановку учетных данных из утечек'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Monitor your digital footprint' : 'Мониторьте свой цифровой след'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Regularly search for your own information'
                : 'Регулярно ищите информацию о себе'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Separate personal/professional' : 'Разделяйте личное/профессиональное'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Use different emails and profiles'
                : 'Используйте разные email адреса и профили'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Check breach databases' : 'Проверяйте базы данных утечек'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Use services like HaveIBeenPwned to monitor exposures'
                : 'Используйте сервисы вроде HaveIBeenPwned для мониторинга утечек'}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
