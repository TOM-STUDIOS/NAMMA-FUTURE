import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { Bus, Train, MapPin, CreditCard, Ticket, Navigation, Clock, Check, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface TransportScreenProps {
  darkMode?: boolean;
  onBack?: () => void;
}

export function TransportScreen({ onBack, darkMode = true }: TransportScreenProps = {}) {
  const [showBuyPass, setShowBuyPass] = useState(false);
  const [showTrackBus, setShowTrackBus] = useState(false);
  const [selectedPass, setSelectedPass] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [trackedBus, setTrackedBus] = useState<any>(null);

  const nearbyBuses = [
    { route: '27C', destination: 'T.Nagar', eta: '3 mins', stops: 2, seats: 15, gps: { lat: 13.0527, lng: 80.2558 } },
    { route: '23B', destination: 'Egmore', eta: '7 mins', stops: 5, seats: 8, gps: { lat: 13.0878, lng: 80.2785 } },
    { route: '15A', destination: 'Adyar', eta: '12 mins', stops: 8, seats: 22, gps: { lat: 13.0067, lng: 80.2206 } },
  ];

  const passes = [
    { id: 'daily', name: 'Daily Pass', price: 50, duration: '24 hours' },
    { id: 'weekly', name: 'Weekly Pass', price: 300, duration: '7 days' },
    { id: 'monthly', name: 'Monthly Pass', price: 1000, duration: '30 days' },
    { id: 'student', name: 'Student Pass', price: 500, duration: '30 days' },
  ];

  const handleBuyPass = () => {
    if (!selectedPass) { toast.error('Please select a pass type'); return; }
    const pass = passes.find(p => p.id === selectedPass);
    setPaymentSuccess(true);
    toast.success(`${pass?.name} Purchased! 🎫`, {
      description: `₹${pass?.price} paid • Valid: ${pass?.duration} • QR code saved to wallet`,
      duration: 5000,
    });
  };

  const handleTrackBus = (bus: typeof nearbyBuses[0]) => {
    setTrackedBus(bus);
    setShowTrackBus(true);
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-white mb-1">Transport Services</h1>
        <p className="text-gray-400">போக்குவரத்து சேவைகள் | MTC & Metro</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
        <GlassCard className="relative overflow-hidden bg-gradient-to-r from-indigo-600/20 to-purple-600/20">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-white mb-2">Free Bus Pass</h2>
              <p className="text-gray-400 mb-3" style={{ fontSize: '12px' }}>Active for women travelers</p>
              <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full inline-block" style={{ fontSize: '11px' }}>
                ✓ Verified & Active
              </div>
            </div>
            <Bus className="w-12 h-12 text-indigo-400" />
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white">Nearby Buses</h3>
          <div className="flex items-center gap-1 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span style={{ fontSize: '11px' }}>Live</span>
          </div>
        </div>
        <div className="space-y-3">
          {nearbyBuses.map((bus, idx) => (
            <GlassCard key={idx}>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-indigo-600 text-white px-3 py-1 rounded-lg">{bus.route}</div>
                    <span className="text-white">{bus.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400" style={{ fontSize: '11px' }}>
                    <Clock className="w-3 h-3" />
                    <span>Arriving in {bus.eta}</span>
                    <span>• {bus.stops} stops away</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-2">
                <div className="text-gray-400" style={{ fontSize: '11px' }}>
                  Seats: <span className="text-green-400">{bus.seats} available</span>
                </div>
              </div>
              <button onClick={() => handleTrackBus(bus)} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-2 rounded-lg text-white hover:shadow-lg transition-shadow flex items-center justify-center gap-2" style={{ fontSize: '12px' }}>
                <Navigation className="w-4 h-4" />
                Track Live
              </button>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6">
        <h3 className="text-white mb-3">Metro Status</h3>
        <GlassCard>
          <div className="flex items-center gap-3 mb-3">
            <Train className="w-8 h-8 text-blue-400" />
            <div className="flex-1">
              <h4 className="text-white mb-1">Chennai Metro</h4>
              <p className="text-gray-400" style={{ fontSize: '11px' }}>All lines operational</p>
            </div>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[{ line: 'Blue Line', time: '3 mins' }, { line: 'Green Line', time: '5 mins' }].map((metro, idx) => (
              <div key={idx} className={`text-center p-3 ${idx === 0 ? 'bg-blue-600/20' : 'bg-green-600/20'} rounded-lg`}>
                <div className={`${idx === 0 ? 'text-blue-400' : 'text-green-400'} mb-1`}>{metro.line}</div>
                <div className="text-white" style={{ fontSize: '11px' }}>Next: {metro.time}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-white mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <GlassCard onClick={() => setShowBuyPass(true)} className="cursor-pointer hover:bg-white/10 transition-colors">
            <Ticket className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>Buy Pass</h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>Daily/Monthly</p>
          </GlassCard>

          <GlassCard className="cursor-pointer hover:bg-white/10 transition-colors">
            <MapPin className="w-8 h-8 text-blue-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>Route Planner</h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>Find routes</p>
          </GlassCard>

          <GlassCard className="cursor-pointer hover:bg-white/10 transition-colors">
            <CreditCard className="w-8 h-8 text-green-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>Recharge Card</h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>Metro card</p>
          </GlassCard>

          <GlassCard className="cursor-pointer hover:bg-white/10 transition-colors">
            <Clock className="w-8 h-8 text-yellow-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>Schedules</h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>View timings</p>
          </GlassCard>
        </div>
      </motion.div>

      {/* Buy Pass Modal */}
      <Modal isOpen={showBuyPass} onClose={() => setShowBuyPass(false)} title="Buy Transport Pass">
        {!paymentSuccess ? (
          <div className="space-y-4">
            <div className="bg-indigo-600/20 border border-indigo-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-white mb-2">
                <Ticket className="w-5 h-5 text-indigo-400" />
                <span className="font-medium">Select Pass Type</span>
              </div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Valid for MTC buses and Chennai Metro</div>
            </div>

            <div>
              <label className="text-white mb-2 block">Pass Type</label>
              <div className="space-y-2">
                {passes.map((pass) => (
                  <label key={pass.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selectedPass === pass.id ? 'bg-purple-600/20 border-purple-500' : 'bg-white/5 border-white/10'}`}>
                    <input type="radio" name="pass" value={pass.id} checked={selectedPass === pass.id} onChange={(e) => setSelectedPass(e.target.value)} className="w-4 h-4" />
                    <div className="flex-1">
                      <div className="text-white">{pass.name}</div>
                      <div className="text-gray-400" style={{ fontSize: '11px' }}>Valid for {pass.duration}</div>
                    </div>
                    <div className="text-indigo-400 font-bold">₹{pass.price}</div>
                  </label>
                ))}
              </div>
            </div>

            {selectedPass && (
              <div>
                <label className="text-white mb-2 block">Payment Method</label>
                <div className="space-y-2">
                  {['wallet', 'upi'].map((method) => (
                    <label key={method} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === method ? 'bg-purple-600/20 border-purple-500' : 'bg-white/5 border-white/10'}`}>
                      <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={(e) => setPaymentMethod(e.target.value)} className="w-4 h-4" />
                      <div className="flex-1">
                        <div className="text-white">{method === 'wallet' ? 'TN Digital Wallet' : 'UPI'}</div>
                        <div className="text-gray-400" style={{ fontSize: '11px' }}>{method === 'wallet' ? 'Balance: ₹12,450' : 'PhonePe, GPay, Paytm'}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button onClick={() => setShowBuyPass(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10">Cancel</button>
              <button onClick={handleBuyPass} disabled={!selectedPass} className={`flex-1 rounded-lg px-4 py-3 text-white font-medium transition-all ${selectedPass ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-lg' : 'bg-white/5 cursor-not-allowed opacity-50'}`}>
                Buy Pass
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-white mb-2">Pass Purchased!</h3>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2 mt-2">
              <div className="text-gray-400" style={{ fontSize: '11px' }}>🎫 Digital pass saved to wallet</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>📱 QR code ready for scanning</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>✅ SMS confirmation sent</div>
            </div>
            <button onClick={() => { setShowBuyPass(false); setPaymentSuccess(false); setSelectedPass(''); }} className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>

      {/* Track Bus Modal */}
      <Modal isOpen={showTrackBus} onClose={() => setShowTrackBus(false)} title="Live Bus Tracking">
        {trackedBus && (
          <div className="space-y-4">
            <div className="bg-indigo-600/20 border border-indigo-600/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="bg-indigo-600 text-white px-3 py-1 rounded-lg font-bold">{trackedBus.route}</div>
                    <span className="text-white font-medium">{trackedBus.destination}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400" style={{ fontSize: '11px' }}>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span>Live tracking active</span>
                  </div>
                </div>
                <Bus className="w-10 h-10 text-indigo-400" />
              </div>
            </div>

            <div className="space-y-3">
              {[
                { label: 'Arriving in', value: trackedBus.eta },
                { label: 'Stops away', value: `${trackedBus.stops} stops` },
                { label: 'Seats available', value: `${trackedBus.seats} seats`, color: 'green' },
                { label: 'GPS Location', value: `${trackedBus.gps.lat.toFixed(4)}, ${trackedBus.gps.lng.toFixed(4)}`, small: true },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <span className="text-gray-400">{item.label}</span>
                  <span className={`${item.color === 'green' ? 'text-green-400' : 'text-white'} font-bold`} style={item.small ? { fontSize: '11px' } : {}}>{item.value}</span>
                </div>
              ))}
            </div>

            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3">
              <p className="text-white mb-1" style={{ fontSize: '12px' }}>Live Features:</p>
              <ul className="text-gray-400 space-y-1" style={{ fontSize: '11px' }}>
                <li>• Real-time GPS tracking on map</li>
                <li>• Arrival notifications every stop</li>
                <li>• Seat availability updates</li>
                <li>• Next 3 bus timings</li>
              </ul>
            </div>

            <button onClick={() => setShowTrackBus(false)} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow">
              Close
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
