import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import {
  Wallet, TrendingUp, DollarSign, Gift, Zap, Droplet, Bus, GraduationCap,
  ArrowUpRight, ArrowDownLeft, Plus, Send, CreditCard, Banknote, QrCode,
  CheckCircle, ChevronRight, RefreshCw
} from 'lucide-react';

interface Props { onBack?: () => void; darkMode?: boolean; }

const PAYMENT_METHODS = ['TN Wallet', 'UPI', 'Debit Card', 'Net Banking'];

export function WalletScreen({ onBack, darkMode = true }: Props = {}) {
  const [balance, setBalance]           = useState(12450);
  const [showAddMoney, setShowAddMoney] = useState(false);
  const [showSend, setShowSend]         = useState(false);
  const [showBillPay, setShowBillPay]   = useState(false);
  const [billService, setBillService]   = useState('');
  const [addAmount, setAddAmount]       = useState('');
  const [addMethod, setAddMethod]       = useState('UPI');
  const [upiId, setUpiId]               = useState('');
  const [sendPhone, setSendPhone]       = useState('');
  const [sendAmt, setSendAmt]           = useState('');
  const [sendNote, setSendNote]         = useState('');
  const [billConsumer, setBillConsumer] = useState('');
  const [billMethod, setBillMethod]     = useState('TN Wallet');
  const [addStep, setAddStep]           = useState<1|2>(1);
  const [sendStep, setSendStep]         = useState<1|2|3>(1);
  const [billStep, setBillStep]         = useState<1|2|3>(1);

  const [transactions, setTransactions] = useState([
    { id: 1, type: 'credit', title: 'Women Assistance - Jun',  amount: 1500,  date: 'Jun 1, 2026',  icon: 'gift'   },
    { id: 2, type: 'debit',  title: 'EB Bill Payment',         amount: 1234,  date: 'May 28, 2026', icon: 'zap'    },
    { id: 3, type: 'credit', title: 'Student Scholarship',     amount: 1200,  date: 'May 25, 2026', icon: 'edu'    },
    { id: 4, type: 'debit',  title: 'Water Bill',              amount: 156,   date: 'May 20, 2026', icon: 'drop'   },
    { id: 5, type: 'credit', title: 'Senior Citizen Pension',  amount: 2000,  date: 'May 15, 2026', icon: 'gift'   },
    { id: 6, type: 'debit',  title: 'Bus Pass Recharge',       amount: 500,   date: 'May 10, 2026', icon: 'bus'    },
    { id: 7, type: 'credit', title: 'Farmer Support Scheme',   amount: 3500,  date: 'May 5, 2026',  icon: 'gift'   },
  ]);

  const subsidies = [
    { name: 'Women Assistance Scheme', amount: '₹1,500', frequency: 'Monthly',   status: 'Active', nextDate: 'Jul 1, 2026' },
    { name: 'Student Scholarship',     amount: '₹1,200', frequency: 'Monthly',   status: 'Active', nextDate: 'Jul 25, 2026' },
    { name: 'Senior Citizen Pension',  amount: '₹2,000', frequency: 'Monthly',   status: 'Active', nextDate: 'Jul 15, 2026' },
    { name: 'Farmer Support Scheme',   amount: '₹3,500', frequency: 'Quarterly', status: 'Active', nextDate: 'Aug 5, 2026' },
  ];

  const quickPay = [
    { icon: Zap,          title: 'Electricity', color: 'from-yellow-600 to-orange-600', service: 'Electricity' },
    { icon: Droplet,      title: 'Water',       color: 'from-blue-600 to-cyan-600',     service: 'Water'       },
    { icon: Bus,          title: 'Transport',   color: 'from-indigo-600 to-purple-600', service: 'Transport'   },
    { icon: GraduationCap,title: 'School Fees', color: 'from-green-600 to-emerald-600', service: 'School Fees' },
  ];

  const handleAddMoneyConfirm = () => {
    const amt = parseInt(addAmount);
    if (!amt || amt < 100) { toast.error('Minimum ₹100 required'); return; }
    setAddStep(2);
  };

  const handleAddMoneySuccess = () => {
    const amt = parseInt(addAmount);
    setBalance(prev => prev + amt);
    setTransactions(prev => [{ id: Date.now(), type: 'credit', title: `Added via ${addMethod}`, amount: amt, date: 'Today', icon: 'gift' }, ...prev]);
    setShowAddMoney(false); setAddAmount(''); setAddStep(1);
    toast.success(`₹${amt.toLocaleString()} Added ✅`, { description: `Balance updated to ₹${(balance + amt).toLocaleString()}` });
  };

  const handleSendConfirm = () => {
    const amt = parseInt(sendAmt);
    if (!sendPhone || sendPhone.length < 10) { toast.error('Enter valid mobile number'); return; }
    if (!amt || amt < 1) { toast.error('Enter amount'); return; }
    if (amt > balance) { toast.error('Insufficient balance'); return; }
    setSendStep(2);
  };

  const handleSendSuccess = () => {
    const amt = parseInt(sendAmt);
    setBalance(prev => prev - amt);
    const ref = 'TXN' + Math.floor(Math.random() * 9000000 + 1000000);
    setTransactions(prev => [{ id: Date.now(), type: 'debit', title: `Sent to ${sendPhone}`, amount: amt, date: 'Today', icon: 'send' }, ...prev]);
    setSendStep(3);
    toast.success(`₹${amt.toLocaleString()} Sent ✅`, { description: `Ref: ${ref}` });
  };

  const handleBillFetch = () => {
    if (!billConsumer.trim()) { toast.error('Enter consumer number'); return; }
    setBillStep(2);
  };

  const handleBillPay = () => {
    const amount = billService === 'Electricity' ? 1234 : billService === 'Water' ? 156 : 500;
    if (billMethod === 'TN Wallet' && amount > balance) { toast.error('Insufficient wallet balance'); return; }
    if (billMethod === 'TN Wallet') setBalance(prev => prev - amount);
    setTransactions(prev => [{ id: Date.now(), type: 'debit', title: `${billService} Bill Payment`, amount, date: 'Today', icon: 'zap' }, ...prev]);
    setBillStep(3);
    toast.success(`${billService} Bill Paid ✅`, { description: `₹${amount} deducted. Receipt generated.` });
  };

  const openBillPay = (service: string) => {
    setBillService(service); setBillConsumer(''); setBillMethod('TN Wallet'); setBillStep(1);
    setShowBillPay(true);
  };

  const txnIcon = (icon: string) => {
    const cls = 'w-5 h-5';
    if (icon === 'zap') return <Zap className={`${cls} text-yellow-400`} />;
    if (icon === 'drop') return <Droplet className={`${cls} text-blue-400`} />;
    if (icon === 'bus') return <Bus className={`${cls} text-green-400`} />;
    if (icon === 'edu') return <GraduationCap className={`${cls} text-purple-400`} />;
    return <Gift className={`${cls} text-pink-400`} />;
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-white mb-1">TN Digital Wallet</h1>
        <p className="text-gray-400">தமிழ்நாடு டிஜிட்டல் பணப்பை | Future TN</p>
      </motion.div>

      {/* Balance Card */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="mb-5">
        <GlassCard className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-pink-600/20 to-purple-600/30" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-gray-400 mb-1" style={{ fontSize: '12px' }}>Total Balance</p>
                <h2 className="text-white">₹{balance.toLocaleString()}</h2>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { setAddAmount(''); setAddStep(1); setShowAddMoney(true); }}
                  className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center hover:scale-110 transition-transform">
                  <Plus className="w-5 h-5 text-white" />
                </button>
                <button onClick={() => { setSendPhone(''); setSendAmt(''); setSendNote(''); setSendStep(1); setShowSend(true); }}
                  className="w-11 h-11 rounded-full bg-gradient-to-br from-green-600 to-emerald-600 flex items-center justify-center hover:scale-110 transition-transform">
                  <Send className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>Account Number</p>
                <p className="text-white" style={{ fontSize: '13px' }}>TN-9876-5432-1234</p>
              </div>
              <div>
                <p className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>Aadhaar Linked</p>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full" />
                  <p className="text-green-400" style={{ fontSize: '13px' }}>Verified</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          { icon: Wallet,    label: 'Balance',    value: `₹${(balance/1000).toFixed(1)}K`,   color: 'text-green-400' },
          { icon: Gift,      label: 'Subsidies',  value: '₹8,200', color: 'text-purple-400' },
          { icon: TrendingUp,label: 'This Month', value: '+₹3.5K', color: 'text-blue-400' },
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + idx * 0.1 }}>
              <GlassCard>
                <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className={`mb-1 ${stat.color}`} style={{ fontSize: '13px' }}>{stat.value}</div>
                <div className="text-gray-400" style={{ fontSize: '11px' }}>{stat.label}</div>
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Pay */}
      <h3 className="text-white mb-3">Quick Pay</h3>
      <div className="grid grid-cols-4 gap-3 mb-6">
        {quickPay.map(item => {
          const Icon = item.icon;
          return (
            <button key={item.title} onClick={() => openBillPay(item.service)} className="text-center">
              <div className={`w-14 h-14 mx-auto mb-2 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-400" style={{ fontSize: '11px' }}>{item.title}</p>
            </button>
          );
        })}
      </div>

      {/* Subsidies */}
      <h3 className="text-white mb-3">Active Subsidies</h3>
      <div className="space-y-3 mb-6">
        {subsidies.map((sub, idx) => (
          <GlassCard key={idx}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="text-white mb-1">{sub.name}</h4>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-purple-400" style={{ fontSize: '12px' }}>{sub.amount}</span>
                  <span className="text-gray-400" style={{ fontSize: '11px' }}>{sub.frequency}</span>
                </div>
                <span className="text-gray-500" style={{ fontSize: '11px' }}>Next: {sub.nextDate}</span>
              </div>
              <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full" style={{ fontSize: '11px' }}>{sub.status}</div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Transactions */}
      <h3 className="text-white mb-3">Recent Transactions</h3>
      <div className="space-y-3">
        {transactions.map(txn => (
          <GlassCard key={txn.id}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${txn.type === 'credit' ? 'bg-green-600/20' : 'bg-red-600/20'}`}>
                {txn.type === 'credit' ? <ArrowDownLeft className="w-5 h-5 text-green-400" /> : <ArrowUpRight className="w-5 h-5 text-red-400" />}
              </div>
              <div className="flex-1">
                <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>{txn.title}</h4>
                <p className="text-gray-400" style={{ fontSize: '11px' }}>{txn.date}</p>
              </div>
              <div className={txn.type === 'credit' ? 'text-green-400' : 'text-red-400'}>
                {txn.type === 'credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* ── ADD MONEY MODAL ── */}
      <Modal isOpen={showAddMoney} onClose={() => setShowAddMoney(false)} title="Add Money" darkMode={darkMode}>
        {addStep === 1 ? (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2">
              {[500, 1000, 2000, 5000, 10000, 'Custom'].map(amt => (
                <button key={String(amt)} onClick={() => typeof amt === 'number' ? setAddAmount(String(amt)) : setAddAmount('')}
                  className={`py-2 rounded-lg text-center transition-all ${addAmount === String(amt) ? 'bg-purple-600 text-white' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                  style={{ fontSize: '12px' }}>
                  {typeof amt === 'number' ? `₹${amt.toLocaleString()}` : amt}
                </button>
              ))}
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Amount (₹)</label>
              <input type="number" value={addAmount} onChange={e => setAddAmount(e.target.value)}
                placeholder="Enter amount" className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" />
              <p className="text-gray-500 mt-1" style={{ fontSize: '11px' }}>Min ₹100 • Max ₹10,000</p>
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Payment Method</label>
              <div className="space-y-2">
                {[
                  { id: 'UPI', label: 'UPI', icon: QrCode },
                  { id: 'Debit Card', label: 'Debit / Credit Card', icon: CreditCard },
                  { id: 'Net Banking', label: 'Net Banking', icon: Banknote },
                ].map(m => {
                  const Icon = m.icon;
                  return (
                    <label key={m.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${addMethod === m.id ? 'border-purple-500 bg-purple-600/20' : 'border-white/10 bg-white/5'}`}>
                      <input type="radio" name="addMethod" value={m.id} checked={addMethod === m.id} onChange={() => setAddMethod(m.id)} className="w-4 h-4" />
                      <Icon className="w-4 h-4 text-purple-400" />
                      <span className="text-white" style={{ fontSize: '12px' }}>{m.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>
            {addMethod === 'UPI' && (
              <div>
                <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>UPI ID</label>
                <input type="text" value={upiId} onChange={e => setUpiId(e.target.value)} placeholder="yourname@upi"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" />
              </div>
            )}
            <button onClick={handleAddMoneyConfirm} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>
              Add ₹{parseInt(addAmount) ? parseInt(addAmount).toLocaleString() : '---'}
            </button>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">₹{parseInt(addAmount).toLocaleString()} Added!</h3>
            <div className="bg-white/5 rounded-lg p-4 space-y-2">
              <div className="flex justify-between"><span className="text-gray-400" style={{ fontSize: '11px' }}>Amount</span><span className="text-white" style={{ fontSize: '11px' }}>₹{parseInt(addAmount).toLocaleString()}</span></div>
              <div className="flex justify-between"><span className="text-gray-400" style={{ fontSize: '11px' }}>Method</span><span className="text-white" style={{ fontSize: '11px' }}>{addMethod}</span></div>
              <div className="flex justify-between"><span className="text-gray-400" style={{ fontSize: '11px' }}>Ref ID</span><span className="text-white" style={{ fontSize: '11px' }}>TXN{Math.floor(Math.random()*9000000+1000000)}</span></div>
            </div>
            <button onClick={handleAddMoneySuccess} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>

      {/* ── SEND MONEY MODAL ── */}
      <Modal isOpen={showSend} onClose={() => setShowSend(false)} title="Send Money" darkMode={darkMode}>
        {sendStep === 1 && (
          <div className="space-y-4">
            <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-3">
              <p className="text-white" style={{ fontSize: '12px' }}>Available: ₹{balance.toLocaleString()}</p>
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Recipient Mobile / Aadhaar</label>
              <input type="text" value={sendPhone} onChange={e => setSendPhone(e.target.value)} placeholder="+91 9876543210"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Amount (₹)</label>
              <input type="number" value={sendAmt} onChange={e => setSendAmt(e.target.value)} placeholder="Enter amount"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Note (optional)</label>
              <input type="text" value={sendNote} onChange={e => setSendNote(e.target.value)} placeholder="What's it for?"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" />
            </div>
            <button onClick={handleSendConfirm} className="w-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Review Transfer</button>
          </div>
        )}
        {sendStep === 2 && (
          <div className="space-y-4">
            <p className="text-gray-400" style={{ fontSize: '12px' }}>Confirm Transfer</p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              {[
                { label: 'To', value: sendPhone },
                { label: 'Amount', value: `₹${parseInt(sendAmt).toLocaleString()}` },
                { label: 'Note', value: sendNote || '—' },
                { label: 'From', value: 'TN Wallet' },
              ].map(r => (
                <div key={r.label} className="flex justify-between">
                  <span className="text-gray-400" style={{ fontSize: '11px' }}>{r.label}</span>
                  <span className="text-white" style={{ fontSize: '11px' }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setSendStep(1)} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-gray-400" style={{ fontSize: '12px' }}>← Back</button>
              <button onClick={handleSendSuccess} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Confirm & Send</button>
            </div>
          </div>
        )}
        {sendStep === 3 && (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">₹{parseInt(sendAmt).toLocaleString()} Sent!</h3>
            <p className="text-gray-400" style={{ fontSize: '12px' }}>Ref: TXN{Math.floor(Math.random()*9000000+1000000)}</p>
            <button onClick={() => setShowSend(false)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>

      {/* ── BILL PAY MODAL ── */}
      <Modal isOpen={showBillPay} onClose={() => setShowBillPay(false)} title={`Pay ${billService} Bill`} darkMode={darkMode}>
        {billStep === 1 && (
          <div className="space-y-4">
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Consumer / Account Number</label>
              <input type="text" value={billConsumer} onChange={e => setBillConsumer(e.target.value)} placeholder="Enter consumer number"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" />
            </div>
            <button onClick={handleBillFetch} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Fetch Bill</button>
          </div>
        )}
        {billStep === 2 && (
          <div className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3">
              <h4 className="text-white">{billService} Bill Details</h4>
              {[
                { label: 'Consumer No.', value: billConsumer },
                { label: 'Bill Amount', value: billService === 'Electricity' ? '₹1,234' : billService === 'Water' ? '₹156' : '₹500' },
                { label: 'Due Date', value: 'Jun 30, 2026' },
                { label: 'Status', value: 'Unpaid' },
              ].map(r => (
                <div key={r.label} className="flex justify-between">
                  <span className="text-gray-400" style={{ fontSize: '11px' }}>{r.label}</span>
                  <span className={r.label === 'Status' ? 'text-red-400' : 'text-white'} style={{ fontSize: '11px' }}>{r.value}</span>
                </div>
              ))}
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Payment Method</label>
              <div className="space-y-2">
                {PAYMENT_METHODS.map(m => (
                  <label key={m} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${billMethod === m ? 'border-purple-500 bg-purple-600/20' : 'border-white/10 bg-white/5'}`}>
                    <input type="radio" name="billMethod" value={m} checked={billMethod === m} onChange={() => setBillMethod(m)} className="w-4 h-4" />
                    <span className="text-white" style={{ fontSize: '12px' }}>{m}</span>
                    {m === 'TN Wallet' && <span className="text-gray-400 ml-auto" style={{ fontSize: '11px' }}>Bal: ₹{balance.toLocaleString()}</span>}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setBillStep(1)} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-gray-400" style={{ fontSize: '12px' }}>← Back</button>
              <button onClick={handleBillPay} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Pay Now</button>
            </div>
          </div>
        )}
        {billStep === 3 && (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">Payment Successful!</h3>
            <div className="bg-white/5 rounded-lg p-4 space-y-2">
              <div className="flex justify-between"><span className="text-gray-400" style={{ fontSize: '11px' }}>Service</span><span className="text-white" style={{ fontSize: '11px' }}>{billService}</span></div>
              <div className="flex justify-between"><span className="text-gray-400" style={{ fontSize: '11px' }}>Ref ID</span><span className="text-white" style={{ fontSize: '11px' }}>BL{Math.floor(Math.random()*9000000+1000000)}</span></div>
            </div>
            <button onClick={() => setShowBillPay(false)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>
    </div>
  );
}
