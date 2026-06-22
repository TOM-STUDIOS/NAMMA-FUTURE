import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { Camera, MapPin, Calendar, Check, AlertCircle, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface CCTVScreenProps {
  darkMode?: boolean;
  onBack?: () => void;
}

export function CCTVScreen({ onBack, darkMode = true }: CCTVScreenProps = {}) {
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [reason, setReason] = useState('');
  const [success, setSuccess] = useState(false);

  const cameraLocations = [
    { area: 'Anna Nagar Main Road', cameras: 12, status: 'Active' },
    { area: 'Kilpauk Garden', cameras: 8, status: 'Active' },
    { area: 'Aminjikarai Bus Stand', cameras: 6, status: 'Maintenance' },
  ];

  const handleRequestFootage = () => {
    if (!location || !date || !timeSlot || !reason) { toast.error('Please fill all fields'); return; }
    const reqId = 'CCTV' + Math.floor(Math.random() * 90000 + 10000);
    setSuccess(true);
    toast.success(`Footage Request #${reqId} Submitted!`, {
      description: `Location: ${location} • Date: ${date} • Approval in 7–15 days`,
      duration: 5000,
    });
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-white mb-1">CCTV Surveillance</h1>
        <p className="text-gray-400">CCTV கண்காணிப்பு | Public Safety Network</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
        <GlassCard className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-blue-400 mb-1">1,247</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Total Cameras</div>
            </div>
            <div>
              <div className="text-green-400 mb-1">98%</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Active</div>
            </div>
            <div>
              <div className="text-purple-400 mb-1">24/7</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Monitoring</div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
        <h3 className="text-white mb-3">CCTV Coverage Areas</h3>
        <div className="space-y-3">
          {cameraLocations.map((loc, idx) => (
            <GlassCard key={idx}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <h4 className="text-white">{loc.area}</h4>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Camera className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400" style={{ fontSize: '11px' }}>{loc.cameras} cameras</span>
                    </div>
                    <div className={`px-2 py-1 rounded-full ${loc.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`} style={{ fontSize: '11px' }}>
                      {loc.status}
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h3 className="text-white mb-3">Request CCTV Footage</h3>
        <GlassCard onClick={() => setShowRequestModal(true)} className="cursor-pointer hover:bg-white/10 transition-colors">
          <div className="flex items-center gap-3 mb-3">
            <Camera className="w-10 h-10 text-purple-400" />
            <div>
              <h4 className="text-white mb-1">Request Footage</h4>
              <p className="text-gray-400" style={{ fontSize: '11px' }}>
                Submit official request for CCTV footage
              </p>
            </div>
          </div>
          <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3">
            <p className="text-white mb-1" style={{ fontSize: '11px' }}>⚠️ Important:</p>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>
              Valid reason required • Subject to approval • Legal purposes only
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Request Footage Modal */}
      <Modal isOpen={showRequestModal} onClose={() => setShowRequestModal(false)} title="Request CCTV Footage">
        {!success ? (
          <div className="space-y-4">
            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-white mb-2">
                <Camera className="w-5 h-5 text-blue-400" />
                <span className="font-medium">CCTV Footage Request</span>
              </div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>
                Official requests only • Subject to authority approval
              </div>
            </div>

            <div>
              <label className="text-white mb-2 block">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
              >
                <option value="">Select location</option>
                {cameraLocations.map((loc, idx) => (
                  <option key={idx} value={loc.area}>{loc.area}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-white mb-2 block">Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                max={new Date().toISOString().split('T')[0]}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="text-white mb-2 block">Time Slot</label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
              >
                <option value="">Select time slot</option>
                <option value="12 AM - 6 AM">12 AM - 6 AM</option>
                <option value="6 AM - 12 PM">6 AM - 12 PM</option>
                <option value="12 PM - 6 PM">12 PM - 6 PM</option>
                <option value="6 PM - 12 AM">6 PM - 12 AM</option>
              </select>
            </div>

            <div>
              <label className="text-white mb-2 block">Reason for Request</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Legal or official reason..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 h-24 resize-none"
              />
            </div>

            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white mb-1" style={{ fontSize: '12px' }}>Important Notice:</p>
                  <p className="text-gray-400" style={{ fontSize: '11px' }}>
                    Misuse of this service may result in legal action. Requests are subject to police verification and approval.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowRequestModal(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10">
                Cancel
              </button>
              <button onClick={handleRequestFootage} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg px-4 py-3 text-white hover:shadow-lg font-medium">
                Submit Request
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-white mb-2">Request Submitted!</h3>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2 mt-2">
              <div className="text-gray-400" style={{ fontSize: '11px' }}>✅ Under review by authorities</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>⏱️ Approval in 7–15 days</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>📱 SMS updates enabled</div>
            </div>
            <button onClick={() => { setShowRequestModal(false); setSuccess(false); setLocation(''); setDate(''); setTimeSlot(''); setReason(''); }} className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>
    </div>
  );
}
