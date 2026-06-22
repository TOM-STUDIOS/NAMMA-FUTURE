import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import {
  Camera, Mic, MapPin, Send, Clock, CheckCircle, AlertCircle,
  Activity, ChevronRight, Image, FileText, Star, BarChart2
} from 'lucide-react';

interface Props { onBack?: () => void; darkMode?: boolean; }

const COMPLAINT_TYPES = [
  { id: 'pothole',     label: 'Pothole',      labelTa: 'குழி',         icon: '🕳️' },
  { id: 'water',       label: 'Water Leakage',labelTa: 'தண்ணீர் கசிவு',icon: '💧' },
  { id: 'garbage',     label: 'Garbage',      labelTa: 'குப்பை',       icon: '🗑️' },
  { id: 'streetlight', label: 'Street Light', labelTa: 'தெரு விளக்கு', icon: '💡' },
  { id: 'drainage',    label: 'Drainage',     labelTa: 'வடிகால்',      icon: '🌊' },
  { id: 'encroachment',label: 'Encroachment', labelTa: 'ஆக்கிரமிப்பு',icon: '🚧' },
  { id: 'corruption',  label: 'Corruption',   labelTa: 'ஊழல்',         icon: '⚠️' },
  { id: 'other',       label: 'Other',        labelTa: 'மற்றவை',       icon: '📋' },
];

const DEPTS: Record<string, string> = {
  pothole: 'Highways Dept',  water: 'Metro Water', garbage: 'Corporation',
  streetlight: 'TANGEDCO', drainage: 'Municipality', encroachment: 'Revenue Dept',
  corruption: 'Vigilance & AC', other: 'District Collector',
};

export function ComplaintsScreen({ onBack, darkMode = true }: Props = {}) {
  const [showModal, setShowModal]           = useState(false);
  const [showTrack, setShowTrack]           = useState<null | typeof myComplaints[0]>(null);
  const [step, setStep]                     = useState<1|2|3|4>(1);
  const [selType, setSelType]               = useState('');
  const [description, setDescription]      = useState('');
  const [location, setLocation]            = useState('');
  const [pincode, setPincode]              = useState('');
  const [priority, setPriority]            = useState<'Low'|'Medium'|'High'>('Medium');
  const [attachPhoto, setAttachPhoto]      = useState(false);
  const [attachLocation, setAttachLocation]= useState(true);
  const [newComplaintId, setNewComplaintId]= useState('');

  const [myComplaints, setMyComplaints]    = useState([
    { id: 'C12345', type: 'Pothole',        typeTa: 'குழி',         location: 'Anna Salai, Chennai',  status: 'In Progress', date: 'Jun 8, 2026',  progress: 60, color: 'yellow', dept: 'Highways Dept',   steps: ['Received','Assigned','In Progress','Resolved'], curStep: 2 },
    { id: 'C12344', type: 'Water Leakage',  typeTa: 'தண்ணீர் கசிவு', location: 'T Nagar, Chennai',     status: 'Resolved',    date: 'Jun 5, 2026',  progress: 100, color: 'green', dept: 'Metro Water',     steps: ['Received','Assigned','In Progress','Resolved'], curStep: 3 },
    { id: 'C12343', type: 'Street Light',   typeTa: 'தெரு விளக்கு', location: 'Adyar, Chennai',        status: 'Assigned',    date: 'Jun 7, 2026',  progress: 30, color: 'blue', dept: 'TANGEDCO',        steps: ['Received','Assigned','In Progress','Resolved'], curStep: 1 },
  ]);

  const stats = [
    { label: 'Total Filed',  value: myComplaints.length,                                    color: 'text-purple-400' },
    { label: 'Resolved',     value: myComplaints.filter(c => c.status === 'Resolved').length, color: 'text-green-400'  },
    { label: 'In Progress',  value: myComplaints.filter(c => c.status !== 'Resolved').length, color: 'text-yellow-400' },
  ];

  const handleDetectLocation = () => {
    setLocation('Anna Nagar, Chennai - 600040');
    toast.success('Location detected', { description: 'Anna Nagar, Chennai - 600040' });
  };

  const handleSubmit = async () => {
    const id = 'C' + (Math.floor(Math.random() * 90000) + 10000);
    setNewComplaintId(id);
    const typeData = COMPLAINT_TYPES.find(t => t.id === selType);
    setMyComplaints(prev => [{
      id, type: typeData?.label || 'Other', typeTa: typeData?.labelTa || 'மற்றவை',
      location: location || 'Location not specified',
      status: 'Received', date: 'Today', progress: 10, color: 'blue',
      dept: DEPTS[selType] || 'District Collector',
      steps: ['Received','Assigned','In Progress','Resolved'], curStep: 0,
    }, ...prev]);
    setStep(4);
    toast.success(`Complaint Filed! 📋`, { description: `ID: ${id} • AI routing to ${DEPTS[selType] || 'authority'}` });
  };

  const openModal = (typeId?: string) => {
    setSelType(typeId || ''); setDescription(''); setLocation(''); setPincode('');
    setPriority('Medium'); setAttachPhoto(false); setAttachLocation(true);
    setStep(typeId ? 2 : 1); setShowModal(true);
  };

  const typeData = COMPLAINT_TYPES.find(t => t.id === selType);

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-white mb-1">Smart Complaints</h1>
        <p className="text-gray-400">ஸ்மார்ட் புகார் அமைப்பு | AI Auto-Routing</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}>
            <GlassCard>
              <div className={`mb-1 ${s.color}`}>{s.value}</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>{s.label}</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* File new complaint banner */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="mb-5">
        <GlassCard onClick={() => openModal()} className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 cursor-pointer hover:from-purple-600/30 hover:to-pink-600/30 transition-all">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white mb-2">File New Complaint</h2>
              <p className="text-gray-400 mb-3" style={{ fontSize: '12px' }}>Photo • GPS Location • Voice • AI Routing</p>
              <div className="flex gap-2">
                {[Camera, Mic, MapPin].map((Icon, i) => (
                  <div key={i} className="w-8 h-8 rounded-lg bg-purple-600/30 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                ))}
              </div>
            </div>
            <Send className="w-12 h-12 text-purple-400" />
          </div>
        </GlassCard>
      </motion.div>

      {/* Quick types */}
      <h3 className="text-white mb-3">Quick File by Type</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mb-6">
        {COMPLAINT_TYPES.map(type => (
          <button
            key={type.id}
            onClick={() => openModal(type.id)}
            className="lm-card backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-3 text-center cursor-pointer hover:bg-white/10 transition-all duration-300 overflow-hidden w-full"
          >
            <div style={{ fontSize: '22px', lineHeight: 1 }} className="mb-2">{type.icon}</div>
            <div className="text-white truncate" style={{ fontSize: '11px', fontWeight: 500 }}>{type.label}</div>
            <div className="text-gray-400 truncate" style={{ fontSize: '11px' }}>{type.labelTa}</div>
          </button>
        ))}
      </div>

      {/* My Complaints */}
      <h3 className="text-white mb-3">My Complaints</h3>
      <div className="space-y-3">
        {myComplaints.map((complaint, idx) => (
          <motion.div key={complaint.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
            <GlassCard>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white">{complaint.type}</h4>
                    <div className={`px-2 py-1 rounded-full flex items-center gap-1 ${
                      complaint.color === 'green' ? 'bg-green-500/20 text-green-400' :
                      complaint.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`} style={{ fontSize: '11px' }}>
                      {complaint.status === 'Resolved' && <CheckCircle className="w-3 h-3" />}
                      {complaint.status === 'In Progress' && <Activity className="w-3 h-3" />}
                      {complaint.status === 'Received' && <Clock className="w-3 h-3" />}
                      {complaint.status}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <MapPin className="w-3 h-3" /><span style={{ fontSize: '11px' }}>{complaint.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-3 h-3" /><span style={{ fontSize: '11px' }}>Filed: {complaint.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white mb-1" style={{ fontSize: '12px' }}>#{complaint.id}</div>
                  <div className="text-gray-500" style={{ fontSize: '11px' }}>{complaint.dept}</div>
                </div>
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400" style={{ fontSize: '11px' }}>Resolution Progress</span>
                  <span className="text-white" style={{ fontSize: '11px' }}>{complaint.progress}%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }} animate={{ width: `${complaint.progress}%` }}
                    transition={{ delay: 0.5 + idx * 0.1, duration: 0.5 }}
                    className={`h-full rounded-full ${
                      complaint.color === 'green' ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                      complaint.color === 'yellow' ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      'bg-gradient-to-r from-blue-500 to-cyan-500'
                    }`}
                  />
                </div>
              </div>

              <button onClick={() => setShowTrack(complaint)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg text-white hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                style={{ fontSize: '12px' }}>
                Track Live Status <ChevronRight className="w-3 h-3" />
              </button>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* ── FILE COMPLAINT MODAL ── */}
      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="File Complaint" darkMode={darkMode}>
        {/* Step 1: Select Type */}
        {step === 1 && (
          <div className="space-y-4">
            <p className="text-gray-400" style={{ fontSize: '12px' }}>Step 1 of 3 — Select Category</p>
            <div className="grid grid-cols-2 gap-2">
              {COMPLAINT_TYPES.map(type => (
                <button key={type.id} onClick={() => { setSelType(type.id); setStep(2); }}
                  className={`p-3 rounded-lg border text-left transition-all overflow-hidden ${selType === type.id ? 'border-purple-500 bg-purple-600/20' : 'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                  <div style={{ fontSize: '18px', lineHeight: 1 }} className="mb-1">{type.icon}</div>
                  <div className="text-white truncate" style={{ fontSize: '12px' }}>{type.label}</div>
                  <div className="text-gray-400 truncate" style={{ fontSize: '11px' }}>{type.labelTa}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {step === 2 && typeData && (
          <div className="space-y-4">
            <p className="text-gray-400" style={{ fontSize: '12px' }}>Step 2 of 3 — Complaint Details</p>
            <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-3 flex items-center gap-2">
              <span style={{ fontSize: '20px' }}>{typeData.icon}</span>
              <div>
                <div className="text-white" style={{ fontSize: '12px' }}>{typeData.label}</div>
                <div className="text-gray-400" style={{ fontSize: '11px' }}>Routing to: {DEPTS[selType]}</div>
              </div>
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Location / Address *</label>
              <div className="flex gap-2">
                <input type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Enter location or street"
                  className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" style={{ fontSize: '12px' }} />
                <button onClick={handleDetectLocation} className="px-3 bg-purple-600/20 border border-purple-600/30 rounded-lg">
                  <MapPin className="w-4 h-4 text-purple-400" />
                </button>
              </div>
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Pincode</label>
              <input type="text" value={pincode} onChange={e => setPincode(e.target.value.slice(0,6))} placeholder="600001"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Description *</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
                placeholder="Describe the issue in detail..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 resize-none" style={{ fontSize: '12px' }} />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Priority</label>
              <div className="flex gap-2">
                {(['Low', 'Medium', 'High'] as const).map(p => (
                  <button key={p} onClick={() => setPriority(p)}
                    className={`flex-1 py-2 rounded-lg transition-all ${priority === p ? (p === 'High' ? 'bg-red-600 text-white' : p === 'Medium' ? 'bg-yellow-600 text-white' : 'bg-green-600 text-white') : 'bg-white/5 text-gray-400'}`}
                    style={{ fontSize: '12px' }}>{p}</button>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 flex-1 p-3 bg-white/5 rounded-lg cursor-pointer">
                <input type="checkbox" checked={attachPhoto} onChange={e => setAttachPhoto(e.target.checked)} />
                <Camera className="w-4 h-4 text-purple-400" />
                <span className="text-white" style={{ fontSize: '11px' }}>Attach Photo</span>
              </label>
              <label className="flex items-center gap-2 flex-1 p-3 bg-white/5 rounded-lg cursor-pointer">
                <input type="checkbox" checked={attachLocation} onChange={e => setAttachLocation(e.target.checked)} />
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-white" style={{ fontSize: '11px' }}>Share GPS</span>
              </label>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(1)} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-gray-400" style={{ fontSize: '12px' }}>← Back</button>
              <button onClick={() => { if (!location || !description) { toast.error('Fill location and description'); return; } setStep(3); }}
                className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Review →</button>
            </div>
          </div>
        )}

        {/* Step 3: Review */}
        {step === 3 && typeData && (
          <div className="space-y-4">
            <p className="text-gray-400" style={{ fontSize: '12px' }}>Step 3 of 3 — Review & Submit</p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              {[
                { label: 'Category',   value: `${typeData.icon} ${typeData.label}` },
                { label: 'Dept',       value: DEPTS[selType] },
                { label: 'Location',   value: location },
                { label: 'Priority',   value: priority },
                { label: 'Description',value: description },
              ].map(row => (
                <div key={row.label}>
                  <span className="text-gray-400" style={{ fontSize: '11px' }}>{row.label}</span>
                  <div className="text-white mt-0.5" style={{ fontSize: '12px' }}>{row.value}</div>
                </div>
              ))}
            </div>
            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3">
              <p className="text-blue-400" style={{ fontSize: '11px' }}>AI routing will assign to {DEPTS[selType]} • Expected resolution: 3–7 days</p>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setStep(2)} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-gray-400" style={{ fontSize: '12px' }}>← Edit</button>
              <button onClick={handleSubmit} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Submit Complaint</button>
            </div>
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">Complaint Filed!</h3>
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>Complaint ID</div>
              <div className="text-green-400" style={{ fontSize: '24px', fontWeight: 800 }}>#{newComplaintId}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 space-y-2 text-left">
              <div className="text-gray-400" style={{ fontSize: '11px' }}>✅ Routed to {DEPTS[selType]}</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>📱 SMS confirmation sent</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>⏱️ Expected: 3–7 working days</div>
            </div>
            <button onClick={() => setShowModal(false)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Track Status</button>
          </div>
        )}
      </Modal>

      {/* ── TRACK STATUS MODAL ── */}
      {showTrack && (
        <Modal isOpen={!!showTrack} onClose={() => setShowTrack(null)} title={`Track #${showTrack.id}`} darkMode={darkMode}>
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
              <div className="flex justify-between"><span className="text-gray-400" style={{ fontSize: '11px' }}>Type</span><span className="text-white" style={{ fontSize: '11px' }}>{showTrack.type}</span></div>
              <div className="flex justify-between"><span className="text-gray-400" style={{ fontSize: '11px' }}>Location</span><span className="text-white" style={{ fontSize: '11px' }}>{showTrack.location}</span></div>
              <div className="flex justify-between"><span className="text-gray-400" style={{ fontSize: '11px' }}>Dept</span><span className="text-white" style={{ fontSize: '11px' }}>{showTrack.dept}</span></div>
              <div className="flex justify-between"><span className="text-gray-400" style={{ fontSize: '11px' }}>Filed</span><span className="text-white" style={{ fontSize: '11px' }}>{showTrack.date}</span></div>
            </div>

            {/* Step tracker */}
            <h4 className="text-white" style={{ fontSize: '13px' }}>Resolution Progress</h4>
            <div className="space-y-3">
              {showTrack.steps.map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${i <= showTrack.curStep ? 'bg-gradient-to-br from-purple-600 to-pink-600' : 'bg-white/10'}`}>
                    {i <= showTrack.curStep ? <CheckCircle className="w-4 h-4 text-white" /> : <div className="w-3 h-3 rounded-full bg-white/30" />}
                  </div>
                  <div className="flex-1">
                    <div className={i <= showTrack.curStep ? 'text-white' : 'text-gray-500'} style={{ fontSize: '12px' }}>{s}</div>
                    {i === showTrack.curStep && <div className="text-purple-400" style={{ fontSize: '11px' }}>Current Status</div>}
                  </div>
                  {i <= showTrack.curStep && <CheckCircle className="w-4 h-4 text-green-400" />}
                </div>
              ))}
            </div>

            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full" style={{ width: `${showTrack.progress}%` }} />
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400" style={{ fontSize: '11px' }}>Overall Progress</span>
              <span className="text-white" style={{ fontSize: '11px' }}>{showTrack.progress}%</span>
            </div>

            <button
              onClick={() => { toast.success('Escalated ⬆️', { description: 'Complaint escalated to District Collector.' }); setShowTrack(null); }}
              className="w-full bg-red-600/20 border border-red-600/30 rounded-lg py-3 text-red-400 hover:bg-red-600/30 transition-colors"
              style={{ fontSize: '12px' }}>
              Escalate to Higher Authority
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
