import { useState } from 'react';
import { toast } from 'sonner';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { motion } from 'motion/react';
import { Building2, Zap, Droplet, Wind, Wifi, Camera, Car, TrendingUp, AlertCircle, CheckCircle, MapPin, Bell } from 'lucide-react';

interface SmartCitiesScreenProps {
  onBack?: () => void;
  darkMode?: boolean;
}

interface CityData {
  name: string;
  status: 'operational' | 'maintenance';
  score: number;
  power: string;
  water: string;
  airQuality: string;
  internet: string;
  cctv: string;
  traffic: string;
  waterDesc: string;
  waterSchedule: string;
  powerDesc: string;
  trafficDesc: string;
  trafficTime: string;
  aqi: number;
}

export function SmartCitiesScreen({ onBack, darkMode = true }: SmartCitiesScreenProps = {}) {
  const citiesData: CityData[] = [
    {
      name: 'Chennai',
      status: 'operational',
      score: 95,
      power: '99.2%',
      water: '78%',
      airQuality: 'Good',
      internet: '98.5%',
      cctv: '1,247',
      traffic: 'Moderate',
      waterDesc: 'Reservoirs at 78% capacity',
      waterSchedule: 'Next supply: 6:00 AM - 8:00 AM',
      powerDesc: 'All zones operational',
      trafficDesc: 'Anna Salai: Heavy traffic',
      trafficTime: '30 mins',
      aqi: 45,
    },
    {
      name: 'Coimbatore',
      status: 'operational',
      score: 92,
      power: '98.8%',
      water: '82%',
      airQuality: 'Good',
      internet: '97.2%',
      cctv: '892',
      traffic: 'Light',
      waterDesc: 'Reservoirs at 82% capacity',
      waterSchedule: 'Next supply: 5:30 AM - 7:30 AM',
      powerDesc: 'All zones operational',
      trafficDesc: 'Avinashi Road: Light traffic',
      trafficTime: '10 mins',
      aqi: 38,
    },
    {
      name: 'Madurai',
      status: 'operational',
      score: 88,
      power: '97.5%',
      water: '71%',
      airQuality: 'Moderate',
      internet: '95.8%',
      cctv: '654',
      traffic: 'Heavy',
      waterDesc: 'Reservoirs at 71% capacity',
      waterSchedule: 'Next supply: 6:30 AM - 8:30 AM',
      powerDesc: 'Zone 3: Scheduled maintenance',
      trafficDesc: 'Alagar Kovil Road: Heavy traffic',
      trafficTime: '45 mins',
      aqi: 62,
    },
    {
      name: 'Tiruchirappalli',
      status: 'operational',
      score: 85,
      power: '96.3%',
      water: '68%',
      airQuality: 'Moderate',
      internet: '94.5%',
      cctv: '543',
      traffic: 'Moderate',
      waterDesc: 'Reservoirs at 68% capacity',
      waterSchedule: 'Next supply: 6:00 AM - 8:00 AM',
      powerDesc: 'Zone 2: Minor outage',
      trafficDesc: 'Salai Road: Moderate traffic',
      trafficTime: '25 mins',
      aqi: 58,
    },
    {
      name: 'Salem',
      status: 'operational',
      score: 82,
      power: '95.1%',
      water: '75%',
      airQuality: 'Good',
      internet: '93.2%',
      cctv: '478',
      traffic: 'Light',
      waterDesc: 'Reservoirs at 75% capacity',
      waterSchedule: 'Next supply: 5:00 AM - 7:00 AM',
      powerDesc: 'All zones operational',
      trafficDesc: 'Cherry Road: Light traffic',
      trafficTime: '15 mins',
      aqi: 42,
    },
    {
      name: 'Tirunelveli',
      status: 'maintenance',
      score: 78,
      power: '93.7%',
      water: '65%',
      airQuality: 'Good',
      internet: '91.8%',
      cctv: '412',
      traffic: 'Moderate',
      waterDesc: 'Reservoirs at 65% capacity',
      waterSchedule: 'Next supply: 7:00 AM - 9:00 AM',
      powerDesc: 'Zone 1: Under maintenance',
      trafficDesc: 'High Ground Road: Moderate traffic',
      trafficTime: '20 mins',
      aqi: 48,
    },
  ];

  const [selectedCity, setSelectedCity] = useState(citiesData[0]);

  const getLiveStats = (city: CityData) => [
    { icon: Zap, label: 'Power', value: city.power, status: 'good', color: 'text-green-400' },
    { icon: Droplet, label: 'Water', value: city.water, status: 'good', color: 'text-blue-400' },
    { icon: Wind, label: 'Air Quality', value: city.airQuality, status: 'good', color: 'text-green-400' },
    { icon: Wifi, label: 'Internet', value: city.internet, status: 'good', color: 'text-purple-400' },
    { icon: Camera, label: 'CCTV', value: city.cctv, status: 'good', color: 'text-yellow-400' },
    { icon: Car, label: 'Traffic', value: city.traffic, status: 'warning', color: 'text-orange-400' },
  ];

  const getServices = (city: CityData) => [
    {
      title: 'Water Supply Status',
      value: city.water,
      desc: city.waterDesc,
      schedule: city.waterSchedule,
      status: 'active',
    },
    {
      title: 'Power Status',
      value: city.status === 'operational' ? 'No Outages' : 'Maintenance',
      desc: city.powerDesc,
      schedule: 'Maintenance: ' + (city.status === 'operational' ? 'None scheduled' : 'In progress'),
      status: city.status === 'operational' ? 'active' : 'warning',
    },
    {
      title: 'Traffic Update',
      value: city.traffic,
      desc: city.trafficDesc,
      schedule: `Expected clearance: ${city.trafficTime}`,
      status: city.traffic === 'Heavy' ? 'warning' : 'active',
    },
    {
      title: 'Air Quality',
      value: `${city.airQuality} (${city.aqi} AQI)`,
      desc: city.aqi < 50 ? 'Safe for outdoor activities' : 'Moderate outdoor activities',
      schedule: 'Last updated: 5 mins ago',
      status: 'active',
    },
    {
      title: 'Public Transport',
      value: 'Operational',
      desc: 'Metro & Buses running',
      schedule: 'Next train: 3 mins',
      status: 'active',
    },
    {
      title: 'Waste Management',
      value: 'On Schedule',
      desc: 'Collection in your area',
      schedule: 'Next pickup: Tomorrow 6 AM',
      status: 'active',
    },
  ];

  const alerts = [
    { type: 'info', message: 'Road repair work on Mount Road today 2 PM - 6 PM', time: '2 hours ago' },
    { type: 'warning', message: 'Heavy rainfall expected tomorrow. Plan accordingly.', time: '5 hours ago' },
    { type: 'success', message: 'New Metro line inaugurated in Porur', time: '1 day ago' },
  ];

  const handleSubscribeAlerts = () => {
    toast.success('City Alerts Enabled 🔔', {
      description: 'Power outages • Water schedules • Road closures • Weather warnings • SMS + App notifications',
      duration: 4000,
    });
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-white">Smart Cities</h1>
          <button
            onClick={handleSubscribeAlerts}
            className="flex items-center gap-1 bg-purple-600/20 border border-purple-500/30 px-3 py-1 rounded-full text-purple-400 hover:bg-purple-600/30 transition-colors"
            style={{ fontSize: '11px' }}
          >
            <Bell className="w-3 h-3" />
            Alerts
          </button>
        </div>
        <p className="text-gray-400">ஸ்மார்ட் நகர நிலை | AI Command Center</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <h3 className="text-white mb-3">Select City</h3>
        <div className="grid grid-cols-3 gap-2">
          {citiesData.map((city, idx) => (
            <button
              key={city.name}
              onClick={() => setSelectedCity(city)}
              className={`p-3 rounded-xl backdrop-blur-xl border transition-all ${
                selectedCity.name === city.name
                  ? 'bg-gradient-to-r from-purple-600/30 to-pink-600/30 border-purple-500'
                  : 'bg-white/5 border-white/10'
              }`}
            >
              <div className={`mb-1 ${selectedCity.name === city.name ? 'text-white' : 'text-gray-400'}`} style={{ fontSize: '12px' }}>
                {city.name}
              </div>
              <div className={`${selectedCity.name === city.name ? 'text-green-400' : 'text-gray-500'}`} style={{ fontSize: '11px' }}>
                {city.score}%
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        key={selectedCity.name}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <GlassCard className="relative overflow-hidden bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-purple-400" />
                <h2 className="text-white">{selectedCity.name} Smart City</h2>
              </div>
              <p className="text-gray-400 mb-1" style={{ fontSize: '12px' }}>
                {selectedCity.status === 'operational' ? 'All systems operational' : 'Under maintenance'}
              </p>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 ${selectedCity.status === 'operational' ? 'bg-green-400' : 'bg-yellow-400'} rounded-full animate-pulse`} />
                <span className={`${selectedCity.status === 'operational' ? 'text-green-400' : 'text-yellow-400'}`} style={{ fontSize: '12px' }}>
                  Live Status
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className={`mb-1 ${selectedCity.score >= 90 ? 'text-green-400' : selectedCity.score >= 80 ? 'text-blue-400' : 'text-yellow-400'}`}>
                {selectedCity.score}/100
              </div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>
                Performance
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {getLiveStats(selectedCity).map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + idx * 0.05 }}
            >
              <GlassCard>
                <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className={`mb-1 ${stat.color}`} style={{ fontSize: '12px' }}>
                  {stat.value}
                </div>
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
        transition={{ delay: 0.4 }}
        className="mb-6"
      >
        <h3 className="text-white mb-3">Live Alerts</h3>
        <div className="space-y-2">
          {alerts.map((alert, idx) => (
            <GlassCard key={idx}>
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  alert.type === 'success' ? 'bg-green-500/20' :
                  alert.type === 'warning' ? 'bg-yellow-500/20' :
                  'bg-blue-500/20'
                }`}>
                  {alert.type === 'success' ? (
                    <CheckCircle className="w-4 h-4 text-green-400" />
                  ) : alert.type === 'warning' ? (
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-blue-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white mb-1" style={{ fontSize: '12px' }}>
                    {alert.message}
                  </p>
                  <p className="text-gray-400" style={{ fontSize: '11px' }}>
                    {alert.time}
                  </p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <h3 className="text-white mb-3">City Services - Live Status</h3>
        <div className="space-y-3">
          {getServices(selectedCity).map((service, idx) => (
            <GlassCard key={idx}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="text-white mb-1">{service.title}</h4>
                  <div className={`mb-2 ${
                    service.status === 'active' ? 'text-green-400' :
                    service.status === 'warning' ? 'text-yellow-400' :
                    'text-red-400'
                  }`} style={{ fontSize: '13px' }}>
                    {service.value}
                  </div>
                  <p className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>
                    {service.desc}
                  </p>
                  <p className="text-gray-500" style={{ fontSize: '11px' }}>
                    {service.schedule}
                  </p>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  service.status === 'active' ? 'bg-green-400 animate-pulse' :
                  service.status === 'warning' ? 'bg-yellow-400 animate-pulse' :
                  'bg-red-400 animate-pulse'
                }`} />
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

    </div>
  );
}
