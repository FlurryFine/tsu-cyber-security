import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import { ArrowLeft, Key, AlertTriangle, Lock, Unlock, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { translations } from '../../../translations';

export function CryptographicFailures() {
  const { language } = useTheme();
  const t = translations[language];
  const [password, setPassword] = useState('');
  const [encryptionType, setEncryptionType] = useState<'none' | 'md5' | 'bcrypt'>('none');
  const [result, setResult] = useState<any>(null);

  const hashPassword = () => {
    let hashed = '';
    let crackTime = '';
    let secure = false;

    switch (encryptionType) {
      case 'none':
        hashed = password;
        crackTime = language === 'en' ? 'Instant (plain text)' : 'Мгновенно (открытый текст)';
        secure = false;
        break;
      case 'md5':
        hashed = 'a1b2c3d4e5f6...';
        crackTime = language === 'en' ? '< 1 second (rainbow tables)' : '< 1 секунды (радужные таблицы)';
        secure = false;
        break;
      case 'bcrypt':
        hashed = '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy';
        crackTime = language === 'en' ? 'Years (with proper salt + cost factor)' : 'Годы (при правильной соли и cost factor)';
        secure = true;
        break;
    }

    setResult({ hashed, crackTime, secure });
  };

  const handleReset = () => {
    setPassword('');
    setEncryptionType('none');
    setResult(null);
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05, duration: 0.3 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center gap-3 mb-4">
          <motion.div
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.1 }}
            className="p-3 bg-yellow-100 rounded-lg"
          >
            <Key className="w-6 h-6 text-yellow-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'Cryptographic Failures' : 'Криптографические сбои'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'OWASP #2 - Formerly Sensitive Data Exposure' : 'OWASP #2 - Ранее: Утечка конфиденциальных данных'}
            </p>
          </div>
        </div>

        <p className="text-[var(--text-secondary)] mb-4">
          {language === 'en'
            ? 'Cryptographic failures occur when systems fail to properly protect sensitive data through weak or outdated encryption algorithms, lack of encryption, poor key management, or insecure random number generation.'
            : 'Криптографические сбои возникают, когда системы не защищают конфиденциальные данные должным образом: слабые или устаревшие алгоритмы, отсутствие шифрования, неправильное управление ключами или небезопасная генерация случайных чисел.'}
        </p>

        <div className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-4">
          <h3 className="text-[var(--text-primary)] mb-3">
            {language === 'en' ? 'Main Causes:' : 'Основные причины:'}
          </h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {[
              {
                label: language === 'en' ? 'Weak algorithms:' : 'Слабые алгоритмы:',
                desc: language === 'en' ? 'MD5, SHA-1, DES are easily crackable' : 'MD5, SHA-1, DES легко взламываются',
              },
              {
                label: language === 'en' ? 'Lack of encryption:' : 'Отсутствие шифрования:',
                desc: language === 'en' ? 'Storing/transmitting data in plain text (HTTP vs HTTPS)' : 'Хранение/передача данных в открытом виде (HTTP вместо HTTPS)',
              },
              {
                label: language === 'en' ? 'Poor key management:' : 'Неправильное управление ключами:',
                desc: language === 'en' ? 'Hardcoding keys in source code' : 'Хранение ключей прямо в исходном коде',
              },
              {
                label: language === 'en' ? 'Insecure RNG:' : 'Небезопасный ГСЧ:',
                desc: language === 'en' ? 'Predictable random number generation' : 'Предсказуемая генерация случайных чисел',
              },
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.06 }}
              >
                • <strong className="text-[var(--text-primary)]">{item.label}</strong> {item.desc}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.3 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        {/* Header with restart */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[var(--text-primary)]">
            {language === 'en' ? 'Interactive Password Hashing Comparison' : 'Сравнение методов хеширования паролей'}
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
            ? 'See how different encryption methods protect (or fail to protect) password data.'
            : 'Посмотрите, как разные методы шифрования защищают (или не защищают) пароли.'}
        </p>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">
              {language === 'en' ? 'Enter Password' : 'Введите пароль'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={language === 'en' ? 'Enter a password...' : 'Введите пароль...'}
              className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
            />
          </div>

          <div>
            <label className="block text-sm text-[var(--text-secondary)] mb-2">
              {language === 'en' ? 'Storage Method' : 'Метод хранения'}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'none' as const, icon: Unlock, label: language === 'en' ? 'Plain Text' : 'Открытый текст', sub: '❌ ' + (language === 'en' ? 'Insecure' : 'Небезопасно'), color: 'red' },
                { id: 'md5' as const, icon: AlertTriangle, label: 'MD5 Hash', sub: '⚠️ ' + (language === 'en' ? 'Weak' : 'Слабый'), color: 'orange' },
                { id: 'bcrypt' as const, icon: Lock, label: 'bcrypt', sub: '✓ ' + (language === 'en' ? 'Secure' : 'Безопасно'), color: 'green' },
              ].map((opt) => (
                <motion.button
                  key={opt.id}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setEncryptionType(opt.id)}
                  className={`p-4 border-2 rounded-lg transition-all ${
                    encryptionType === opt.id
                      ? `border-${opt.color}-500 bg-${opt.color}-50`
                      : `border-[var(--border-primary)] hover:border-${opt.color}-300`
                  }`}
                >
                  <opt.icon className={`w-6 h-6 text-${opt.color}-600 mx-auto mb-2`} />
                  <div className="text-sm text-[var(--text-primary)]">{opt.label}</div>
                  <div className={`text-xs text-${opt.color}-600 mt-1`}>{opt.sub}</div>
                </motion.button>
              ))}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={hashPassword}
            disabled={!password}
            className="w-full py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg border border-[var(--accent-primary)] hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {language === 'en' ? 'Encrypt Password' : 'Зашифровать пароль'}
          </motion.button>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className={`p-6 border-2 rounded-lg ${
                result.secure ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
              }`}
            >
              <h3 className={`mb-4 ${result.secure ? 'text-green-800' : 'text-red-800'}`}>
                {result.secure
                  ? (language === 'en' ? '✓ Secure Storage' : '✓ Безопасное хранение')
                  : (language === 'en' ? '⚠️ Vulnerable Storage' : '⚠️ Уязвимое хранение')}
              </h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: language === 'en' ? 'Original Password:' : 'Исходный пароль:', value: password },
                  { label: language === 'en' ? 'Stored Value:' : 'Хранимое значение:', value: result.hashed, mono: true },
                  { label: language === 'en' ? 'Time to Crack:' : 'Время взлома:', value: result.crackTime, colored: true },
                ].map((row, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="p-3 bg-white/50 rounded"
                  >
                    <div className="text-gray-600 mb-1">{row.label}</div>
                    <code className={`break-all ${row.mono ? 'font-mono text-xs' : ''} ${
                      row.colored ? (result.secure ? 'text-green-700' : 'text-red-700') : 'text-gray-900'
                    }`}>{row.value}</code>
                  </motion.div>
                ))}
              </div>
              {!result.secure && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 p-3 bg-red-100 border border-red-300 rounded text-sm text-red-800"
                >
                  <AlertTriangle className="w-4 h-4 inline mr-2" />
                  {encryptionType === 'none'
                    ? (language === 'en'
                        ? 'Plain text storage allows anyone with database access to read passwords immediately!'
                        : 'Хранение в открытом виде позволяет любому с доступом к БД сразу читать пароли!')
                    : (language === 'en'
                        ? 'MD5 hashes can be cracked instantly using rainbow tables or GPU acceleration!'
                        : 'MD5-хэши можно мгновенно взломать с помощью радужных таблиц или GPU!')}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-red-50 border border-red-200 rounded-xl p-6">
          <h3 className="text-red-800 mb-3">❌ {language === 'en' ? 'Vulnerable Example' : 'Уязвимый пример'}</h3>
          <code className="block bg-white p-3 rounded text-sm text-gray-800 overflow-x-auto">
            {`// Using weak MD5\nconst crypto = require('crypto');\nconst hash = crypto\n  .createHash('md5')\n  .update(password)\n  .digest('hex');\n\n// Storing in plain HTTP\nfetch('http://api.com/login', {\n  body: { password }\n});`}
          </code>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-6">
          <h3 className="text-green-800 mb-3">✓ {language === 'en' ? 'Secure Example' : 'Безопасный пример'}</h3>
          <code className="block bg-white p-3 rounded text-sm text-gray-800 overflow-x-auto">
            {`// Using bcrypt with salt\nconst bcrypt = require('bcrypt');\nconst saltRounds = 10;\nconst hash = await bcrypt.hash(\n  password,\n  saltRounds\n);\n\n// Using HTTPS\nfetch('https://api.com/login', {\n  body: { password }\n});`}
          </code>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.3 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-[var(--text-primary)] mb-4">{t.prevention}</h3>
        <div className="space-y-3 text-[var(--text-secondary)]">
          {[
            {
              title: language === 'en' ? '✓ Use Strong Hashing Algorithms' : '✓ Использовать стойкие алгоритмы хеширования',
              desc: language === 'en'
                ? 'Use Argon2, bcrypt, or scrypt for password hashing with proper salt and cost factors'
                : 'Используйте Argon2, bcrypt или scrypt для хеширования паролей с правильной солью',
            },
            {
              title: language === 'en' ? '✓ Encrypt Data in Transit and at Rest' : '✓ Шифровать данные при передаче и хранении',
              desc: language === 'en'
                ? 'Always use HTTPS/TLS for transmission and encrypt sensitive database fields'
                : 'Всегда используйте HTTPS/TLS для передачи и шифруйте конфиденциальные поля в БД',
            },
            {
              title: language === 'en' ? '✓ Secure Key Management' : '✓ Безопасное управление ключами',
              desc: language === 'en'
                ? 'Use key management services (AWS KMS, Azure Key Vault), never hardcode keys'
                : 'Используйте сервисы управления ключами (AWS KMS, Azure Key Vault), не хардкодьте ключи',
            },
            {
              title: language === 'en' ? '✓ Cryptographically Secure Random Numbers' : '✓ Криптографически стойкие случайные числа',
              desc: language === 'en'
                ? 'Use crypto.randomBytes() or SecureRandom, not Math.random()'
                : 'Используйте crypto.randomBytes() или SecureRandom, а не Math.random()',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              className="p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <h4 className="text-green-800 mb-2">{item.title}</h4>
              <p className="text-sm text-green-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
