import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { motion } from 'motion/react';
import { MapPin, Users, TrendingUp, DollarSign, Building2, GraduationCap, Heart, ChevronRight } from 'lucide-react';
import { districts } from '../data/districts';
import { useState } from 'react';
import { DistrictDetailScreen } from './DistrictDetailScreen';

interface DistrictsScreenProps {
  onBack?: () => void;
  darkMode?: boolean;
}

export function DistrictsScreen({ onBack, darkMode = true }: DistrictsScreenProps = {}) {
  const [selectedDistrict, setSelectedDistrict] = useState<typeof districts[0] | null>(null);

  const totalPopulation = districts.reduce((sum, d) => sum + d.population, 0);
  const totalArea = districts.reduce((sum, d) => sum + d.area, 0);
  const avgLiteracy = (districts.reduce((sum, d) => sum + d.literacy, 0) / districts.length).toFixed(1);

  const formatPopulation = (pop: number) => {
    const crore = pop / 10000000;
    return `${crore.toFixed(1)} Cr`;
  };

  const formatArea = (area: number) => {
    if (area >= 100000) return `${(area / 100000).toFixed(1)}L km²`;
    return `${(area / 1000).toFixed(0)}K km²`;
  };

  const handleViewDistrict = (district: typeof districts[0]) => {
    setSelectedDistrict(district);
  };

  if (selectedDistrict) {
    return <DistrictDetailScreen district={selectedDistrict} onBack={() => setSelectedDistrict(null)} darkMode={darkMode} />;
  }

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className={darkMode ? 'text-white mb-1' : 'text-slate-900 mb-1'}>38 Districts</h1>
        <p className="text-gray-400">தமிழ்நாடு மாவட்டங்கள் | Future TN Network</p>
      </motion.div>

      <div className="mb-6">
        <GlassCard className={darkMode ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20' : ''} style={!darkMode ? { backgroundColor: '#eff6ff' } : {}}>
          <div className="grid grid-cols-4 gap-2 text-center">
            <div>
              <div className={darkMode ? 'text-purple-400 mb-1' : 'text-sky-500 mb-1'}>38</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Districts</div>
            </div>
            <div>
              <div className={darkMode ? 'text-green-400 mb-1' : 'text-sky-500 mb-1'}>{formatPopulation(totalPopulation)}</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Population</div>
            </div>
            <div>
              <div className={darkMode ? 'text-yellow-400 mb-1' : 'text-sky-500 mb-1'}>{formatArea(totalArea)}</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Area</div>
            </div>
            <div>
              <div className={darkMode ? 'text-blue-400 mb-1' : 'text-sky-500 mb-1'}>{avgLiteracy}%</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Avg Literacy</div>
            </div>
          </div>
        </GlassCard>
      </div>

      <div className="space-y-3">
        {districts.map((district, idx) => (
          <motion.div
            key={district.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.02 }}
          >
            <GlassCard>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white mb-1">{district.name}</h3>
                  <p className="text-gray-400" style={{ fontSize: '12px' }}>
                    {district.nameTa}
                  </p>
                </div>
                <MapPin className="w-5 h-5 text-purple-400" />
              </div>

              <div className="grid grid-cols-4 gap-2 mb-3">
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Users className="w-3 h-3 text-blue-400" />
                    <span className="text-blue-400" style={{ fontSize: '11px' }}>
                      {(district.population / 1000000).toFixed(1)}M
                    </span>
                  </div>
                  <div className="text-gray-400" style={{ fontSize: '11px' }}>Pop.</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <DollarSign className="w-3 h-3 text-purple-400" />
                    <span className="text-purple-400" style={{ fontSize: '11px' }}>
                      ₹{district.budget}Cr
                    </span>
                  </div>
                  <div className="text-gray-400" style={{ fontSize: '11px' }}>Budget</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <Building2 className="w-3 h-3 text-green-400" />
                    <span className="text-green-400" style={{ fontSize: '11px' }}>
                      {district.projects}
                    </span>
                  </div>
                  <div className="text-gray-400" style={{ fontSize: '11px' }}>Projects</div>
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-1">
                    <GraduationCap className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400" style={{ fontSize: '11px' }}>
                      {district.literacy}%
                    </span>
                  </div>
                  <div className="text-gray-400" style={{ fontSize: '11px' }}>Literacy</div>
                </div>
              </div>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-gray-400" style={{ fontSize: '11px' }}>
                    {district.hospitals} Hospitals
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-green-400" />
                  <span className="text-green-400" style={{ fontSize: '11px' }}>
                    {Math.round((district.spent / district.budget) * 100)}% spent
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleViewDistrict(district)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 rounded-lg text-white flex items-center justify-center gap-2 hover:shadow-lg transition-shadow"
                style={{ fontSize: '11px' }}
              >
                View District Dashboard
                <ChevronRight className="w-3 h-3" />
              </button>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
