import { Home, Sparkles, Grid3x3, BarChart3, User } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  darkMode?: boolean;
}

export function BottomNav({ activeTab, onTabChange, darkMode = true }: BottomNavProps) {
  const tabs = [
    { id: 'home',      icon: Home,     label: 'Home',      labelTa: 'முகப்பு'     },
    { id: 'ai',        icon: Sparkles,  label: 'AI',        labelTa: 'AI'           },
    { id: 'services',  icon: Grid3x3,  label: 'Services',  labelTa: 'சேவைகள்'     },
    { id: 'dashboard', icon: BarChart3, label: 'Dashboard', labelTa: 'கட்டுப்பாடு' },
    { id: 'profile',   icon: User,     label: 'Profile',   labelTa: 'சுயவிவரம்'    },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 backdrop-blur-xl border-t pb-safe z-40 lm-bottom-nav ${
      darkMode ? 'bg-black/80 border-white/10' : ''
    }`}>
      <div className="flex justify-around items-center h-16 sm:h-20 px-2 sm:px-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className="flex flex-col items-center justify-center gap-1 relative"
            >
              {isActive && !darkMode && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-blue-500 to-pink-500"
                />
              )}

              <div className={`transition-all duration-300 ${
                isActive
                  ? darkMode ? 'text-purple-400 scale-110' : 'scale-110'
                  : darkMode ? 'text-gray-400' : 'text-slate-400'
              }`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>

              <span className={`transition-all duration-300 font-medium text-[9px] sm:text-[10px] ${
                isActive
                  ? darkMode ? 'text-purple-400' : 'lm-nav-active'
                  : darkMode ? 'text-gray-400' : 'text-slate-400'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
