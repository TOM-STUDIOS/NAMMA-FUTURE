import { GlassCard } from './GlassCard';
import { motion } from 'motion/react';
import {
  Zap,
  Droplet,
  Briefcase,
  AlertCircle,
  TrendingUp,
  Users,
  MapPin,
  FileText,
  GraduationCap,
  Heart,
  Wallet,
  Building2,
} from 'lucide-react';

interface HomeScreenProps {
  onNavigate?: (screen: string) => void;
  darkMode?: boolean;
}

export function HomeScreen({ onNavigate, darkMode = true }: HomeScreenProps = {}) {
  const quickActions = [
    { icon: Zap, label: 'Electricity', labelTa: 'மின் கட்டணம்', color: 'from-yellow-500 to-orange-500', value: '₹1,234', screen: 'electricity' },
    { icon: Droplet, label: 'Water', labelTa: 'தண்ணீர்', color: 'from-blue-500 to-cyan-500', value: '₹156', screen: 'water' },
    { icon: Briefcase, label: 'Transport', labelTa: 'போக்குவரத்து', color: 'from-indigo-500 to-purple-500', value: '₹300', screen: 'transport' },
    { icon: GraduationCap, label: 'Fees', labelTa: 'கல்விக் கட்டணம்', color: 'from-green-500 to-emerald-500', value: '₹2,500', screen: 'education' },
  ];

  const services = [
    { icon: FileText, label: 'Schemes', labelTa: 'திட்டங்கள்', desc: 'Government Benefits', screen: 'schemes' },
    { icon: Users, label: 'Constituency', labelTa: 'தொகுதி', desc: 'Track Development', screen: 'constituency' },
    { icon: GraduationCap, label: 'Education', labelTa: 'கல்வி', desc: 'Student Portal', screen: 'education' },
    { icon: Heart, label: 'Healthcare', labelTa: 'மருத்துவம்', desc: 'Book Appointments', screen: 'healthcare' },
    { icon: Wallet, label: 'Wallet', labelTa: 'பணப்பை', desc: 'Digital Payments', screen: 'wallet' },
    { icon: Building2, label: 'Smart City', labelTa: 'ஸ்மார்ட் நகரம்', desc: 'Live Status', screen: 'smartcities' },
  ];

  const stats = [
    { label: 'Budget Spent', value: '₹45.2K Cr', change: '+12%', trend: 'up' },
    { label: 'Active Projects', value: '1,247', change: '+8%', trend: 'up' },
    { label: 'Citizens Served', value: '8.2M', change: '+15%', trend: 'up' },
  ];

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="mb-1">
          <span className={darkMode
            ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent'
            : 'text-sky-500'
          }>
            Vanakkam
          </span>{' '}
          <span className={darkMode ? 'text-white' : 'text-slate-900'}>karthick</span>
        </h1>
        <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>வணக்கம் | Future Tamil Nadu • Namma Future</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {quickActions.map((action, idx) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard className="relative overflow-hidden cursor-pointer" onClick={() => onNavigate?.(action.screen)}>
                <div
                  className={darkMode ? `absolute inset-0 bg-gradient-to-br ${action.color} opacity-10` : ''}
                  style={!darkMode ? { position: 'absolute', inset: 0, backgroundColor: '#38bdf8', opacity: 0.05 } : {}}
                />
                <div className="relative z-10">
                  <div
                    className={darkMode ? `w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center mb-3` : 'w-12 h-12 rounded-xl flex items-center justify-center mb-3'}
                    style={!darkMode ? { backgroundColor: '#38bdf8' } : {}}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white mb-1">{action.label}</div>
                  <div className="text-gray-400" style={{ fontSize: '12px' }}>
                    {action.labelTa}
                  </div>
                  {action.value && (
                    <div className="text-purple-400 mt-2">{action.value}</div>
                  )}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <GlassCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white mb-1">Tamil Nadu Live</h3>
              <p className="text-gray-400" style={{ fontSize: '12px' }}>
                Real-time State Statistics
              </p>
            </div>
            <TrendingUp className="w-6 h-6 text-green-400" />
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center min-w-0">
                <div className="text-purple-400 mb-1 truncate" style={{ fontSize: 'clamp(12px,3vw,16px)' }}>{stat.value}</div>
                <div className="text-gray-400 truncate" style={{ fontSize: '11px' }}>
                  {stat.label}
                </div>
                <div className="text-green-400 mt-0.5" style={{ fontSize: '11px' }}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white">Quick Services</h3>
          <span className="text-purple-400" style={{ fontSize: '12px' }}>
            View All
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.05 }}
              >
                <GlassCard onClick={() => onNavigate?.(service.screen)}>
                  <div className="flex items-start gap-3">
                    <div 
                      className={darkMode ? 'w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center flex-shrink-0' : 'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0'}
                      style={!darkMode ? { backgroundColor: '#eff6ff' } : {}}
                    >
                      <Icon className={darkMode ? 'w-5 h-5 text-purple-400' : 'w-5 h-5 text-blue-600'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white mb-1">{service.label}</div>
                      <div className="text-gray-400" style={{ fontSize: '11px' }}>
                        {service.labelTa}
                      </div>
                      <div className="text-gray-500 mt-1" style={{ fontSize: '11px' }}>
                        {service.desc}
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mb-6"
      >
        <GlassCard className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/10 to-purple-600/10" />
          <div className="relative z-10 flex items-center gap-3">
            <MapPin className="w-8 h-8 text-purple-400" />
            <div className="flex-1">
              <div className="text-white mb-1">Future Tamil Nadu Initiative</div>
              <div className="text-gray-400" style={{ fontSize: '12px' }}>
                People First • Youth First • Future First
              </div>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}