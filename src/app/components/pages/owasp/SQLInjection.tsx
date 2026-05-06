import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Database, AlertTriangle, Code, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { useState } from 'react';
import { useTheme } from '../../../context/ThemeContext';
import { translations } from '../../../translations';

export function SQLInjection() {
  const { language } = useTheme();
  const t = translations[language];
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any>(null);
  const [showVisualization, setShowVisualization] = useState(false);

  const executeQuery = () => {
    setShowVisualization(true);
    const isMalicious = query.includes("' OR") || query.includes("1=1") || query.includes("--");
    setTimeout(() => {
      if (isMalicious) {
        setResult({
          success: true,
          data: [
            { id: 1, username: 'admin', password: 'admin123', email: 'admin@company.com', role: 'Administrator' },
            { id: 2, username: 'jsmith', password: 'password123', email: 'john@company.com', role: 'User' },
            { id: 3, username: 'mjones', password: 'secure456', email: 'mary@company.com', role: 'User' },
            { id: 4, username: 'dbaker', password: 'baker789', email: 'david@company.com', role: 'Manager' },
          ],
          breach: true,
        });
      } else if (query.trim()) {
        setResult({
          success: true,
          data: [{ id: 1, username: 'testuser', email: 'test@example.com', role: 'User' }],
          breach: false,
        });
      } else {
        setResult({ success: false, message: language === 'en' ? 'Please enter a username' : 'Введите имя пользователя' });
      }
    }, 1200);
  };

  const handleReset = () => {
    setQuery('');
    setResult(null);
    setShowVisualization(false);
  };

  const examplePayloads = ["' OR 1=1 --", "admin' --", "' OR 'a'='a"];

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
            className="p-3 bg-red-100 rounded-lg"
          >
            <Database className="w-6 h-6 text-red-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'SQL Injection (SQLi)' : 'SQL-инъекция (SQLi)'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'OWASP #3 - Injection Vulnerabilities' : 'OWASP #3 - Уязвимости инъекций'}
            </p>
          </div>
        </div>

        <p className="text-[var(--text-secondary)] mb-4">
          {language === 'en'
            ? 'SQL injection is a code injection technique that exploits vulnerabilities in an application\'s database layer. Attackers can insert malicious SQL code into query strings, bypassing authentication and accessing sensitive data.'
            : 'SQL-инъекция — техника внедрения кода, использующая уязвимости в уровне базы данных приложения. Атакующие могут вставлять вредоносный SQL-код в строки запросов, обходя аутентификацию и получая доступ к данным.'}
        </p>

        <div className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-4">
          <h3 className="text-[var(--text-primary)] mb-3">
            {language === 'en' ? 'How It Works:' : 'Как это работает:'}
          </h3>
          <div className="space-y-2 text-sm text-[var(--text-secondary)] font-mono">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <span className="text-green-600">// {language === 'en' ? 'Vulnerable Code:' : 'Уязвимый код:'}</span>
              <br />
              <span className="text-[var(--text-primary)]">
                query = "SELECT * FROM users WHERE username = '" + userInput + "'"
              </span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
              <span className="text-red-600">// {language === 'en' ? 'Attacker Input: ' : 'Ввод атакующего: '}</span>
              <span className="text-[var(--text-primary)]">' OR 1=1 --</span>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <span className="text-orange-600">// {language === 'en' ? 'Resulting Query:' : 'Результирующий запрос:'}</span>
              <br />
              <span className="text-[var(--text-primary)]">
                SELECT * FROM users WHERE username = '' OR 1=1 --'
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="pt-2 border-t border-[var(--border-primary)]"
            >
              <span className="text-red-600">
                ⚠️ {language === 'en' ? 'This returns ALL users because 1=1 is always true!' : 'Это возвращает ВСЕХ пользователей, так как 1=1 всегда истина!'}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
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
            {t.restartLevel}
          </motion.button>
        </div>
        <p className="text-sm text-[var(--text-secondary)] mb-6">
          {language === 'en'
            ? 'This simulated login form is vulnerable to SQL injection. Try entering a malicious payload to bypass authentication.'
            : 'Эта симулированная форма входа уязвима к SQL-инъекции. Попробуйте ввести вредоносный payload для обхода аутентификации.'}
        </p>

        <div className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6 mb-4">
          <label className="block text-sm text-[var(--text-secondary)] mb-2">
            {language === 'en' ? 'Username' : 'Имя пользователя'}
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowVisualization(false);
              setResult(null);
            }}
            placeholder={language === 'en' ? 'Enter username or SQL injection payload...' : 'Введите имя пользователя или SQL-payload...'}
            className="w-full px-4 py-3 bg-[var(--input-bg)] border border-[var(--border-primary)] rounded-lg text-[var(--text-primary)] font-mono focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
          />

          <div className="mt-4 flex gap-2 flex-wrap">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={executeQuery}
              className="px-6 py-2 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg border border-[var(--accent-primary)] hover:opacity-90 transition-opacity"
            >
              {language === 'en' ? 'Execute Query' : 'Выполнить запрос'}
            </motion.button>
            <div className="flex gap-2 flex-wrap">
              {examplePayloads.map((payload, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setQuery(payload)}
                  className="px-3 py-2 bg-[var(--hover-bg)] border border-[var(--border-primary)] text-[var(--text-primary)] text-sm rounded-lg hover:bg-[var(--accent-primary)] hover:text-[var(--accent-text)] hover:border-[var(--accent-primary)] transition-colors"
                >
                  {language === 'en' ? 'Try: ' : 'Пример: '}{payload}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {showVisualization && !result && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6 bg-blue-50 border border-blue-200 rounded-lg text-center"
            >
              <Code className="w-8 h-8 text-blue-600 mx-auto mb-2 animate-spin" />
              <p className="text-blue-800">
                {language === 'en' ? 'Processing SQL query...' : 'Обработка SQL-запроса...'}
              </p>
            </motion.div>
          )}

          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.25 }}
              className={`p-6 border-2 rounded-lg ${
                result.breach
                  ? 'border-red-500 bg-red-50'
                  : result.success
                  ? 'border-green-500 bg-green-50'
                  : 'border-yellow-500 bg-yellow-50'
              }`}
            >
              {result.breach && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mb-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                    <h3 className="text-red-800">
                      {language === 'en' ? 'Security Breach Detected!' : 'Обнаружена брешь безопасности!'}
                    </h3>
                  </div>
                  <p className="text-sm text-red-700 mb-4">
                    {language === 'en'
                      ? 'SQL Injection successful! The malicious query bypassed authentication and exposed all user records.'
                      : 'SQL-инъекция успешна! Вредоносный запрос обошёл аутентификацию и раскрыл все записи пользователей.'}
                  </p>
                </motion.div>
              )}

              {result.data && (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left p-2 text-gray-700">ID</th>
                        <th className="text-left p-2 text-gray-700">{language === 'en' ? 'Username' : 'Логин'}</th>
                        <th className="text-left p-2 text-gray-700">{language === 'en' ? 'Password' : 'Пароль'}</th>
                        <th className="text-left p-2 text-gray-700">Email</th>
                        <th className="text-left p-2 text-gray-700">{language === 'en' ? 'Role' : 'Роль'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.data.map((row: any, i: number) => (
                        <motion.tr
                          key={row.id}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.06 }}
                          className="border-b border-gray-200"
                        >
                          <td className="p-2 text-gray-800">{row.id}</td>
                          <td className="p-2 text-gray-800">{row.username}</td>
                          <td className="p-2 text-gray-800">{row.password || 'N/A'}</td>
                          <td className="p-2 text-gray-800">{row.email}</td>
                          <td className="p-2 text-gray-800">{row.role}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {result.message && (
                <p className="text-yellow-800">{result.message}</p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-[var(--text-primary)] mb-4">{t.prevention}</h3>
        <div className="space-y-3 text-[var(--text-secondary)]">
          {[
            {
              title: language === 'en' ? '✓ Use Parameterized Queries (Prepared Statements)' : '✓ Использовать параметризованные запросы',
              code: 'const query = "SELECT * FROM users WHERE username = ?";\ndb.execute(query, [userInput]);',
            },
            {
              title: language === 'en' ? '✓ Use ORM Frameworks' : '✓ Использовать ORM-фреймворки',
              desc: language === 'en'
                ? 'Modern ORMs (Sequelize, Prisma, TypeORM) handle sanitization automatically'
                : 'Современные ORM (Sequelize, Prisma, TypeORM) обрабатывают санитизацию автоматически',
            },
            {
              title: language === 'en' ? '✓ Input Validation & Sanitization' : '✓ Валидация и санитизация входных данных',
              desc: language === 'en'
                ? 'Whitelist allowed characters, validate data types, escape special characters'
                : 'Разрешайте только допустимые символы, проверяйте типы данных, экранируйте спецсимволы',
            },
            {
              title: language === 'en' ? '✓ Principle of Least Privilege' : '✓ Принцип наименьших привилегий',
              desc: language === 'en'
                ? 'Database accounts should have minimum necessary permissions'
                : 'Учётные записи базы данных должны иметь минимально необходимые права',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              className="p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <h4 className="text-green-800 mb-2">{item.title}</h4>
              {item.code && <code className="block bg-white p-3 rounded text-sm text-gray-800 overflow-x-auto">{item.code}</code>}
              {item.desc && <p className="text-sm text-green-700">{item.desc}</p>}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
