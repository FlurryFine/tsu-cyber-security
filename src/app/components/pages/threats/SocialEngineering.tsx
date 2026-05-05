import { useState } from 'react';
import { ArrowLeft, Shield, AlertTriangle, CheckCircle2, Users, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { translations } from '../../../translations';

export function SocialEngineering() {
  const { language } = useTheme();
  const t = translations[language];
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const scenarios = language === 'en' ? [
    {
      situation: "You receive an urgent email from your 'CEO' asking you to wire $50,000 to a new vendor immediately for a time-sensitive deal. The email looks legitimate but came from a slightly different domain.",
      choices: [
        { text: "Wire the money immediately to avoid disappointing the CEO", safe: false, feedback: "This is a classic CEO fraud attack. Always verify unusual requests through a secondary channel." },
        { text: "Call the CEO directly on their known number to verify", safe: true, feedback: "Correct! Always verify unusual requests through a known communication channel, not by replying to the email." },
        { text: "Reply to the email asking for more details", safe: false, feedback: "Replying keeps you engaged with the attacker. Use a separate, verified channel instead." },
      ],
    },
    {
      situation: "A charming stranger strikes up a conversation at a coffee shop and casually asks what company you work for and what systems you use. They seem genuinely interested in your work.",
      choices: [
        { text: "Share general information about your role but avoid specifics", safe: true, feedback: "Good approach! You can be friendly without revealing sensitive operational details." },
        { text: "Enthusiastically share details about your company's security systems", safe: false, feedback: "This information helps attackers plan targeted attacks. Operational details should remain confidential." },
        { text: "Politely change the subject", safe: true, feedback: "Excellent! When someone is probing for information, redirect the conversation." },
      ],
    },
    {
      situation: "You receive a phone call from 'IT Support' saying they detected suspicious activity on your account and need your password to secure it immediately.",
      choices: [
        { text: "Provide your password to resolve the security issue", safe: false, feedback: "Never share passwords! Legitimate IT will never ask for your password." },
        { text: "Hang up and contact IT through official channels", safe: true, feedback: "Perfect! Always verify requests through official company channels, not through unsolicited calls." },
        { text: "Ask them to verify their identity first", safe: false, feedback: "While better than sharing immediately, attackers can fake credentials. Use official channels instead." },
      ],
    },
  ] : [
    {
      situation: "Вы получили срочное письмо от вашего 'CEO' с просьбой перевести 50 000$ новому поставщику немедленно для срочной сделки. Письмо выглядит легитимным, но пришло с немного другого домена.",
      choices: [
        { text: "Немедленно перевести деньги, чтобы не разочаровать CEO", safe: false, feedback: "Это классическая атака CEO-фрода. Всегда проверяйте необычные запросы через альтернативный канал связи." },
        { text: "Позвонить CEO напрямую на известный номер для проверки", safe: true, feedback: "Правильно! Всегда проверяйте необычные запросы через известный канал связи, а не отвечая на письмо." },
        { text: "Ответить на письмо с просьбой предоставить больше деталей", safe: false, feedback: "Ответ держит вас в контакте с атакующим. Используйте отдельный, проверенный канал связи." },
      ],
    },
    {
      situation: "Обаятельный незнакомец заводит разговор в кафе и непринужденно спрашивает, в какой компании вы работаете и какие системы используете. Он кажется искренне заинтересованным в вашей работе.",
      choices: [
        { text: "Поделиться общей информацией о роли, но избегать деталей", safe: true, feedback: "Хороший подход! Вы можете быть дружелюбным, не раскрывая конфиденциальных операционных деталей." },
        { text: "С энтузиазмом поделиться деталями систем безопасности компании", safe: false, feedback: "Эта информация помогает атакующим планировать целевые атаки. Операционные детали должны оставаться конфиденциальными." },
        { text: "Вежливо сменить тему разговора", safe: true, feedback: "Отлично! Когда кто-то выуживает информацию, перенаправьте разговор." },
      ],
    },
    {
      situation: "Вы получили звонок от 'IT-поддержки', сообщающей, что обнаружена подозрительная активность на вашем аккаунте, и им нужен ваш пароль для немедленной защиты.",
      choices: [
        { text: "Предоставить пароль для решения проблемы безопасности", safe: false, feedback: "Никогда не делитесь паролями! Легитимная IT-служба никогда не попросит ваш пароль." },
        { text: "Положить трубку и связаться с IT через официальные каналы", safe: true, feedback: "Идеально! Всегда проверяйте запросы через официальные каналы компании, а не через незапрошенные звонки." },
        { text: "Попросить их сначала подтвердить свою личность", safe: false, feedback: "Хотя это лучше, чем сразу делиться информацией, атакующие могут подделать учетные данные. Используйте официальные каналы." },
      ],
    },
  ];

  const handleChoice = (choiceIndex: number) => {
    setSelectedChoice(choiceIndex);
    if (scenarios[currentScenario].choices[choiceIndex].safe) {
      setScore(score + 1);
    }
  };

  const nextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1);
      setSelectedChoice(null);
    }
  };

  const handleReset = () => {
    setCurrentScenario(0);
    setSelectedChoice(null);
    setScore(0);
  };

  const scenario = scenarios[currentScenario];
  const isComplete = currentScenario === scenarios.length - 1 && selectedChoice !== null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link to="/threats" className="inline-flex items-center gap-2 text-[var(--accent-primary)] hover:underline">
          <ArrowLeft className="w-4 h-4" />
          {t.backToThreatTypes}
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
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="p-3 bg-red-100 rounded-lg"
          >
            <Users className="w-6 h-6 text-red-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'Level 1: Social Engineering' : 'Уровень 1: Социальная инженерия'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'Manipulation & Psychological Deception' : 'Манипуляция и психологический обман'}
            </p>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="prose max-w-none text-[var(--text-secondary)] mb-6"
        >
          <p>
            {language === 'en'
              ? 'Social engineering exploits human psychology rather than technical vulnerabilities. Attackers manipulate people into divulging confidential information, granting access, or performing actions that compromise security.'
              : 'Социальная инженерия эксплуатирует человеческую психологию, а не технические уязвимости. Атакующие манипулируют людьми, заставляя их разглашать конфиденциальную информацию, предоставлять доступ или выполнять действия, компрометирующие безопасность.'}
          </p>
          <h3 className="text-[var(--text-primary)]">
            {language === 'en' ? 'Common Techniques:' : 'Распространенные техники:'}
          </h3>
          <ul className="text-[var(--text-secondary)]">
            <li>
              <strong>{language === 'en' ? 'Pretexting:' : 'Претекстинг:'}</strong>{' '}
              {language === 'en' ? 'Creating a fabricated scenario to obtain information' : 'Создание вымышленного сценария для получения информации'}
            </li>
            <li>
              <strong>{language === 'en' ? 'Phishing:' : 'Фишинг:'}</strong>{' '}
              {language === 'en' ? 'Fraudulent communications appearing to come from reputable sources' : 'Мошеннические сообщения, которые кажутся от авторитетных источников'}
            </li>
            <li>
              <strong>{language === 'en' ? 'Baiting:' : 'Приманка:'}</strong>{' '}
              {language === 'en' ? 'Offering something enticing to trick victims' : 'Предложение чего-то заманчивого для обмана жертв'}
            </li>
            <li>
              <strong>{language === 'en' ? 'Tailgating:' : 'Проникновение:'}</strong>{' '}
              {language === 'en' ? 'Following authorized personnel into restricted areas' : 'Следование за авторизованным персоналом в запретные зоны'}
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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[var(--text-primary)]">
            {language === 'en' ? 'Interactive Scenario Training' : 'Интерактивная тренировка на сценариях'}
          </h2>
          <div className="text-sm text-[var(--text-secondary)]">
            {language === 'en' ? 'Scenario' : 'Сценарий'} {currentScenario + 1} {language === 'en' ? 'of' : 'из'} {scenarios.length} | {language === 'en' ? 'Score:' : 'Счёт:'} {score}/{currentScenario + (selectedChoice !== null ? 1 : 0)}
          </div>
        </div>

        <motion.div
          key={currentScenario}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6 p-4 bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg"
        >
          <p className="text-[var(--text-primary)]">{scenario.situation}</p>
        </motion.div>

        <div className="space-y-3 mb-6">
          {scenario.choices.map((choice, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={selectedChoice === null ? { scale: 1.02, x: 5 } : {}}
              whileTap={selectedChoice === null ? { scale: 0.98 } : {}}
              onClick={() => handleChoice(index)}
              disabled={selectedChoice !== null}
              className={`w-full text-left p-4 border-2 rounded-lg transition-all ${
                selectedChoice === null
                  ? 'border-[var(--border-primary)] hover:bg-[var(--hover-bg)] hover:border-[var(--accent-primary)]'
                  : selectedChoice === index
                  ? choice.safe
                    ? 'border-green-500 bg-green-50'
                    : 'border-red-500 bg-red-50'
                  : 'border-[var(--border-primary)] opacity-50'
              }`}
            >
              <div className="flex items-start gap-3">
                {selectedChoice === index && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    {choice.safe ? <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /> : <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />}
                  </motion.div>
                )}
                <div className="flex-1">
                  <div className="text-[var(--text-primary)] mb-2">{choice.text}</div>
                  {selectedChoice === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className={`text-sm ${choice.safe ? 'text-green-700' : 'text-red-700'}`}
                    >
                      {choice.feedback}
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {selectedChoice !== null && !isComplete && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={nextScenario}
            className="w-full py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity"
          >
            {language === 'en' ? 'Next Scenario →' : 'Следующий сценарий →'}
          </motion.button>
        )}
      </motion.div>

      {isComplete && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-300 rounded-xl p-6 text-center"
        >
          <h3 className="text-green-800 mb-4">{t.levelComplete}</h3>
          <p className="text-green-700 mb-4">
            {language === 'en' ? `Final Score: ${score} / ${scenarios.length}` : `Финальный счёт: ${score} / ${scenarios.length}`}
          </p>
          <p className="text-sm text-green-700 mb-4">
            {score === scenarios.length
              ? language === 'en'
                ? "Perfect! You've demonstrated excellent awareness of social engineering tactics."
                : "Отлично! Вы продемонстрировали превосходную осведомленность о тактиках социальной инженерии."
              : score >= scenarios.length / 2
              ? language === 'en'
                ? "Good work! Continue practicing to strengthen your defenses against manipulation."
                : "Хорошая работа! Продолжайте практиковаться для укрепления защиты от манипуляций."
              : language === 'en'
              ? "Keep learning! Social engineering is subtle and requires constant vigilance."
              : "Продолжайте учиться! Социальная инженерия тонка и требует постоянной бдительности."}
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
        <h3 className="text-[var(--text-primary)] mb-4">{t.prevention}</h3>
        <div className="space-y-3 text-[var(--text-secondary)]">
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Verify through secondary channels' : 'Проверяйте через альтернативные каналы'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Always confirm unusual requests via phone or in-person'
                : 'Всегда подтверждайте необычные запросы по телефону или лично'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Trust your instincts' : 'Доверяйте своим инстинктам'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'If something feels urgent or unusual, it probably is'
                : 'Если что-то кажется срочным или необычным, скорее всего, так и есть'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Never share passwords' : 'Никогда не делитесь паролями'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Legitimate IT will never ask for credentials'
                : 'Легитимная IT-служба никогда не попросит учетные данные'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Limit information sharing' : 'Ограничьте обмен информацией'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? "Don't discuss sensitive operational details publicly"
                : 'Не обсуждайте конфиденциальные операционные детали публично'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Regular training' : 'Регулярное обучение'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Stay updated on latest social engineering techniques'
                : 'Оставайтесь в курсе последних техник социальной инженерии'}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
