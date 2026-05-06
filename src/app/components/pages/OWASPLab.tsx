import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Lock, Terminal, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../translations';

export function OWASPLab() {
  const { language } = useTheme();
  const t = translations[language];
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isBreaking, setIsBreaking] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.includes("' OR 1=1 --") || password.includes("' OR '1'='1")) {
      setIsBreaking(true);
      setTimeout(() => {
        navigate('/owasp-lab/threat-map');
      }, 1500);
    } else {
      setAttempts(attempts + 1);
      if (attempts === 0) {
        setShowHint(true);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="p-3 bg-blue-100 rounded-lg"
          >
            <Terminal className="w-6 h-6 text-blue-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'Technical Attacks — Interactive Lab' : 'Технические Атаки — Интерактивная лаборатория'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'OWASP Top 10 Attack Simulations' : 'Симуляции атак OWASP Top 10'}
            </p>
          </div>
        </div>
        <p className="text-[var(--text-secondary)]">
          {language === 'en'
            ? 'Welcome to the Technical Attacks Lab. This hands-on environment teaches technical vulnerabilities through practical demonstrations. You\'ll learn to identify, exploit, and defend against the most critical web application security risks.'
            : 'Добро пожаловать в Лабораторию технических атак. Эта практическая среда обучает техническим уязвимостям через реальные демонстрации. Вы научитесь выявлять, эксплуатировать и защищаться от наиболее критических рисков безопасности веб-приложений.'}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-8 shadow-lg overflow-hidden"
      >
        {isBreaking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            className="absolute inset-0 bg-red-600 z-10"
          />
        )}

        <div className="relative z-20 max-w-md mx-auto">
          <div className="text-center mb-8">
            <motion.div
              animate={isBreaking ? { rotate: [0, -10, 10, -10, 0] } : {}}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center justify-center w-16 h-16 bg-[var(--hover-bg)] rounded-full mb-4"
            >
              <Lock className="w-8 h-8 text-[var(--text-primary)]" />
            </motion.div>
            <h2 className="text-[var(--text-primary)] mb-2">
              {language === 'en' ? 'Corporate Login Portal' : 'Корпоративный портал входа'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)]">
              SecureApp v2.3 — {language === 'en' ? 'Authentication Required' : 'Требуется аутентификация'}
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">
                {language === 'en' ? 'Username' : 'Имя пользователя'}
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                placeholder={language === 'en' ? 'Enter username' : 'Введите имя пользователя'}
              />
            </div>

            <div>
              <label className="block text-sm text-[var(--text-secondary)] mb-2">
                {language === 'en' ? 'Password' : 'Пароль'}
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                placeholder={language === 'en' ? 'Enter password' : 'Введите пароль'}
              />
            </div>

            {attempts > 0 && !showHint && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
              >
                {language === 'en' ? 'Invalid credentials. Please try again.' : 'Неверные учётные данные. Попробуйте ещё раз.'}
              </motion.div>
            )}

            {showHint && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg"
              >
                <div className="flex items-start gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <strong>{language === 'en' ? 'System Hint:' : 'Подсказка системы:'}</strong>{' '}
                    {language === 'en'
                      ? 'This login form is vulnerable to SQL injection. The password field is not properly sanitized. Try:'
                      : 'Эта форма входа уязвима к SQL-инъекции. Поле пароля не санируется должным образом. Попробуйте:'}{' '}
                    <code className="bg-yellow-100 px-2 py-1 rounded">' OR 1=1 --</code>
                  </div>
                </div>
              </motion.div>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity"
            >
              {isBreaking
                ? (language === 'en' ? 'ACCESS GRANTED...' : 'ДОСТУП ПОЛУЧЕН...')
                : (language === 'en' ? 'Login' : 'Войти')}
            </motion.button>
          </form>

          {isBreaking && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-green-50 border border-green-300 rounded-lg text-center"
            >
              <p className="text-green-800 mb-2">
                {language === 'en' ? 'Security Bypass Successful!' : 'Обход безопасности успешен!'}
              </p>
              <p className="text-sm text-green-700">
                {language === 'en'
                  ? 'SQL injection detected. Redirecting to lab environment...'
                  : 'SQL-инъекция обнаружена. Перенаправление в лабораторную среду...'}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-[var(--text-primary)] mb-3">
          {language === 'en' ? 'About This Lab' : 'О лаборатории'}
        </h3>
        <p className="text-[var(--text-secondary)] text-sm mb-4">
          {language === 'en'
            ? 'This is a safe, simulated environment designed for educational purposes. You\'ll learn about:'
            : 'Это безопасная симулированная среда, разработанная для образовательных целей. Вы узнаете о:'}
        </p>
        <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
          <li>• {language === 'en' ? 'SQL Injection and database vulnerabilities' : 'SQL-инъекции и уязвимости баз данных'}</li>
          <li>• {language === 'en' ? 'Cross-Site Scripting (XSS) attacks' : 'Атаки межсайтового скриптинга (XSS)'}</li>
          <li>• {language === 'en' ? 'Broken Access Control' : 'Нарушение контроля доступа'}</li>
          <li>• {language === 'en' ? 'And more OWASP Top 10 vulnerabilities' : 'И другие уязвимости OWASP Top 10'}</li>
        </ul>
      </motion.div>
    </motion.div>
  );
}
