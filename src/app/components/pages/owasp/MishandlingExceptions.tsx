import { useState } from 'react';
import { ArrowLeft, AlertCircle, Bug, XCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { translations } from '../../../translations';

export function MishandlingExceptions() {
  const { language } = useTheme();
  const t = translations[language];
  const [scenario, setScenario] = useState<'info-leak' | 'fail-open' | 'dos'>('info-leak');
  const [triggerError, setTriggerError] = useState(false);
  const [authBypass, setAuthBypass] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const simulateInfoLeak = () => {
    setTriggerError(true);
    setIsCompleted(true);
  };

  const simulateFailOpen = () => {
    setAuthBypass(true);
    setIsCompleted(true);
  };

  const handleReset = () => {
    setScenario('info-leak');
    setTriggerError(false);
    setAuthBypass(false);
    setIsCompleted(false);
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
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="p-3 bg-orange-100 rounded-lg"
          >
            <Bug className="w-6 h-6 text-orange-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'Mishandling of Exceptional Conditions' : 'Неправильная обработка исключительных условий'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'Improper Error Handling & Exception Management' : 'Неправильная обработка ошибок и управление исключениями'}
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
            ? 'This category groups together common weaknesses (CWEs) that occur when a system encounters an abnormal condition and handles it poorly or ignores it entirely, leading to information leakage, denial of service, or security bypasses.'
            : 'Эта категория группирует распространенные слабости (CWE), которые возникают, когда система сталкивается с аномальным условием и плохо его обрабатывает или полностью игнорирует, что приводит к утечке информации, отказу в обслуживании или обходу безопасности.'}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-4"
        >
          <h3 className="text-[var(--text-primary)] mb-3">
            {language === 'en' ? 'Dangerous Outcomes:' : 'Опасные последствия:'}
          </h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            <li>
              • <strong className="text-[var(--text-primary)]">
                {language === 'en' ? 'Information Leakage:' : 'Утечка информации:'}
              </strong>{' '}
              {language === 'en' ? 'Stack traces, framework versions, internal schemas exposed' : 'Трассировки стека, версии фреймворков, внутренние схемы раскрыты'}
            </li>
            <li>
              • <strong className="text-[var(--text-primary)]">
                {language === 'en' ? 'Denial of Service:' : 'Отказ в обслуживании:'}
              </strong>{' '}
              {language === 'en' ? 'Resources locked, memory leaks from skipped cleanup' : 'Ресурсы заблокированы, утечки памяти из-за пропущенной очистки'}
            </li>
            <li>
              • <strong className="text-[var(--text-primary)]">
                {language === 'en' ? 'Security Bypasses (Fail-Open):' : 'Обход безопасности (Fail-Open):'}
              </strong>{' '}
              {language === 'en' ? 'System defaults to "allowed" when checks fail' : 'Система по умолчанию разрешает доступ при сбое проверок'}
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
          {language === 'en' ? 'Scenario Selection' : 'Выбор сценария'}
        </h2>
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {[
            { id: 'info-leak', icon: AlertCircle, label: language === 'en' ? 'Information Leakage' : 'Утечка информации', color: 'red' },
            { id: 'fail-open', icon: XCircle, label: language === 'en' ? 'Fail-Open Bypass' : 'Обход Fail-Open', color: 'orange' },
            { id: 'dos', icon: Bug, label: language === 'en' ? 'Resource Leak' : 'Утечка ресурсов', color: 'yellow' }
          ].map((item, index) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setScenario(item.id as any); setTriggerError(false); setAuthBypass(false); }}
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

        {scenario === 'info-leak' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6"
          >
            <h3 className="text-[var(--text-primary)] mb-3">
              {language === 'en' ? 'CWE-209: Sensitive Information in Error Messages' : 'CWE-209: Конфиденциальная информация в сообщениях об ошибках'}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              {language === 'en'
                ? 'Application crashes reveal detailed stack traces, exposing internal structure to attackers.'
                : 'Сбои приложения раскрывают подробные трассировки стека, выставляя внутреннюю структуру атакующим.'}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={simulateInfoLeak}
              className="px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity mb-4"
            >
              {language === 'en' ? 'Trigger Error' : 'Вызвать ошибку'}
            </motion.button>

            {triggerError && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-red-50 border-2 border-red-500 rounded-lg"
              >
                <h4 className="text-red-800 mb-2">❌ {language === 'en' ? 'Unhandled Exception' : 'Необработанное исключение'}</h4>
                <pre className="text-xs text-red-700 whitespace-pre-wrap font-mono bg-white p-3 rounded overflow-x-auto">
{language === 'en'
  ? `NullReferenceException: Object reference not set to an instance of an object
   at UserController.GetProfile(Int32 userId) in C:\\App\\Controllers\\UserController.cs:line 47
   at System.Web.Mvc.ActionMethodDispatcher.Execute(ControllerContext context)

Database Connection: Server=db-prod-01.internal;Database=UserAccounts;User=sa;Password=Admin123!
Framework: ASP.NET MVC 4.7.2
Environment: Production
Internal IP: 192.168.1.50`
  : `NullReferenceException: Ссылка на объект не указывает на экземпляр объекта
   at UserController.GetProfile(Int32 userId) в C:\\App\\Controllers\\UserController.cs:строка 47
   at System.Web.Mvc.ActionMethodDispatcher.Execute(ControllerContext context)

Подключение к базе данных: Server=db-prod-01.internal;Database=UserAccounts;User=sa;Password=Admin123!
Фреймворк: ASP.NET MVC 4.7.2
Окружение: Продакшн
Внутренний IP: 192.168.1.50`}
                </pre>
                <div className="mt-3 p-3 bg-red-100 border border-red-300 rounded text-sm text-red-800">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  {language === 'en'
                    ? 'This error reveals: database credentials, internal file paths, framework version, and network topology!'
                    : 'Эта ошибка раскрывает: учетные данные базы данных, внутренние пути к файлам, версию фреймворка и топологию сети!'}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {scenario === 'fail-open' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6"
          >
            <h3 className="text-[var(--text-primary)] mb-3">
              {language === 'en' ? 'CWE-636: Not Failing Securely (Failing Open)' : 'CWE-636: Небезопасный отказ (Failing Open)'}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              {language === 'en'
                ? 'When authentication service fails, system grants access by default instead of denying.'
                : 'Когда сервис аутентификации выходит из строя, система по умолчанию предоставляет доступ вместо отказа.'}
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={simulateFailOpen}
              className="px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity mb-4"
            >
              {language === 'en' ? 'Simulate Auth Service Failure' : 'Симулировать сбой сервиса аутентификации'}
            </motion.button>

            {authBypass && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-orange-50 border-2 border-orange-500 rounded-lg"
              >
                <h4 className="text-orange-800 mb-2">⚠️ {language === 'en' ? 'Authentication Bypass' : 'Обход аутентификации'}</h4>
                <div className="bg-white p-4 rounded-lg mb-3">
                  <code className="text-sm text-gray-800">
                    {language === 'en'
                      ? `try {
  const isAuthenticated = await authService.verify(token);
  if (isAuthenticated) {
    return grantAccess();
  }
} catch (error) {
  // Auth service is down, let user through anyway
  console.log('Auth service unavailable');
  return grantAccess(); // ❌ FAIL-OPEN!
}`
                      : `try {
  const isAuthenticated = await authService.verify(token);
  if (isAuthenticated) {
    return grantAccess();
  }
} catch (error) {
  // Сервис аутентификации недоступен, пропускаем пользователя
  console.log('Сервис аутентификации недоступен');
  return grantAccess(); // ❌ FAIL-OPEN!
}`}
                  </code>
                </div>
                <div className="p-3 bg-orange-100 border border-orange-300 rounded text-sm text-orange-800">
                  <AlertCircle className="w-4 h-4 inline mr-2" />
                  {language === 'en'
                    ? 'System granted access despite authentication failure. Should have failed closed (denied access).'
                    : 'Система предоставила доступ несмотря на сбой аутентификации. Должна была отказать в доступе (fail closed).'}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}

        {scenario === 'dos' && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6"
          >
            <h3 className="text-[var(--text-primary)] mb-3">
              {language === 'en' ? 'CWE-755: Resource Cleanup on Exception' : 'CWE-755: Очистка ресурсов при исключении'}
            </h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              {language === 'en'
                ? 'Exceptions cause resource cleanup to be skipped, leading to memory leaks and locked resources.'
                : 'Исключения приводят к пропуску очистки ресурсов, что ведет к утечкам памяти и заблокированным ресурсам.'}
            </p>

            <div className="bg-white p-4 rounded-lg border border-[var(--border-primary)] mb-4">
              <code className="text-sm text-gray-800 whitespace-pre-wrap">
{language === 'en'
  ? `function processFile(filename) {
  const file = fs.openSync(filename, 'r');

  // Processing that might throw...
  const data = parseData(file); // ❌ Exception here!

  // This cleanup never runs if exception occurs
  fs.closeSync(file); // ❌ File handle leaked!
}`
  : `function processFile(filename) {
  const file = fs.openSync(filename, 'r');

  // Обработка, которая может вызвать исключение...
  const data = parseData(file); // ❌ Исключение здесь!

  // Эта очистка никогда не выполняется при исключении
  fs.closeSync(file); // ❌ Утечка файлового дескриптора!
}`}
              </code>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() => setIsCompleted(true)}
              className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg cursor-pointer hover:bg-yellow-100 transition-colors"
            >
              <h4 className="text-yellow-800 mb-2">{language === 'en' ? 'Impact:' : 'Влияние:'}</h4>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>
                  • {language === 'en' ? 'File handles remain open, exhausting system resources' : 'Файловые дескрипторы остаются открытыми, истощая системные ресурсы'}
                </li>
                <li>
                  • {language === 'en' ? 'Database connections not returned to pool' : 'Подключения к базе данных не возвращаются в пул'}
                </li>
                <li>
                  • {language === 'en' ? 'Memory not freed, causing gradual memory leaks' : 'Память не освобождается, вызывая постепенные утечки памяти'}
                </li>
                <li>
                  • {language === 'en' ? 'After repeated failures, system becomes unresponsive' : 'После повторных сбоев система перестает отвечать'}
                </li>
              </ul>
            </motion.div>
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
              ? "You've successfully identified exception handling vulnerabilities. Proper error management is critical for both security and reliability."
              : 'Вы успешно выявили уязвимости обработки исключений. Правильное управление ошибками критически важно как для безопасности, так и для надежности.'}
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
        <h3 className="text-[var(--text-primary)] mb-4">
          {language === 'en' ? 'Common Vulnerabilities (CWEs)' : 'Распространенные уязвимости (CWE)'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { cwe: 'CWE-209', desc: language === 'en' ? 'Error messages containing sensitive information (stack traces, credentials)' : 'Сообщения об ошибках, содержащие конфиденциальную информацию (трассировки стека, учетные данные)' },
            { cwe: 'CWE-476', desc: language === 'en' ? 'NULL pointer dereference causing crashes' : 'Разыменование NULL указателя, вызывающее сбои' },
            { cwe: 'CWE-636', desc: language === 'en' ? 'Not failing securely (fail-open instead of fail-closed)' : 'Небезопасный отказ (fail-open вместо fail-closed)' },
            { cwe: 'CWE-755', desc: language === 'en' ? 'Improper handling of exceptional conditions' : 'Неправильная обработка исключительных условий' }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 + idx * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="p-4 bg-[var(--hover-bg)] rounded-lg"
            >
              <h4 className="text-[var(--text-primary)] mb-2">{item.cwe}</h4>
              <p className="text-sm text-[var(--text-secondary)]">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-[var(--text-primary)] mb-4">{t.prevention}</h3>
        <div className="space-y-3 text-[var(--text-secondary)]">
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Centralize Error Handling' : 'Централизовать обработку ошибок'}
            </h4>
            <code className="block bg-white p-3 rounded text-sm text-gray-800 overflow-x-auto">
              {language === 'en'
                ? `// Good: Generic user message, detailed logging
try {
  processPayment();
} catch (error) {
  logger.error('Payment failed', { error, userId, transactionId });
  return res.status(500).json({ error: 'Payment processing failed' });
}`
                : `// Хорошо: Общее сообщение пользователю, подробное логирование
try {
  processPayment();
} catch (error) {
  logger.error('Сбой платежа', { error, userId, transactionId });
  return res.status(500).json({ error: 'Ошибка обработки платежа' });
}`}
            </code>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Fail Closed (Deny by Default)' : 'Fail Closed (Отказ по умолчанию)'}
            </h4>
            <code className="block bg-white p-3 rounded text-sm text-gray-800 overflow-x-auto">
              {language === 'en'
                ? `// Good: Fail-closed approach
try {
  const isAuthorized = await authService.check(user);
  if (!isAuthorized) return deny();
  return grantAccess();
} catch (error) {
  logger.error('Auth service failure', error);
  return deny(); // ✓ Fail closed!
}`
                : `// Хорошо: Подход fail-closed
try {
  const isAuthorized = await authService.check(user);
  if (!isAuthorized) return deny();
  return grantAccess();
} catch (error) {
  logger.error('Сбой сервиса аутентификации', error);
  return deny(); // ✓ Fail closed!
}`}
            </code>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Proper Resource Cleanup' : 'Правильная очистка ресурсов'}
            </h4>
            <code className="block bg-white p-3 rounded text-sm text-gray-800 overflow-x-auto">
              {language === 'en'
                ? `// Good: Finally block ensures cleanup
const file = fs.openSync(filename, 'r');
try {
  const data = parseData(file);
  return processData(data);
} finally {
  fs.closeSync(file); // ✓ Always runs!
}`
                : `// Хорошо: Блок finally гарантирует очистку
const file = fs.openSync(filename, 'r');
try {
  const data = parseData(file);
  return processData(data);
} finally {
  fs.closeSync(file); // ✓ Всегда выполняется!
}`}
            </code>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Validate Inputs Early' : 'Проверять входные данные заранее'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Catch exceptions at the point of occurrence. Prevent malformed data from bubbling up to higher functions.'
                : 'Перехватывайте исключения в точке возникновения. Предотвращайте передачу некорректных данных в вышестоящие функции.'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Rate-Limit Error-Prone Actions' : 'Ограничить частоту подверженных ошибкам действий'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Protect against floods of exceptions or automated scanning attempts that trigger errors.'
                : 'Защититесь от потоков исключений или автоматизированных попыток сканирования, которые вызывают ошибки.'}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}