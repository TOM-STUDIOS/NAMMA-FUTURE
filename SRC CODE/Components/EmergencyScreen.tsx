import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { Phone, Ambulance, Shield, Users, Heart, AlertTriangle, MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface EmergencyScreenProps {
  darkMode?: boolean;
  onBack?: () => void;
}

export function EmergencyScreen({ onBack, darkMode = true }: EmergencyScreenProps = {}) {
  const [showCallModal, setShowCallModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);

  const emergencyServices = [
    { number: '108', name: 'Ambulance', icon: Ambulance, color: 'from-red-600 to-pink-600', desc: 'Medical Emergency' },
    { number: '100', name: 'Police', icon: Shield, color: 'from-blue-600 to-cyan-600', desc: 'Law Enforcement' },
    { number: '101', name: 'Fire', icon: AlertTriangle, color: 'from-orange-600 to-red-600', desc: 'Fire Emergency' },
    { number: '1091', name: 'Women Helpline', icon: Users, color: 'from-purple-600 to-pink-600', desc: 'Women Safety' },
  ];

  const handleCall = (service: any) => {
    setSelectedService(service);
    setShowCallModal(true);
  };

  const handleConfirmCall = () => {
    setShowCallModal(false);
    toast.success(`🚨 ${selectedService?.name} Alerted — Calling ${selectedService?.number}`, {
      description: 'Help dispatched • ETA 6–8 min • Location shared • Emergency contacts notified',
      duration: 6000,
    });
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-white mb-1">Emergency Services</h1>
        <p className="text-gray-400">அவசர உதவி | 24/7 Emergency Response</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
        <GlassCard className="bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-600/30">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
            <div>
              <h2 className="text-white mb-1">Emergency Alert</h2>
              <p className="text-gray-400" style={{ fontSize: '12px' }}>Your location: Anna Nagar, Chennai</p>
            </div>
          </div>
          <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
            <p className="text-white" style={{ fontSize: '11px' }}>
              <strong>In case of emergency:</strong> Select the appropriate service below. Your location will be automatically shared with emergency responders.
            </p>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
        <h3 className="text-white mb-3">Emergency Hotlines</h3>
        <div className="grid grid-cols-2 gap-3">
          {emergencyServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <GlassCard
                key={idx}
                onClick={() => handleCall(service)}
                className="cursor-pointer hover:bg-white/10 transition-colors"
              >
                <div className={`w-full h-20 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-10 h-10 text-white" />
                </div>
                <div className="text-white text-2xl font-bold mb-1">{service.number}</div>
                <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>{service.name}</h4>
                <p className="text-gray-400" style={{ fontSize: '11px' }}>{service.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-white mb-3">Other Emergency Contacts</h3>
        <div className="space-y-3">
          {[
            { title: 'Disaster Management', number: '108', desc: 'Natural calamities' },
            { title: 'Child Helpline', number: '1098', desc: 'Child protection' },
            { title: 'Senior Citizen Helpline', number: '14567', desc: 'Elder care' },
          ].map((contact, idx) => (
            <GlassCard key={idx}>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-white mb-1">{contact.title}</h4>
                  <p className="text-gray-400" style={{ fontSize: '11px' }}>{contact.desc}</p>
                </div>
                <div className="text-right">
                  <div className="text-purple-400 font-bold">{contact.number}</div>
                  <button
                    onClick={() => toast.success(`Calling ${contact.number}`, { description: `${contact.title} — Connecting...` })}
                    className="mt-1 text-white hover:text-purple-400 transition-colors"
                    style={{ fontSize: '11px' }}
                  >
                    <Phone className="w-4 h-4 inline" /> Call
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Call Confirmation Modal */}
      <Modal isOpen={showCallModal} onClose={() => setShowCallModal(false)} title="Emergency Call">
        {selectedService && (
          <div className="space-y-4">
            <div className={`bg-gradient-to-r ${selectedService.color} bg-opacity-20 border rounded-lg p-4`}>
              <div className="flex items-center gap-3 mb-3">
                {(() => {
                  const Icon = selectedService.icon;
                  return <Icon className="w-10 h-10 text-white" />;
                })()}
                <div>
                  <div className="text-white text-3xl font-bold">{selectedService.number}</div>
                  <div className="text-white">{selectedService.name}</div>
                </div>
              </div>
              <div className="bg-black/20 rounded-lg p-3">
                <div className="flex items-center gap-2 text-white mb-2">
                  <MapPin className="w-4 h-4" />
                  <span style={{ fontSize: '12px' }}>Your Location</span>
                </div>
                <div className="text-gray-200" style={{ fontSize: '11px' }}>
                  Anna Nagar, Chennai<br />
                  GPS: 13.0878° N, 80.2785° E
                </div>
              </div>
            </div>

            <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3">
              <p className="text-white mb-2" style={{ fontSize: '12px' }}>⚠️ This is an emergency call</p>
              <ul className="text-gray-400 space-y-1" style={{ fontSize: '11px' }}>
                <li>• Your location will be shared automatically</li>
                <li>• Emergency responders will be dispatched</li>
                <li>• Emergency contacts will be notified</li>
                <li>• Call will be recorded for quality</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowCallModal(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10">
                Cancel
              </button>
              <button
                onClick={handleConfirmCall}
                className={`flex-1 bg-gradient-to-r ${selectedService.color} rounded-lg px-4 py-3 text-white hover:shadow-lg font-bold animate-pulse flex items-center justify-center gap-2`}
              >
                <Phone className="w-5 h-5" />
                Call {selectedService.number}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
