import { useState } from 'react';
import { ArrowLeft, Lock, User, Shield, AlertTriangle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { translations } from '../../../translations';

export function BrokenAccessControl() {
  const { language } = useTheme();
  const t = translations[language];
  const [currentUserId, setCurrentUserId] = useState('10');
  const [viewedData, setViewedData] = useState<any>(null);
  const [unauthorized, setUnauthorized] = useState(false);

  const users = {
    '1': { id: 1, name: 'Sarah Johnson', role: language === 'en' ? 'CEO' : 'Генеральный директор', salary: '$250,000', ssn: '***-**-1234', privileged: true },
    '2': { id: 2, name: 'Michael Chen', role: language === 'en' ? 'CTO' : 'Технический директор', salary: '$220,000', ssn: '***-**-5678', privileged: true },
    '3': { id: 3, name: 'Emily Davis', role: language === 'en' ? 'CFO' : 'Финансовый директор', salary: '$230,000', ssn: '***-**-9012', privileged: true },
    '10': { id: 10, name: language === 'en' ? 'John Smith (You)' : 'Иван Иванов (Вы)', role: language === 'en' ? 'Junior Developer' : 'Младший разработчик', salary: '$65,000', ssn: '***-**-3456', privileged: false },
  };

  const loadUserData = () => {
    const user = users[currentUserId as keyof typeof users];
    if (user) {
      setViewedData(user);
      setUnauthorized(currentUserId !== '10');
    } else {
      setViewedData({ error: language === 'en' ? 'User not found' : 'Пользователь не найден' });
      setUnauthorized(false);
    }
  };

  const handleReset = () => {
    setCurrentUserId('10');
    setViewedData(null);
    setUnauthorized(false);
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.3, ease: 'easeOut' },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.25 }}>
        <Link to="/owasp-lab/threat-map" className="inline-flex items-center gap-2 text-[var(--accent-primary)] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          {t.backToThreatMap}
        </Link>
      </motion.div>

      <motion.div
        custom={0}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.1 }}
            className="p-3 bg-red-100 rounded-lg"
          >
            <Lock className="w-6 h-6 text-red-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'Broken Access Control' : 'Нарушение контроля доступа'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'OWASP #1 - Authorization Failures' : 'OWASP #1 - Ошибки авторизации'}
            </p>
          </div>
        </div>

        <p className="text-[var(--text-secondary)] mb-4">
          {language === 'en'
            ? 'Broken Access Control allows users to act outside their intended permissions. Attackers can access unauthorized functionality or data by modifying URLs, parameters, or internal application state.'
            : 'Нарушение контроля доступа позволяет пользователям действовать за пределами назначенных прав. Атакующие могут получить несанкционированный доступ к данным, изменяя URL, параметры или внутреннее состояние приложения.'}
        </p>

        <div className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-4">
          <h3 className="text-[var(--text-primary)] mb-3">
            {language === 'en' ? 'Common Vulnerabilities:' : 'Распространённые уязвимости:'}
          </h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {[
              {
                label: 'IDOR (Insecure Direct Object Reference):',
                desc: language === 'en'
                  ? 'Accessing resources by manipulating IDs in URLs'
                  : 'Доступ к ресурсам путём изменения ID в URL',
              },
              {
                label: language === 'en' ? 'Missing Function-Level Access Control:' : 'Отсутствие контроля доступа на уровне функций:',
                desc: language === 'en' ? 'Admin functions accessible to regular users' : 'Функции администратора доступны обычным пользователям',
              },
              {
                label: language === 'en' ? 'Elevation of Privilege:' : 'Повышение привилегий:',
                desc: language === 'en' ? 'Modifying user roles through parameter tampering' : 'Изменение ролей пользователя через подмену параметров',
              },
              {
                label: language === 'en' ? 'Force Browsing:' : 'Принудительный просмотр:',
                desc: language === 'en' ? 'Accessing unauthorized pages by guessing URLs' : 'Доступ к закрытым страницам путём подбора URL',
              },
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="flex items-start gap-2"
              >
                <span className="text-red-600 mt-1">•</span>
                <span><strong className="text-[var(--text-primary)]">{item.label}</strong> {item.desc}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      <AnimatePresence>
        {unauthorized && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-red-600 border-4 border-red-800 rounded-xl p-6 shadow-2xl"
          >
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <AlertTriangle className="w-12 h-12 text-white flex-shrink-0" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-white text-xl mb-2">
                  🚨 {language === 'en' ? 'Unauthorized Access Detected!' : 'Обнаружен несанкционированный доступ!'}
                </h3>
                <p className="text-red-100 mb-2">
                  {language === 'en'
                    ? "You've successfully exploited a Broken Access Control vulnerability by changing the user ID."
                    : 'Вы успешно воспользовались уязвимостью нарушения контроля доступа, изменив ID пользователя.'}
                </p>
                <p className="text-red-200 text-sm">
                  {language === 'en'
                    ? 'In a properly secured application, this request would be blocked and logged.'
                    : 'В правильно защищённом приложении этот запрос был бы заблокирован и занесён в журнал.'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        custom={1}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        {/* Section header with restart button */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[var(--text-primary)]">
            {language === 'en' ? 'Interactive Demonstration' : 'Интерактивная демонстрация'}
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-3 py-2 border border-[var(--border-primary)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--hover-bg)] transition-all text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            {t.restartLevel}
          </motion.button>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          {language === 'en'
            ? 'You are logged in as User ID 10 (Junior Developer). Try changing the ID to access other users\' sensitive data.'
            : 'Вы вошли как User ID 10 (Младший разработчик). Попробуйте изменить ID для доступа к данным других пользователей.'}
        </p>

        <div className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-5 h-5 text-[var(--text-primary)]" />
            <span className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'Current Session: User ID 10 (Junior Developer)' : 'Текущая сессия: User ID 10 (Младший разработчик)'}
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">
                {language === 'en' ? 'Simulated URL Parameter (Change the ID)' : 'Симулированный URL-параметр (Измените ID)'}
              </label>
              <div className="flex gap-2">
                <div className="flex-1 px-4 py-3 bg-[var(--input-bg)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] font-mono flex items-center">
                  <span className="text-[var(--text-secondary)]">https://company.com/profile?userId=</span>
                  <input
                    type="text"
                    value={currentUserId}
                    onChange={(e) => setCurrentUserId(e.target.value)}
                    className="bg-transparent border-none outline-none text-[var(--accent-primary)] w-12 ml-1"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={loadUserData}
                  className="px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg border border-[var(--accent-primary)] hover:opacity-90 transition-opacity whitespace-nowrap"
                >
                  {language === 'en' ? 'Load Profile' : 'Загрузить профиль'}
                </motion.button>
              </div>

              <div className="mt-3 flex gap-2 flex-wrap">
                {[
                  { id: '1', label: language === 'en' ? 'Try ID: 1 (CEO)' : 'ID: 1 (Гендиректор)' },
                  { id: '2', label: language === 'en' ? 'Try ID: 2 (CTO)' : 'ID: 2 (Техдиректор)' },
                  { id: '3', label: language === 'en' ? 'Try ID: 3 (CFO)' : 'ID: 3 (Фин. директор)' },
                ].map((btn) => (
                  <motion.button
                    key={btn.id}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentUserId(btn.id)}
                    className="px-3 py-1.5 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 hover:bg-red-100 transition-colors"
                  >
                    {btn.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {viewedData && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className={`p-6 border-2 rounded-lg ${
                viewedData.error
                  ? 'border-yellow-500 bg-yellow-50'
                  : viewedData.privileged && currentUserId !== '10'
                  ? 'border-red-500 bg-red-50'
                  : 'border-green-500 bg-green-50'
              }`}
            >
              {viewedData.error ? (
                <p className="text-yellow-800">{viewedData.error}</p>
              ) : (
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 rounded-lg ${viewedData.privileged && currentUserId !== '10' ? 'bg-red-200' : 'bg-green-200'}`}>
                      <Shield className={`w-6 h-6 ${viewedData.privileged && currentUserId !== '10' ? 'text-red-700' : 'text-green-700'}`} />
                    </div>
                    <div>
                      <h3 className={viewedData.privileged && currentUserId !== '10' ? 'text-red-800' : 'text-green-800'}>
                        {viewedData.name}
                      </h3>
                      <p className="text-sm text-gray-600">{viewedData.role}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    {[
                      { label: language === 'en' ? 'Employee ID:' : 'ID сотрудника:', value: viewedData.id },
                      { label: language === 'en' ? 'Annual Salary:' : 'Годовая зарплата:', value: viewedData.salary },
                      { label: language === 'en' ? 'SSN:' : 'ИНН:', value: viewedData.ssn },
                    ].map((row, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        className="flex justify-between p-3 bg-white/50 rounded"
                      >
                        <span className="text-gray-700">{row.label}</span>
                        <span className="text-gray-900">{row.value}</span>
                      </motion.div>
                    ))}
                  </div>
                  {viewedData.privileged && currentUserId !== '10' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-sm text-red-800"
                    >
                      <AlertTriangle className="w-4 h-4 inline mr-2" />
                      {language === 'en'
                        ? 'This is privileged information you should not have access to!'
                        : 'Это конфиденциальная информация, к которой у вас не должно быть доступа!'}
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div custom={2} variants={sectionVariants} initial="hidden" animate="visible" className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm">
        <h3 className="text-[var(--text-primary)] mb-4">
          {language === 'en' ? 'How the Attack Works' : 'Как работает атака'}
        </h3>
        <div className="space-y-3 text-sm font-mono bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-4">
          <div>
            <span className="text-green-600">// {language === 'en' ? 'Vulnerable Backend Code:' : 'Уязвимый код бэкенда:'}</span>
            <br />
            <span className="text-[var(--text-primary)]">{`app.get('/profile', (req, res) => {\n  const userId = req.query.userId; // No authorization check!\n  const user = database.getUserById(userId);\n  res.json(user);\n});`}</span>
          </div>
          <div className="pt-3 border-t border-[var(--border-primary)]">
            <span className="text-red-600">// {language === 'en' ? 'Attack Vector:' : 'Вектор атаки:'}</span>
            <br />
            <span className="text-[var(--text-primary)]">
              {language === 'en'
                ? 'User changes URL from /profile?userId=10 to /profile?userId=1'
                : 'Пользователь меняет URL с /profile?userId=10 на /profile?userId=1'}
            </span>
          </div>
          <div className="pt-3 border-t border-[var(--border-primary)]">
            <span className="text-orange-600">// {language === 'en' ? 'Result:' : 'Результат:'}</span>
            <br />
            <span className="text-[var(--text-primary)]">
              {language === 'en'
                ? "Attacker accesses CEO's sensitive data without authorization"
                : 'Атакующий получает конфиденциальные данные генерального директора без авторизации'}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div custom={3} variants={sectionVariants} initial="hidden" animate="visible" className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm">
        <h3 className="text-[var(--text-primary)] mb-4">{t.prevention}</h3>
        <div className="space-y-3 text-[var(--text-secondary)]">
          {[
            {
              title: language === 'en' ? '✓ Implement Server-Side Authorization' : '✓ Внедрить серверную авторизацию',
              content: null,
              code: `if (req.user.id !== userId && !req.user.isAdmin) {\n  return res.status(403).json({ error: 'Forbidden' });\n}`,
            },
            {
              title: language === 'en' ? '✓ Use Indirect Object References' : '✓ Использовать косвенные ссылки',
              content: language === 'en'
                ? 'Use session-based access instead of passing IDs in URLs.'
                : 'Используйте доступ на основе сессий вместо передачи ID в URL.',
              code: null,
            },
            {
              title: language === 'en' ? '✓ Deny by Default' : '✓ Запрет по умолчанию',
              content: language === 'en'
                ? 'Require explicit permission grants. All access should be denied unless specifically allowed.'
                : 'Требуйте явного предоставления прав. Весь доступ должен быть запрещён, если не разрешён явно.',
              code: null,
            },
            {
              title: language === 'en' ? '✓ Log Access Control Failures' : '✓ Логировать сбои контроля доступа',
              content: language === 'en'
                ? 'Monitor and alert on repeated access control violations to detect potential attacks.'
                : 'Отслеживайте и оповещайте о повторяющихся нарушениях контроля доступа.',
              code: null,
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              className="p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <h4 className="text-green-800 mb-2">{item.title}</h4>
              {item.code && <code className="block bg-white p-3 rounded text-sm text-gray-800 overflow-x-auto">{item.code}</code>}
              {item.content && <p className="text-sm text-green-700">{item.content}</p>}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
