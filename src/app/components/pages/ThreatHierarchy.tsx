import { Link } from 'react-router';
import { Users, Sparkles, Database, Code } from 'lucide-react';
import { motion } from 'motion/react';
import { useTheme } from '../../context/ThemeContext';
import { translations } from '../../translations';

export function ThreatHierarchy() {
  const { language } = useTheme();
  const t = translations[language];

  const threats = [
    {
      level: 1,
      name: language === 'en' ? 'Social Engineering' : 'Социальная инженерия',
      concept: language === 'en'
        ? 'Manipulation, pressure, blackmail, and conversational deception'
        : 'Манипуляция, давление, шантаж и вербальный обман',
      icon: Users,
      path: '/threats/social-engineering',
      color: 'bg-red-100 text-red-600 border-red-300',
      iconBg: 'bg-red-100 border-red-300',
      impact: language === 'en' ? 'Highest' : 'Наивысшее',
      impactColor: 'bg-red-100 text-red-600 border-red-300',
    },
    {
      level: 2,
      name: language === 'en' ? 'AI Fraud' : 'ИИ-мошенничество',
      concept: language === 'en'
        ? 'Deepfakes, voice-changing, and AI-assisted impersonation'
        : 'Дипфейки, изменение голоса и имперсонация с помощью ИИ',
      icon: Sparkles,
      path: '/threats/ai-fraud',
      color: 'bg-orange-100 text-orange-600 border-orange-300',
      iconBg: 'bg-orange-100 border-orange-300',
      impact: language === 'en' ? 'High' : 'Высокое',
      impactColor: 'bg-orange-100 text-orange-600 border-orange-300',
    },
    {
      level: 3,
      name: language === 'en' ? 'OSINT (Open Source Intelligence)' : 'OSINT (Разведка по открытым источникам)',
      concept: language === 'en'
        ? 'Gathering information from public and semi-public sources'
        : 'Сбор информации из публичных и полуоткрытых источников',
      icon: Database,
      path: '/threats/osint',
      color: 'bg-yellow-100 text-yellow-600 border-yellow-300',
      iconBg: 'bg-yellow-100 border-yellow-300',
      impact: language === 'en' ? 'Medium' : 'Среднее',
      impactColor: 'bg-yellow-100 text-yellow-600 border-yellow-300',
    },
    {
      level: 4,
      name: language === 'en' ? 'Technical Attacks' : 'Технические атаки',
      concept: language === 'en'
        ? 'Hacking websites, computers, and databases'
        : 'Взлом сайтов, компьютеров и баз данных',
      icon: Code,
      path: '/owasp-lab',
      color: 'bg-blue-100 text-blue-600 border-blue-300',
      iconBg: 'bg-blue-100 border-blue-300',
      impact: language === 'en' ? 'Technical' : 'Техническое',
      impactColor: 'bg-blue-100 text-blue-600 border-blue-300',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="max-w-5xl mx-auto space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <h1 className="text-[var(--text-primary)] mb-1">{t.threatTypesTitle}</h1>
        <p className="text-[var(--text-secondary)]">{t.threatTypesSubtitle}</p>
      </motion.div>

      <div className="grid gap-4">
        {threats.map((threat, index) => {
          const Icon = threat.icon;
          return (
            <motion.div
              key={threat.level}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08, duration: 0.35, type: 'spring', stiffness: 150 }}
              whileHover={{ x: 4, scale: 1.01 }}
            >
              <Link
                to={threat.path}
                className="block bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:border-[var(--accent-primary)]"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ rotate: 8, scale: 1.1 }}
                    className={`p-4 ${threat.iconBg} rounded-xl border`}
                  >
                    <Icon className={`w-8 h-8 ${threat.color.split(' ')[1]}`} />
                  </motion.div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-[var(--hover-bg)] text-[var(--text-secondary)] rounded-full text-sm">
                        {t.level} {threat.level}
                      </span>
                      <span className={`px-3 py-1 ${threat.impactColor} rounded-full text-sm border`}>
                        {threat.impact} {t.impact}
                      </span>
                    </div>
                    <h2 className="text-[var(--text-primary)] mb-1">{threat.name}</h2>
                    <p className="text-[var(--text-secondary)]">{threat.concept}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.35 }}
        className="bg-[var(--bg-primary)] border border-[var(--border-primary)] rounded-xl p-6 shadow-sm"
      >
        <h3 className="text-[var(--text-primary)] mb-4">{t.hierarchyTitle}</h3>
        <p className="text-[var(--text-secondary)] mb-4">
          {language === 'en'
            ? 'This hierarchy organizes threats from those requiring minimal technical knowledge but high social manipulation skills, to those requiring advanced technical expertise. Each level builds understanding of how attackers exploit different vulnerabilities.'
            : 'Эта иерархия организует угрозы от тех, которые требуют минимальных технических знаний, но высоких навыков социальной манипуляции, до тех, которые требуют продвинутой технической экспертизы. Каждый уровень формирует понимание того, как атакующие эксплуатируют различные уязвимости.'}
        </p>
        <div className="space-y-2 text-sm text-[var(--text-secondary)]">
          <motion.div whileHover={{ x: 4 }} className="transition-transform">
            • <strong className="text-[var(--text-primary)]">
              {language === 'en' ? 'Level 1-2:' : 'Уровень 1-2:'}
            </strong>{' '}
            {language === 'en'
              ? 'Non-technical attacks exploiting human psychology'
              : 'Нетехнические атаки, эксплуатирующие человеческую психологию'}
          </motion.div>
          <motion.div whileHover={{ x: 4 }} className="transition-transform">
            • <strong className="text-[var(--text-primary)]">
              {language === 'en' ? 'Level 3:' : 'Уровень 3:'}
            </strong>{' '}
            {language === 'en'
              ? 'Information gathering using publicly available data'
              : 'Сбор информации с использованием общедоступных данных'}
          </motion.div>
          <motion.div whileHover={{ x: 4 }} className="transition-transform">
            • <strong className="text-[var(--text-primary)]">
              {language === 'en' ? 'Level 4:' : 'Уровень 4:'}
            </strong>{' '}
            {language === 'en'
              ? 'Technical exploitation of system vulnerabilities'
              : 'Техническая эксплуатация системных уязвимостей'}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
