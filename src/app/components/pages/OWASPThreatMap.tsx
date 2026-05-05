import { Link } from 'react-router';
import { ArrowLeft, Lock, Code, Key, AlertCircle, Shield, FileText, Server, Users, Eye, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../translations';

export function OWASPThreatMap() {
  const { language } = useTheme();
  const t = translations[language];

  const threats = [
    { id: 1, name: language === 'en' ? 'Broken Access Control' : 'Нарушение контроля доступа', path: '/owasp-lab/broken-access', icon: Lock, implemented: true },
    { id: 2, name: language === 'en' ? 'Cryptographic Failures' : 'Криптографические сбои', path: '/owasp-lab/cryptographic-failures', icon: Key, implemented: true },
    { id: 3, name: language === 'en' ? 'Injection' : 'Инъекции', path: '/owasp-lab/sql-injection', icon: Code, implemented: true },
    { id: 4, name: language === 'en' ? 'Insecure Design' : 'Небезопасное проектирование', path: '/owasp-lab/insecure-design', icon: AlertCircle, implemented: true },
    { id: 5, name: language === 'en' ? 'Security Misconfiguration' : 'Неправильная конфигурация безопасности', path: '/owasp-lab/security-misconfiguration', icon: Settings, implemented: true },
    { id: 6, name: language === 'en' ? 'Software Supply Chain Failures' : 'Сбои в цепочке поставок ПО', path: '/owasp-lab/software-supply-chain', icon: Server, implemented: true },
    { id: 7, name: language === 'en' ? 'Authentication Failures' : 'Сбои аутентификации', path: '/owasp-lab/authentication-failures', icon: Users, implemented: true },
    { id: 8, name: language === 'en' ? 'Data Integrity Failures' : 'Нарушение целостности данных', path: '/owasp-lab/data-integrity', icon: Shield, implemented: true },
    { id: 9, name: language === 'en' ? 'Security Logging Failures' : 'Сбои журналирования безопасности', path: '/owasp-lab/security-logging', icon: FileText, implemented: true },
    { id: 10, name: language === 'en' ? 'Mishandling of Exceptional Conditions' : 'Неправильная обработка исключений', path: '/owasp-lab/mishandling-exceptions', icon: Eye, implemented: true },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <h1 className="text-[var(--text-primary)] mb-2">{t.owaspTitle}</h1>
        <p className="text-[var(--text-secondary)]">{t.owaspSubtitle}</p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4">
        {threats.map((threat, index) => {
          const Icon = threat.icon;
          const isClickable = threat.implemented;

          const content = (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              whileHover={isClickable ? { y: -4, scale: 1.02 } : {}}
              className={`h-full bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-5 shadow-sm transition-all ${
                isClickable
                  ? 'hover:shadow-md hover:border-[var(--accent-primary)] cursor-pointer'
                  : 'opacity-60 cursor-not-allowed'
              }`}
            >
              <div className="flex items-start gap-3">
                <motion.div
                  whileHover={isClickable ? { rotate: 10 } : {}}
                  className="p-3 bg-blue-100 rounded-lg shrink-0"
                >
                  <Icon className="w-6 h-6 text-blue-600" />
                </motion.div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-[var(--hover-bg)] text-[var(--text-secondary)] rounded text-xs">
                      #{threat.id}
                    </span>
                  </div>
                  <h3 className="text-[var(--text-primary)] mb-1">{threat.name}</h3>
                  {!isClickable && (
                    <p className="text-xs text-[var(--text-secondary)]">
                      {language === 'en' ? 'Coming soon...' : 'Скоро...'}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          );

          return isClickable ? (
            <Link key={threat.id} to={threat.path}>
              {content}
            </Link>
          ) : (
            <div key={threat.id}>
              {content}
            </div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-[var(--text-primary)] mb-4">{t.aboutOwasp}</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          {language === 'en'
            ? 'The OWASP Top 10 is a standard awareness document representing a broad consensus about the most critical security risks to web applications. Organizations should adopt this document to minimize security risks in their applications.'
            : 'OWASP Top 10 — стандартный документ повышения осведомлённости, отражающий широкий консенсус о наиболее критических рисках безопасности веб-приложений. Организации должны применять этот документ для минимизации рисков безопасности.'}
        </p>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-[var(--hover-bg)] rounded-lg">
            <h4 className="text-[var(--text-primary)] mb-2">{t.interactiveLearning}</h4>
            <p className="text-[var(--text-secondary)]">
              {language === 'en'
                ? 'Each module includes hands-on demonstrations, technical explanations, and real-world mitigation strategies.'
                : 'Каждый модуль включает практические демонстрации, технические объяснения и стратегии защиты.'}
            </p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} className="p-4 bg-[var(--hover-bg)] rounded-lg">
            <h4 className="text-[var(--text-primary)] mb-2">{t.safeEnvironment}</h4>
            <p className="text-[var(--text-secondary)]">
              {language === 'en'
                ? 'All simulations run in an isolated, educational context. Practice attacks safely without causing real harm.'
                : 'Все симуляции выполняются в изолированном образовательном контексте. Практикуйте атаки безопасно.'}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}