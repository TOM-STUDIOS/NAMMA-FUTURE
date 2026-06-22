import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { Home, FileText, DollarSign, MapPin, Check, Upload, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface HousingScreenProps {
  darkMode?: boolean;
  onBack?: () => void;
}

export function HousingScreen({ onBack, darkMode = true }: HousingScreenProps = {}) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [schemeType, setSchemeType] = useState('');
  const [incomeProof, setIncomeProof] = useState(false);
  const [success, setSuccess] = useState(false);

  const schemes = [
    { name: 'Pradhan Mantri Awas Yojana', amount: '₹2.5L subsidy', eligibility: 'Income < ₹6L/year', status: 'Active' },
    { name: 'TN Housing Board Scheme', amount: '₹1.2L loan', eligibility: 'First time buyer', status: 'Active' },
    { name: 'Women Housing Grant', amount: '₹50,000', eligibility: 'Women applicants', status: 'Active' },
  ];

  const handleApply = () => {
    if (!schemeType || !incomeProof) { toast.error('Please select scheme and upload income proof'); return; }
    const appId = 'HS' + Math.floor(Math.random() * 90000 + 10000);
    setSuccess(true);
    toast.success(`Housing Application #${appId} Submitted!`, {
      description: `Scheme: ${schemeType} • Site inspection in 7 days • Approval in 30–45 days`,
      duration: 5000,
    });
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-white mb-1">Housing Services</h1>
        <p className="text-gray-400">வீட்டு வசதி சேவைகள் | Affordable Housing</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h3 className="text-white mb-3">Available Housing Schemes</h3>
        <div className="space-y-3">
          {schemes.map((scheme, idx) => (
            <GlassCard key={idx}>
              <h4 className="text-white mb-2">{scheme.name}</h4>
              <div className="flex items-center gap-4 mb-2">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="text-green-400" style={{ fontSize: '12px' }}>{scheme.amount}</span>
                </div>
                <span className="text-gray-400" style={{ fontSize: '11px' }}>{scheme.eligibility}</span>
              </div>
              <button
                onClick={() => { setSchemeType(scheme.name); setShowApplyModal(true); }}
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 rounded-lg text-white hover:shadow-lg transition-shadow"
                style={{ fontSize: '12px' }}
              >
                Apply Now
              </button>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <Modal isOpen={showApplyModal} onClose={() => setShowApplyModal(false)} title="Apply for Housing Scheme">
        {!success ? (
          <div className="space-y-4">
            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
              <div className="text-white mb-1">{schemeType}</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Affordable housing for all</div>
            </div>
            <div>
              <label className="text-white mb-2 block">Upload Income Proof</label>
              <button
                onClick={() => setIncomeProof(true)}
                className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg border ${
                  incomeProof ? 'bg-green-600/20 border-green-500 text-green-400' : 'bg-white/5 border-white/10 text-white'
                }`}
              >
                {incomeProof ? <Check className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                {incomeProof ? 'Uploaded' : 'Upload Document'}
              </button>
            </div>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowApplyModal(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10">
                Cancel
              </button>
              <button onClick={handleApply} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg px-4 py-3 text-white hover:shadow-lg font-medium">
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">Application Submitted!</h3>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2">
              <div className="text-gray-400" style={{ fontSize: '11px' }}>✅ Documents under review</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>🏠 Site inspection in 7 days</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>⏱️ Loan approval in 30–45 days</div>
            </div>
            <button onClick={() => { setShowApplyModal(false); setSuccess(false); setSchemeType(''); setIncomeProof(false); }} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>
    </div>
  );
}
