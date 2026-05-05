import { useState } from 'react';
import { ArrowLeft, Shield, AlertCircle, Lock, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { translations } from '../../../translations';

export function InsecureDesign() {
  const { language } = useTheme();
  const t = translations[language];
  const [scenario, setScenario] = useState<'auth' | 'rate-limit' | 'business-logic'>('auth');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [cartPrice, setCartPrice] = useState(99.99);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showExploit, setShowExploit] = useState(false);

  const handleReset = () => {
    setLoginAttempts(0);
    setCartPrice(99.99);
    setIsCompleted(false);
    setShowExploit(false);
    setScenario('auth');
  };

  const simulateRateLimit = () => {
    const next = loginAttempts + 1000;
    setLoginAttempts(next);
    if (next >= 2000) {
      setShowExploit(true);
      setIsCompleted(true);
    }
  };

  const modifyPrice = (newPrice: number) => {
    setCartPrice(newPrice);
    if (newPrice < 1) {
      setShowExploit(true);
      setIsCompleted(true);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.3, ease: 'easeOut' },
    }),
  };

  const scenarioItems = [
    { id: 'auth' as const, icon: Lock, label: language === 'en' ? 'Weak Authentication' : 'Слабая аутентификация', color: 'red' },
    { id: 'rate-limit' as const, icon: AlertCircle, label: language === 'en' ? 'Missing Rate Limiting' : 'Нет ограничения частоты', color: 'orange' },
    { id: 'business-logic' as const, icon: Shield, label: language === 'en' ? 'Flawed Business Logic' : 'Ошибочная бизнес-логика', color: 'yellow' },
  ];

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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 250, damping: 15 }}
            className="p-3 bg-purple-100 rounded-lg"
          >
            <Shield className="w-6 h-6 text-purple-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'Insecure Design' : 'Небезопасное проектирование'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'OWASP #4 - Architectural Security Flaws' : 'OWASP #4 - Архитектурные уязвимости безопасности'}
            </p>
          </div>
        </div>

        <p className="text-[var(--text-secondary)] mb-4">
          {language === 'en'
            ? 'Insecure design refers to structural flaws in an application\'s architecture where security controls are missing or ineffective from the start. This represents a "security by design" failure — not a coding error, but a broken plan.'
            : 'Небезопасное проектирование относится к структурным недостаткам архитектуры приложения, где меры безопасности отсутствуют или неэффективны с самого начала. Это «сбой безопасности по замыслу» — не ошибка кода, а ошибочный план.'}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-4"
        >
          <h3 className="text-[var(--text-primary)] mb-3">
            {language === 'en' ? 'Fundamental Concept:' : 'Основная концепция:'}
          </h3>
          <div className="text-sm text-[var(--text-secondary)] space-y-2">
            <p>• <strong className="text-[var(--text-primary)]">
              {language === 'en' ? 'Insecure Design:' : 'Небезопасное проектирование:'}
            </strong>{' '}
              {language === 'en' ? 'A broken plan from the very beginning' : 'Ошибочный план с самого начала'}
            </p>
            <p>• <strong className="text-[var(--text-primary)]">
              {language === 'en' ? 'Insecure Implementation:' : 'Небезопасная реализация:'}
            </strong>{' '}
              {language === 'en' ? 'A broken execution of a good plan' : 'Ошибочное исполнение хорошего плана'}
            </p>
            <p className="pt-2 border-t border-[var(--border-primary)] mt-3">
              {language === 'en'
                ? 'Examples: Unlimited login attempts, missing input validation architecture, improper data segregation'
                : 'Примеры: Неограниченные попытки входа, отсутствие архитектуры валидации ввода, неправильное разделение данных'}
            </p>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        custom={1}
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[var(--text-primary)]">
            {language === 'en' ? 'Attack Scenario Demonstrations' : 'Демонстрации сценариев атак'}
          </h2>
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

        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {scenarioItems.map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.07 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setScenario(item.id); setShowExploit(false); }}
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

        <AnimatePresence mode="wait">
          {scenario === 'auth' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6"
            >
              <h3 className="text-[var(--text-primary)] mb-3">
                {language === 'en' ? 'Weak Authentication Flow' : 'Слабый поток аутентификации'}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {language === 'en'
                  ? 'Application allows unlimited login attempts with predictable password reset mechanism.'
                  : 'Приложение допускает неограниченное количество попыток входа с предсказуемым механизмом сброса пароля.'}
              </p>
              <div className="bg-white p-4 rounded-lg border border-[var(--border-primary)]">
                <code className="text-sm text-gray-800 whitespace-pre-wrap">{`// ${language === 'en' ? 'Insecure Design' : 'Небезопасное проектирование'}
function login(username, password) {
  if (checkCredentials(username, password)) {
    return createSession(username);
  }
  // ❌ ${language === 'en' ? 'No rate limiting' : 'Нет ограничения частоты'}
  // ❌ ${language === 'en' ? 'No account lockout' : 'Нет блокировки аккаунта'}
  // ❌ ${language === 'en' ? 'No CAPTCHA after failures' : 'Нет CAPTCHA после ошибок'}
  return "${language === 'en' ? 'Invalid credentials' : 'Неверные учётные данные'}";
}`}</code>
              </div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-4 p-3 bg-red-50 border border-red-300 rounded text-sm text-red-800"
              >
                <AlertCircle className="w-4 h-4 inline mr-2" />
                {language === 'en'
                  ? 'Attackers can perform unlimited brute-force attempts, trying thousands of passwords per second.'
                  : 'Атакующие могут выполнять неограниченные попытки перебора, проверяя тысячи паролей в секунду.'}
              </motion.div>
            </motion.div>
          )}

          {scenario === 'rate-limit' && (
            <motion.div
              key="rate-limit"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6"
            >
              <h3 className="text-[var(--text-primary)] mb-3">
                {language === 'en' ? 'Missing Rate Limiting' : 'Отсутствие ограничения частоты запросов'}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {language === 'en'
                  ? 'Login endpoint allows thousands of requests per second without throttling.'
                  : 'Эндпоинт входа допускает тысячи запросов в секунду без ограничения.'}
              </p>

              <div className="mb-4 p-4 bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-lg">
                <div className="text-sm text-[var(--text-secondary)] mb-2">
                  {language === 'en' ? 'Login Attempts:' : 'Попытки входа:'} {loginAttempts.toLocaleString()}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((loginAttempts / 10000) * 100, 100)}%` }}
                    className="bg-red-600 h-full"
                    transition={{ duration: 0.5 }}
                  />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={simulateRateLimit}
                className="px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity"
              >
                {language === 'en' ? 'Simulate Brute Force (+1000 attempts/sec)' : 'Симулировать перебор (+1000 попыток/сек)'}
              </motion.button>

              <AnimatePresence>
                {showExploit && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded-lg"
                  >
                    <h4 className="text-red-800 mb-2">
                      🚨 {language === 'en' ? 'System Compromised!' : 'Система скомпрометирована!'}
                    </h4>
                    <p className="text-sm text-red-700">
                      {language === 'en'
                        ? `Without rate limiting, attackers tried ${loginAttempts.toLocaleString()} password combinations. Password cracked in under 1 minute!`
                        : `Без ограничения частоты атакующие попробовали ${loginAttempts.toLocaleString()} комбинаций паролей. Пароль взломан менее чем за 1 минуту!`}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {scenario === 'business-logic' && (
            <motion.div
              key="business-logic"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6"
            >
              <h3 className="text-[var(--text-primary)] mb-3">
                {language === 'en' ? 'Flawed Business Logic: Price Manipulation' : 'Ошибочная бизнес-логика: Манипуляция ценой'}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {language === 'en'
                  ? 'Shopping cart allows client-side price modification before checkout.'
                  : 'Корзина позволяет изменять цену на стороне клиента перед оплатой.'}
              </p>

              <div className="bg-white p-6 rounded-lg border border-[var(--border-primary)] mb-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-[var(--text-primary)]">
                      {language === 'en' ? 'Premium Security Course' : 'Премиум курс по безопасности'}
                    </h4>
                    <p className="text-sm text-[var(--text-secondary)]">
                      {language === 'en' ? 'Original Price: $99.99' : 'Исходная цена: $99.99'}
                    </p>
                  </div>
                  <motion.div
                    key={cartPrice}
                    initial={{ scale: 1.2, color: '#ef4444' }}
                    animate={{ scale: 1, color: 'inherit' }}
                    className="text-2xl text-[var(--text-primary)]"
                  >
                    ${cartPrice.toFixed(2)}
                  </motion.div>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={() => modifyPrice(0.01)}
                    className="w-full px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
                  >
                    {language === 'en' ? 'Modify Price to $0.01 (Exploit)' : 'Изменить цену на $0.01 (Эксплойт)'}
                  </button>
                  <button
                    onClick={() => modifyPrice(99.99)}
                    className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                  >
                    {language === 'en' ? 'Reset to Original Price' : 'Сбросить до исходной цены'}
                  </button>
                </div>
              </div>

              <AnimatePresence>
                {showExploit && cartPrice < 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="p-4 bg-orange-50 border-2 border-orange-500 rounded-lg"
                  >
                    <h4 className="text-orange-800 mb-2">
                      ⚠️ {language === 'en' ? 'Business Logic Flaw Exploited!' : 'Уязвимость бизнес-логики использована!'}
                    </h4>
                    <p className="text-sm text-orange-700">
                      {language === 'en'
                        ? 'The application trusts client-side price data. Attacker purchased a $99.99 course for $0.01 by intercepting the HTTP request and modifying the price parameter.'
                        : 'Приложение доверяет цене на стороне клиента. Атакующий купил курс за $99.99 за $0.01, перехватив HTTP-запрос и изменив параметр цены.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
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
                ? "You've successfully identified insecure design patterns. Understanding these architectural flaws is crucial for building secure systems from the ground up."
                : 'Вы успешно выявили небезопасные шаблоны проектирования. Понимание этих архитектурных уязвимостей критически важно для построения безопасных систем с нуля.'}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity"
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
        <div className="space-y-3 text-[var(--text-secondary)]">
          {[
            {
              title: language === 'en' ? 'Apply Threat Modeling' : 'Применяйте моделирование угроз',
              desc: language === 'en'
                ? 'Conduct threat modeling during the design phase to identify risks before development begins'
                : 'Проводите моделирование угроз на этапе проектирования для выявления рисков до начала разработки',
            },
            {
              title: language === 'en' ? 'Secure Development Lifecycle (SDL)' : 'Жизненный цикл безопасной разработки (SDL)',
              desc: language === 'en'
                ? 'Integrate security at every stage: requirements, design, implementation, testing, and deployment'
                : 'Интегрируйте безопасность на каждом этапе: требования, проектирование, реализация, тестирование, развёртывание',
            },
            {
              title: language === 'en' ? 'Secure Design Patterns' : 'Паттерны безопасного проектирования',
              desc: language === 'en'
                ? 'Follow "Secure by Default" and "Least Privilege" principles. Use established security patterns'
                : 'Следуйте принципам "Безопасность по умолчанию" и "Минимальные привилегии". Используйте проверенные паттерны безопасности',
            },
            {
              title: language === 'en' ? 'Input/Output Validation Framework' : 'Фреймворк валидации ввода/вывода',
              desc: language === 'en'
                ? 'Implement centralized validation at architectural level. Never trust client-side data for critical operations'
                : 'Реализуйте централизованную валидацию на архитектурном уровне. Никогда не доверяйте клиентским данным для критических операций',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ x: 5 }}
              className="p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <h4 className="text-green-800 mb-2">✓ {item.title}</h4>
              <p className="text-sm text-green-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
