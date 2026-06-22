import { GlassCard } from './GlassCard';
import { motion } from 'motion/react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Users, MapPin, Zap, Droplet, Building2, DollarSign } from 'lucide-react';

interface DashboardScreenProps {
  darkMode?: boolean;
}

export function DashboardScreen({ darkMode = true }: DashboardScreenProps = {}) {
  const budgetData = [
    { id: 'education',      name: 'Education',      value: 45000, color: '#8b5cf6', fill: '#8b5cf6' },
    { id: 'health',         name: 'Health',          value: 32000, color: '#ef4444', fill: '#ef4444' },
    { id: 'infrastructure', name: 'Infrastructure',  value: 28000, color: '#fbbf24', fill: '#fbbf24' },
    { id: 'agriculture',    name: 'Agriculture',     value: 18000, color: '#10b981', fill: '#10b981' },
    { id: 'others',         name: 'Others',          value: 22000, color: '#06b6d4', fill: '#06b6d4' },
  ];

  const monthlyData = [
    { id: 'jan', month: 'Jan', projects: 45, budget: 120 },
    { id: 'feb', month: 'Feb', projects: 52, budget: 145 },
    { id: 'mar', month: 'Mar', projects: 58, budget: 165 },
    { id: 'apr', month: 'Apr', projects: 65, budget: 190 },
    { id: 'may', month: 'May', projects: 72, budget: 215 },
  ];

  const districtPerformance = [
    { id: 'chennai', district: 'Chennai', score: 95 },
    { id: 'coimbatore', district: 'Coimbatore', score: 92 },
    { id: 'madurai', district: 'Madurai', score: 88 },
    { id: 'trichy', district: 'Trichy', score: 85 },
    { id: 'salem', district: 'Salem', score: 82 },
  ];

  const liveStats = [
    { icon: DollarSign, label: 'Budget Spent', value: '₹45.2K Cr', change: '+12%', trend: 'up', color: 'text-purple-400' },
    { icon: MapPin, label: 'Active Projects', value: '1,247', change: '+8%', trend: 'up', color: 'text-blue-400' },
    { icon: Users, label: 'Citizens Served', value: '8.2M', change: '+15%', trend: 'up', color: 'text-green-400' },
    { icon: Building2, label: 'Complaints Resolved', value: '94.5%', change: '+3%', trend: 'up', color: 'text-yellow-400' },
    { icon: Zap, label: 'Power Generation', value: '12.5 GW', change: '-2%', trend: 'down', color: 'text-orange-400' },
    { icon: Droplet, label: 'Water Storage', value: '78%', change: '+5%', trend: 'up', color: 'text-cyan-400' },
  ];

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-white mb-1">Live Dashboard</h1>
        <p className="text-gray-400">நேரடி கட்டுப்பாடு | AI Governance Command Center</p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mb-6">
        {liveStats.map((stat, idx) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard>
                <div className="flex items-start justify-between mb-2">
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                  <div className={`flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    <TrendIcon className="w-3 h-3" />
                    <span style={{ fontSize: '11px' }}>{stat.change}</span>
                  </div>
                </div>
                <div className={`mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-400" style={{ fontSize: '11px' }}>
                  {stat.label}
                </div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <GlassCard>
          <h3 className="text-white mb-4">Budget Allocation</h3>
          <div className="space-y-3">
            {budgetData.map((item) => {
              const total = budgetData.reduce((s, d) => s + d.value, 0);
              const pct = Math.round((item.value / total) * 100);
              return (
                <div key={item.id}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                      <span className="text-gray-300" style={{ fontSize: '12px' }}>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-white" style={{ fontSize: '12px', fontWeight: 600 }}>₹{(item.value / 1000).toFixed(0)}K Cr</span>
                      <span className="text-gray-500" style={{ fontSize: '11px' }}>{pct}%</span>
                    </div>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.3, duration: 0.7 }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <GlassCard>
          <h3 className="text-white mb-4">Monthly Progress</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#9ca3af" />
              <YAxis stroke="#9ca3af" />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0,0,0,0.8)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                }}
              />
              <Line 
                type="monotone" 
                dataKey="projects" 
                stroke="#8b5cf6" 
                strokeWidth={2} 
                name="Projects"
              />
              <Line 
                type="monotone" 
                dataKey="budget" 
                stroke="#ef4444" 
                strokeWidth={2} 
                name="Budget"
              />
            </LineChart>
          </ResponsiveContainer>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <GlassCard>
          <h3 className="text-white mb-4">Top Performing Districts</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={districtPerformance} layout="vertical" margin={{ left: 0, right: 10, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis type="number" stroke="#9ca3af" style={{ fontSize: '11px' }} />
              <YAxis 
                dataKey="district" 
                type="category" 
                stroke="#9ca3af" 
                width={90} 
                style={{ fontSize: '11px' }}
                tick={{ fill: '#9ca3af' }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: darkMode ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.95)',
                  border: darkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(0,0,0,0.1)',
                  borderRadius: '8px',
                  color: darkMode ? '#fff' : '#000',
                  fontSize: '12px'
                }}
              />
              <Bar 
                dataKey="score" 
                fill={darkMode ? '#8b5cf6' : '#38bdf8'} 
                radius={[0, 8, 8, 0]} 
                name="Score" 
              />
            </BarChart>
          </ResponsiveContainer>
        </GlassCard>
      </motion.div>
    </div>
  );
}