import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { Car, FileText, CreditCard, Calendar, AlertCircle, CheckCircle, Download, Upload, Check } from 'lucide-react';
import { toast } from 'sonner';

interface VehiclesScreenProps {
  darkMode?: boolean;
  onBack?: () => void;
}

export function VehiclesScreen({ onBack, darkMode = true }: VehiclesScreenProps = {}) {
  const [showRCModal, setShowRCModal] = useState(false);
  const [showLicenseModal, setShowLicenseModal] = useState(false);
  const [showChallanModal, setShowChallanModal] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [success, setSuccess] = useState(false);

  const myVehicles = [
    { number: 'TN 01 AB 1234', type: 'Car', model: 'Honda City', insurance: 'Valid till Dec 2026', status: 'Active' },
    { number: 'TN 09 CD 5678', type: 'Bike', model: 'Royal Enfield', insurance: 'Expires May 2026', status: 'Renewal Due' },
  ];

  const services = [
    { icon: FileText, title: 'Download RC', desc: 'Vehicle Registration', action: 'download' },
    { icon: CreditCard, title: 'Driving License', desc: 'Apply/Renew', action: 'license' },
    { icon: AlertCircle, title: 'Pay Challan', desc: 'Traffic Fines', action: 'challan' },
    { icon: Calendar, title: 'Book Slot', desc: 'RTO Appointment', action: 'slot' },
  ];

  const handleDownloadRC = () => {
    if (!vehicleNumber) { toast.error('Please enter vehicle number'); return; }
    setSuccess(true);
    toast.success('RC Downloaded! 📄', { description: `Vehicle: ${vehicleNumber} • DigiLocker synced • Valid across India`, duration: 4000 });
  };

  const handleLicenseApplication = () => {
    if (!licenseNumber) { toast.error('Please provide license number'); return; }
    const appId = 'DL' + Math.floor(Math.random() * 90000 + 10000);
    setSuccess(true);
    toast.success(`DL Application #${appId} Submitted!`, { description: 'Test slot: Jun 20, 2026 • Fee: ₹200 paid • License in 15 days', duration: 5000 });
  };

  const handlePayChallan = () => {
    setSuccess(true);
    toast.success('Challan Paid! ✅', { description: `TN 01 AB 1234 • ₹500 paid • TXN: CH${Math.floor(Math.random()*1000000)} • Challan cleared`, duration: 4000 });
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-white mb-1">Vehicle Services</h1>
        <p className="text-gray-400">வாகன சேவைகள் | RTO Tamil Nadu</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6"
      >
        <h3 className="text-white mb-3">My Vehicles</h3>
        <div className="space-y-3">
          {myVehicles.map((vehicle, idx) => (
            <GlassCard key={idx} className={vehicle.status === 'Renewal Due' ? 'border border-yellow-600/30' : ''}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white mb-1">{vehicle.number}</h3>
                  <p className="text-gray-400" style={{ fontSize: '12px' }}>
                    {vehicle.model} • {vehicle.type}
                  </p>
                </div>
                <Car className="w-8 h-8 text-blue-400" />
              </div>
              <div className="flex items-center justify-between">
                <div className="text-gray-400" style={{ fontSize: '11px' }}>
                  Insurance: {vehicle.insurance}
                </div>
                <div className={`px-2 py-1 rounded-full ${
                  vehicle.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`} style={{ fontSize: '11px' }}>
                  {vehicle.status}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-white mb-3">RTO Services</h3>
        <div className="grid grid-cols-2 gap-3">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <GlassCard
                key={idx}
                onClick={() => {
                  if (service.action === 'download') setShowRCModal(true);
                  else if (service.action === 'license') setShowLicenseModal(true);
                  else if (service.action === 'challan') setShowChallanModal(true);
                  else toast.success('RTO Slot Booked!', { description: 'Slot: Jun 22, 2026 at 10:00 AM • Anna Nagar RTO • Ref: RTO' + Math.floor(Math.random()*90000+10000) });
                }}
                className="cursor-pointer hover:bg-white/10 transition-colors"
              >
                <Icon className="w-8 h-8 text-purple-400 mb-2" />
                <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>
                  {service.title}
                </h4>
                <p className="text-gray-400" style={{ fontSize: '11px' }}>
                  {service.desc}
                </p>
              </GlassCard>
            );
          })}
        </div>
      </motion.div>

      {/* Download RC Modal */}
      <Modal isOpen={showRCModal} onClose={() => setShowRCModal(false)} title="Download RC">
        {!success ? (
          <div className="space-y-4">
            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-white mb-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span className="font-medium">Vehicle Registration Certificate</span>
              </div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>
                Digital RC - Valid across India
              </div>
            </div>

            <div>
              <label className="text-white mb-2 block">Vehicle Number</label>
              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
                placeholder="TN 01 AB 1234"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500"
              />
            </div>

            <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
              <p className="text-white mb-1" style={{ fontSize: '12px' }}>What you'll get:</p>
              <ul className="text-gray-400 space-y-1" style={{ fontSize: '11px' }}>
                <li>• Digital RC certificate (PDF)</li>
                <li>• Owner and vehicle details</li>
                <li>• Valid for traffic checks</li>
                <li>• Synced to DigiLocker</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowRCModal(false)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDownloadRC}
                className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow font-medium flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download RC
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-white mb-2">RC Downloaded!</h3>
            <p className="text-gray-400">Saving to device...</p>
          </div>
        )}
      </Modal>

      {/* Driving License Modal */}
      <Modal isOpen={showLicenseModal} onClose={() => setShowLicenseModal(false)} title="Driving License">
        {!success ? (
          <div className="space-y-4">
            <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-white mb-2">
                <CreditCard className="w-5 h-5 text-purple-400" />
                <span className="font-medium">Apply / Renew License</span>
              </div>
            </div>

            <div>
              <label className="text-white mb-2 block">Service Type</label>
              <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500">
                <option>New License</option>
                <option>Renewal</option>
                <option>Duplicate</option>
                <option>Add Vehicle Class</option>
              </select>
            </div>

            <div>
              <label className="text-white mb-2 block">Existing License Number (if any)</label>
              <input
                type="text"
                value={licenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value.toUpperCase())}
                placeholder="TN0120230012345"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500"
              />
            </div>

            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3">
              <p className="text-white mb-1" style={{ fontSize: '12px' }}>Required Documents:</p>
              <ul className="text-gray-400 space-y-1" style={{ fontSize: '11px' }}>
                <li>• Aadhaar card</li>
                <li>• Passport size photo</li>
                <li>• Address proof</li>
                <li>• Medical certificate (if needed)</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowLicenseModal(false)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLicenseApplication}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow font-medium"
              >
                Submit Application
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-white mb-2">Application Submitted!</h3>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2 mt-2">
              <div className="text-gray-400" style={{ fontSize: '11px' }}>✅ Documents verified</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>📅 Test slot assigned</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>📱 SMS confirmation sent</div>
            </div>
            <button onClick={() => { setShowLicenseModal(false); setSuccess(false); setLicenseNumber(''); }} className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>

      {/* Pay Challan Modal */}
      <Modal isOpen={showChallanModal} onClose={() => setShowChallanModal(false)} title="Pay Traffic Challan">
        {!success ? (
          <div className="space-y-4">
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-white mb-3">
                <AlertCircle className="w-5 h-5 text-red-400" />
                <span className="font-medium">Pending Challan</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400" style={{ fontSize: '11px' }}>Vehicle</span>
                  <span className="text-white" style={{ fontSize: '11px' }}>TN 01 AB 1234</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400" style={{ fontSize: '11px' }}>Violation</span>
                  <span className="text-white" style={{ fontSize: '11px' }}>Over Speeding</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400" style={{ fontSize: '11px' }}>Date</span>
                  <span className="text-white" style={{ fontSize: '11px' }}>May 10, 2026</span>
                </div>
                <div className="flex justify-between items-center border-t border-white/10 pt-2 mt-2">
                  <span className="text-white">Fine Amount</span>
                  <span className="text-red-400 text-xl font-bold">₹500</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-white mb-2 block">Payment Method</label>
              <div className="space-y-2">
                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'wallet' ? 'bg-purple-600/20 border-purple-500' : 'bg-white/5 border-white/10'
                }`}>
                  <input
                    type="radio"
                    name="challanPayment"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="text-white">TN Digital Wallet</div>
                    <div className="text-gray-400" style={{ fontSize: '11px' }}>Balance: ₹12,450</div>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                  paymentMethod === 'upi' ? 'bg-purple-600/20 border-purple-500' : 'bg-white/5 border-white/10'
                }`}>
                  <input
                    type="radio"
                    name="challanPayment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <div className="flex-1">
                    <div className="text-white">UPI</div>
                    <div className="text-gray-400" style={{ fontSize: '11px' }}>PhonePe, GPay</div>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowChallanModal(false)}
                className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePayChallan}
                className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow font-medium"
              >
                Pay ₹500
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-white mb-2">Challan Paid!</h3>
            <p className="text-gray-400">Processing payment...</p>
          </div>
        )}
      </Modal>
    </div>
  );
}
