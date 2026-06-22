import { useState, useMemo } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search, MapPin, TrendingUp, IndianRupee, Construction,
  User, ChevronRight, ChevronDown,
} from 'lucide-react';
import { constituencies } from '../data/constituencies';
import { ConstituencyDetailScreen } from './ConstituencyDetailScreen';

interface ConstituencyScreenProps {
  onBack?: () => void;
  darkMode?: boolean;
}

const PARTY_COLOR: Record<string, string> = {
  TVK: '#a855f7', DMK: '#f59e0b', AIADMK: '#10b981',
  INC: '#3b82f6', BJP: '#ef4444', IUML: '#14b8a6', PMK: '#f97316',
};

const ALL_DISTRICTS = [
  'All Districts',
  ...Array.from(new Set(constituencies.map(c => c.district))).sort(),
];

const PAGE = 30;

export function ConstituencyScreen({ onBack, darkMode = true }: ConstituencyScreenProps = {}) {
  const [searchQuery, setSearchQuery]             = useState('');
  const [districtOpen, setDistrictOpen]           = useState(false);
  const [selectedDistrict, setSelectedDistrict]   = useState('All Districts');
  const [visibleCount, setVisibleCount]           = useState(PAGE);
  const [selected, setSelected]                   = useState<typeof constituencies[0] | null>(null);

  const totalBudget   = useMemo(() => constituencies.reduce((s, c) => s + c.budget, 0), []);
  const totalProjects = useMemo(() => constituencies.reduce((s, c) => s + c.projects, 0), []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return constituencies.filter(c => {
      const inDistrict = selectedDistrict === 'All Districts' || c.district === selectedDistrict;
      const inSearch   = !q || c.name.toLowerCase().includes(q)
        || c.district.toLowerCase().includes(q)
        || c.mla.toLowerCase().includes(q)
        || c.party.toLowerCase().includes(q);
      return inDistrict && inSearch;
    });
  }, [searchQuery, selectedDistrict]);

  const visible = filtered.slice(0, visibleCount);

  const handleDistrictPick = (d: string) => {
    setSelectedDistrict(d);
    setDistrictOpen(false);
    setVisibleCount(PAGE);
    setSearchQuery('');
  };

  if (selected) {
    return (
      <ConstituencyDetailScreen
        constituency={selected}
        onBack={() => setSelected(null)}
        darkMode={darkMode}
      />
    );
  }

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-5">
        <h1 className="text-white mb-1">234 Constituencies</h1>
        <p className="text-gray-400">தொகுதி மேம்பாடு கண்காணிப்பு | Transparency Dashboard</p>

        {/* Search */}
        <div className="mt-3 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full px-4 py-3 flex items-center gap-2">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => { setSearchQuery(e.target.value); setVisibleCount(PAGE); }}
            placeholder="Search constituency, MLA, party..."
            className="flex-1 bg-transparent text-white placeholder-gray-400 outline-none"
            style={{ fontSize: '13px' }}
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-gray-500 hover:text-white">✕</button>
          )}
        </div>

        {/* District picker */}
        <div className="mt-2 relative z-30">
          <button
            onClick={() => setDistrictOpen(v => !v)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-center justify-between text-white hover:bg-white/10 transition-colors"
            style={{ fontSize: '13px' }}
          >
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-400" />
              {selectedDistrict}
              {selectedDistrict !== 'All Districts' && (
                <span className="text-purple-400" style={{ fontSize: '11px' }}>
                  ({constituencies.filter(c => c.district === selectedDistrict).length})
                </span>
              )}
            </span>
            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${districtOpen ? 'rotate-180' : ''}`}
            />
          </button>

          <AnimatePresence>
            {districtOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute top-full left-0 right-0 mt-1 rounded-xl border border-white/10 shadow-2xl overflow-hidden"
                style={{ background: 'rgba(10,8,25,0.97)', backdropFilter: 'blur(20px)', maxHeight: '260px', overflowY: 'auto' }}
              >
                {ALL_DISTRICTS.map(d => {
                  const count = d === 'All Districts' ? 234 : constituencies.filter(c => c.district === d).length;
                  return (
                    <button
                      key={d}
                      onClick={() => handleDistrictPick(d)}
                      className={`w-full text-left px-4 py-2.5 flex justify-between items-center transition-colors ${
                        selectedDistrict === d ? 'bg-purple-600/30 text-purple-300' : 'text-white hover:bg-white/10'
                      }`}
                      style={{ fontSize: '12px' }}
                    >
                      <span>{d}</span>
                      <span className="text-gray-500" style={{ fontSize: '11px' }}>{count}</span>
                    </button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="mb-5">
        <GlassCard className="bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-purple-400 mb-1">{filtered.length}</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>
                {selectedDistrict === 'All Districts' ? 'Total' : 'In District'}
              </div>
            </div>
            <div>
              <div className="text-green-400 mb-1">{totalProjects.toLocaleString()}</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Projects</div>
            </div>
            <div>
              <div className="text-yellow-400 mb-1">₹{(totalBudget / 1000).toFixed(1)}K Cr</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Budget</div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* List */}
      <div className="space-y-3">
        {visible.map((constituency, idx) => {
          const spendPercent = Math.round((constituency.spent / constituency.budget) * 100);
          return (
            <motion.div
              key={constituency.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: Math.min(idx * 0.015, 0.35) }}
            >
              <GlassCard>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-white mb-1">{constituency.name}</h3>
                    <div className="flex items-center gap-2 text-gray-400 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span style={{ fontSize: '12px' }}>{constituency.district}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <User className="w-3 h-3" />
                      <span style={{ fontSize: '12px' }}>MLA: {constituency.mla}</span>
                    </div>
                  </div>
                  <div
                    className="px-2 py-1 rounded-full text-white flex-shrink-0 ml-2"
                    style={{
                      backgroundColor: PARTY_COLOR[constituency.party] ?? '#6366f1',
                      fontSize: '11px',
                    }}
                  >
                    {constituency.party}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <IndianRupee className="w-3 h-3 text-purple-400" />
                      <span className="text-purple-400" style={{ fontSize: '11px' }}>₹{constituency.budget}Cr</span>
                    </div>
                    <div className="text-gray-400" style={{ fontSize: '11px' }}>Budget</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp className="w-3 h-3 text-green-400" />
                      <span className="text-green-400" style={{ fontSize: '11px' }}>₹{constituency.spent}Cr</span>
                    </div>
                    <div className="text-gray-400" style={{ fontSize: '11px' }}>Spent</div>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Construction className="w-3 h-3 text-blue-400" />
                      <span className="text-blue-400" style={{ fontSize: '11px' }}>{constituency.projects}</span>
                    </div>
                    <div className="text-gray-400" style={{ fontSize: '11px' }}>Projects</div>
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400" style={{ fontSize: '11px' }}>Fund Utilization</span>
                    <span className="text-white" style={{ fontSize: '11px' }}>{spendPercent}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${spendPercent}%` }}
                      transition={{ delay: Math.min(idx * 0.015 + 0.2, 0.55), duration: 0.5 }}
                      className={`h-full rounded-full ${
                        spendPercent >= 80 ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                        : spendPercent >= 60 ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                        : 'bg-gradient-to-r from-red-500 to-pink-500'
                      }`}
                    />
                  </div>
                </div>

                <button
                  onClick={() => setSelected(constituency)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg text-white flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
                  style={{ fontSize: '12px' }}
                >
                  View Development Report
                  <ChevronRight className="w-4 h-4" />
                </button>
              </GlassCard>
            </motion.div>
          );
        })}

        {/* Load more */}
        {visibleCount < filtered.length && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setVisibleCount(v => v + PAGE)}
            className="w-full py-3 rounded-xl border border-purple-600/30 bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 transition-colors"
            style={{ fontSize: '12px' }}
          >
            Load {Math.min(PAGE, filtered.length - visibleCount)} more
            &nbsp;({filtered.length - visibleCount} remaining)
          </motion.button>
        )}

        {filtered.length === 0 && (
          <GlassCard className="text-center">
            <p className="text-gray-400">No constituencies found</p>
            <p className="text-gray-500 mt-1" style={{ fontSize: '12px' }}>
              Try a different search or select another district
            </p>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
