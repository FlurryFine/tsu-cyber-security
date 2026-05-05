import { useState } from 'react';
import { ArrowLeft, Key, Shield, AlertTriangle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { translations } from '../../../translations';

export function AuthenticationFailures() {
  const { language } = useTheme();
  const t = translations[language];
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [sessionId] = useState('session_12345');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showBreach, setShowBreach] = useState(false);

  const handleReset = () => {
    setLoginAttempts(0);
    setIsCompleted(false);
    setShowBreach(false);
  };

  const attemptBruteForce = () => {
    const next = loginAttempts + 100;
    setLoginAttempts(next);
    if (next >= 300) {
      setShowBreach(true);
      setIsCompleted(true);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.3 },
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
            initial={{ rotate: 360, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.1 }}
            className="p-3 bg-cyan-100 rounded-lg"
          >
            <Key className="w-6 h-6 text-cyan-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'Authentication Failures' : 'Сбои аутентификации'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'OWASP #7 - Identity Verification Flaws' : 'OWASP #7 - Уязвимости проверки личности'}
            </p>
          </div>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          {language === 'en'
            ? 'Authentication Failures occur when user identities are not properly verified, allowing unauthorized actors to access accounts through weak passwords, credential stuffing, or session hijacking.'
            : 'Сбои аутентификации возникают, когда личность пользователей не проверяется должным образом, что позволяет неавторизованным лицам получать доступ через слабые пароли, атаки на учётные данные или перехват сессий.'}
        </p>

        <div className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-4">
          <h3 className="text-[var(--text-primary)] mb-3">
            {language === 'en' ? 'Common Vulnerabilities:' : 'Распространённые уязвимости:'}
          </h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {[
              {
                label: language === 'en' ? 'Weak Passwords:' : 'Слабые пароли:',
                desc: language === 'en' ? 'No complexity requirements, easily guessable combinations' : 'Нет требований к сложности, легко угадываемые комбинации',
              },
              {
                label: language === 'en' ? 'No Rate Limiting:' : 'Отсутствие ограничения частоты:',
                desc: language === 'en' ? 'Unlimited login attempts enable brute-force attacks' : 'Неограниченные попытки входа позволяют атаки перебором',
              },
              {
                label: language === 'en' ? 'Missing MFA:' : 'Отсутствие MFA:',
                desc: language === 'en' ? 'Single-factor auth compromised by stolen credentials' : 'Однофакторная аутентификация скомпрометирована кражей данных',
              },
              {
                label: language === 'en' ? 'Session Hijacking:' : 'Перехват сессий:',
                desc: language === 'en' ? 'Predictable or unprotected session tokens' : 'Предсказуемые или незащищённые токены сессий',
              },
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="flex items-start gap-2"
              >
                <span className="text-cyan-600 mt-1">•</span>
                <span><strong className="text-[var(--text-primary)]">{item.label}</strong> {item.desc}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        custom={1}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[var(--text-primary)]">{t.interactiveDemo}</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-3 py-2 border border-[var(--border-primary)] text-[var(--text-secondary)] rounded-lg hover:bg-[var(--hover-bg)] transition-all text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            {t.restart}
          </motion.button>
        </div>

        <div className="space-y-4">
          {/* Brute force scenario */}
          <motion.div whileHover={{ scale: 1.01 }} className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-red-800 mb-2">
              {language === 'en' ? 'Credential Stuffing / Brute Force' : 'Перебор учётных данных / Brute Force'}
            </h3>
            <p className="text-sm text-red-700 mb-3">
              {language === 'en'
                ? 'Attackers use stolen username/password pairs from data breaches to access accounts on other services.'
                : 'Атакующие используют похищенные пары логин/пароль из утечек данных для доступа к аккаунтам на других сервисах.'}
            </p>
            <div className="bg-white p-3 rounded text-xs mb-3">
              <div>
                {language === 'en' ? 'Attempts:' : 'Попыток:'}{' '}
                <motion.span
                  key={loginAttempts}
                  initial={{ scale: 1.5, color: '#ef4444' }}
                  animate={{ scale: 1 }}
                  className="font-bold"
                >
                  {loginAttempts}
                </motion.span>
                /300
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(loginAttempts / 300) * 100}%` }}
                  className="bg-red-600 h-2 rounded-full"
                />
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={attemptBruteForce}
              disabled={isCompleted}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors disabled:opacity-50"
            >
              {language === 'en' ? 'Simulate Attack (+100 attempts)' : 'Симулировать атаку (+100 попыток)'}
            </motion.button>
          </motion.div>

          <AnimatePresence>
            {showBreach && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 bg-red-600 border-4 border-red-800 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    <AlertTriangle className="w-8 h-8 text-white flex-shrink-0" />
                  </motion.div>
                  <div>
                    <h4 className="text-white mb-1">
                      🚨 {language === 'en' ? 'Account Compromised!' : 'Аккаунт скомпрометирован!'}
                    </h4>
                    <p className="text-red-100 text-sm">
                      {language === 'en'
                        ? 'Password cracked using breached credentials database. MFA would have prevented this attack.'
                        : 'Пароль взломан с помощью базы утечек. MFA предотвратила бы эту атаку.'}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Session hijacking */}
          <motion.div whileHover={{ x: 4 }} className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <h3 className="text-orange-800 mb-2">
              {language === 'en' ? 'Session Hijacking' : 'Перехват сессии'}
            </h3>
            <div className="bg-white p-3 rounded">
              <div className="text-xs text-gray-600 mb-1">
                {language === 'en' ? 'Current Session ID:' : 'Текущий ID сессии:'}
              </div>
              <code className="text-sm text-orange-600 break-all">{sessionId}</code>
              <div className="mt-2 text-xs text-orange-700">
                ⚠️ {language === 'en'
                  ? 'Predictable session ID exposed in URL — vulnerable to hijacking'
                  : 'Предсказуемый ID сессии в URL — уязвим для перехвата'}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isCompleted && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-green-50 border border-green-300 rounded-xl p-6 text-center"
          >
            <h3 className="text-green-800 mb-4">{t.levelComplete}</h3>
            <p className="text-green-700 mb-4">
              {language === 'en'
                ? "You've learned about authentication vulnerabilities. Strong authentication is the first line of defense."
                : 'Вы изучили уязвимости аутентификации. Надёжная аутентификация — первая линия защиты.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg"
            >
              <RefreshCw className="w-4 h-4" />
              {t.restartLevel}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        custom={2}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-[var(--text-primary)] mb-4">{t.prevention}</h3>
        <div className="space-y-3">
          {[
            {
              title: language === 'en' ? 'Multi-Factor Authentication (MFA)' : 'Многофакторная аутентификация (MFA)',
              desc: language === 'en' ? 'Require additional verification beyond password' : 'Требуйте дополнительную верификацию помимо пароля',
            },
            {
              title: language === 'en' ? 'Strong Password Policies' : 'Строгие политики паролей',
              desc: language === 'en' ? 'Enforce complexity, check against breach databases (HaveIBeenPwned)' : 'Требуйте сложности, проверяйте по базам утечек (HaveIBeenPwned)',
            },
            {
              title: language === 'en' ? 'Rate Limiting & Lockouts' : 'Ограничение частоты и блокировки',
              desc: language === 'en' ? 'Limit login attempts, implement temporary account lockouts' : 'Ограничьте попытки входа, реализуйте временную блокировку аккаунтов',
            },
            {
              title: language === 'en' ? 'Secure Session Management' : 'Безопасное управление сессиями',
              desc: language === 'en' ? 'Use HttpOnly, Secure, SameSite cookies; invalidate on logout' : 'Используйте HttpOnly, Secure, SameSite cookies; инвалидируйте при выходе',
            },
            {
              title: language === 'en' ? 'Generic Error Messages' : 'Общие сообщения об ошибках',
              desc: language === 'en' ? 'Never reveal whether username or password was incorrect' : 'Никогда не указывайте, что именно неверно — логин или пароль',
            },
            {
              title: language === 'en' ? 'Strong Password Hashing' : 'Надёжное хэширование паролей',
              desc: language === 'en' ? 'Use bcrypt or Argon2 with salt, never plain text' : 'Используйте bcrypt или Argon2 с солью, никогда не храните в открытом виде',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              className="p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <h4 className="text-green-800 mb-1">✓ {item.title}</h4>
              <p className="text-sm text-green-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
