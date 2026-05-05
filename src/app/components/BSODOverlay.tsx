import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Shield, RefreshCw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

type Phase = 'errors' | 'bsod' | 'success' | 'reload';

const ERROR_MESSAGES = [
  { code: '0x0000DEAD', msg: 'MEMORY CORRUPTION DETECTED', severity: 'critical' },
  { code: 'ERR_FIREWALL_BREACH', msg: 'UNAUTHORIZED ACCESS DETECTED', severity: 'high' },
  { code: '0x0000007B', msg: 'INACCESSIBLE_BOOT_DEVICE', severity: 'critical' },
  { code: 'MALWARE_FOUND', msg: 'Trojan.Win32.Backdoor — ACTIVE', severity: 'critical' },
  { code: 'SQL_INJECT_001', msg: 'DATABASE BREACH IN PROGRESS', severity: 'high' },
  { code: '0xC0000022', msg: 'PRIVILEGE ESCALATION DETECTED', severity: 'medium' },
  { code: 'RANSOMWARE_ALERT', msg: 'ШИФРОВАНИЕ ФАЙЛОВ...', severity: 'critical' },
  { code: 'KEYLOG_ACTIVE', msg: 'INPUT CAPTURED: ████████', severity: 'high' },
  { code: 'KERNEL_PANIC', msg: 'SYSTEM INTEGRITY COMPROMISED', severity: 'critical' },
  { code: 'NET_0x337', msg: 'MITM ATTACK: 192.168.1.337', severity: 'high' },
  { code: '0x0000009F', msg: 'DRIVER POWER STATE FAILURE', severity: 'medium' },
  { code: '>>> ВЗЛОМАНО <<<', msg: 'КРИТИЧЕСКИЙ ВЗЛОМ СИСТЕМЫ', severity: 'critical' },
  { code: 'ROOTKIT_FOUND', msg: 'ROOTKIT DETECTED IN KERNEL', severity: 'critical' },
  { code: '0x000000EF', msg: 'CRITICAL_PROCESS_DIED', severity: 'critical' },
  { code: 'DNS_HIJACK', msg: 'DNS SPOOFING DETECTED', severity: 'high' },
  { code: 'SSH_BREACH', msg: 'UNAUTHORIZED SSH LOGIN: root', severity: 'critical' },
  { code: '0xBAD_ALLOC', msg: 'HEAP OVERFLOW DETECTED', severity: 'high' },
  { code: 'BACKDOOR_0x1', msg: 'C2 SERVER CONNECTED: 13.37.x.x', severity: 'critical' },
  { code: 'DATA_EXFIL', msg: 'UPLOADING TO ATTACKER: 94%', severity: 'critical' },
  { code: '0x000000BE', msg: 'WRITE TO READONLY MEMORY', severity: 'medium' },
  { code: 'PHISH_EXEC', msg: 'CREDENTIAL HARVEST COMPLETE', severity: 'high' },
  { code: 'VPN_BYPASS', msg: 'VPN TUNNEL COMPROMISED', severity: 'high' },
  { code: 'AV_DISABLED', msg: 'ANTIVIRUS KILLED', severity: 'critical' },
  { code: '0x4444DEAD', msg: 'STACK SMASHING DETECTED', severity: 'critical' },
  { code: 'PORT_SCAN', msg: '3247 OPEN PORTS EXPOSED', severity: 'medium' },
  { code: 'БРУТФОРС', msg: '99 999 ПОПЫТОК ВЗЛОМА', severity: 'critical' },
  { code: '0xDEADBEEF', msg: 'BUFFER OVERFLOW EXECUTING', severity: 'critical' },
  { code: 'CERT_REVOKED', msg: 'TLS CERTIFICATE FORGED', severity: 'high' },
  { code: 'ZK_PROTO_ERR', msg: 'CRYPTOGRAPHIC BYPASS ACTIVE', severity: 'high' },
  { code: 'SHUTDOWN_X', msg: '>>> СИСТЕМА УНИЧТОЖЕНА <<<', severity: 'critical' },
];

const SEVERITY_COLORS: Record<string, { border: string; text: string; bg: string }> = {
  critical: { border: '#ef4444', text: '#f87171', bg: 'rgba(239,68,68,0.07)' },
  high: { border: '#f97316', text: '#fb923c', bg: 'rgba(249,115,22,0.07)' },
  medium: { border: '#eab308', text: '#facc15', bg: 'rgba(234,179,8,0.07)' },
};

// 30 scattered positions covering the full screen
const POSITIONS: React.CSSProperties[] = [
  { top: '2%', left: '0.5%' },
  { top: '5%', right: '1%' },
  { top: '14%', left: '1.5%' },
  { top: '8%', left: '27%' },
  { top: '26%', right: '2%' },
  { top: '33%', left: '0.5%' },
  { top: '42%', left: '34%' },
  { top: '52%', right: '1.5%' },
  { top: '59%', left: '5%' },
  { top: '69%', left: '44%' },
  { top: '75%', right: '4%' },
  { top: '83%', left: '13%' },
  { top: '19%', left: '55%' },
  { top: '31%', right: '28%' },
  { top: '46%', left: '12%' },
  { top: '62%', right: '20%' },
  { top: '11%', left: '41%' },
  { top: '71%', left: '28%' },
  { top: '38%', right: '5%' },
  { top: '55%', left: '58%' },
  { top: '22%', right: '14%' },
  { top: '48%', left: '70%' },
  { top: '78%', right: '10%' },
  { top: '85%', left: '54%' },
  { top: '15%', right: '38%' },
  { top: '64%', left: '6%' },
  { top: '34%', left: '48%' },
  { top: '90%', right: '3%' },
  { top: '6%', left: '63%' },
  { top: '43%', right: '16%' },
];

interface BSODOverlayProps {
  onComplete: () => void;
}

export function BSODOverlay({ onComplete }: BSODOverlayProps) {
  const navigate = useNavigate();
  const { language } = useTheme();
  const [phase, setPhase] = useState<Phase>('errors');
  const [visibleErrors, setVisibleErrors] = useState(0);
  const [reloadProgress, setReloadProgress] = useState(0);
  const isRu = language === 'ru';

  const INTERVAL = 80; // ms between each error appearing

  // Phase 1: Cascade errors
  useEffect(() => {
    let count = 0;
    const errorInterval = setInterval(() => {
      count++;
      setVisibleErrors(count);
      if (count >= ERROR_MESSAGES.length) {
        clearInterval(errorInterval);
      }
    }, INTERVAL);

    const bsodTimer = setTimeout(() => {
      setPhase('bsod');
    }, ERROR_MESSAGES.length * INTERVAL + 500);

    return () => {
      clearInterval(errorInterval);
      clearTimeout(bsodTimer);
    };
  }, []);

  // Phase transitions
  useEffect(() => {
    if (phase === 'bsod') {
      const t = setTimeout(() => setPhase('success'), 3200);
      return () => clearTimeout(t);
    }
    if (phase === 'success') {
      const t = setTimeout(() => setPhase('reload'), 2600);
      return () => clearTimeout(t);
    }
    if (phase === 'reload') {
      const start = Date.now();
      const DURATION = 2200;
      let rafId: number;
      const tick = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min((elapsed / DURATION) * 100, 100);
        setReloadProgress(progress);
        if (progress < 100) {
          rafId = requestAnimationFrame(tick);
        } else {
          setTimeout(() => {
            onComplete();
            navigate('/');
          }, 350);
        }
      };
      rafId = requestAnimationFrame(tick);
      return () => cancelAnimationFrame(rafId);
    }
  }, [phase, navigate, onComplete]);

  return (
    <div className="fixed inset-0 z-[9999]" style={{ pointerEvents: 'all' }}>

      {/* ── PERSISTENT BLACK BACKGROUND — always covers site ── */}
      <div className="absolute inset-0 bg-black" />

      {/* ── PHASE 1: CASCADING ERRORS ── */}
      <AnimatePresence>
        {phase === 'errors' && (
          <motion.div
            key="errors-layer"
            className="absolute inset-0"
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            {/* Scanline / vignette overlay for atmosphere */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
              }}
            />

            {/* Error notification cards */}
            {ERROR_MESSAGES.slice(0, visibleErrors).map((err, i) => {
              const colors = SEVERITY_COLORS[err.severity];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.75, y: -16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 24 }}
                  className="absolute rounded-lg shadow-2xl"
                  style={{
                    ...POSITIONS[i],
                    width: 340,
                    background: colors.bg,
                    border: `2px solid ${colors.border}`,
                    padding: '13px 16px',
                  }}
                >
                  <div className="flex items-start gap-2.5">
                    <AlertTriangle
                      className="w-4 h-4 mt-0.5 shrink-0"
                      style={{ color: colors.text }}
                    />
                    <div>
                      <div
                        className="font-mono tracking-wide"
                        style={{ fontSize: 11, color: colors.text, fontWeight: 700 }}
                      >
                        {err.code}
                      </div>
                      <div
                        className="mt-0.5 leading-tight"
                        style={{ fontSize: 12, color: 'rgba(255,255,255,0.85)' }}
                      >
                        {err.msg}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PHASE 2: BSOD ── */}
      <AnimatePresence>
        {phase === 'bsod' && (
          <motion.div
            key="bsod"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white select-none"
            style={{ backgroundColor: '#0040AA' }}
          >
            <div className="text-center max-w-xl space-y-5">
              <motion.div
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}
                className="select-none"
                style={{ fontSize: 96, lineHeight: 1 }}
              >
                :(
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-3"
              >
                <h2 style={{ fontSize: 22, fontWeight: 300, marginBottom: 12 }}>
                  {isRu
                    ? 'Ваш ПК столкнулся с проблемой и требует перезагрузки.'
                    : 'Your PC ran into a problem and needs to restart.'}
                </h2>
                <div className="font-mono space-y-1" style={{ fontSize: 13, color: 'rgba(255,255,255,0.68)' }}>
                  <div>CRITICAL_PROCESS_DIED</div>
                  <div>Stop code: 0x000000EF</div>
                  <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>
                    {isRu ? 'Сбор информации об ошибке... 100% завершено' : 'Collecting error info... 100% complete'}
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 0.8, 0.2] }}
                transition={{ delay: 1.2, duration: 1.8, repeat: Infinity }}
                className="font-mono"
                style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)' }}
              >
                {isRu ? 'Подготовка к перезапуску...' : 'Preparing to restart...'}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PHASE 3: SUCCESS ── */}
      <AnimatePresence>
        {phase === 'success' && (
          <motion.div
            key="success"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8"
            style={{ background: 'linear-gradient(135deg, #050505 0%, #0a1a0a 100%)' }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34,197,94,0.13) 0%, transparent 70%)',
              }}
            />

            <div className="relative text-center max-w-lg space-y-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 180, damping: 14 }}
                className="flex justify-center"
              >
                <div
                  className="p-6 rounded-full"
                  style={{
                    background: 'rgba(34,197,94,0.12)',
                    border: '2px solid #22c55e',
                    boxShadow: '0 0 40px rgba(34,197,94,0.25)',
                  }}
                >
                  <Shield className="w-16 h-16" style={{ color: '#4ade80' }} />
                </div>
              </motion.div>

              <motion.div
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="space-y-3"
              >
                <h2 className="text-white" style={{ fontSize: 30, fontWeight: 700 }}>
                  {isRu ? 'Угроза ликвидирована.' : 'Threat Neutralized.'}
                </h2>
                <p style={{ fontSize: 17, color: '#4ade80' }}>
                  {isRu
                    ? 'Ваша система под надёжной защитой TSU CyberSecurity'
                    : 'Your system is protected by TSU CyberSecurity'}
                </p>
                <div className="flex items-center justify-center gap-2 pt-2">
                  <motion.div
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full"
                    style={{ background: '#22c55e' }}
                  />
                  <span className="font-mono" style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>
                    {isRu ? 'Все угрозы нейтрализованы' : 'All threats neutralized'}
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PHASE 4: RELOAD ── */}
      <AnimatePresence>
        {phase === 'reload' && (
          <motion.div
            key="reload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8"
            style={{ background: '#0a0a0a' }}
          >
            <div className="text-center max-w-sm w-full space-y-7">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-center gap-3"
              >
                <img
                  src="/src/imports/Picsart_26-05-03_16-55-19-299.png"
                  alt="TSU"
                  className="w-10 h-10 object-contain opacity-80"
                />
                <span className="text-white" style={{ fontSize: 15, fontWeight: 600, opacity: 0.7 }}>
                  TSU CyberSecurity
                </span>
              </motion.div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="flex justify-center"
              >
                <RefreshCw className="w-11 h-11" style={{ color: '#dc2626' }} />
              </motion.div>

              <div>
                <p className="text-white mb-4" style={{ fontSize: 16 }}>
                  {isRu ? 'Перезагрузка системы...' : 'Reloading system...'}
                </p>

                <div
                  className="w-full rounded-full overflow-hidden"
                  style={{ height: 6, background: 'rgba(255,255,255,0.08)' }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      width: `${reloadProgress}%`,
                      background: 'linear-gradient(90deg, #b91c1c, #ef4444)',
                      boxShadow: '0 0 10px rgba(239,68,68,0.5)',
                    }}
                  />
                </div>
                <p className="font-mono mt-2" style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>
                  {Math.round(reloadProgress)}%
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
