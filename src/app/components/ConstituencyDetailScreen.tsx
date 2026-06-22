import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import {
  MapPin, User, DollarSign, TrendingUp, Construction, CheckCircle,
  Clock, Activity, Star, MessageSquare, ThumbsUp, AlertTriangle,
  BarChart2, FileText, ChevronRight, Award, Zap, Droplet, Bus, Home
} from 'lucide-react';
import {
  PieChart, Pie, Tooltip, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, LineChart, Line
} from 'recharts';

interface Constituency {
  id: number;
  name: string;
  district: string;
  mla: string;
  party: string;
  budget: number;
  spent: number;
  projects: number;
}

interface Props {
  constituency: Constituency;
  onBack: () => void;
  darkMode?: boolean;
}

function seeded(id: number, salt: number, min: number, max: number) {
  const x = Math.sin(id * 9301 + salt * 49297 + 233995) * 10000;
  return min + Math.floor((x - Math.floor(x)) * (max - min + 1));
}

const tooltipStyle = {
  background: 'rgba(10,10,20,0.95)',
  border: '1px solid rgba(168,85,247,0.3)',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '12px',
};
const itemStyle = { color: '#fff' };
const labelStyle = { color: '#e2e8f0', fontWeight: '600' };

const PARTY_COLORS: Record<string, string> = {
  TVK: '#a855f7',
  DMK: '#f59e0b',
  AIADMK: '#10b981',
  INC: '#3b82f6',
  BJP: '#ef4444',
  default: '#6366f1',
};

const PROJECT_THEMES: Record<string, string[]> = {
  Chennai: ['Smart Bus Shelter', 'Underground Drainage', 'Park Renovation', 'LED Street Lights', 'CCTV Surveillance'],
  Coimbatore: ['Ring Road', 'Water Treatment', 'Smart Market', 'Solar Street Lights', 'Skill Centre'],
  Madurai: ['Heritage Walk', 'Flood Drain', 'Smart Hospital Wing', 'Community Hall', 'Road Widening'],
  default: ['Road Widening', 'Stormwater Drain', 'Community Hall', 'Solar Street Lights', 'Digital Library'],
};

function getProjects(c: Constituency) {
  const names = PROJECT_THEMES[c.district] || PROJECT_THEMES.default;
  const statuses = ['Completed', 'In Progress', 'In Progress', 'Planning', 'Completed'] as const;
  const progs = [100, seeded(c.id, 30, 40, 80), seeded(c.id, 31, 20, 65), seeded(c.id, 32, 10, 35), 100];
  const budgets = [0.18, 0.22, 0.15, 0.12, 0.10].map(p => +(c.budget * p).toFixed(1));
  return names.map((name, i) => ({ name, status: statuses[i], progress: progs[i], budget: budgets[i] }));
}

export function ConstituencyDetailScreen({ constituency: c, onBack, darkMode = true }: Props) {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'feedback'>('overview');
  const [rating, setRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);

  const spentPct = Math.round((c.spent / c.budget) * 100);
  const partyColor = PARTY_COLORS[c.party] || PARTY_COLORS.default;
  const projects = getProjects(c);

  const budgetData = [
    { name: 'Roads',      value: +(c.budget * 0.30).toFixed(1), color: '#a855f7', fill: '#a855f7' },
    { name: 'Drainage',   value: +(c.budget * 0.20).toFixed(1), color: '#ec4899', fill: '#ec4899' },
    { name: 'Healthcare', value: +(c.budget * 0.18).toFixed(1), color: '#8b5cf6', fill: '#8b5cf6' },
    { name: 'Education',  value: +(c.budget * 0.15).toFixed(1), color: '#d946ef', fill: '#d946ef' },
    { name: 'Others',     value: +(c.budget * 0.17).toFixed(1), color: '#f472b6', fill: '#f472b6' },
  ];

  const monthlyData = [
    { month: 'Jan', spent: Math.round(spentPct * 0.15) },
    { month: 'Feb', spent: Math.round(spentPct * 0.28) },
    { month: 'Mar', spent: Math.round(spentPct * 0.44) },
    { month: 'Apr', spent: Math.round(spentPct * 0.58) },
    { month: 'May', spent: Math.round(spentPct * 0.76) },
    { month: 'Jun', spent: spentPct },
  ];

  const satisfactionScore = seeded(c.id, 50, 68, 95);
  const citizenFeedbacks = [
    { id: 1, name: 'Priya S.', text: 'Road work near temple street completed well. Smooth surface now!', rating: 5, time: '2 days ago', likes: seeded(c.id, 60, 5, 40) },
    { id: 2, name: 'Murugan K.', text: 'Water supply improved after new pipeline. Happy with the progress.', rating: 4, time: '1 week ago', likes: seeded(c.id, 61, 3, 25) },
    { id: 3, name: 'Lakshmi R.', text: 'Street lights installed in our area finally. Thank you MLA!', rating: 4, time: '2 weeks ago', likes: seeded(c.id, 62, 8, 35) },
    { id: 4, name: 'Selvam P.', text: 'Community hall construction still pending for 6 months.', rating: 2, time: '3 weeks ago', likes: seeded(c.id, 63, 2, 15) },
  ];

  const handleFeedbackSubmit = () => {
    if (rating === 0) { toast.error('Please select a rating'); return; }
    if (!feedbackText.trim()) { toast.error('Please enter your feedback'); return; }
    setFeedbackSubmitted(true);
    toast.success('Feedback Submitted ✅', { description: 'Thank you for your valuable feedback!' });
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      <BackButton onBack={onBack} />

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <GlassCard className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-purple-600/20" />
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-5 h-5 text-purple-400" />
                  <h1 className="text-white">{c.name}</h1>
                </div>
                <p className="text-gray-400" style={{ fontSize: '12px' }}>{c.district} District</p>
              </div>
              <div className="px-3 py-1 rounded-full text-white" style={{ backgroundColor: partyColor, fontSize: '11px' }}>
                {c.party}
              </div>
            </div>

            <div className="bg-white/5 rounded-lg p-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600/30 flex items-center justify-center">
                  <User className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-white">{c.mla}</div>
                  <div className="text-gray-400" style={{ fontSize: '11px' }}>MLA — {c.name} Constituency</div>
                </div>
                <div className="ml-auto flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-yellow-400" style={{ fontSize: '12px' }}>{(satisfactionScore / 20).toFixed(1)}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="min-w-0">
                <div className="text-purple-400 truncate" style={{ fontSize: 'clamp(11px,2.5vw,15px)' }}>₹{c.budget}Cr</div>
                <div className="text-gray-400" style={{ fontSize: '11px' }}>Budget</div>
              </div>
              <div className="min-w-0">
                <div className="text-green-400 truncate" style={{ fontSize: 'clamp(11px,2.5vw,15px)' }}>₹{c.spent}Cr</div>
                <div className="text-gray-400" style={{ fontSize: '11px' }}>Spent</div>
              </div>
              <div className="min-w-0">
                <div className="text-blue-400" style={{ fontSize: 'clamp(11px,2.5vw,15px)' }}>{c.projects}</div>
                <div className="text-gray-400" style={{ fontSize: '11px' }}>Projects</div>
              </div>
            </div>

            <div className="mt-3">
              <div className="flex justify-between mb-1">
                <span className="text-gray-400" style={{ fontSize: '11px' }}>Fund Utilization</span>
                <span className="text-white" style={{ fontSize: '11px' }}>{spentPct}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }} animate={{ width: `${spentPct}%` }} transition={{ duration: 0.8 }}
                  className={`h-full rounded-full ${spentPct >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : spentPct >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' : 'bg-gradient-to-r from-red-500 to-pink-500'}`}
                />
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Satisfaction Score */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {[
          { label: 'Citizen Score', value: `${satisfactionScore}%`, color: 'text-green-400', icon: ThumbsUp },
          { label: 'Completed', value: `${projects.filter(p => p.status === 'Completed').length}`, color: 'text-blue-400', icon: CheckCircle },
          { label: 'In Progress', value: `${projects.filter(p => p.status === 'In Progress').length}`, color: 'text-yellow-400', icon: Activity },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
              <GlassCard>
                <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className={`mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-400 truncate" style={{ fontSize: '11px' }}>{stat.label}</div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto">
        {(['overview', 'projects', 'feedback'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${activeTab === tab ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            style={{ fontSize: '12px' }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
          <GlassCard>
            <h3 className="text-white mb-4">Budget Breakdown</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={budgetData} cx="50%" cy="50%" innerRadius={35} outerRadius={65} paddingAngle={4} dataKey="value" />
                <Tooltip contentStyle={tooltipStyle} itemStyle={itemStyle} labelStyle={labelStyle} formatter={(v: number) => [`₹${v}Cr`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-2">
              {budgetData.map((item, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-300" style={{ fontSize: '12px' }}>{item.name}</span>
                  </div>
                  <span className="text-white" style={{ fontSize: '12px', fontWeight: 600 }}>₹{item.value}Cr</span>
                </div>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="text-white mb-4">Monthly Spending (2026)</h3>
            <ResponsiveContainer width="100%" height={140}>
              <LineChart data={monthlyData}>
                <XAxis dataKey="month" stroke="#9ca3af" style={{ fontSize: '11px' }} />
                <YAxis stroke="#9ca3af" style={{ fontSize: '11px' }} unit="%" domain={[0, 100]} width={36} />
                <Tooltip contentStyle={tooltipStyle} itemStyle={itemStyle} labelStyle={labelStyle} formatter={(v: number) => [`${v}%`, 'Budget Used']} />
                <Line type="monotone" dataKey="spent" stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7' }} name="Budget Used" />
              </LineChart>
            </ResponsiveContainer>
          </GlassCard>

          {/* Services Coverage */}
          <GlassCard>
            <h3 className="text-white mb-4">Services Coverage</h3>
            <div className="space-y-3">
              {[
                { icon: Zap,     label: 'Electricity Coverage', pct: seeded(c.id, 70, 85, 99), color: 'text-yellow-400' },
                { icon: Droplet, label: 'Water Supply Coverage', pct: seeded(c.id, 71, 75, 95), color: 'text-blue-400' },
                { icon: Bus,     label: 'Public Transport',      pct: seeded(c.id, 72, 60, 88), color: 'text-green-400' },
                { icon: Home,    label: 'Housing Coverage',       pct: seeded(c.id, 73, 55, 82), color: 'text-purple-400' },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${s.color}`} />
                        <span className="text-gray-300" style={{ fontSize: '11px' }}>{s.label}</span>
                      </div>
                      <span className={s.color} style={{ fontSize: '11px' }}>{s.pct}%</span>
                    </div>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }} animate={{ width: `${s.pct}%` }} transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* Projects Tab */}
      {activeTab === 'projects' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-white">Development Projects</h3>
            <span className="text-gray-400" style={{ fontSize: '11px' }}>{c.projects} total</span>
          </div>
          {projects.map((p, i) => (
            <motion.div key={p.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
              <GlassCard>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="text-white mb-1">{p.name}</div>
                    <div className="text-gray-400" style={{ fontSize: '11px' }}>Budget: ₹{p.budget}Cr</div>
                  </div>
                  <div className={`px-2 py-1 rounded-full flex items-center gap-1 ${
                    p.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                    p.status === 'In Progress' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`} style={{ fontSize: '11px' }}>
                    {p.status === 'Completed' && <CheckCircle className="w-3 h-3" />}
                    {p.status === 'In Progress' && <Activity className="w-3 h-3" />}
                    {p.status === 'Planning' && <Clock className="w-3 h-3" />}
                    {p.status}
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" style={{ width: `${p.progress}%` }} />
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-gray-400" style={{ fontSize: '11px' }}>Progress</span>
                  <span className="text-purple-400" style={{ fontSize: '11px' }}>{p.progress}%</span>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
          {/* Submit feedback */}
          {!feedbackSubmitted ? (
            <GlassCard>
              <h3 className="text-white mb-3">Rate Your Constituency</h3>
              <p className="text-gray-400 mb-4" style={{ fontSize: '11px' }}>How satisfied are you with development in {c.name}?</p>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4, 5].map(s => (
                  <button key={s} onClick={() => setRating(s)} className="flex-1">
                    <Star className={`w-8 h-8 mx-auto transition-colors ${s <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                  </button>
                ))}
              </div>
              <textarea
                value={feedbackText}
                onChange={e => setFeedbackText(e.target.value)}
                placeholder="Share your experience about local development..."
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 resize-none mb-4"
                style={{ fontSize: '12px' }}
              />
              <button
                onClick={handleFeedbackSubmit}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white hover:shadow-lg transition-shadow"
                style={{ fontSize: '12px' }}
              >
                Submit Feedback
              </button>
            </GlassCard>
          ) : (
            <GlassCard>
              <div className="text-center py-4">
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
                <div className="text-white mb-1">Feedback Submitted!</div>
                <p className="text-gray-400" style={{ fontSize: '12px' }}>Thank you for helping improve {c.name}</p>
              </div>
            </GlassCard>
          )}

          {/* Existing feedback */}
          <h3 className="text-white">Citizen Reviews</h3>
          {citizenFeedbacks.map(fb => (
            <GlassCard key={fb.id}>
              <div className="flex items-start gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-purple-600/30 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-white" style={{ fontSize: '12px' }}>{fb.name}</span>
                    <span className="text-gray-500" style={{ fontSize: '11px' }}>{fb.time}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[1,2,3,4,5].map(s => (
                      <Star key={s} className={`w-3 h-3 ${s <= fb.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                    ))}
                  </div>
                  <p className="text-gray-300" style={{ fontSize: '12px' }}>{fb.text}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <ThumbsUp className="w-3 h-3 text-gray-400" />
                <span className="text-gray-400" style={{ fontSize: '11px' }}>{fb.likes} found helpful</span>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      )}
    </div>
  );
}
