import { GlassCard } from './GlassCard';
import { motion } from 'motion/react';
import {
  FileText,
  Users,
  GraduationCap,
  Heart,
  Wallet,
  Building2,
  MapPin,
  AlertCircle,
  Zap,
  Droplet,
  Bus,
  Car,
  ShoppingBag,
  Home,
  Briefcase,
  Shield,
  Phone,
  MessageSquare,
  Camera,
  TrendingUp,
} from 'lucide-react';

interface ServicesScreenProps {
  onNavigate: (screen: string) => void;
  darkMode?: boolean;
}

export function ServicesScreen({ onNavigate, darkMode = true }: ServicesScreenProps) {
  const services = [
    { icon: FileText,     label: 'Schemes',      labelTa: 'திட்டங்கள்',        screen: 'schemes',      color: 'from-purple-600 to-purple-400', bg: '#7c3aed' },
    { icon: Users,        label: 'Constituency', labelTa: 'தொகுதி',            screen: 'constituency', color: 'from-blue-600 to-blue-400',     bg: '#2563eb' },
    { icon: GraduationCap,label: 'Education',    labelTa: 'கல்வி',             screen: 'education',    color: 'from-green-600 to-green-400',   bg: '#16a34a' },
    { icon: Heart,        label: 'Healthcare',   labelTa: 'மருத்துவம்',        screen: 'healthcare',   color: 'from-red-600 to-red-400',       bg: '#dc2626' },
    { icon: Wallet,       label: 'Wallet',       labelTa: 'பணப்பை',            screen: 'wallet',       color: 'from-yellow-600 to-yellow-400', bg: '#d97706' },
    { icon: Building2,    label: 'Smart Cities', labelTa: 'ஸ்மார்ட் நகரம்',   screen: 'smartcities',  color: 'from-cyan-600 to-cyan-400',     bg: '#0891b2' },
    { icon: MapPin,       label: 'Districts',    labelTa: 'மாவட்டங்கள்',       screen: 'districts',    color: 'from-pink-600 to-pink-400',     bg: '#db2777' },
    { icon: AlertCircle,  label: 'Complaints',   labelTa: 'புகார்கள்',         screen: 'complaints',   color: 'from-orange-600 to-orange-400', bg: '#ea580c' },
    { icon: Zap,          label: 'Electricity',  labelTa: 'மின்சாரம்',         screen: 'electricity',  color: 'from-yellow-500 to-orange-500', bg: '#f59e0b' },
    { icon: Droplet,      label: 'Water Supply', labelTa: 'தண்ணீர்',           screen: 'water',        color: 'from-blue-500 to-cyan-500',     bg: '#0284c7' },
    { icon: Bus,          label: 'Transport',    labelTa: 'போக்குவரத்து',      screen: 'transport',    color: 'from-indigo-600 to-indigo-400', bg: '#4338ca' },
    { icon: Car,          label: 'Vehicles',     labelTa: 'வாகனங்கள்',         screen: 'vehicles',     color: 'from-gray-600 to-gray-400',     bg: '#4b5563' },
    { icon: ShoppingBag,  label: 'Ration',       labelTa: 'ரேஷன்',            screen: 'ration',       color: 'from-green-500 to-emerald-500', bg: '#059669' },
    { icon: Home,         label: 'Housing',      labelTa: 'வீட்டு வசதி',       screen: 'housing',      color: 'from-amber-600 to-amber-400',   bg: '#b45309' },
    { icon: Briefcase,    label: 'Jobs',         labelTa: 'வேலைகள்',           screen: 'jobs',         color: 'from-purple-500 to-pink-500',   bg: '#9333ea' },
    { icon: Shield,       label: 'Police',       labelTa: 'காவல்துறை',         screen: 'police',       color: 'from-blue-800 to-blue-600',     bg: '#1e40af' },
    { icon: Phone,        label: 'Emergency',    labelTa: 'அவசர உதவி',         screen: 'emergency',    color: 'from-red-600 to-pink-600',      bg: '#e11d48' },
    { icon: MessageSquare,label: 'Helpdesk',     labelTa: 'உதவி மையம்',        screen: 'helpdesk',     color: 'from-teal-600 to-teal-400',     bg: '#0d9488' },
    { icon: Camera,       label: 'CCTV',         labelTa: 'CCTV',              screen: 'cctv',         color: 'from-slate-600 to-slate-400',   bg: '#475569' },
    { icon: TrendingUp,   label: 'Analytics',    labelTa: 'பகுப்பாய்வு',       screen: 'analytics',    color: 'from-violet-600 to-violet-400', bg: '#7c3aed' },
  ];

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-white mb-1">All Services</h1>
        <p className="text-gray-400">அனைத்து சேவைகள்</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.02 }}
            >
              <GlassCard onClick={() => onNavigate(service.screen)}>
                <div
                  className={darkMode
                    ? `w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-3`
                    : 'w-12 h-12 rounded-xl flex items-center justify-center mb-3'}
                  style={!darkMode ? { backgroundColor: service.bg } : {}}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-white mb-1" style={{ fontSize: '13px', fontWeight: 500 }}>{service.label}</div>
                <div className="text-gray-400" style={{ fontSize: '11px' }}>
                  {service.labelTa}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}