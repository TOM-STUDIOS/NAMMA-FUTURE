import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { motion } from 'motion/react';
import {
  MapPin,
  Users,
  DollarSign,
  Building2,
  GraduationCap,
  Heart,
  TrendingUp,
  TrendingDown,
  Activity,
  CheckCircle,
  Clock,
  Zap,
  Droplet,
  Bus,
  Home,
  Briefcase
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, LineChart, Line } from 'recharts';

interface District {
  id: number;
  name: string;
  nameTa: string;
  population: number;
  area: number;
  budget: number;
  spent: number;
  projects: number;
  literacy: number;
  hospitals: number;
}

interface DistrictDetailScreenProps {
  district: District;
  onBack: () => void;
  darkMode?: boolean;
}

// Generate deterministic but varied data seeded from district id
function seeded(id: number, salt: number, min: number, max: number) {
  const x = Math.sin(id * 9301 + salt * 49297 + 233995) * 10000;
  return min + Math.floor((x - Math.floor(x)) * (max - min + 1));
}

const DISTRICT_PROJECT_THEMES: Record<string, string[]> = {
  Chennai: ['Metro Rail Phase-4', 'Smart City Corridor', 'Coastal Road', 'IT Expressway', 'Flood Drain Upgrade'],
  Coimbatore: ['Textile Park Expansion', 'Ring Road', 'Smart Water Grid', 'Solar Rooftop Mission', 'Airport Expansion'],
  Madurai: ['Heritage Corridor', 'Ring Road Phase-2', 'IT Hub', 'Smart Healthcare Node', 'River Restoration'],
  Tiruchirappalli: ['SIPCOT Expansion', 'Cauvery Embankment', 'Smart Bus Stand', 'Skill Dev Centre', 'Digital Health Hub'],
  Salem: ['Steel Corridor', 'Agri Market Upgrade', 'NH Bypass', 'Solar Farm', 'Smart School Grid'],
  Tirunelveli: ['Thoothukudi Port Link', 'Windfarm Grid', 'Tamirabarani River Front', 'MSME Park', 'Smart Hospital'],
  Tiruppur: ['Textile Cluster Upgrade', 'Water Recycling Plant', 'Bypass Road', 'Export Hub', 'Solar Textile Park'],
  Vellore: ['Medical Tourism Hub', 'SIPCOT Phase-3', 'Palar Riverfront', 'NH Upgrade', 'Smart Waste Plant'],
  Erode: ['Textile Dyeing Park', 'Cauvery Canal Upgrade', 'Agri Logistics Hub', 'Smart Grid', 'NH Bypass'],
  Thoothukkudi: ['Port Expansion', 'Solar Farm', 'Fishing Harbour', 'Desalination Plant', 'NH Coastal Road'],
  Default: ['Road Widening Project', 'Solar Street Lights', 'Water Treatment Plant', 'Digital Health Centre', 'Skill Dev Hub'],
};

function getProjectTheme(name: string) {
  return DISTRICT_PROJECT_THEMES[name] || DISTRICT_PROJECT_THEMES.Default;
}

const tooltipStyle = {
  background: 'rgba(10, 10, 20, 0.95)',
  border: '1px solid rgba(168, 85, 247, 0.3)',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '12px',
};

const tooltipItemStyle = { color: '#ffffff' };
const tooltipLabelStyle = { color: '#e2e8f0', fontWeight: '600' };

export function DistrictDetailScreen({ district, onBack, darkMode = true }: DistrictDetailScreenProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'projects'>('overview');

  const id = district.id;

  // Budget allocation with slight per-district variation
  const eduPct   = 0.22 + seeded(id, 1, 0, 6) / 100;
  const healthPct = 0.17 + seeded(id, 2, 0, 5) / 100;
  const infraPct  = 0.28 + seeded(id, 3, 0, 6) / 100;
  const welfarePct = 0.13 + seeded(id, 4, 0, 5) / 100;
  const othersPct = Math.max(0.05, 1 - eduPct - healthPct - infraPct - welfarePct);

  const budgetData = [
    { id: 'education',      name: 'Education',      value: Math.floor(district.budget * eduPct),    color: '#a855f7', fill: '#a855f7' },
    { id: 'healthcare',     name: 'Healthcare',     value: Math.floor(district.budget * healthPct), color: '#ec4899', fill: '#ec4899' },
    { id: 'infrastructure', name: 'Infrastructure', value: Math.floor(district.budget * infraPct),  color: '#8b5cf6', fill: '#8b5cf6' },
    { id: 'welfare',        name: 'Welfare',        value: Math.floor(district.budget * welfarePct),color: '#d946ef', fill: '#d946ef' },
    { id: 'others',         name: 'Others',         value: Math.floor(district.budget * othersPct), color: '#f472b6', fill: '#f472b6' },
  ];

  const spentPct = Math.round((district.spent / district.budget) * 100);
  const monthlyProgress = [
    { id: 'jan', month: 'Jan', spent: Math.round(spentPct * 0.18) },
    { id: 'feb', month: 'Feb', spent: Math.round(spentPct * 0.30) },
    { id: 'mar', month: 'Mar', spent: Math.round(spentPct * 0.46) },
    { id: 'apr', month: 'Apr', spent: Math.round(spentPct * 0.60) },
    { id: 'may', month: 'May', spent: Math.round(spentPct * 0.78) },
    { id: 'jun', month: 'Jun', spent: spentPct },
  ];

  const serviceUptimes = [
    seeded(id, 10, 88, 99),
    seeded(id, 11, 85, 98),
    seeded(id, 12, 82, 97),
    seeded(id, 13, 80, 95),
    seeded(id, 14, 78, 96),
    seeded(id, 15, 86, 99),
  ];

  const services = [
    { icon: Zap,      name: 'Electricity',  status: 'Active', users: Math.floor(district.population / 5),  color: 'text-yellow-400', uptime: serviceUptimes[0] },
    { icon: Droplet,  name: 'Water Supply', status: 'Active', users: Math.floor(district.population / 4),  color: 'text-blue-400',   uptime: serviceUptimes[1] },
    { icon: Bus,      name: 'Transport',    status: 'Active', users: Math.floor(district.population / 10), color: 'text-green-400',  uptime: serviceUptimes[2] },
    { icon: Home,     name: 'Housing',      status: 'Active', users: Math.floor(district.population / 15), color: 'text-purple-400', uptime: serviceUptimes[3] },
    { icon: Briefcase,name: 'Employment',   status: 'Active', users: Math.floor(district.population / 20), color: 'text-cyan-400',   uptime: serviceUptimes[4] },
    { icon: Heart,    name: 'Healthcare',   status: 'Active', users: Math.floor(district.population / 8),  color: 'text-red-400',    uptime: serviceUptimes[5] },
  ];

  const projectNames = getProjectTheme(district.name);
  const projectStatuses = ['In Progress', 'Completed', 'In Progress', 'In Progress', 'Planning'] as const;
  const projectProgresses = [
    seeded(id, 20, 40, 80),
    100,
    seeded(id, 21, 30, 70),
    seeded(id, 22, 55, 90),
    seeded(id, 23, 10, 30),
  ];
  const projects = projectNames.map((name, i) => ({
    name,
    status: projectStatuses[i],
    progress: projectProgresses[i],
    budget: Math.floor(district.budget * [0.15, 0.05, 0.12, 0.08, 0.06][i]),
  }));

  const stats = [
    { icon: Users,        label: 'Population',     value: `${(district.population / 1000000).toFixed(2)}M`, trend: '+2.3%', up: true,  color: 'text-blue-400' },
    { icon: Building2,    label: 'Active Projects', value: district.projects,                                trend: '+12',   up: true,  color: 'text-green-400' },
    { icon: DollarSign,   label: 'Budget',          value: `₹${district.budget}Cr`,                         trend: '+8%',   up: true,  color: 'text-purple-400' },
    { icon: GraduationCap,label: 'Literacy',        value: `${district.literacy}%`,                         trend: '+1.2%', up: true,  color: 'text-yellow-400' },
  ];

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      <BackButton onBack={onBack} />

      {/* District Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <GlassCard className="relative overflow-hidden">
          <div
            className={darkMode ? 'absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-purple-600/20' : 'absolute inset-0'}
            style={!darkMode ? { backgroundColor: '#eff6ff' } : {}}
          />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className={darkMode ? 'w-6 h-6 text-purple-400' : 'w-6 h-6 text-sky-500'} />
                  <h1 className={darkMode ? 'text-white' : 'text-slate-900'}>{district.name} District</h1>
                </div>
                <p className="text-gray-400">{district.nameTa}</p>
              </div>
              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full" style={{ fontSize: '11px' }}>
                ✓ Active
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>Area</div>
                <div className={darkMode ? 'text-purple-400' : 'text-sky-500'}>{district.area.toLocaleString()} km²</div>
              </div>
              <div>
                <div className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>Hospitals</div>
                <div className={darkMode ? 'text-pink-400' : 'text-sky-500'}>{district.hospitals}</div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard>
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  {stat.up ? (
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <div className={`mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>{stat.label}</div>
                <div className={`${stat.up ? 'text-green-400' : 'text-red-400'}`} style={{ fontSize: '11px' }}>
                  {stat.trend}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto">
        {(['overview', 'services', 'projects'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              activeTab === tab
                ? (darkMode ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-sky-500 text-white')
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}
            style={{ fontSize: '12px' }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Budget Breakdown */}
          <GlassCard>
            <h3 className={darkMode ? 'text-white mb-4' : 'text-slate-900 mb-4'}>Budget Allocation</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={budgetData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  itemStyle={tooltipItemStyle}
                  labelStyle={tooltipLabelStyle}
                  formatter={(value: number, _name: string, props: { payload?: { name: string } }) => [
                    `₹${value}Cr`,
                    props.payload?.name ?? ''
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-1 gap-2 mt-4">
              {budgetData.map((item, idx) => (
                <div key={`budget-legend-${idx}`} className="flex items-center gap-2 justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                    <span className={darkMode ? 'text-gray-300' : 'text-gray-700'} style={{ fontSize: '12px', fontWeight: '500' }}>{item.name}</span>
                  </div>
                  <span className={darkMode ? 'text-white' : 'text-slate-900'} style={{ fontSize: '12px', fontWeight: '600' }}>₹{item.value}Cr</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Budget Utilization */}
          <GlassCard>
            <h3 className={darkMode ? 'text-white mb-4' : 'text-slate-900 mb-4'}>Budget Utilization (2026)</h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={monthlyProgress}>
                <XAxis
                  dataKey="month"
                  stroke={darkMode ? '#9ca3af' : '#64748b'}
                  style={{ fontSize: '11px' }}
                />
                <YAxis
                  stroke={darkMode ? '#9ca3af' : '#64748b'}
                  style={{ fontSize: '11px' }}
                  unit="%"
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={tooltipStyle}
                  itemStyle={tooltipItemStyle}
                  labelStyle={tooltipLabelStyle}
                  formatter={(value: number) => [`${value}%`, 'Budget Used']}
                />
                <Line
                  type="monotone"
                  dataKey="spent"
                  stroke={darkMode ? '#a855f7' : '#38bdf8'}
                  strokeWidth={2}
                  dot={{ fill: darkMode ? '#a855f7' : '#38bdf8' }}
                  name="Budget Used"
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-gray-400" style={{ fontSize: '11px' }}>Total Spent</span>
              <span className={darkMode ? 'text-purple-400' : 'text-sky-500'}>
                ₹{district.spent}Cr of ₹{district.budget}Cr ({spentPct}%)
              </span>
            </div>
          </GlassCard>
        </motion.div>
      )}

      {activeTab === 'services' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <GlassCard>
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={darkMode ? 'w-12 h-12 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center' : 'w-12 h-12 rounded-lg flex items-center justify-center'}
                      style={!darkMode ? { backgroundColor: '#eff6ff' } : {}}
                    >
                      <Icon className={service.color} />
                    </div>
                    <div className="flex-1">
                      <div className="text-white mb-1">{service.name}</div>
                      <div className="text-gray-400" style={{ fontSize: '11px' }}>
                        {service.users.toLocaleString()} active users
                      </div>
                    </div>
                    <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full" style={{ fontSize: '11px' }}>
                      {service.status}
                    </div>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={darkMode ? 'h-full bg-gradient-to-r from-purple-600 to-pink-600' : 'h-full bg-sky-500'}
                      style={{ width: `${service.uptime}%` }}
                    />
                  </div>
                  <div className="mt-2 text-gray-400 text-right" style={{ fontSize: '11px' }}>
                    {service.uptime}% uptime
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {activeTab === 'projects' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          {projects.map((project, idx) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <GlassCard>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-white mb-1">{project.name}</div>
                    <div className="text-gray-400 mb-2" style={{ fontSize: '11px' }}>
                      Budget: ₹{project.budget}Cr
                    </div>
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full ${
                      project.status === 'Completed'
                        ? 'bg-green-500/20 text-green-400'
                        : project.status === 'In Progress'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                    style={{ fontSize: '11px' }}
                  >
                    {project.status === 'Completed' && <CheckCircle className="w-3 h-3 inline mr-1" />}
                    {project.status === 'In Progress' && <Activity className="w-3 h-3 inline mr-1" />}
                    {project.status === 'Planning' && <Clock className="w-3 h-3 inline mr-1" />}
                    {project.status}
                  </div>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={darkMode ? 'h-full bg-gradient-to-r from-purple-600 to-pink-600' : 'h-full bg-sky-500'}
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-gray-400" style={{ fontSize: '11px' }}>Progress</span>
                  <span className={darkMode ? 'text-purple-400' : 'text-sky-500'} style={{ fontSize: '11px' }}>
                    {project.progress}%
                  </span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
