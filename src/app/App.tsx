import { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { HomeScreen } from './components/HomeScreen';
import { BottomNav } from './components/BottomNav';
import { ToastProvider } from './components/ToastProvider';
import { LoadingScreen } from './components/LoadingScreen';
import { AIScreen } from './components/AIScreen';
import { ServicesScreen } from './components/ServicesScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SchemesScreen } from './components/SchemesScreen';
import { ConstituencyScreen } from './components/ConstituencyScreen';
import { EducationScreen } from './components/EducationScreen';
import { HealthcareScreen } from './components/HealthcareScreen';
import { WalletScreen } from './components/WalletScreen';
import { SmartCitiesScreen } from './components/SmartCitiesScreen';
import { DistrictsScreen } from './components/DistrictsScreen';
import { ComplaintsScreen } from './components/ComplaintsScreen';
import { ElectricityScreen } from './components/ElectricityScreen';
import { WaterScreen } from './components/WaterScreen';
import { TransportScreen } from './components/TransportScreen';
import { VehiclesScreen } from './components/VehiclesScreen';
import { RationScreen } from './components/RationScreen';
import { HousingScreen } from './components/HousingScreen';
import { JobsScreen } from './components/JobsScreen';
import { PoliceScreen } from './components/PoliceScreen';
import { EmergencyScreen } from './components/EmergencyScreen';
import { HelpdeskScreen } from './components/HelpdeskScreen';
import { CCTVScreen } from './components/CCTVScreen';
import { AnalyticsScreen } from './components/AnalyticsScreen';

// Tab order for left/right swipe between tabs
const TAB_ORDER = ['home', 'ai', 'services', 'dashboard', 'profile'];

// Slide variants — direction: 1 = forward (enter from right), -1 = back (enter from left)
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};
const slideTransition = { type: 'tween' as const, duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] };

export default function App() {
  const [activeTab, setActiveTab]         = useState('home');
  const [currentScreen, setCurrentScreen] = useState('home');
  const [navDir, setNavDir]               = useState(1);   // 1 = forward, -1 = back
  const [darkMode, setDarkMode]           = useState(true);
  const [isLoading, setIsLoading]         = useState(true);
  const historyRef                        = useRef<string[]>(['home']);

  // touch tracking
  const touchStartX  = useRef(0);
  const touchStartY  = useRef(0);
  const touchStartTime = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 9000);
    return () => clearTimeout(timer);
  }, []);

  const pushScreen = useCallback((screen: string, dir = 1) => {
    setNavDir(dir);
    setCurrentScreen(screen);
    historyRef.current = [...historyRef.current, screen];
  }, []);

  const handleNavigate = useCallback((screen: string) => {
    pushScreen(screen, 1);
  }, [pushScreen]);

  const handleTabChange = useCallback((tab: string) => {
    const oldIdx = TAB_ORDER.indexOf(activeTab);
    const newIdx = TAB_ORDER.indexOf(tab);
    const dir    = newIdx >= oldIdx ? 1 : -1;
    setNavDir(dir);
    setActiveTab(tab);
    setCurrentScreen(tab);
    historyRef.current = [tab];
  }, [activeTab]);

  const handleBack = useCallback(() => {
    const hist = historyRef.current;
    if (hist.length > 1) {
      const prev = hist[hist.length - 2];
      historyRef.current = hist.slice(0, -1);
      setNavDir(-1);
      setCurrentScreen(prev);
      // restore tab if prev is a root tab
      if (TAB_ORDER.includes(prev)) setActiveTab(prev);
    } else {
      setNavDir(-1);
      setCurrentScreen('services');
      setActiveTab('services');
      historyRef.current = ['services'];
    }
  }, []);

  // ── Swipe gesture handler ────────────────────────────────────────────────
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current    = e.touches[0].clientX;
    touchStartY.current    = e.touches[0].clientY;
    touchStartTime.current = Date.now();
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const dx   = e.changedTouches[0].clientX - touchStartX.current;
    const dy   = e.changedTouches[0].clientY - touchStartY.current;
    const dt   = Date.now() - touchStartTime.current;
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    // Must be horizontal-dominant, fast, and wide enough
    if (absDx < 60 || absDy > absDx * 0.8 || dt > 500) return;

    if (dx > 0) {
      // Swipe RIGHT → go back (only if started near left edge or deep in history)
      const hist = historyRef.current;
      if (touchStartX.current < 60 || hist.length > 1) {
        handleBack();
      }
    } else {
      // Swipe LEFT on root tabs → advance to next tab
      const idx = TAB_ORDER.indexOf(activeTab);
      const isRootScreen = TAB_ORDER.includes(currentScreen);
      if (isRootScreen && idx < TAB_ORDER.length - 1) {
        handleTabChange(TAB_ORDER[idx + 1]);
      }
    }
  }, [handleBack, handleTabChange, activeTab, currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} darkMode={darkMode} />;
      case 'services':
        return <ServicesScreen onNavigate={handleNavigate} darkMode={darkMode} />;
      case 'ai':
        return <AIScreen darkMode={darkMode} />;
      case 'dashboard':
        return <DashboardScreen darkMode={darkMode} />;
      case 'profile':
        return <ProfileScreen darkMode={darkMode} onDarkModeChange={setDarkMode} />;
      case 'schemes':
        return <SchemesScreen onBack={handleBack} darkMode={darkMode} />;
      case 'constituency':
        return <ConstituencyScreen onBack={handleBack} darkMode={darkMode} />;
      case 'education':
        return <EducationScreen onBack={handleBack} darkMode={darkMode} />;
      case 'healthcare':
        return <HealthcareScreen onBack={handleBack} darkMode={darkMode} />;
      case 'wallet':
        return <WalletScreen onBack={handleBack} darkMode={darkMode} />;
      case 'smartcities':
        return <SmartCitiesScreen onBack={handleBack} darkMode={darkMode} />;
      case 'districts':
        return <DistrictsScreen onBack={handleBack} darkMode={darkMode} />;
      case 'complaints':
        return <ComplaintsScreen onBack={handleBack} darkMode={darkMode} />;
      case 'electricity':
        return <ElectricityScreen onBack={handleBack} darkMode={darkMode} />;
      case 'water':
        return <WaterScreen onBack={handleBack} darkMode={darkMode} />;
      case 'transport':
        return <TransportScreen onBack={handleBack} darkMode={darkMode} />;
      case 'vehicles':
        return <VehiclesScreen onBack={handleBack} darkMode={darkMode} />;
      case 'ration':
        return <RationScreen onBack={handleBack} darkMode={darkMode} />;
      case 'housing':
        return <HousingScreen onBack={handleBack} darkMode={darkMode} />;
      case 'jobs':
        return <JobsScreen onBack={handleBack} darkMode={darkMode} />;
      case 'police':
        return <PoliceScreen onBack={handleBack} darkMode={darkMode} />;
      case 'emergency':
        return <EmergencyScreen onBack={handleBack} darkMode={darkMode} />;
      case 'helpdesk':
        return <HelpdeskScreen onBack={handleBack} darkMode={darkMode} />;
      case 'cctv':
        return <CCTVScreen onBack={handleBack} darkMode={darkMode} />;
      case 'analytics':
        return <AnalyticsScreen onBack={handleBack} darkMode={darkMode} />;
      default:
        return <HomeScreen onNavigate={handleNavigate} darkMode={darkMode} />;
    }
  };

  // ── light-mode CSS — single blue #0ea5e9 (sky-500) ─────────────────────
  const LM = `
    .light-mode {
      --bl:        #0ea5e9;
      --bl-dark:   #0284c7;
      --bl-icon:   #38bdf8;
      --bl-tint:   #f0f9ff;
      --bl-tint2:  #e0f2fe;
      --bl-border: #bae6fd;
      --bl-shadow: 0 2px 16px rgba(14,165,233,0.12), 0 1px 4px rgba(14,165,233,0.07);
      --bl-shadow-h: 0 4px 24px rgba(14,165,233,0.22), 0 2px 8px rgba(14,165,233,0.14);
      --tx-h:      #0c1a2e;
      --tx:        #1e3a5f;
      --tx-soft:   #4a6a8a;
      --tx-mute:   #7fa8c9;
    }

    /* page background — clean white with very soft blue wash */
    .light-mode { background: #f0f9ff !important; }

    /* cards */
    .light-mode .lm-card {
      background: #ffffff !important;
      border: 1px solid var(--bl-border) !important;
      box-shadow: var(--bl-shadow) !important;
    }
    .light-mode .lm-card:hover {
      background: var(--bl-tint) !important;
      box-shadow: var(--bl-shadow-h) !important;
    }

    /* glass surfaces → white */
    .light-mode .backdrop-blur-xl {
      background: rgba(255,255,255,0.97) !important;
      backdrop-filter: blur(12px) !important;
      border-color: var(--bl-border) !important;
    }
    .light-mode .bg-white\\/5  { background: #ffffff !important; border-color: var(--bl-border) !important; box-shadow: var(--bl-shadow) !important; }
    .light-mode .bg-white\\/10 { background: var(--bl-tint) !important; }
    .light-mode .bg-black\\/80 { background: rgba(255,255,255,0.97) !important; border-color: var(--bl-border) !important; }
    .light-mode .border-white\\/10 { border-color: var(--bl-border) !important; }

    /* typography */
    .light-mode h1, .light-mode h2, .light-mode h3, .light-mode h4 { color: var(--tx-h) !important; }
    .light-mode .text-white  { color: var(--tx-h) !important; }
    .light-mode .text-gray-400, .light-mode .text-gray-500 { color: var(--tx-soft) !important; }

    /* ALL accent/icon colours → light blue */
    .light-mode .text-purple-400, .light-mode .text-purple-500, .light-mode .text-purple-600,
    .light-mode .text-pink-400,   .light-mode .text-pink-500,
    .light-mode .text-indigo-400, .light-mode .text-blue-600,
    .light-mode .text-cyan-400,   .light-mode .text-orange-400 { color: var(--bl-icon) !important; }
    .light-mode .text-blue-400 { color: var(--bl-icon) !important; }

    /* semantic status colours preserved */
    .light-mode .text-green-400, .light-mode .text-green-300 { color: #16a34a !important; }
    .light-mode .text-yellow-400 { color: #b45309 !important; }
    .light-mode .text-red-400    { color: #dc2626 !important; }

    /* solid bg accents → blue */
    .light-mode .bg-purple-600, .light-mode .bg-purple-500,
    .light-mode .bg-indigo-600, .light-mode .bg-pink-600,
    .light-mode .bg-sky-500    { background: var(--bl) !important; }

    /* tinted bg accents → soft blue */
    .light-mode .bg-purple-600\\/20, .light-mode .bg-purple-600\\/10,
    .light-mode .bg-indigo-600\\/20, .light-mode .bg-pink-600\\/20,
    .light-mode .bg-blue-600\\/20,   .light-mode .bg-cyan-600\\/20,
    .light-mode .bg-orange-600\\/20  { background: var(--bl-tint) !important; }
    .light-mode .bg-purple-600\\/30  { background: var(--bl-tint2) !important; }

    /* semantic tinted bgs preserved */
    .light-mode .bg-green-500\\/20, .light-mode .bg-green-600\\/20 { background: #dcfce7 !important; }
    .light-mode .bg-yellow-500\\/20, .light-mode .bg-yellow-600\\/20 { background: #fef9c3 !important; }
    .light-mode .bg-red-500\\/20, .light-mode .bg-red-600\\/20     { background: #fee2e2 !important; }
    .light-mode .bg-blue-500\\/20                                   { background: var(--bl-tint) !important; }

    /* borders → blue */
    .light-mode .border-purple-500, .light-mode .border-purple-600 { border-color: var(--bl) !important; }
    .light-mode .border-purple-600\\/30, .light-mode .border-indigo-600\\/30 { border-color: rgba(14,165,233,0.30) !important; }

    /* ALL gradients → solid blue */
    .light-mode [class*="bg-gradient-to-r"],
    .light-mode [class*="bg-gradient-to-br"],
    .light-mode [class*="bg-gradient-to-b"] { background: var(--bl) !important; }

    /* soft tint overrides */
    .light-mode .bg-gradient-to-r.from-purple-600\\/20.to-pink-600\\/20,
    .light-mode .bg-gradient-to-br.from-purple-600\\/20.to-pink-600\\/20,
    .light-mode .bg-gradient-to-br.from-indigo-600\\/20.to-purple-600\\/20,
    .light-mode .bg-gradient-to-b.from-purple-50\\/50.to-transparent { background: var(--bl-tint) !important; }

    /* semantic solid gradients preserved */
    .light-mode .bg-gradient-to-r.from-green-500.to-emerald-500,
    .light-mode .bg-gradient-to-r.from-green-600.to-emerald-600,
    .light-mode .bg-gradient-to-br.from-green-600.to-emerald-600 { background: #16a34a !important; }
    .light-mode .bg-gradient-to-r.from-yellow-500.to-orange-500,
    .light-mode .bg-gradient-to-r.from-yellow-600.to-orange-600  { background: #b45309 !important; }
    .light-mode .bg-gradient-to-r.from-red-500.to-pink-500,
    .light-mode .bg-gradient-to-r.from-red-600.to-pink-600       { background: #dc2626 !important; }

    /* bottom nav */
    .light-mode .lm-bottom-nav {
      background: rgba(255,255,255,0.97) !important;
      border-color: var(--bl-border) !important;
      box-shadow: 0 -4px 24px rgba(14,165,233,0.10) !important;
    }
    .light-mode .lm-nav-active {
      color: var(--bl) !important;
      -webkit-text-fill-color: var(--bl) !important;
    }

    /* back button */
    .light-mode .lm-back-btn       { color: var(--bl) !important; }
    .light-mode .lm-back-btn:hover { color: var(--bl-dark) !important; }

    /* inputs */
    .light-mode input, .light-mode textarea, .light-mode select {
      background: #f8fbff !important;
      border-color: var(--bl-border) !important;
      color: var(--tx-h) !important;
    }
    .light-mode input::placeholder, .light-mode textarea::placeholder { color: var(--tx-mute) !important; }
    .light-mode input:focus, .light-mode textarea:focus, .light-mode select:focus {
      border-color: var(--bl) !important;
      box-shadow: 0 0 0 3px rgba(14,165,233,0.15) !important;
    }

    /* inputs inside a pill wrapper — no background/border of their own */
    .light-mode .rounded-full input {
      background: transparent !important;
      border: none !important;
      box-shadow: none !important;
      padding: 0 !important;
    }
    .light-mode .rounded-full input:focus {
      border: none !important;
      box-shadow: none !important;
    }

    /* search bar */
    .light-mode .rounded-full.backdrop-blur-xl {
      background: rgba(255,255,255,0.97) !important;
      border-color: var(--bl-border) !important;
    }

    /* dropdown overlays */
    .light-mode [style*="rgba(10,8,25"]  { background: #ffffff !important; }
    .light-mode [style*="rgba(10,10,20"] { background: #ffffff !important; }

    /* hover states */
    .light-mode .hover\\:bg-white\\/10:hover   { background: var(--bl-tint) !important; }
    .light-mode .hover\\:text-purple-400:hover { color: var(--bl-dark) !important; }
  `;

  // Extra global CSS for smooth mobile transitions
  const GLOBAL_CSS = `
    /* prevent horizontal scroll during slide animations */
    body, #root { overflow: hidden; height: 100%; }

    /* momentum scrolling on iOS */
    .overflow-y-auto { -webkit-overflow-scrolling: touch; }

    /* hardware-accelerated slides */
    [data-framer-motion-slide] { will-change: transform; backface-visibility: hidden; }

    /* remove tap highlight on mobile */
    * { -webkit-tap-highlight-color: transparent; }

    /* smooth momentum for scrollable areas */
    .h-full.overflow-y-auto { scroll-behavior: smooth; }

    /* prevent any child from breaking out of the viewport */
    .overflow-y-auto > * { max-width: 100%; }
    .rounded-2xl { overflow: hidden; }

    /* grid cells never exceed their column */
    .grid > * { min-width: 0; overflow: hidden; }
  `;

  return (
    <div className={`w-full h-full max-w-[1920px] mx-auto overflow-hidden relative ${
      darkMode
        ? 'bg-gradient-to-b from-[#0a0a0f] via-[#0f0a1f] to-[#0a0a0f]'
        : 'light-mode'
    }`}>
      <style dangerouslySetInnerHTML={{ __html: LM + GLOBAL_CSS }} />

      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {darkMode ? (
          <>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </>
        ) : (
          <>
            <div className="absolute -top-32 -left-32 w-[480px] h-[480px] rounded-full blur-3xl animate-pulse"
              style={{ background: 'radial-gradient(circle, rgba(14,165,233,0.18) 0%, transparent 70%)' }} />
            <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full blur-3xl animate-pulse"
              style={{ background: 'radial-gradient(circle, rgba(56,189,248,0.13) 0%, transparent 70%)', animationDelay: '1.4s' }} />
          </>
        )}
      </div>

      <div
        className="relative z-10 w-full h-full"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {isLoading ? (
          <LoadingScreen darkMode={darkMode} />
        ) : (
          <AnimatePresence mode="popLayout" custom={navDir}>
            <motion.div
              key={currentScreen}
              custom={navDir}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={slideTransition}
              className="absolute inset-0 w-full h-full"
              style={{ willChange: 'transform' }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        )}
      </div>

      {!isLoading && <BottomNav activeTab={activeTab} onTabChange={handleTabChange} darkMode={darkMode} />}
      <ToastProvider darkMode={darkMode} />
    </div>
  );
}