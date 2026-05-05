import { useState } from 'react';
import { ArrowLeft, Sparkles, Play, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { useTheme } from '../../../context/ThemeContext';
import { translations } from '../../../translations';

export function AIFraud() {
  const { language } = useTheme();
  const t = translations[language];
  const [currentTest, setCurrentTest] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  const tests = language === 'en' ? [
    {
      type: 'audio',
      description: 'Voice Message: "Hi, this is Sarah from accounting. I need you to approve an urgent wire transfer. Can you send me the approval code?"',
      isReal: false,
      indicators: [
        'Slight robotic cadence in speech',
        'Background noise inconsistency',
        'Unusual request method (real Sarah would use official channels)',
      ],
      explanation: 'This is an AI-generated deepfake voice. Notice the unnatural pauses and the urgent financial request.',
    },
    {
      type: 'video',
      description: 'Video Call: Your manager asks you to share sensitive project files during an impromptu video call from an unknown device.',
      isReal: false,
      indicators: [
        'Lip-sync appears slightly off',
        'Face movements seem unnaturally smooth',
        'Background is suspiciously generic',
      ],
      explanation: 'This is a deepfake video. Real-time deepfakes often have subtle synchronization issues between audio and video.',
    },
    {
      type: 'email',
      description: 'Email with AI-written content perfectly mimicking your colleague\'s writing style, asking for login credentials to "test the new system."',
      isReal: false,
      indicators: [
        'Perfect grammar (your colleague usually makes typos)',
        'Unusual request for credentials',
        'Sent outside normal business hours',
      ],
      explanation: 'AI can analyze writing patterns and generate convincing imitations. Always verify through separate channels.',
    },
  ] : [
    {
      type: 'аудио',
      description: 'Голосовое сообщение: "Привет, это Сара из бухгалтерии. Мне нужно, чтобы ты одобрил срочный банковский перевод. Можешь прислать код подтверждения?"',
      isReal: false,
      indicators: [
        'Легкий роботизированный темп речи',
        'Несоответствие фонового шума',
        'Необычный метод запроса (настоящая Сара использовала бы официальные каналы)',
      ],
      explanation: 'Это синтезированный ИИ голос (дипфейк). Обратите внимание на неестественные паузы и срочный финансовый запрос.',
    },
    {
      type: 'видео',
      description: 'Видеозвонок: Ваш менеджер просит поделиться конфиденциальными файлами проекта во время внезапного видеозвонка с неизвестного устройства.',
      isReal: false,
      indicators: [
        'Синхронизация губ выглядит слегка неправильной',
        'Движения лица кажутся неестественно плавными',
        'Фон подозрительно общий',
      ],
      explanation: 'Это дипфейк видео. Дипфейки в реальном времени часто имеют тонкие проблемы синхронизации между аудио и видео.',
    },
    {
      type: 'письмо',
      description: 'Письмо с контентом, написанным ИИ, идеально имитирующим стиль письма вашего коллеги, с просьбой предоставить учетные данные для "тестирования новой системы".',
      isReal: false,
      indicators: [
        'Идеальная грамматика (ваш коллега обычно делает опечатки)',
        'Необычный запрос учетных данных',
        'Отправлено вне обычного рабочего времени',
      ],
      explanation: 'ИИ может анализировать шаблоны письма и генерировать убедительные имитации. Всегда проверяйте через отдельные каналы.',
    },
  ];

  const handleAnswer = (guess: boolean) => {
    setSelectedAnswer(guess);
    if (guess === tests[currentTest].isReal) {
      setScore(score + 1);
    }
  };

  const nextTest = () => {
    if (currentTest < tests.length - 1) {
      setCurrentTest(currentTest + 1);
      setSelectedAnswer(null);
    }
  };

  const handleReset = () => {
    setCurrentTest(0);
    setSelectedAnswer(null);
    setScore(0);
  };

  const test = tests[currentTest];
  const isComplete = currentTest === tests.length - 1 && selectedAnswer !== null;
  const isCorrect = selectedAnswer === test.isReal;

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
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className="p-3 bg-orange-100 rounded-lg"
          >
            <Sparkles className="w-6 h-6 text-orange-600" />
          </motion.div>
          <div>
            <h1 className="text-[var(--text-primary)]">
              {language === 'en' ? 'Level 2: AI Fraud' : 'Уровень 2: ИИ-мошенничество'}
            </h1>
            <p className="text-sm text-[var(--text-secondary)]">
              {language === 'en' ? 'Deepfakes & AI-Assisted Impersonation' : 'Дипфейки и подмена личности с помощью ИИ'}
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
              ? 'AI-powered fraud uses machine learning to create convincing fake audio, video, and text that impersonates real people. These deepfakes are becoming increasingly sophisticated and difficult to detect.'
              : 'ИИ-мошенничество использует машинное обучение для создания убедительных поддельных аудио, видео и текста, выдающих себя за реальных людей. Эти дипфейки становятся все более сложными и трудными для обнаружения.'}
          </p>
          <h3 className="text-[var(--text-primary)]">
            {language === 'en' ? 'AI Fraud Techniques:' : 'Техники ИИ-мошенничества:'}
          </h3>
          <ul className="text-[var(--text-secondary)]">
            <li>
              <strong>{language === 'en' ? 'Voice Cloning:' : 'Клонирование голоса:'}</strong>{' '}
              {language === 'en' ? 'AI models can replicate someone\'s voice from just a few seconds of audio' : 'ИИ-модели могут воспроизвести чей-то голос всего по нескольким секундам аудио'}
            </li>
            <li>
              <strong>{language === 'en' ? 'Deepfake Videos:' : 'Дипфейк видео:'}</strong>{' '}
              {language === 'en' ? 'Face-swapping and expression manipulation in real-time' : 'Подмена лиц и манипуляция выражениями в реальном времени'}
            </li>
            <li>
              <strong>{language === 'en' ? 'AI-Written Phishing:' : 'Фишинг, написанный ИИ:'}</strong>{' '}
              {language === 'en' ? 'Language models craft personalized, convincing scam messages' : 'Языковые модели создают персонализированные, убедительные мошеннические сообщения'}
            </li>
            <li>
              <strong>{language === 'en' ? 'Synthetic Media:' : 'Синтетические медиа:'}</strong>{' '}
              {language === 'en' ? 'Completely fabricated but realistic images and videos' : 'Полностью сфабрикованные, но реалистичные изображения и видео'}
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
            {language === 'en' ? 'Deepfake Detection Challenge' : 'Задача обнаружения дипфейков'}
          </h2>
          <div className="text-sm text-[var(--text-secondary)]">
            {language === 'en' ? 'Test' : 'Тест'} {currentTest + 1} {language === 'en' ? 'of' : 'из'} {tests.length} | {language === 'en' ? 'Score:' : 'Счёт:'} {score}/{currentTest + (selectedAnswer !== null ? 1 : 0)}
          </div>
        </div>

        <motion.div
          key={currentTest}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="mb-6"
        >
          <div className="p-6 bg-[var(--hover-bg)] border border-[var(--border-primary)] rounded-lg">
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Play className="w-5 h-5 text-[var(--accent-primary)]" />
              </motion.div>
              <span className="text-sm text-[var(--text-secondary)]">{test.type.toUpperCase()} {language === 'en' ? 'SAMPLE' : 'ОБРАЗЕЦ'}</span>
            </div>
            <p className="text-[var(--text-primary)] italic">{test.description}</p>
          </div>
        </motion.div>

        {selectedAnswer === null ? (
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(true)}
              className="p-6 border-2 border-[var(--border-primary)] rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
            >
              <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-[var(--text-primary)]">{language === 'en' ? 'Real/Authentic' : 'Настоящий/Подлинный'}</div>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAnswer(false)}
              className="p-6 border-2 border-[var(--border-primary)] rounded-lg hover:border-red-500 hover:bg-red-50 transition-all"
            >
              <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
              <div className="text-[var(--text-primary)]">{language === 'en' ? 'Fake/AI-Generated' : 'Поддельный/Сгенерирован ИИ'}</div>
            </motion.button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`p-6 border-2 rounded-lg ${isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}
          >
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                {isCorrect ? (
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
              </motion.div>
              <h3 className={isCorrect ? 'text-green-800' : 'text-red-800'}>
                {isCorrect ? (language === 'en' ? 'Correct!' : 'Правильно!') : (language === 'en' ? 'Incorrect' : 'Неправильно')}
              </h3>
            </div>
            <p className={`mb-4 ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
              {test.explanation}
            </p>
            <div className="bg-white/50 p-4 rounded-lg">
              <h4 className="text-sm text-gray-700 mb-2">{language === 'en' ? 'Detection Indicators:' : 'Индикаторы обнаружения:'}</h4>
              <ul className="space-y-1 text-sm text-gray-600">
                {test.indicators.map((indicator, index) => (
                  <li key={index}>• {indicator}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {selectedAnswer !== null && !isComplete && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={nextTest}
            className="w-full mt-6 py-3 bg-[var(--accent-primary)] text-[var(--accent-text)] rounded-lg hover:opacity-90 transition-opacity"
          >
            {language === 'en' ? 'Next Challenge →' : 'Следующий вызов →'}
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
            {language === 'en' ? `Final Score: ${score} / ${tests.length}` : `Финальный счёт: ${score} / ${tests.length}`}
          </p>
          <p className="text-sm text-green-700 mb-4">
            {score === tests.length
              ? language === 'en'
                ? "Excellent! You have a keen eye for detecting AI-generated content."
                : "Отлично! У вас зоркий глаз для обнаружения контента, сгенерированного ИИ."
              : score >= tests.length / 2
              ? language === 'en'
                ? "Good work! Continue developing your detection skills."
                : "Хорошая работа! Продолжайте развивать навыки обнаружения."
              : language === 'en'
              ? "AI fraud is sophisticated. Always verify through multiple channels."
              : "ИИ-мошенничество сложное. Всегда проверяйте через несколько каналов."}
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
              ✓ {language === 'en' ? 'Multi-channel verification' : 'Многоканальная проверка'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Confirm unexpected requests through different communication methods'
                : 'Подтверждайте неожиданные запросы через различные методы коммуникации'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Look for artifacts' : 'Ищите артефакты'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Unnatural movements, audio glitches, or lighting inconsistencies'
                : 'Неестественные движения, аудио сбои или несоответствия освещения'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Establish code words' : 'Установите кодовые слова'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Pre-arrange authentication phrases with colleagues'
                : 'Заранее договоритесь об аутентификационных фразах с коллегами'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Question urgency' : 'Сомневайтесь в срочности'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Fraudsters create false time pressure'
                : 'Мошенники создают ложное временное давление'}
            </p>
          </motion.div>
          <motion.div
            whileHover={{ x: 5 }}
            className="p-4 bg-green-50 border border-green-200 rounded-lg"
          >
            <h4 className="text-green-800 mb-2">
              ✓ {language === 'en' ? 'Use detection tools' : 'Используйте инструменты обнаружения'}
            </h4>
            <p className="text-sm text-green-700">
              {language === 'en'
                ? 'Employ AI-powered deepfake detection software'
                : 'Используйте программное обеспечение для обнаружения дипфейков на основе ИИ'}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
