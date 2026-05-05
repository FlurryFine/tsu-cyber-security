import { useState } from 'react';
import { ArrowLeft, FileText, Eye, EyeOff, RefreshCw, Activity } from 'lucide-react';
import { Link } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { translations } from '../../../translations';

export function SecurityLoggingFailures() {
  const { language } = useTheme();
  const t = translations[language];
  const [isCompleted, setIsCompleted] = useState(false);
  const [loggingEnabled, setLoggingEnabled] = useState(false);
  const [events, setEvents] = useState<string[]>([]);
  const [attackDetected, setAttackDetected] = useState(false);

  const handleReset = () => {
    setIsCompleted(false);
    setLoggingEnabled(false);
    setEvents([]);
    setAttackDetected(false);
  };

  const attackEvents = language === 'en' ? [
    '[10:15:32] Failed login attempt - user: admin, IP: 192.168.1.100',
    '[10:15:35] Failed login attempt - user: admin, IP: 192.168.1.100',
    '[10:15:38] Failed login attempt - user: admin, IP: 192.168.1.100',
    '[10:15:41] Failed login attempt - user: root, IP: 192.168.1.100',
    '[10:15:44] Failed login attempt - user: administrator, IP: 192.168.1.100',
    '[10:15:47] ⚠️ ALERT: Brute force attack detected from IP: 192.168.1.100',
  ] : [
    '[10:15:32] Неудачная попытка входа - пользователь: admin, IP: 192.168.1.100',
    '[10:15:35] Неудачная попытка входа - пользователь: admin, IP: 192.168.1.100',
    '[10:15:38] Неудачная попытка входа - пользователь: admin, IP: 192.168.1.100',
    '[10:15:41] Неудачная попытка входа - пользователь: root, IP: 192.168.1.100',
    '[10:15:44] Неудачная попытка входа - пользователь: administrator, IP: 192.168.1.100',
    '[10:15:47] ⚠️ ОПОВЕЩЕНИЕ: Обнаружена brute-force атака с IP: 192.168.1.100',
  ];

  const simulateAttack = () => {
    if (loggingEnabled) {
      attackEvents.forEach((event, index) => {
        setTimeout(() => {
          setEvents(prev => [...prev, event]);
          if (index === attackEvents.length - 1) {
            setAttackDetected(true);
            setIsCompleted(true);
          }
        }, index * 500);
      });
    } else {
      setTimeout(() => {
        setAttackDetected(true);
        setIsCompleted(true);
      }, 1000);
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
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 250, damping: 15, delay: 0.1 }}
            className="p-3 bg-amber-100 rounded-lg"
          >
            <FileText className="w-6 h-6 text-amber-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'Security Logging & Monitoring Failures' : 'Сбои логирования и мониторинга безопасности'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'OWASP #9 - Insufficient Logging & Monitoring' : 'OWASP #9 - Недостаточное логирование и мониторинг'}
            </p>
          </div>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">
          {language === 'en'
            ? 'Occurs when critical security events are not logged, monitored, or alerted in real-time, allowing attackers to maintain persistence undetected. Without proper logging, breaches can go unnoticed for months.'
            : 'Возникает, когда критические события безопасности не регистрируются, не отслеживаются или не генерируют оповещения в реальном времени, позволяя атакующим оставаться незамеченными. Без надлежащего логирования взломы могут оставаться незамеченными месяцами.'}
        </p>

        <div className="bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg p-4">
          <h3 className="text-[var(--text-primary)] mb-3">
            {language === 'en' ? 'Common Failures:' : 'Распространённые нарушения:'}
          </h3>
          <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
            {[
              {
                label: language === 'en' ? 'No Event Logging:' : 'Отсутствие логирования событий:',
                desc: language === 'en' ? 'Critical security events are not recorded at all' : 'Критические события безопасности вообще не записываются',
              },
              {
                label: language === 'en' ? 'Insufficient Detail:' : 'Недостаточная детализация:',
                desc: language === 'en' ? 'Logs lack IP, timestamp, user ID, or action context' : 'В логах отсутствуют IP, метка времени, ID пользователя или контекст действия',
              },
              {
                label: language === 'en' ? 'No Real-Time Monitoring:' : 'Отсутствие мониторинга в реальном времени:',
                desc: language === 'en' ? 'Logs exist but nobody analyzes them for anomalies' : 'Логи существуют, но никто не анализирует их на аномалии',
              },
            ].map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.06 }}
                className="flex items-start gap-2"
              >
                <span className="text-amber-600 mt-1">•</span>
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

        <div className="mb-6 p-4 bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-[var(--text-primary)]">
                {language === 'en' ? 'Security Logging Status' : 'Статус логирования безопасности'}
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                {language === 'en' ? 'Toggle to enable/disable security event logging' : 'Переключите для включения/отключения логирования событий безопасности'}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setLoggingEnabled(!loggingEnabled)}
              className={`p-3 rounded-lg transition-colors ${loggingEnabled ? 'bg-green-100' : 'bg-red-100'}`}
            >
              {loggingEnabled
                ? <Eye className="w-6 h-6 text-green-600" />
                : <EyeOff className="w-6 h-6 text-red-600" />}
            </motion.button>
          </div>

          <div className="text-sm">
            {language === 'en' ? 'Status:' : 'Статус:'}{' '}
            <span className={`font-bold ${loggingEnabled ? 'text-green-600' : 'text-red-600'}`}>
              {loggingEnabled
                ? (language === 'en' ? 'ENABLED' : 'ВКЛЮЧЕНО')
                : (language === 'en' ? 'DISABLED' : 'ОТКЛЮЧЕНО')}
            </span>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={simulateAttack}
          disabled={attackDetected}
          className="w-full px-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
        >
          <Activity className="w-4 h-4 inline mr-2" />
          {language === 'en' ? 'Simulate Brute Force Attack' : 'Симулировать brute-force атаку'}
        </motion.button>

        <AnimatePresence>
          {loggingEnabled && events.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto"
            >
              <div className="mb-2 text-gray-400">
                {language === 'en' ? 'Security Event Log:' : 'Журнал событий безопасности:'}
              </div>
              {events.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className={event.includes('ALERT') || event.includes('ОПОВЕЩЕНИЕ') ? 'text-red-400 font-bold' : ''}
                >
                  {event}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {attackDetected && !loggingEnabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 p-6 bg-red-50 border-2 border-red-500 rounded-lg"
            >
              <h4 className="text-red-800 mb-3">
                🚨 {language === 'en' ? 'System Compromised — No Detection!' : 'Система скомпрометирована — Атака не обнаружена!'}
              </h4>
              <p className="text-sm text-red-700 mb-3">
                {language === 'en'
                  ? 'Without logging enabled, the brute force attack went completely undetected. The attacker had unlimited attempts and eventually gained access. No alerts were triggered.'
                  : 'Без включённого логирования атака перебора осталась полностью незамеченной. Атакующий имел неограниченное количество попыток и в итоге получил доступ. Оповещения не сработали.'}
              </p>
              <div className="p-3 bg-red-100 rounded text-sm text-red-800">
                <strong>{language === 'en' ? 'Impact:' : 'Воздействие:'}</strong>{' '}
                {language === 'en'
                  ? 'Average breach detection time without logging: 207 days (IBM Security Report)'
                  : 'Среднее время обнаружения взлома без логирования: 207 дней (Отчёт IBM Security)'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {attackDetected && loggingEnabled && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 p-6 bg-green-50 border-2 border-green-500 rounded-lg"
            >
              <h4 className="text-green-800 mb-3">
                ✓ {language === 'en' ? 'Attack Detected & Blocked!' : 'Атака обнаружена и заблокирована!'}
              </h4>
              <p className="text-sm text-green-700 mb-3">
                {language === 'en'
                  ? 'Security logging captured all failed login attempts. Real-time monitoring detected the pattern and automatically blocked the attacking IP address.'
                  : 'Логирование безопасности зафиксировало все неудачные попытки входа. Мониторинг в реальном времени обнаружил паттерн и автоматически заблокировал атакующий IP.'}
              </p>
              <div className="p-3 bg-green-100 rounded text-sm text-green-800">
                <strong>{language === 'en' ? 'Actions Taken:' : 'Принятые меры:'}</strong>{' '}
                {language === 'en'
                  ? 'IP blocked, account locked, incident logged, security team alerted'
                  : 'IP заблокирован, аккаунт заблокирован, инцидент записан, команда безопасности оповещена'}
              </div>
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
                ? `You've learned why security logging is critical. Without it, attacks go undetected for months. ${loggingEnabled ? ' Your logging prevented a breach!' : ' Your system was compromised undetected.'}`
                : `Вы узнали, почему логирование безопасности критически важно. Без него атаки остаются незамеченными месяцами. ${loggingEnabled ? ' Ваше логирование предотвратило взлом!' : ' Ваша система была скомпрометирована незаметно.'}`}
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
        <h3 className="text-[var(--text-primary)] mb-4">
          {language === 'en' ? 'Critical Events to Log' : 'Критические события для логирования'}
        </h3>
        <div className="grid md:grid-cols-2 gap-3 mb-6">
          {(language === 'en' ? [
            'Failed login attempts',
            'Successful authentication',
            'Password changes',
            'Account lockouts',
            'Privilege escalations',
            'Access to sensitive data',
            'Configuration changes',
            'API errors and exceptions',
            'File upload/download',
            'Payment transactions',
          ] : [
            'Неудачные попытки входа',
            'Успешная аутентификация',
            'Изменения пароля',
            'Блокировки аккаунтов',
            'Повышения привилегий',
            'Доступ к чувствительным данным',
            'Изменения конфигурации',
            'Ошибки и исключения API',
            'Загрузка/выгрузка файлов',
            'Платёжные транзакции',
          ]).map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.04 }}
              whileHover={{ x: 5 }}
              className="p-3 bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg"
            >
              <span className="text-sm text-[var(--text-primary)]">• {event}</span>
            </motion.div>
          ))}
        </div>

        <h3 className="text-[var(--text-primary)] mb-4">{t.prevention}</h3>
        <div className="space-y-3">
          {[
            {
              title: language === 'en' ? 'Log Critical Events' : 'Логировать критические события',
              desc: language === 'en' ? 'Include timestamps, user IDs, IP addresses, and action details' : 'Включать метки времени, ID пользователей, IP-адреса и детали действий',
            },
            {
              title: language === 'en' ? 'Centralized Logging' : 'Централизованное логирование',
              desc: language === 'en' ? 'Use ELK stack (Elasticsearch, Logstash, Kibana) or similar SIEM' : 'Используйте стек ELK (Elasticsearch, Logstash, Kibana) или аналогичную SIEM-систему',
            },
            {
              title: language === 'en' ? 'Secure Log Storage' : 'Защищённое хранение логов',
              desc: language === 'en' ? 'Send logs to separate, tamper-proof system immediately' : 'Отправляйте логи в отдельную, защищённую от подмены систему немедленно',
            },
            {
              title: language === 'en' ? 'Real-Time Alerting' : 'Оповещения в реальном времени',
              desc: language === 'en' ? 'Configure actionable alerts for suspicious patterns' : 'Настройте действенные оповещения для подозрительных паттернов',
            },
            {
              title: language === 'en' ? 'Regular Audits' : 'Регулярные аудиты',
              desc: language === 'en' ? 'Review logs regularly, conduct simulated attacks (DAST)' : 'Регулярно проверяйте логи, проводите имитированные атаки (DAST)',
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
