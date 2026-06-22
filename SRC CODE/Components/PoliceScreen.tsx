import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { Shield, FileText, AlertCircle, Phone, Check, Upload, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface PoliceScreenProps {
  darkMode?: boolean;
  onBack?: () => void;
}

export function PoliceScreen({ onBack, darkMode = true }: PoliceScreenProps = {}) {
  const [showFIRModal, setShowFIRModal] = useState(false);
  const [showNOCModal, setShowNOCModal] = useState(false);
  const [complaintType, setComplaintType] = useState('');
  const [description, setDescription] = useState('');
  const [nocType, setNocType] = useState('');
  const [success, setSuccess] = useState(false);

  const services = [
    { icon: FileText, title: 'File FIR', desc: 'Online complaint', action: 'fir' },
    { icon: Shield, title: 'Apply NOC', desc: 'No Objection Certificate', action: 'noc' },
    { icon: AlertCircle, title: 'Lost & Found', desc: 'Report lost items', action: 'lost' },
    { icon: Phone, title: 'Emergency', desc: 'Call 100', action: 'emergency' },
  ];

  const [showLostFound, setShowLostFound] = useState(false);
  const [lostDesc, setLostDesc] = useState('');
  const [lostType, setLostType] = useState('');

  const handleFileFIR = () => {
    if (!complaintType || !description) { toast.error('Please fill all fields'); return; }
    const firNo = 'FIR' + Math.floor(Math.random() * 90000 + 10000);
    setSuccess(true);
    toast.success(`FIR Filed! #${firNo}`, { description: `Type: ${complaintType} • Assigned to Anna Nagar Station • Officer will contact you` });
  };

  const handleApplyNOC = () => {
    if (!nocType) { toast.error('Please select NOC type'); return; }
    const nocId = 'NOC' + Math.floor(Math.random() * 90000 + 10000);
    setSuccess(true);
    toast.success(`NOC Application #${nocId} Submitted!`, { description: `Type: ${nocType} • Ready in 7–15 days • SMS notification enabled` });
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-white mb-1">Police Services</h1>
        <p className="text-gray-400">காவல்துறை சேவைகள் | TN Police</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
        <GlassCard className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white mb-1">Emergency Helpline</h2>
              <p className="text-gray-400" style={{ fontSize: '12px' }}>24/7 Support Available</p>
            </div>
            <div className="text-right">
              <div className="text-red-400 text-2xl font-bold">100</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Police</div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h3 className="text-white mb-3">Police Services</h3>
        <div className="grid grid-cols-2 gap-3">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <GlassCard
                key={idx}
                onClick={() => {
                  if (service.action === 'fir') setShowFIRModal(true);
                  else if (service.action === 'noc') setShowNOCModal(true);
                  else if (service.action === 'lost') setShowLostFound(true);
                  else if (service.action === 'emergency') { toast.success('🚨 Calling 100 — TN Police', { description: 'Emergency dispatch activated • Your location shared • ETA 6 min', duration: 5000 }); }
                }}
                className="cursor-pointer hover:bg-white/10 transition-colors"
              >
                <Icon className={`w-8 h-8 mb-2 ${service.action === 'emergency' ? 'text-red-400' : 'text-blue-400'}`} />
                <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>{service.title}</h4>
                <p className="text-gray-400" style={{ fontSize: '11px' }}>{service.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </motion.div>

      {/* File FIR Modal */}
      <Modal isOpen={showFIRModal} onClose={() => setShowFIRModal(false)} title="File FIR Online">
        {!success ? (
          <div className="space-y-4">
            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-white mb-2">
                <FileText className="w-5 h-5 text-blue-400" />
                <span className="font-medium">First Information Report</span>
              </div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>
                Location: Anna Nagar Police Station (Auto-detected)
              </div>
            </div>

            <div>
              <label className="text-white mb-2 block">Complaint Type</label>
              <select
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
              >
                <option value="">Select type</option>
                <option value="Theft">Theft</option>
                <option value="Accident">Accident</option>
                <option value="Fraud">Fraud</option>
                <option value="Cyber Crime">Cyber Crime</option>
                <option value="Missing Person">Missing Person</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-white mb-2 block">Describe Incident</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide details of the incident..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 h-24 resize-none"
              />
            </div>

            <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3">
              <p className="text-white mb-1" style={{ fontSize: '12px' }}>What happens next:</p>
              <ul className="text-gray-400 space-y-1" style={{ fontSize: '11px' }}>
                <li>• FIR registered immediately</li>
                <li>• Investigation officer assigned</li>
                <li>• You'll be contacted for statement</li>
                <li>• Track status online anytime</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowFIRModal(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10">
                Cancel
              </button>
              <button onClick={handleFileFIR} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg px-4 py-3 text-white hover:shadow-lg font-medium">
                File FIR
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">FIR Filed Successfully!</h3>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2">
              <div className="text-gray-400" style={{ fontSize: '11px' }}>✅ FIR registered at Anna Nagar Station</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>👮 Investigation officer assigned</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>📱 SMS confirmation sent</div>
            </div>
            <button onClick={() => { setShowFIRModal(false); setSuccess(false); setComplaintType(''); setDescription(''); }} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>

      {/* Apply NOC Modal */}
      <Modal isOpen={showNOCModal} onClose={() => setShowNOCModal(false)} title="Apply for NOC">
        {!success ? (
          <div className="space-y-4">
            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-white mb-2">
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="font-medium">No Objection Certificate</span>
              </div>
            </div>

            <div>
              <label className="text-white mb-2 block">NOC Type</label>
              <select
                value={nocType}
                onChange={(e) => setNocType(e.target.value)}
                className="w-full rounded-lg px-4 py-3 outline-none focus:border-purple-500 border"
                style={{ backgroundColor: '#0f0a1f', color: '#ffffff', borderColor: 'rgba(255,255,255,0.15)' }}
              >
                <option value=""          style={{ backgroundColor: '#0f0a1f', color: '#ffffff' }}>Select NOC type</option>
                <option value="Character Verification" style={{ backgroundColor: '#0f0a1f', color: '#ffffff' }}>Character Verification</option>
                <option value="Passport"  style={{ backgroundColor: '#0f0a1f', color: '#ffffff' }}>Passport Verification</option>
                <option value="Tenant Verification"    style={{ backgroundColor: '#0f0a1f', color: '#ffffff' }}>Tenant Verification</option>
                <option value="Vehicle Transfer"       style={{ backgroundColor: '#0f0a1f', color: '#ffffff' }}>Vehicle Transfer</option>
                <option value="Other"     style={{ backgroundColor: '#0f0a1f', color: '#ffffff' }}>Other</option>
              </select>
            </div>

            <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
              <p className="text-white mb-1" style={{ fontSize: '12px' }}>Required Documents:</p>
              <ul className="text-gray-400 space-y-1" style={{ fontSize: '11px' }}>
                <li>• Aadhaar card</li>
                <li>• Address proof</li>
                <li>• Application form</li>
                <li>• Supporting documents</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowNOCModal(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10">
                Cancel
              </button>
              <button onClick={handleApplyNOC} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg px-4 py-3 text-white hover:shadow-lg font-medium">
                Submit Application
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">NOC Application Submitted!</h3>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2">
              <div className="text-gray-400" style={{ fontSize: '11px' }}>✅ Application received</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>⏱️ NOC ready in 7–15 days</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>📱 SMS notification enabled</div>
            </div>
            <button onClick={() => { setShowNOCModal(false); setSuccess(false); setNocType(''); }} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>

      {/* Lost & Found Modal */}
      <Modal isOpen={showLostFound} onClose={() => setShowLostFound(false)} title="Lost & Found">
        <div className="space-y-4">
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3">
            <p className="text-white" style={{ fontSize: '12px' }}>Report lost items or missing persons to police database</p>
          </div>
          <div>
            <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Type</label>
            <select value={lostType} onChange={e => setLostType(e.target.value)}
              className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500" style={{ backgroundColor: '#0a0a1a' }}>
              <option value="">Select type</option>
              <option value="Lost Item">Lost Item</option>
              <option value="Found Item">Found Item</option>
              <option value="Missing Person">Missing Person</option>
            </select>
          </div>
          <div>
            <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Description</label>
            <textarea value={lostDesc} onChange={e => setLostDesc(e.target.value)} rows={3} placeholder="Describe the item/person..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 resize-none" style={{ fontSize: '12px' }} />
          </div>
          <button onClick={() => {
            if (!lostType || !lostDesc) { toast.error('Fill all fields'); return; }
            setShowLostFound(false); setLostType(''); setLostDesc('');
            toast.success('Report Submitted!', { description: `Ref: LF${Math.floor(Math.random()*90000+10000)} • Added to TN Police database` });
          }} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>
            Submit Report
          </button>
        </div>
      </Modal>
    </div>
  );
}
