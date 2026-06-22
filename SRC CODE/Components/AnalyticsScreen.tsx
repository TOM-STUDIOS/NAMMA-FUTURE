import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Users, DollarSign, Building2, Activity } from 'lucide-react';

interface AnalyticsScreenProps {
  darkMode?: boolean;
  onBack?: () => void;
}

export function AnalyticsScreen({ onBack, darkMode = true }: AnalyticsScreenProps = {}) {
  const cityStats = [
    { label: 'Population', value: '1.2 Cr', change: '+2.3%', icon: Users, color: 'text-blue-400' },
    { label: 'Budget Utilization', value: '78%', change: '+12%', icon: DollarSign, color: 'text-green-400' },
    { label: 'Active Projects', value: '2,847', change: '+156', icon: Building2, color: 'text-purple-400' },
    { label: 'Service Requests', value: '45.2K', change: '+8.5%', icon: Activity, color: 'text-yellow-400' },
  ];

  const departmentData = [
    { dept: 'Healthcare', budget: 2400, spent: 1890, percentage: 79 },
    { dept: 'Education', budget: 3200, spent: 2560, percentage: 80 },
    { dept: 'Infrastructure', budget: 5600, spent: 4480, percentage: 80 },
    { dept: 'Welfare', budget: 1800, spent: 1260, percentage: 70 },
  ];

  const serviceUsage = [
    { service: 'Electricity', users: '8.5M', trend: '+12%' },
    { service: 'Water Supply', users: '7.2M', trend: '+8%' },
    { service: 'Transport', users: '5.8M', trend: '+15%' },
    { service: 'Healthcare', users: '4.2M', trend: '+22%' },
  ];

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-white mb-1">City Analytics</h1>
        <p className="text-gray-400">நகர பகுப்பாய்வு | Real-time Data & Insights</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
        <GlassCard className="bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="flex items-center gap-3 mb-3">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            <div>
              <h2 className="text-white mb-1">Future TN Dashboard</h2>
              <p className="text-gray-400" style={{ fontSize: '12px' }}>Last updated: 5 minutes ago</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-6">
        <h3 className="text-white mb-3">Key Metrics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cityStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <GlassCard key={stat.label}>
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${stat.color} flex-shrink-0`} />
                  <div className={`flex items-center gap-1 flex-shrink-0 ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`} style={{ fontSize: '11px' }}>
                    <TrendingUp className="w-3 h-3" />
                    {stat.change}
                  </div>
                </div>
                <div className={`mb-1 ${stat.color}`} style={{ fontSize: 'clamp(16px,4vw,24px)', fontWeight: 700 }}>{stat.value}</div>
                <div className="text-gray-400 truncate" style={{ fontSize: '11px' }}>{stat.label}</div>
              </GlassCard>
            );
          })}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
        <h3 className="text-white mb-3">Budget Utilization by Department</h3>
        <div className="space-y-3">
          {departmentData.map((dept) => (
            <GlassCard key={dept.dept}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-white">{dept.dept}</h4>
                <span className="text-purple-400">{dept.percentage}%</span>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-gray-400" style={{ fontSize: '11px' }}>
                  Budget: ₹{dept.budget}Cr
                </div>
                <div className="text-green-400" style={{ fontSize: '11px' }}>
                  Spent: ₹{dept.spent}Cr
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${dept.percentage}%` }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.8 }}
                  className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                />
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6">
        <h3 className="text-white mb-3">Service Usage Analytics</h3>
        <div className="space-y-3">
          {serviceUsage.map((service) => (
            <GlassCard key={service.service}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white mb-1">{service.service}</h4>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-blue-400" />
                      <span className="text-blue-400" style={{ fontSize: '11px' }}>{service.users} users</span>
                    </div>
                    <div className="flex items-center gap-1 text-green-400" style={{ fontSize: '11px' }}>
                      <TrendingUp className="w-3 h-3" />
                      {service.trend}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-white mb-3">Performance Indicators</h3>
        <GlassCard>
          <div className="space-y-4">
            {[
              { label: 'Citizen Satisfaction', value: 92, color: 'from-green-600 to-emerald-600' },
              { label: 'Service Efficiency', value: 85, color: 'from-blue-600 to-cyan-600' },
              { label: 'Digital Adoption', value: 78, color: 'from-purple-600 to-pink-600' },
              { label: 'Response Time', value: 88, color: 'from-yellow-600 to-orange-600' },
            ].map((indicator) => (
              <div key={indicator.label}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400" style={{ fontSize: '12px' }}>{indicator.label}</span>
                  <span className="text-white font-bold">{indicator.value}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${indicator.value}%` }}
                    transition={{ delay: 0.4 + idx * 0.1, duration: 0.8 }}
                    className={`h-full bg-gradient-to-r ${indicator.color} rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
