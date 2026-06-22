import { motion } from 'motion/react';
import { Home, Sparkles, Grid3x3, BarChart3, User, Sun, Moon, ChevronRight } from 'lucide-react';

interface SideNavProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

const tabs = [
  { id: 'home',      icon: Home,     label: 'Home',      labelTa: 'முகப்பு'      },
  { id: 'ai',        icon: Sparkles,  label: 'AI',        labelTa: 'AI உதவியாளர்' },
  { id: 'services',  icon: Grid3x3,  label: 'Services',  labelTa: 'சேவைகள்'      },
  { id: 'dashboard', icon: BarChart3, label: 'Dashboard', labelTa: 'கட்டுப்பாடு'  },
  { id: 'profile',   icon: User,     label: 'Profile',   labelTa: 'சுயவிவரம்'    },
];

export function SideNav({ activeTab, onTabChange, darkMode, onDarkModeToggle }: SideNavProps) {
  return (
    <aside
      className="hidden lg:flex flex-col h-full flex-shrink-0 z-40"
      style={{
        width: 240,
        borderRight: darkMode ? '1px solid rgba(255,255,255,0.07)' : '1px solid #bae6fd',
        background: darkMode ? 'rgba(10,10,20,0.80)' : 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* Logo */}
      <div className="px-6 py-6 border-b" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.07)' : '#bae6fd' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: darkMode ? 'linear-gradient(135deg,#a855f7,#ec4899)' : '#0ea5e9' }}
          >
            <span style={{ color: '#fff', fontWeight: 900, fontSize: 14 }}>NF</span>
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: 15, color: darkMode ? '#fff' : '#0c1a2e', letterSpacing: '0.04em' }}>
              NAMMA FUTURE
            </div>
            <div style={{ fontSize: 10, color: darkMode ? '#a78bfa' : '#38bdf8', letterSpacing: '0.12em' }}>
              TN DIGITAL SERVICES
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.97 }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left relative"
              style={{
                background: isActive
                  ? darkMode ? 'rgba(168,85,247,0.15)' : 'rgba(14,165,233,0.10)'
                  : 'transparent',
                border: isActive
                  ? darkMode ? '1px solid rgba(168,85,247,0.30)' : '1px solid rgba(14,165,233,0.25)'
                  : '1px solid transparent',
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full"
                  style={{ background: darkMode ? '#a855f7' : '#0ea5e9' }}
                />
              )}
              <Icon
                className="w-5 h-5 flex-shrink-0"
                style={{ color: isActive ? (darkMode ? '#a855f7' : '#0ea5e9') : darkMode ? '#9ca3af' : '#64748b' }}
              />
              <div className="flex-1 min-w-0">
                <div style={{
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? (darkMode ? '#ffffff' : '#0c1a2e') : darkMode ? '#d1d5db' : '#374151',
                }}>
                  {tab.label}
                </div>
                <div style={{ fontSize: 10, color: darkMode ? '#6b7280' : '#94a3b8' }}>
                  {tab.labelTa}
                </div>
              </div>
              {isActive && (
                <ChevronRight className="w-3 h-3 flex-shrink-0" style={{ color: darkMode ? '#a855f7' : '#0ea5e9' }} />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t" style={{ borderColor: darkMode ? 'rgba(255,255,255,0.07)' : '#bae6fd' }}>
        <button
          onClick={onDarkModeToggle}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(14,165,233,0.06)',
            border: darkMode ? '1px solid rgba(255,255,255,0.08)' : '1px solid #bae6fd',
          }}
        >
          {darkMode
            ? <Sun className="w-4 h-4" style={{ color: '#fbbf24' }} />
            : <Moon className="w-4 h-4" style={{ color: '#0ea5e9' }} />
          }
          <span style={{ fontSize: 13, color: darkMode ? '#d1d5db' : '#374151' }}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
          <div
            className="ml-auto w-9 h-5 rounded-full flex items-center px-0.5 transition-colors"
            style={{ background: darkMode ? '#a855f7' : '#0ea5e9' }}
          >
            <div
              className="w-4 h-4 bg-white rounded-full transition-transform shadow-sm"
              style={{ transform: darkMode ? 'translateX(16px)' : 'translateX(0)' }}
            />
          </div>
        </button>

        <div
          className="mt-3 px-4 py-3 rounded-xl"
          style={{
            background: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(14,165,233,0.05)',
            border: darkMode ? '1px solid rgba(255,255,255,0.06)' : '1px solid #bae6fd',
          }}
        >
          <div style={{ fontSize: 11, color: darkMode ? '#6b7280' : '#94a3b8', marginBottom: 2 }}>Signed in as</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: darkMode ? '#e5e7eb' : '#0c1a2e' }}>karthick</div>
          <div style={{ fontSize: 10, color: darkMode ? '#a78bfa' : '#38bdf8' }}>Future TN Citizen</div>
        </div>
      </div>
    </aside>
  );
}
