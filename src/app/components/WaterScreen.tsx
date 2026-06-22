import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { Droplet, Clock, MapPin, Calendar, AlertTriangle, TrendingUp, Check, Download, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface WaterScreenProps {
  darkMode?: boolean;
  onBack?: () => void;
}

export function WaterScreen({ onBack, darkMode = true }: WaterScreenProps = {}) {
  const [showPayment, setShowPayment] = useState(false);
  const [showReportIssue, setShowReportIssue] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [issueType, setIssueType] = useState('');
  const [issueDetails, setIssueDetails] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const supplySchedule = [
    { area: 'Anna Nagar', time: '6:00 AM - 8:00 AM', status: 'active', pressure: 'High' },
    { area: 'Anna Nagar', time: '6:00 PM - 8:00 PM', status: 'scheduled', pressure: 'Medium' },
  ];

  const [payPaid, setPayPaid] = useState(false);

  const handlePayment = () => {
    setPayPaid(true);
    toast.success('Water Bill Paid ✅', {
      description: `₹156 paid • TXN: WTR${Math.floor(Math.random()*1000000)} • Receipt sent to mobile`,
      duration: 4000,
    });
  };

  const handleReportIssue = () => {
    if (!issueType || !issueDetails) { toast.error('Please select issue type and provide details'); return; }
    const issueId = 'WTR' + Math.floor(Math.random() * 90000 + 10000);
    setShowReportIssue(false); setIssueType(''); setIssueDetails('');
    toast.success(`Water Issue Reported 💧 #${issueId}`, {
      description: `Type: ${issueType} • Field team investigating • Resolution: 24–48 hrs`,
      duration: 5000,
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
        <h1 className="text-white mb-1">Water Supply</h1>
        <p className="text-gray-400">தண்ணீர் வழங்கல் | Metro Water Services</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-6"
      >
        <GlassCard className="relative overflow-hidden bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-400 mb-1" style={{ fontSize: '12px' }}>
                Consumer Number
              </p>
              <h2 className="text-white mb-2">WTR987654</h2>
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3 text-cyan-400" />
                <p className="text-gray-400" style={{ fontSize: '11px' }}>
                  Anna Nagar, Zone 3
                </p>
              </div>
            </div>
            <Droplet className="w-12 h-12 text-cyan-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>
                Current Bill
              </p>
              <p className="text-cyan-400">₹156</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>
                Storage Level
              </p>
              <p className="text-green-400">78%</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <h3 className="text-white mb-3">Today's Supply Schedule</h3>
        <div className="space-y-3">
          {supplySchedule.map((schedule, idx) => (
            <GlassCard key={idx}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span className="text-white">{schedule.time}</span>
                </div>
                <div
                  className={`px-2 py-1 rounded-full ${
                    schedule.status === 'active'
                      ? 'bg-green-500/20 text-green-400 animate-pulse'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                  style={{ fontSize: '11px' }}
                >
                  {schedule.status === 'active' ? 'Active Now' : 'Scheduled'}
                </div>
              </div>
              <div className="flex items-center gap-4 text-gray-400" style={{ fontSize: '11px' }}>
                <span>Pressure: {schedule.pressure}</span>
                <span>Area: {schedule.area}</span>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <h3 className="text-white mb-3">Current Bill</h3>
        <GlassCard>
          <div className="space-y-3 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Water Charges</span>
              <span className="text-white">₹120</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-400">Sewage Charges</span>
              <span className="text-white">₹36</span>
            </div>
            <div className="h-px bg-white/10" />
            <div className="flex items-center justify-between">
              <span className="text-white">Total Amount</span>
              <span className="text-cyan-400">₹156</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setShowPayment(true)}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-3 rounded-lg text-white hover:shadow-lg transition-shadow font-medium"
            >
              Pay Now
            </button>
            <button className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              Download
            </button>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h3 className="text-white mb-3">Report Issues</h3>
        <div className="grid grid-cols-2 gap-3">
          <GlassCard
            onClick={() => {
              setIssueType('No Water Supply');
              setShowReportIssue(true);
            }}
            className="cursor-pointer hover:bg-white/10 transition-colors"
          >
            <AlertTriangle className="w-8 h-8 text-red-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>
              No Supply
            </h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>
              Report no water
            </p>
          </GlassCard>

          <GlassCard
            onClick={() => {
              setIssueType('Water Leakage');
              setShowReportIssue(true);
            }}
            className="cursor-pointer hover:bg-white/10 transition-colors"
          >
            <Droplet className="w-8 h-8 text-blue-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>
              Leakage
            </h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>
              Report leakage
            </p>
          </GlassCard>

          <GlassCard className="cursor-pointer hover:bg-white/10 transition-colors">
            <TrendingUp className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>
              Usage
            </h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>
              Track consumption
            </p>
          </GlassCard>

          <GlassCard className="cursor-pointer hover:bg-white/10 transition-colors">
            <Calendar className="w-8 h-8 text-green-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>
              Schedule
            </h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>
              Weekly schedule
            </p>
          </GlassCard>
        </div>
      </motion.div>

      {/* Payment Modal */}
      <Modal isOpen={showPayment} onClose={() => setShowPayment(false)} title="Pay Water Bill">
        {!paymentSuccess ? (
          <div className="space-y-4">
            <div className="bg-cyan-600/20 border border-cyan-600/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Bill Amount</span>
                <span className="text-white text-2xl font-bold">₹156</span>
              </div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>
                Consumer: WTR987654 • Due: May 25, 2026
              </div>
            </div>

            <div>
              <label className="text-white mb-2 block">Payment Method</label>
              <div className="space-y-2">
                {['wallet', 'upi', 'card'].map((method) => (
                  <label key={method} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                    paymentMethod === method ? 'bg-purple-600/20 border-purple-500' : 'bg-white/5 border-white/10'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-4 h-4"
                    />
                    <div className="flex-1">
                      <div className="text-white">
                        {method === 'wallet' ? 'TN Digital Wallet' : method === 'upi' ? 'UPI' : 'Credit/Debit Card'}
                      </div>
                      <div className="text-gray-400" style={{ fontSize: '11px' }}>
                        {method === 'wallet' ? 'Balance: ₹12,450' : method === 'upi' ? 'PhonePe, GPay, Paytm' : 'Visa, Mastercard, RuPay'}
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button onClick={() => setShowPayment(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10">
                Cancel
              </button>
              <button onClick={handlePayment} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg px-4 py-3 text-white hover:shadow-lg font-medium">
                Pay ₹156
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">Payment Successful!</h3>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2">
              <div className="flex justify-between"><span className="text-gray-400" style={{ fontSize: '11px' }}>Amount</span><span className="text-white" style={{ fontSize: '11px' }}>₹156</span></div>
              <div className="flex justify-between"><span className="text-gray-400" style={{ fontSize: '11px' }}>Method</span><span className="text-white" style={{ fontSize: '11px' }}>{paymentMethod === 'wallet' ? 'TN Wallet' : paymentMethod.toUpperCase()}</span></div>
              <div className="flex justify-between"><span className="text-gray-400" style={{ fontSize: '11px' }}>Next Bill</span><span className="text-white" style={{ fontSize: '11px' }}>Jul 2026</span></div>
            </div>
            <button onClick={() => { setShowPayment(false); setPayPaid(false); setPaymentSuccess(false); }} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>

      {/* Report Issue Modal */}
      <Modal isOpen={showReportIssue} onClose={() => setShowReportIssue(false)} title="Report Water Issue">
        <div className="space-y-4">
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
            <div className="flex items-center gap-2 text-white mb-2">
              <Droplet className="w-5 h-5 text-blue-400" />
              <span className="font-medium">{issueType || 'Water Issue'}</span>
            </div>
            <div className="text-gray-400" style={{ fontSize: '11px' }}>
              Location: Anna Nagar, Zone 3 (Auto-detected)
            </div>
          </div>

          <div>
            <label className="text-white mb-2 block">Issue Type</label>
            <select value={issueType} onChange={(e) => setIssueType(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500">
              <option value="">Select issue type</option>
              {['No Water Supply', 'Water Leakage', 'Low Pressure', 'Dirty Water', 'Pipeline Burst', 'Other'].map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-white mb-2 block">Describe the Issue</label>
            <textarea value={issueDetails} onChange={(e) => setIssueDetails(e.target.value)} placeholder="No water supply since morning 6 AM..." className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 h-24 resize-none" />
          </div>

          <div className="bg-cyan-600/20 border border-cyan-600/30 rounded-lg p-3">
            <p className="text-white mb-1" style={{ fontSize: '12px' }}>What happens next:</p>
            <ul className="text-gray-400 space-y-1" style={{ fontSize: '11px' }}>
              <li>• Metro Water field team notified</li>
              <li>• SMS updates on resolution</li>
              <li>• Expected time: 24-48 hours</li>
            </ul>
          </div>

          <div className="flex gap-3 pt-2">
            <button onClick={() => setShowReportIssue(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10">
              Cancel
            </button>
            <button onClick={handleReportIssue} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg px-4 py-3 text-white hover:shadow-lg">
              Report Issue
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
