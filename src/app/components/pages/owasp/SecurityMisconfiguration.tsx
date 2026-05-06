import { useState } from 'react';
import { ArrowLeft, Settings, AlertTriangle, Eye, EyeOff, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { translations } from '../../../translations';

export function SecurityMisconfiguration() {
  const { language } = useTheme();
  const t = translations[language];
  const [scenario, setScenario] = useState<'default' | 'verbose' | 'headers'>('default');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const attemptLogin = () => {
    setShowError(true);
    setIsCompleted(true);
  };

  const handleReset = () => {
    setScenario('default');
    setUsername('');
    setPassword('');
    setShowError(false);
    setIsCompleted(false);
  };

  const errorMessages = {
    default: language === 'en' ? 'Invalid credentials' : 'Неверные учетные данные',
    verbose: language === 'en'
      ? `Database Error: MySQL Connection failed at line 47 in /var/www/html/auth.php
Connection string: mysql://admin:P@ssw0rd123@db.internal.company.com:3306/users
Query: SELECT * FROM users WHERE username='${username}' AND password='${password}'
Stack trace: Error thrown at AuthController.authenticate()
Environment: Production Server (Ubuntu 20.04, IP: 10.0.1.45)`
      : `Ошибка базы данных: Сбой подключения MySQL в строке 47 файла /var/www/html/auth.php
Строка подключения: mysql://admin:P@ssw0rd123@db.internal.company.com:3306/users
Запрос: SELECT * FROM users WHERE username='${username}' AND password='${password}'
Трассировка стека: Ошибка в AuthController.authenticate()
Окружение: Продакшн сервер (Ubuntu 20.04, IP: 10.0.1.45)`,
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/owasp-lab" className="inline-flex items-center gap-2 text-[var(--accent-primary)] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          {t.backToOwaspLab}
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
            initial={{ scale: 0, rotate: 360 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="p-3 bg-orange-100 rounded-lg"
          >
            <Settings className="w-6 h-6 text-orange-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'Security Misconfiguration' : 'Неправильная конфигурация безопасности'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'OWASP #5 - Inadequate Security Controls' : 'OWASP #5 - Недостаточные меры безопасности'}
            </p>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[var(--text-secondary)] mb-4"
        >
          {language === 'en'
            ? 'Security misconfiguration occurs when security controls are inadequately implemented, incomplete, or left in a default or unsecured state. This is common due to complex multi-layered configurations across different platforms and services.'
            : 'Неправильная конфигурация безопасности возникает, когда меры безопасности реализованы неадекватно, неполностью или оставлены в состоянии по умолчанию или незащищенном состоянии. Это распространено из-за сложных многоуровневых конфигураций на разных платформах и сервисах.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-4"
        >
          <h3 className="text-[var(--text-primary)] mb-3">
            {language === 'en' ? 'Main Causes:' : 'Основные причины:'}
          </h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li>
              • <strong className="text-[var(--text-primary)]">
                {language === 'en' ? 'Default Credentials:' : 'Учетные данные по умолчанию:'}
              </strong>{' '}
              {language === 'en' ? 'Unchanged vendor passwords (admin/admin)' : 'Неизмененные пароли поставщиков (admin/admin)'}
            </li>
            <li>
              • <strong className="text-[var(--text-primary)]">
                {language === 'en' ? 'Open Cloud Storage:' : 'Открытое облачное хранилище:'}
              </strong>{' '}
              {language === 'en' ? 'Public S3 buckets with sensitive data' : 'Публичные S3 корзины с конфиденциальными данными'}
            </li>
            <li>
              • <strong className="text-[var(--text-primary)]">
                {language === 'en' ? 'Verbose Error Messages:' : 'Подробные сообщения об ошибках:'}
              </strong>{' '}
              {language === 'en' ? 'Exposing system internals to users' : 'Раскрытие внутренностей системы пользователям'}
            </li>
            <li>
              • <strong className="text-[var(--text-primary)]">
                {language === 'en' ? 'Missing Security Headers:' : 'Отсутствующие заголовки безопасности:'}
              </strong>{' '}
              {language === 'en' ? 'No CSP, HSTS, X-Frame-Options' : 'Нет CSP, HSTS, X-Frame-Options'}
            </li>
          </ul>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[var(--text-primary)]">
            {language === 'en' ? 'Scenario Selection' : 'Выбор сценария'}
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
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { id: 'default', icon: Eye, label: language === 'en' ? 'Default Credentials' : 'Учетные данные по умолчанию', color: 'red' },
            { id: 'verbose', icon: AlertTriangle, label: language === 'en' ? 'Verbose Errors' : 'Подробные ошибки', color: 'orange' },
            { id: 'headers', icon: Settings, label: language === 'en' ? 'Missing Headers' : 'Отсутствующие заголовки', color: 'yellow' }
          ].map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setScenario(item.id as any); setShowError(false); }}
              className={`p-4 border-2 rounded-lg transition-all ${
                scenario === item.id
                  ? `border-${item.color}-500 bg-${item.color}-50`
                  : 'border-[var(--border-primary)] hover:border-[var(--accent-primary)]'
              }`}
            >
              <item.icon className={`w-6 h-6 text-${item.color}-600 mx-auto mb-2`} />
              <div className="text-sm text-[var(--text-primary)]">{item.label}</div>
            </motion.button>
          ))}
        </div>

        {scenario === 'default' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6"
          >
            <h3 className="text-[var(--text-primary)] mb-3">
              {language === 'en' ? 'Default Credentials Attack' : 'Атака с учетными данными по умолчанию'}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              {language === 'en'
                ? 'Many systems ship with default credentials. Try common combinations:'
                : 'Многие системы поставляются с учетными данными по умолчанию. Попробуйте распространенные комбинации:'}
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { u: 'admin', p: 'admin' },
                { u: 'admin', p: 'password' },
                { u: 'root', p: 'root' },
                { u: 'administrator', p: '12345' }
              ].map((cred, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * idx }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setUsername(cred.u);
                    setPassword(cred.p);
                    setIsCompleted(true);
                  }}
                  className="p-3 bg-red-100 border border-red-300 rounded text-sm text-red-800 hover:bg-red-200 transition-colors"
                >
                  {language === 'en' ? 'Try:' : 'Попробовать:'} {cred.u} / {cred.p}
                </motion.button>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-300 rounded-lg"
            >
              <AlertTriangle className="w-5 h-5 text-red-600 mb-2" />
              <p className="text-sm text-red-800">
                <strong>{language === 'en' ? 'Vulnerability:' : 'Уязвимость:'}</strong>{' '}
                {language === 'en'
                  ? 'System still uses factory default credentials. An attacker could gain immediate administrative access by trying common username/password combinations.'
                  : 'Система все еще использует заводские учетные данные по умолчанию. Атакующий может получить немедленный административный доступ, попробовав распространенные комбинации логина/пароля.'}
              </p>
            </motion.div>
          </motion.div>
        )}

        {scenario === 'verbose' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6"
          >
            <h3 className="text-[var(--text-primary)] mb-3">
              {language === 'en' ? 'Verbose Error Message Demonstration' : 'Демонстрация подробного сообщения об ошибке'}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              {language === 'en'
                ? 'Enter any credentials and attempt login to see overly detailed error messages:'
                : 'Введите любые учетные данные и попытайтесь войти, чтобы увидеть чрезмерно подробные сообщения об ошибках:'}
            </p>

            <div className="space-y-3 mb-4">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={language === 'en' ? 'Username' : 'Имя пользователя'}
                className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--border-primary)] rounded-lg"
              />
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={language === 'en' ? 'Password' : 'Пароль'}
                className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--border-primary)] rounded-lg"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={attemptLogin}
                className="w-full py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90"
              >
                {language === 'en' ? 'Login' : 'Войти'}
              </motion.button>
            </div>

            {showError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border-2 border-red-500 rounded-lg"
              >
                <h4 className="text-red-800 mb-2">❌ {language === 'en' ? 'Error' : 'Ошибка'}</h4>
                <pre className="text-xs text-red-700 whitespace-pre-wrap font-mono bg-white p-3 rounded overflow-x-auto">
                  {errorMessages.verbose}
                </pre>
                <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded text-sm text-red-800">
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  {language === 'en'
                    ? 'This error reveals: database credentials, internal IP addresses, file paths, technology stack, and SQL query structure - all valuable reconnaissance for attackers!'
                    : 'Эта ошибка раскрывает: учетные данные базы данных, внутренние IP-адреса, пути к файлам, технологический стек и структуру SQL-запроса - всё это ценная разведка для атакующих!'}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {scenario === 'headers' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6"
          >
            <h3 className="text-[var(--text-primary)] mb-3">
              {language === 'en' ? 'Missing Security Headers' : 'Отсутствующие заголовки безопасности'}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              {language === 'en'
                ? "Security headers protect against common attacks. Here's what's missing:"
                : 'Заголовки безопасности защищают от распространенных атак. Вот что отсутствует:'}
            </p>

            <div className="space-y-3">
              {[
                {
                  header: 'Content-Security-Policy',
                  issue: language === 'en'
                    ? 'Allows XSS attacks - no restrictions on script sources'
                    : 'Допускает XSS атаки - нет ограничений на источники скриптов'
                },
                {
                  header: 'Strict-Transport-Security',
                  issue: language === 'en'
                    ? 'Site vulnerable to man-in-the-middle downgrade attacks'
                    : 'Сайт уязвим к атакам понижения версии man-in-the-middle'
                },
                {
                  header: 'X-Frame-Options',
                  issue: language === 'en'
                    ? 'Page can be embedded in iframe - vulnerable to clickjacking'
                    : 'Страница может быть встроена в iframe - уязвима к кликджекингу'
                },
                {
                  header: 'X-Content-Type-Options',
                  issue: language === 'en'
                    ? 'Browser can be tricked into executing malicious file types'
                    : 'Браузер может быть обманут для выполнения вредоносных типов файлов'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  whileHover={{ x: 5 }}
                  className="p-4 bg-red-50 border border-red-300 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <EyeOff className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="text-red-800 mb-1">
                        ❌ {language === 'en' ? 'Missing:' : 'Отсутствует:'} {item.header}
                      </div>
                      <p className="text-sm text-red-700">{item.issue}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-300 rounded-xl p-6 text-center"
        >
          <h3 className="text-green-800 mb-4">{t.levelComplete}</h3>
          <p className="text-green-700 mb-4">
            {language === 'en'
              ? "You've successfully identified security misconfiguration vulnerabilities. Understanding these common mistakes is crucial for securing systems."
              : 'Вы успешно выявили уязвимости неправильной конфигурации безопасности. Понимание этих распространенных ошибок имеет решающее значение для защиты систем.'}
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
              ✓ {language === 'en' ? 'Harden Configuration Processes' : 'Усилить процессы конфигурации'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Use Infrastructure as Code (IaC) like Terraform or CloudFormation for consistent, auditable configurations'
                : 'Используйте Infrastructure as Code (IaC) как Terraform или CloudFormation для согласованных, проверяемых конфигураций'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Change All Default Credentials' : 'Изменить все учетные данные по умолчанию'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Immediately change factory defaults. Use strong, unique passwords for all accounts'
                : 'Немедленно измените заводские настройки по умолчанию. Используйте сильные, уникальные пароли для всех аккаунтов'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Implement Generic Error Messages' : 'Реализовать общие сообщения об ошибках'}
            </h4>
            <code className="block bg-white p-3 rounded text-sm text-gray-800 mt-2">
              {language === 'en'
                ? `// Good: Generic message
res.status(401).json({ error: "Invalid credentials" });

// Bad: Reveals too much
res.status(500).json({ error: err.stack });`
                : `// Хорошо: Общее сообщение
res.status(401).json({ error: "Неверные учетные данные" });

// Плохо: Раскрывает слишком много
res.status(500).json({ error: err.stack });`}
            </code>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Set Security Headers' : 'Установить заголовки безопасности'}
            </h4>
            <code className="block bg-white p-3 rounded text-sm text-gray-800 mt-2">
              {`Content-Security-Policy: default-src 'self'
Strict-Transport-Security: max-age=31536000
X-Frame-Options: DENY
X-Content-Type-Options: nosniff`}
            </code>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Disable Unnecessary Features' : 'Отключить ненужные функции'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Turn off unused services, ports, and debugging features in production'
                : 'Отключите неиспользуемые сервисы, порты и функции отладки в продакшене'}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}