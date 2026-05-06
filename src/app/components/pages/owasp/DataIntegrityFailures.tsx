import { useState } from 'react';
import { ArrowLeft, Database, Shield, RefreshCw, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { translations } from '../../../translations';

export function DataIntegrityFailures() {
  const { language } = useTheme();
  const t = translations[language];
  const [isCompleted, setIsCompleted] = useState(false);
  const [scenario, setScenario] = useState<'deserialization' | 'ci-cd' | 'tampering'>('deserialization');
  const [showExploit, setShowExploit] = useState(false);

  const handleReset = () => {
    setIsCompleted(false);
    setShowExploit(false);
    setScenario('deserialization');
  };

  const triggerExploit = () => {
    setShowExploit(true);
    setIsCompleted(true);
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.08, duration: 0.3, ease: 'easeOut' },
    }),
  };

  const scenarioItems = [
    { id: 'deserialization' as const, label: language === 'en' ? 'Insecure Deserialization' : 'Небезопасная десериализация' },
    { id: 'ci-cd' as const, label: language === 'en' ? 'CI/CD Tampering' : 'Взлом CI/CD' },
    { id: 'tampering' as const, label: language === 'en' ? 'Data Tampering' : 'Подмена данных' },
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
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            className="p-3 bg-teal-100 rounded-lg"
          >
            <Database className="w-6 h-6 text-teal-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'Data Integrity Failures' : 'Сбои целостности данных'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'OWASP #8 - Data Corruption & Tampering' : 'OWASP #8 - Повреждение и подмена данных'}
            </p>
          </div>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          {language === 'en'
            ? 'Occurs when information is corrupted, unauthorizedly modified, or lost during processing, transfer, or storage, threatening the accuracy and reliability of data.'
            : 'Возникает, когда информация повреждается, несанкционированно изменяется или теряется при обработке, передаче или хранении, угрожая точности и надёжности данных.'}
        </p>

        <div className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-4">
          <h3 className="text-[var(--text-primary)] mb-3">
            {language === 'en' ? 'Common Attack Vectors:' : 'Распространённые векторы атак:'}
          </h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {[
              {
                label: language === 'en' ? 'Insecure Deserialization:' : 'Небезопасная десериализация:',
                desc: language === 'en' ? 'Malicious data injected during object reconstruction' : 'Вредоносные данные внедряются при реконструкции объектов',
              },
              {
                label: language === 'en' ? 'CI/CD Pipeline Compromise:' : 'Компрометация конвейера CI/CD:',
                desc: language === 'en' ? 'Malicious code injected during build or deployment' : 'Вредоносный код внедряется при сборке или развёртывании',
              },
              {
                label: language === 'en' ? 'Man-in-the-Middle Tampering:' : 'Подмена при атаке посредника:',
                desc: language === 'en' ? 'Data modified in transit without cryptographic protection' : 'Данные изменяются при передаче без криптографической защиты',
              },
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="flex items-start gap-2"
              >
                <span className="text-teal-600 mt-1">•</span>
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
          <h2 className="text-[var(--text-primary)]">
            {language === 'en' ? 'Attack Vector Demonstrations' : 'Демонстрации векторов атак'}
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
                  ? 'border-teal-500 bg-teal-50'
                  : 'border-[var(--border-primary)] hover:border-[var(--accent-primary)]'
              }`}
            >
              <Database className="w-6 h-6 text-teal-600 mx-auto mb-2" />
              <div className="text-sm text-[var(--text-primary)]">{item.label}</div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {scenario === 'deserialization' && (
            <motion.div
              key="deserialization"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--hover-bg)] p-6 rounded-lg border border-[var(--border-primary)]"
            >
              <h3 className="text-[var(--text-primary)] mb-3">
                {language === 'en' ? 'Insecure Deserialization Attack' : 'Атака небезопасной десериализации'}
              </h3>
              <div className="bg-white p-4 rounded mb-4">
                <code className="text-xs whitespace-pre-wrap text-gray-800">
{`// ${language === 'en' ? 'Vulnerable code' : 'Уязвимый код'}
const userData = JSON.parse(req.body.data);
eval(userData.callback); // ❌ ${language === 'en' ? 'Executes malicious code' : 'Выполняет вредоносный код'}

// ${language === 'en' ? 'Malicious payload' : 'Вредоносная нагрузка'}
{
  "username": "admin",
  "callback": "require('child_process').exec('rm -rf /')"
}`}
                </code>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={triggerExploit}
                className="px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity"
              >
                {language === 'en' ? 'Execute Payload' : 'Выполнить нагрузку'}
              </motion.button>
              <AnimatePresence>
                {showExploit && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded"
                  >
                    <AlertTriangle className="w-5 h-5 text-red-600 inline mr-2" />
                    <span className="text-red-800">
                      {language === 'en'
                        ? 'Remote code execution achieved! Entire system compromised.'
                        : 'Удалённое выполнение кода достигнуто! Вся система скомпрометирована.'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {scenario === 'ci-cd' && (
            <motion.div
              key="ci-cd"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--hover-bg)] p-6 rounded-lg border border-[var(--border-primary)]"
            >
              <h3 className="text-[var(--text-primary)] mb-3">
                {language === 'en' ? 'CI/CD Pipeline Tampering' : 'Взлом конвейера CI/CD'}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {language === 'en'
                  ? 'Attackers modify build artifacts or inject malicious code during the deployment process.'
                  : 'Атакующие изменяют артефакты сборки или внедряют вредоносный код в процессе развёртывания.'}
              </p>
              <div className="space-y-2">
                {(language === 'en'
                  ? ['Build artifact modified', 'Malicious dependency injected', 'Deployment script tampered']
                  : ['Артефакт сборки изменён', 'Вредоносная зависимость внедрена', 'Скрипт развёртывания взломан']
                ).map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="p-3 bg-orange-50 border border-orange-300 rounded"
                  >
                    <span className="text-orange-800 text-sm">⚠️ {step}</span>
                  </motion.div>
                ))}
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={triggerExploit}
                className="mt-4 px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity"
              >
                {language === 'en' ? 'View Attack Impact' : 'Показать последствия атаки'}
              </motion.button>
              <AnimatePresence>
                {showExploit && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-4 bg-orange-50 border border-orange-300 rounded-lg"
                  >
                    <p className="text-sm text-orange-700">
                      <strong>{language === 'en' ? 'Impact:' : 'Воздействие:'}</strong>{' '}
                      {language === 'en'
                        ? 'Supply chain attacks can affect thousands of downstream customers. Organizations must secure every step of their build and deployment pipeline.'
                        : 'Атаки на цепочку поставок могут затронуть тысячи конечных потребителей. Организации должны защищать каждый шаг своего конвейера сборки и развёртывания.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {scenario === 'tampering' && (
            <motion.div
              key="tampering"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--hover-bg)] p-6 rounded-lg border border-[var(--border-primary)]"
            >
              <h3 className="text-[var(--text-primary)] mb-3">
                {language === 'en' ? 'Data Tampering in Transit' : 'Подмена данных при передаче'}
              </h3>
              <div className="bg-white p-4 rounded">
                <div className="text-xs text-gray-600 mb-2">
                  {language === 'en' ? 'Original Data:' : 'Исходные данные:'}
                </div>
                <code className="text-sm text-green-600">{`{ amount: 100.00, recipient: 'user123' }`}</code>
                <div className="my-3 text-center text-red-600">
                  ↓ {language === 'en' ? 'MITM Attack' : 'Атака посредника'} ↓
                </div>
                <div className="text-xs text-gray-600 mb-2">
                  {language === 'en' ? 'Modified Data:' : 'Изменённые данные:'}
                </div>
                <code className="text-sm text-red-600">{`{ amount: 0.01, recipient: 'attacker' }`}</code>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={triggerExploit}
                className="mt-4 px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity"
              >
                {language === 'en' ? 'Simulate Attack' : 'Симулировать атаку'}
              </motion.button>
              <AnimatePresence>
                {showExploit && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded"
                  >
                    <p className="text-sm text-red-800">
                      🚨 {language === 'en'
                        ? 'Transaction intercepted and modified! The recipient received $0.01 instead of $100.00. Digital signatures would have prevented this.'
                        : 'Транзакция перехвачена и изменена! Получатель получил $0.01 вместо $100.00. Цифровые подписи предотвратили бы это.'}
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
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="bg-green-50 border border-green-300 rounded-xl p-6 text-center"
          >
            <h3 className="text-green-800 mb-4">{t.levelComplete}</h3>
            <p className="text-green-700 mb-4">
              {language === 'en'
                ? "You've explored data integrity vulnerabilities. Protecting data accuracy is essential for secure systems."
                : 'Вы изучили уязвимости целостности данных. Защита точности данных необходима для безопасных систем.'}
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
        <div className="space-y-3">
          {[
            {
              title: language === 'en' ? 'Digital Signatures' : 'Цифровые подписи',
              desc: language === 'en' ? 'Verify software updates and modules are authentic' : 'Проверяйте подлинность обновлений и модулей программного обеспечения',
            },
            {
              title: language === 'en' ? 'Secure CI/CD Pipelines' : 'Безопасные конвейеры CI/CD',
              desc: language === 'en' ? 'Enforce segregation, validation, and access control in build pipelines' : 'Применяйте разделение, валидацию и контроль доступа в конвейерах сборки',
            },
            {
              title: language === 'en' ? 'Input Validation' : 'Валидация ввода',
              desc: language === 'en' ? 'Never trust deserialized data from untrusted sources' : 'Никогда не доверяйте десериализованным данным из ненадёжных источников',
            },
            {
              title: language === 'en' ? 'Role-Based Access Control' : 'Контроль доступа на основе ролей',
              desc: language === 'en' ? 'Implement strict RBAC and least privilege principles' : 'Реализуйте строгий RBAC и принцип минимальных привилегий',
            },
            {
              title: language === 'en' ? 'SCA Tools' : 'Инструменты SCA',
              desc: language === 'en' ? 'Use Software Composition Analysis to detect vulnerabilities in dependencies' : 'Используйте анализ состава программного обеспечения для выявления уязвимостей в зависимостях',
            },
            {
              title: language === 'en' ? 'Immutable Backups' : 'Неизменяемые резервные копии',
              desc: language === 'en' ? 'Maintain regular, tamper-proof backup copies of critical data' : 'Ведите регулярные, защищённые от подмены резервные копии критических данных',
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
