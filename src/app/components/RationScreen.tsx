import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { ShoppingBag, MapPin, Package, Users, CheckCircle, Clock, Check, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

interface RationScreenProps {
  darkMode?: boolean;
  onBack?: () => void;
}

export function RationScreen({ onBack, darkMode = true }: RationScreenProps = {}) {
  // Apply new card
  const [showApplyModal, setShowApplyModal]         = useState(false);
  const [cardType, setCardType]                     = useState('');
  const [familyMembers, setFamilyMembers]           = useState('');
  const [applySuccess, setApplySuccess]             = useState(false);

  // Update members
  const [showUpdateModal, setShowUpdateModal]       = useState(false);
  const [updateAction, setUpdateAction]             = useState<'add' | 'remove'>('add');
  const [memberName, setMemberName]                 = useState('');
  const [memberRelation, setMemberRelation]         = useState('');
  const [memberAadhaar, setMemberAadhaar]           = useState('');
  const [updateSuccess, setUpdateSuccess]           = useState(false);

  // Transfer card
  const [showTransferModal, setShowTransferModal]   = useState(false);
  const [newAddress, setNewAddress]                 = useState('');
  const [newDistrict, setNewDistrict]               = useState('');
  const [transferReason, setTransferReason]         = useState('');
  const [transferSuccess, setTransferSuccess]       = useState(false);

  // Card status
  const [showStatusModal, setShowStatusModal]       = useState(false);
  const [statusAppId, setStatusAppId]               = useState('');
  const [statusResult, setStatusResult]             = useState<null | { step: number; msg: string }>(null);

  const myCard = {
    number: 'TN-CHN-123456',
    type: 'Priority Household',
    members: 4,
    status: 'Active',
    validTill: 'Dec 2026',
  };

  const monthlyQuota = [
    { item: 'Rice',     quota: '20 kg', collected: '20 kg', status: 'Collected' },
    { item: 'Wheat',    quota: '5 kg',  collected: '0 kg',  status: 'Pending'   },
    { item: 'Sugar',    quota: '2 kg',  collected: '2 kg',  status: 'Collected' },
    { item: 'Kerosene', quota: '3 L',   collected: '0 L',   status: 'Pending'   },
  ];

  const nearbyShops = [
    { name: 'PDS Shop – Anna Nagar', distance: '0.8 km', stock: 'Available', timing: '9 AM – 5 PM' },
    { name: 'PDS Shop – Kilpauk',    distance: '2.1 km', stock: 'Available', timing: '9 AM – 5 PM' },
  ];

  // ── handlers ──────────────────────────────────────────────

  const handleApplyCard = () => {
    if (!cardType || !familyMembers) { toast.error('Please fill all fields'); return; }
    const appId = 'RC' + (Math.floor(Math.random() * 90000) + 10000);
    setApplySuccess(true);
    toast.success(`Ration Card Application #${appId} Submitted!`, {
      description: `Type: ${cardType} • ${familyMembers} members • Card in 15–30 days`,
      duration: 5000,
    });
  };

  const handleUpdateMembers = () => {
    if (!memberName || !memberAadhaar || memberAadhaar.length < 12) {
      toast.error('Please fill all fields with valid Aadhaar');
      return;
    }
    const reqId = 'UPD' + (Math.floor(Math.random() * 90000) + 10000);
    setUpdateSuccess(true);
    toast.success(`Member Update #${reqId} Submitted!`, {
      description: `${updateAction === 'add' ? 'Added' : 'Removed'}: ${memberName} • Approved in 7 days`,
      duration: 5000,
    });
  };

  const handleTransfer = () => {
    if (!newAddress || !newDistrict) { toast.error('Please fill address and district'); return; }
    const reqId = 'TRF' + (Math.floor(Math.random() * 90000) + 10000);
    setTransferSuccess(true);
    toast.success(`Transfer Request #${reqId} Submitted!`, {
      description: `New District: ${newDistrict} • Processing in 15 days`,
      duration: 5000,
    });
  };

  const handleCheckStatus = () => {
    if (!statusAppId.trim()) { toast.error('Enter your application ID'); return; }
    // Simulate status lookup
    const step = Math.floor(Math.random() * 3) + 1;
    const msgs: Record<number, string> = {
      1: 'Documents received – pending verification',
      2: 'Verification in progress – field officer assigned',
      3: 'Approved – card printing in progress',
    };
    setStatusResult({ step, msg: msgs[step] });
  };

  const closeApply    = () => { setShowApplyModal(false);    setApplySuccess(false);    setCardType(''); setFamilyMembers(''); };
  const closeUpdate   = () => { setShowUpdateModal(false);   setUpdateSuccess(false);   setMemberName(''); setMemberAadhaar(''); setMemberRelation(''); };
  const closeTransfer = () => { setShowTransferModal(false); setTransferSuccess(false); setNewAddress(''); setNewDistrict(''); setTransferReason(''); };
  const closeStatus   = () => { setShowStatusModal(false);   setStatusResult(null);     setStatusAppId(''); };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-white mb-1">Ration Services</h1>
        <p className="text-gray-400">ரேஷன் சேவைகள் | PDS Tamil Nadu</p>
      </motion.div>

      {/* Ration card info */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
        <GlassCard className="bg-gradient-to-r from-green-600/20 to-emerald-600/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-400 mb-1" style={{ fontSize: '12px' }}>Ration Card Number</p>
              <h2 className="text-white mb-2">{myCard.number}</h2>
              <p className="text-gray-400" style={{ fontSize: '11px' }}>{myCard.type}</p>
            </div>
            <ShoppingBag className="w-12 h-12 text-green-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>Family Members</p>
              <p className="text-white">{myCard.members}</p>
            </div>
            <div>
              <p className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>Valid Till</p>
              <p className="text-green-400">{myCard.validTill}</p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Monthly quota */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
        <h3 className="text-white mb-3">June 2026 Quota</h3>
        <div className="space-y-3">
          {monthlyQuota.map((item, idx) => (
            <GlassCard key={idx}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="text-white mb-1">{item.item}</h4>
                  <p className="text-gray-400" style={{ fontSize: '11px' }}>
                    Quota: {item.quota} • Collected: {item.collected}
                  </p>
                </div>
                <div className={`px-3 py-1 rounded-full ${
                  item.status === 'Collected' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                }`} style={{ fontSize: '11px' }}>
                  {item.status}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Nearby shops */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6">
        <h3 className="text-white mb-3">Nearby PDS Shops</h3>
        <div className="space-y-3">
          {nearbyShops.map((shop, idx) => (
            <GlassCard key={idx}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white mb-1">{shop.name}</h4>
                  <div className="flex items-center gap-2 text-gray-400 mb-1">
                    <MapPin className="w-3 h-3" /><span style={{ fontSize: '11px' }}>{shop.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Clock className="w-3 h-3" /><span style={{ fontSize: '11px' }}>{shop.timing}</span>
                  </div>
                </div>
                <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full" style={{ fontSize: '11px' }}>
                  {shop.stock}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Quick actions — ALL 4 wired */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-white mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          <GlassCard onClick={() => setShowApplyModal(true)} className="cursor-pointer hover:bg-white/10 transition-colors">
            <Package className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>Apply New Card</h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>New application</p>
          </GlassCard>

          <GlassCard onClick={() => setShowUpdateModal(true)} className="cursor-pointer hover:bg-white/10 transition-colors">
            <Users className="w-8 h-8 text-blue-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>Update Members</h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>Add / Remove</p>
          </GlassCard>

          <GlassCard onClick={() => setShowTransferModal(true)} className="cursor-pointer hover:bg-white/10 transition-colors">
            <MapPin className="w-8 h-8 text-green-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>Transfer Card</h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>Change location</p>
          </GlassCard>

          <GlassCard onClick={() => setShowStatusModal(true)} className="cursor-pointer hover:bg-white/10 transition-colors">
            <CheckCircle className="w-8 h-8 text-yellow-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>Card Status</h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>Track application</p>
          </GlassCard>
        </div>
      </motion.div>

      {/* ── APPLY NEW CARD MODAL ── */}
      <Modal isOpen={showApplyModal} onClose={closeApply} title="Apply for Ration Card" darkMode={darkMode}>
        {!applySuccess ? (
          <div className="space-y-4">
            <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-green-400" />
              <span className="text-white" style={{ fontSize: '13px' }}>New Ration Card Application</span>
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Card Type</label>
              <select value={cardType} onChange={e => setCardType(e.target.value)}
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                style={{ backgroundColor: '#0a0a1a' }}>
                <option value="">Select card type</option>
                <option>Antyodaya Anna Yojana</option>
                <option>Priority Household</option>
                <option>Non-Priority Household</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Number of Family Members</label>
              <input type="number" value={familyMembers} onChange={e => setFamilyMembers(e.target.value)}
                placeholder="4" min="1"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" />
            </div>
            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3">
              <p className="text-white mb-1" style={{ fontSize: '12px' }}>Required Documents:</p>
              <ul className="text-gray-400 space-y-1" style={{ fontSize: '11px' }}>
                <li>• Aadhaar card (all members)</li>
                <li>• Address proof</li>
                <li>• Income certificate</li>
                <li>• Family photo</li>
              </ul>
            </div>
            <div className="flex gap-3">
              <button onClick={closeApply} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Cancel</button>
              <button onClick={handleApplyCard} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Submit Application</button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">Application Submitted!</h3>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2">
              <div className="text-gray-400" style={{ fontSize: '11px' }}>✅ Application registered</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>📋 Document verification pending</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>⏱️ Card issued in 15–30 days</div>
            </div>
            <button onClick={closeApply} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>

      {/* ── UPDATE MEMBERS MODAL ── */}
      <Modal isOpen={showUpdateModal} onClose={closeUpdate} title="Update Family Members" darkMode={darkMode}>
        {!updateSuccess ? (
          <div className="space-y-4">
            <div className="flex gap-2">
              {(['add', 'remove'] as const).map(a => (
                <button key={a} onClick={() => setUpdateAction(a)}
                  className={`flex-1 py-2 rounded-lg transition-all capitalize ${updateAction === a ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                  style={{ fontSize: '12px' }}>{a === 'add' ? '+ Add Member' : '– Remove Member'}</button>
              ))}
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Member Name</label>
              <input type="text" value={memberName} onChange={e => setMemberName(e.target.value)}
                placeholder="Full name as per Aadhaar"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Relation to Head</label>
              <select value={memberRelation} onChange={e => setMemberRelation(e.target.value)}
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                style={{ backgroundColor: '#0a0a1a' }}>
                <option value="">Select relation</option>
                <option>Spouse</option>
                <option>Son</option>
                <option>Daughter</option>
                <option>Parent</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Aadhaar Number (12 digits)</label>
              <input type="text" value={memberAadhaar}
                onChange={e => setMemberAadhaar(e.target.value.replace(/\D/g, '').slice(0, 12))}
                placeholder="Enter 12-digit Aadhaar"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" />
            </div>
            <div className="flex gap-3">
              <button onClick={closeUpdate} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Cancel</button>
              <button onClick={handleUpdateMembers} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Submit Request</button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">Request Submitted!</h3>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2">
              <div className="text-gray-400" style={{ fontSize: '11px' }}>
                {updateAction === 'add' ? '✅ Member addition request sent' : '✅ Member removal request sent'}
              </div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>📋 Aadhaar verification in progress</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>⏱️ Update reflected in 7 days</div>
            </div>
            <button onClick={closeUpdate} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>

      {/* ── TRANSFER CARD MODAL ── */}
      <Modal isOpen={showTransferModal} onClose={closeTransfer} title="Transfer Ration Card" darkMode={darkMode}>
        {!transferSuccess ? (
          <div className="space-y-4">
            <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
              <p className="text-white" style={{ fontSize: '12px' }}>Current: Chennai – Anna Nagar Zone</p>
              <p className="text-gray-400" style={{ fontSize: '11px' }}>Transfer to your new address within Tamil Nadu</p>
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>New Address</label>
              <textarea value={newAddress} onChange={e => setNewAddress(e.target.value)} rows={2}
                placeholder="Door No, Street, Area, Pincode"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 resize-none"
                style={{ fontSize: '12px' }} />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>New District</label>
              <input type="text" value={newDistrict} onChange={e => setNewDistrict(e.target.value)}
                placeholder="e.g. Coimbatore"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Reason for Transfer</label>
              <select value={transferReason} onChange={e => setTransferReason(e.target.value)}
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
                style={{ backgroundColor: '#0a0a1a' }}>
                <option value="">Select reason</option>
                <option>Job Transfer</option>
                <option>Marriage</option>
                <option>House Purchase</option>
                <option>Family Migration</option>
                <option>Other</option>
              </select>
            </div>
            <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3">
              <p className="text-yellow-400" style={{ fontSize: '11px' }}>
                ⚠️ Original card will be cancelled after transfer is approved
              </p>
            </div>
            <div className="flex gap-3">
              <button onClick={closeTransfer} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Cancel</button>
              <button onClick={handleTransfer} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Submit Transfer</button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">Transfer Request Submitted!</h3>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2">
              <div className="text-gray-400" style={{ fontSize: '11px' }}>✅ Request sent to {newDistrict} office</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>📋 Address verification pending</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>⏱️ Transfer completed in 15 days</div>
            </div>
            <button onClick={closeTransfer} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>

      {/* ── CARD STATUS MODAL ── */}
      <Modal isOpen={showStatusModal} onClose={closeStatus} title="Check Application Status" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-3">
            <p className="text-white" style={{ fontSize: '12px' }}>Enter your Application ID or Aadhaar-linked mobile</p>
          </div>
          <div>
            <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Application ID / Mobile Number</label>
            <input type="text" value={statusAppId} onChange={e => setStatusAppId(e.target.value)}
              placeholder="e.g. RC12345 or +91 98765 43210"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" />
          </div>

          {!statusResult ? (
            <button onClick={handleCheckStatus}
              className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg py-3 text-white"
              style={{ fontSize: '12px' }}>
              Check Status
            </button>
          ) : (
            <div className="space-y-3">
              {/* Step tracker */}
              <h4 className="text-white" style={{ fontSize: '13px' }}>Application Progress</h4>
              {['Received', 'Under Verification', 'Approved', 'Card Ready'].map((step, i) => (
                <div key={step} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    i < statusResult.step ? 'bg-gradient-to-br from-purple-600 to-pink-600' :
                    i === statusResult.step ? 'bg-yellow-500' : 'bg-white/10'
                  }`}>
                    {i < statusResult.step
                      ? <Check className="w-4 h-4 text-white" />
                      : i === statusResult.step
                      ? <RefreshCw className="w-3 h-3 text-white animate-spin" />
                      : <div className="w-2 h-2 rounded-full bg-white/30" />
                    }
                  </div>
                  <span className={i <= statusResult.step ? 'text-white' : 'text-gray-500'} style={{ fontSize: '12px' }}>{step}</span>
                  {i === statusResult.step - 1 && <span className="ml-auto text-green-400" style={{ fontSize: '11px' }}>Done</span>}
                </div>
              ))}

              <div className="bg-white/5 border border-white/10 rounded-lg p-3 mt-2">
                <p className="text-gray-400" style={{ fontSize: '11px' }}>Current Status:</p>
                <p className="text-white mt-1" style={{ fontSize: '12px' }}>{statusResult.msg}</p>
              </div>
              <button onClick={closeStatus} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Close</button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}
