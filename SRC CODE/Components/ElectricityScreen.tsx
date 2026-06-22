import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import {
  Zap, Calendar, Download, CreditCard, AlertCircle,
  TrendingDown, CheckCircle, Clock, Bell,
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line,
} from 'recharts';

interface ElectricityScreenProps {
  darkMode?: boolean;
  onBack?: () => void;
}

const monthlyUsage = [
  { month: 'Jan', units: 198, bill: 996  },
  { month: 'Feb', units: 185, bill: 930  },
  { month: 'Mar', units: 212, bill: 1067 },
  { month: 'Apr', units: 230, bill: 1156 },
  { month: 'May', units: 245, bill: 1234 },
];

const billCycle = [
  { event: 'Meter Reading',     date: 'Jun 1, 2026',  warn: false },
  { event: 'Bill Generation',   date: 'Jun 5, 2026',  warn: false },
  { event: 'Bill Delivery',     date: 'Jun 7, 2026',  warn: false },
  { event: 'Due Date',          date: 'Jun 20, 2026', warn: false },
  { event: 'Disconnection Risk',date: 'Jun 27, 2026', warn: true  },
];

const ttStyle = {
  background: 'rgba(10,10,20,0.95)',
  border: '1px solid rgba(168,85,247,0.3)',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '12px',
};

export function ElectricityScreen({ onBack, darkMode = true }: ElectricityScreenProps = {}) {
  const [showPayment,   setShowPayment]   = useState(false);
  const [showOutage,    setShowOutage]    = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showAutoPay,   setShowAutoPay]   = useState(false);
  const [showSchedule,  setShowSchedule]  = useState(false);

  const [paymentMethod,  setPaymentMethod]  = useState('wallet');
  const [outageDetails,  setOutageDetails]  = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [autoPayOn,      setAutoPayOn]      = useState(false);
  const [autoPayMethod,  setAutoPayMethod]  = useState('wallet');
  const [autoPayDay,     setAutoPayDay]     = useState('5');
  const [autoPaySaved,   setAutoPaySaved]   = useState(false);

  const billHistory = [
    { month: 'May 2026', amount: 1234, units: 245, paid: false, dueDate: 'May 20' },
    { month: 'Apr 2026', amount: 1156, units: 230, paid: true,  dueDate: 'Apr 20' },
    { month: 'Mar 2026', amount: 1289, units: 256, paid: true,  dueDate: 'Mar 20' },
    { month: 'Feb 2026', amount: 1098, units: 218, paid: true,  dueDate: 'Feb 20' },
  ];

  const avgUnits = Math.round(monthlyUsage.reduce((s, m) => s + m.units, 0) / monthlyUsage.length);
  const avgBill  = Math.round(monthlyUsage.reduce((s, m) => s + m.bill,  0) / monthlyUsage.length);

  const handlePayment = async () => {
    setPaymentSuccess(true);
    await new Promise(r => setTimeout(r, 1100));
    setShowPayment(false); setPaymentSuccess(false);
    toast.success('Payment Successful! ⚡', {
      description: `TXN: TNE${Math.floor(Math.random()*1000000)} • ₹1,234 paid`,
      duration: 5000,
    });
  };

  const handleReportOutage = async () => {
    if (!outageDetails.trim()) { toast.error('Please describe the issue'); return; }
    const id = 'OUT' + (Math.floor(Math.random() * 90000) + 10000);
    setShowOutage(false); setOutageDetails('');
    const t = toast.loading('Reporting outage...');
    await new Promise(r => setTimeout(r, 800));
    toast.dismiss(t);
    toast.success('Outage Reported ⚡', { description: `ID: ${id} • Field team notified • ETA 2–4 hrs`, duration: 5000 });
  };

  const handleSaveAutoPay = () => {
    setAutoPaySaved(true);
    toast.success(autoPayOn ? 'Auto Pay Enabled ✅' : 'Auto Pay Disabled', {
      description: autoPayOn ? `Bills paid via ${autoPayMethod} on day ${autoPayDay} monthly` : 'Disabled successfully',
      duration: 4000,
    });
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-white mb-1">Electricity Services</h1>
        <p className="text-gray-400">மின்சார சேவைகள் | TANGEDCO Portal</p>
      </motion.div>

      {/* Consumer card */}
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
        <GlassCard className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-gray-400 mb-1" style={{ fontSize: '12px' }}>Consumer Number</p>
              <h2 className="text-white mb-2">TN12345678</h2>
              <p className="text-gray-400" style={{ fontSize: '11px' }}>Karthick Kumar • Anna Nagar</p>
            </div>
            <Zap className="w-12 h-12 text-yellow-400" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><p className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>Current Bill</p><p className="text-yellow-400 text-xl">₹1,234</p></div>
            <div><p className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>Due Date</p><p className="text-red-400">May 20, 2026</p></div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Bill details */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
        <h3 className="text-white mb-3">Current Bill Details</h3>
        <GlassCard>
          <div className="space-y-3">
            {[['Units Consumed','245 kWh'],['Rate per Unit','₹5.03'],['Energy Charges','₹1,232'],['Fixed Charges','₹150'],['Tax (CGST+SGST)','₹42']].map(([l,v]) => (
              <div key={l} className="flex justify-between"><span className="text-gray-400">{l}</span><span className="text-white">{v}</span></div>
            ))}
            <div className="h-px bg-white/10" />
            <div className="flex justify-between"><span className="text-white">Total Amount</span><span className="text-yellow-400 text-xl">₹1,234</span></div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-4">
            <button onClick={() => setShowPayment(true)} className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 py-3 rounded-lg text-white font-medium">Pay Now</button>
            <button onClick={() => toast.success('Bill Downloaded', { description: 'PDF saved to your device.' })}
              className="bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-white flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download
            </button>
          </div>
        </GlassCard>
      </motion.div>

      {/* History */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6">
        <h3 className="text-white mb-3">Bill History</h3>
        <div className="space-y-3">
          {billHistory.map((b, i) => (
            <GlassCard key={i}>
              <div className="flex justify-between">
                <div><div className="text-white mb-1">{b.month}</div><div className="text-gray-400" style={{ fontSize: '11px' }}>{b.units} kWh • Due: {b.dueDate}</div></div>
                <div className="text-right">
                  <div className="text-white mb-1">₹{b.amount}</div>
                  <div className={`px-2 py-1 rounded-full ${b.paid ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`} style={{ fontSize: '11px' }}>{b.paid ? '✓ Paid' : 'Pending'}</div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Quick actions */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-white mb-3">Quick Actions</h3>
        <div className="grid grid-cols-2 gap-3">
          {[
            { icon: AlertCircle, label: 'Report Outage',    sub: 'Power cut complaint',  color: 'text-red-400',    action: () => setShowOutage(true)    },
            { icon: TrendingDown,label: 'Usage Analytics',  sub: 'Track consumption',    color: 'text-blue-400',   action: () => setShowAnalytics(true) },
            { icon: CreditCard,  label: 'Auto Pay',         sub: autoPayOn ? '✓ Enabled' : 'Set up autopay', color: 'text-purple-400', action: () => setShowAutoPay(true) },
            { icon: Calendar,    label: 'Bill Schedule',    sub: 'View cycle dates',     color: 'text-green-400',  action: () => setShowSchedule(true)  },
          ].map(({ icon: Icon, label, sub, color, action }) => (
            <GlassCard key={label} onClick={action} className="cursor-pointer hover:bg-white/10 transition-colors">
              <Icon className={`w-8 h-8 ${color} mb-2`} />
              <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>{label}</h4>
              <p className="text-gray-400" style={{ fontSize: '11px' }}>{sub}</p>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* PAY MODAL */}
      <Modal isOpen={showPayment} onClose={() => setShowPayment(false)} title="Pay Electricity Bill" darkMode={darkMode}>
        {!paymentSuccess ? (
          <div className="space-y-4">
            <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
              <div className="flex justify-between mb-2"><span className="text-gray-400">Bill Amount</span><span className="text-white text-2xl font-bold">₹1,234</span></div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Consumer: TN12345678 • Due: May 20, 2026</div>
            </div>
            <div className="space-y-2">
              {[{id:'wallet',l:'TN Digital Wallet',s:'Balance: ₹12,450'},{id:'upi',l:'UPI',s:'PhonePe, GPay, Paytm'},{id:'card',l:'Credit/Debit Card',s:'Visa, Mastercard, RuPay'}].map(m => (
                <label key={m.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod===m.id?'bg-purple-600/20 border-purple-500':'bg-white/5 border-white/10'}`}>
                  <input type="radio" name="pay" value={m.id} checked={paymentMethod===m.id} onChange={()=>setPaymentMethod(m.id)} className="w-4 h-4" />
                  <div><div className="text-white">{m.l}</div><div className="text-gray-400" style={{fontSize:'11px'}}>{m.s}</div></div>
                </label>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowPayment(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Cancel</button>
              <button onClick={handlePayment} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg py-3 text-white font-medium" style={{fontSize:'12px'}}>Pay ₹1,234</button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-3"><CheckCircle className="w-16 h-16 text-green-400 mx-auto" /><h3 className="text-white">Payment Successful!</h3></div>
        )}
      </Modal>

      {/* OUTAGE MODAL */}
      <Modal isOpen={showOutage} onClose={() => setShowOutage(false)} title="Report Power Outage" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div><div className="text-white" style={{fontSize:'12px'}}>Power Outage Report</div><div className="text-gray-400" style={{fontSize:'10px'}}>Anna Nagar, Chennai (Auto-detected)</div></div>
          </div>
          <div>
            <label className="text-gray-400 mb-2 block" style={{fontSize:'11px'}}>Describe the Issue</label>
            <textarea value={outageDetails} onChange={e=>setOutageDetails(e.target.value)} placeholder="Complete power outage since 3 PM..."
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 h-24 resize-none" />
          </div>
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3 space-y-1">
            {['TANGEDCO field team notified immediately','SMS updates on restoration progress','Expected resolution: 2–4 hours'].map(t=>(
              <div key={t} className="text-gray-400" style={{fontSize:'11px'}}>• {t}</div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={()=>setShowOutage(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Cancel</button>
            <button onClick={handleReportOutage} className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Report Outage</button>
          </div>
        </div>
      </Modal>

      {/* ANALYTICS MODAL */}
      <Modal isOpen={showAnalytics} onClose={() => setShowAnalytics(false)} title="Usage Analytics" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3 text-center">
              <div className="text-blue-400" style={{fontSize:'22px',fontWeight:800}}>{avgUnits}</div>
              <div className="text-gray-400" style={{fontSize:'10px'}}>Avg kWh / Month</div>
            </div>
            <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3 text-center">
              <div className="text-yellow-400" style={{fontSize:'22px',fontWeight:800}}>₹{avgBill}</div>
              <div className="text-gray-400" style={{fontSize:'10px'}}>Avg Bill / Month</div>
            </div>
          </div>
          <h4 className="text-white" style={{fontSize:'13px'}}>Monthly Units (kWh)</h4>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={monthlyUsage} margin={{top:4,right:4,left:-12,bottom:0}}>
              <XAxis dataKey="month" stroke="#9ca3af" style={{fontSize:'10px'}} />
              <YAxis stroke="#9ca3af" style={{fontSize:'10px'}} />
              <Tooltip contentStyle={ttStyle} itemStyle={{color:'#fff'}} labelStyle={{color:'#e2e8f0'}} formatter={(v:number)=>[`${v} kWh`,'Units']} />
              <Bar dataKey="units" fill="#3b82f6" radius={[4,4,0,0]} name="Units" />
            </BarChart>
          </ResponsiveContainer>
          <h4 className="text-white" style={{fontSize:'13px'}}>Bill Trend (₹)</h4>
          <ResponsiveContainer width="100%" height={120}>
            <LineChart data={monthlyUsage} margin={{top:4,right:4,left:-12,bottom:0}}>
              <XAxis dataKey="month" stroke="#9ca3af" style={{fontSize:'10px'}} />
              <YAxis stroke="#9ca3af" style={{fontSize:'10px'}} />
              <Tooltip contentStyle={ttStyle} itemStyle={{color:'#fff'}} labelStyle={{color:'#e2e8f0'}} formatter={(v:number)=>[`₹${v}`,'Bill']} />
              <Line type="monotone" dataKey="bill" stroke="#f59e0b" strokeWidth={2} dot={{fill:'#f59e0b'}} name="Bill" />
            </LineChart>
          </ResponsiveContainer>
          <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
            <p className="text-green-400" style={{fontSize:'11px'}}>💡 Tip: May usage is 6.5% above average. Use AC after 10 PM for cheaper off-peak tariff.</p>
          </div>
          <button onClick={()=>setShowAnalytics(false)} className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Close</button>
        </div>
      </Modal>

      {/* AUTO PAY MODAL */}
      <Modal isOpen={showAutoPay} onClose={() => setShowAutoPay(false)} title="Auto Pay Setup" darkMode={darkMode}>
        {!autoPaySaved ? (
          <div className="space-y-4">
            <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-3">
              <p className="text-white" style={{fontSize:'12px'}}>Never miss a due date — bills paid automatically</p>
              <p className="text-gray-400" style={{fontSize:'11px'}}>Cancel anytime from this screen</p>
            </div>
            <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
              <div>
                <div className="text-white" style={{fontSize:'13px'}}>Enable Auto Pay</div>
                <div className="text-gray-400" style={{fontSize:'11px'}}>Pay automatically when bill is generated</div>
              </div>
              <button onClick={()=>setAutoPayOn(v=>!v)}
                className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${autoPayOn?'bg-purple-600':'bg-gray-600'}`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${autoPayOn?'translate-x-6':'translate-x-0'}`} />
              </button>
            </div>
            {autoPayOn && (
              <>
                <div className="space-y-2">
                  <label className="text-gray-400 block" style={{fontSize:'11px'}}>Payment Method</label>
                  {[{id:'wallet',l:'TN Digital Wallet',s:'Balance: ₹12,450'},{id:'upi',l:'UPI',s:'karthick@upi'},{id:'card',l:'Debit Card',s:'xxxx 4321'}].map(m=>(
                    <label key={m.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${autoPayMethod===m.id?'bg-purple-600/20 border-purple-500':'bg-white/5 border-white/10'}`}>
                      <input type="radio" name="ap" value={m.id} checked={autoPayMethod===m.id} onChange={()=>setAutoPayMethod(m.id)} className="w-4 h-4" />
                      <div><div className="text-white" style={{fontSize:'12px'}}>{m.l}</div><div className="text-gray-400" style={{fontSize:'10px'}}>{m.s}</div></div>
                    </label>
                  ))}
                </div>
                <div>
                  <label className="text-gray-400 mb-2 block" style={{fontSize:'11px'}}>Pay on day</label>
                  <select value={autoPayDay} onChange={e=>setAutoPayDay(e.target.value)}
                    className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-3 text-white outline-none" style={{backgroundColor:'#0a0a1a'}}>
                    {['1','3','5','7','10','15'].map(d=><option key={d} value={d} style={{backgroundColor:'#0a0a1a'}}>Day {d} of each month</option>)}
                  </select>
                </div>
                <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-3">
                  <p className="text-yellow-400" style={{fontSize:'11px'}}>⚠️ Ensure sufficient balance on payment day.</p>
                </div>
              </>
            )}
            <div className="flex gap-3">
              <button onClick={()=>setShowAutoPay(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Cancel</button>
              <button onClick={handleSaveAutoPay} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>
                {autoPayOn?'Enable Auto Pay':'Save Settings'}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">{autoPayOn?'Auto Pay Enabled!':'Settings Saved'}</h3>
            {autoPayOn && (
              <div className="bg-white/5 rounded-lg p-4 text-left space-y-2">
                <div className="flex justify-between"><span className="text-gray-400" style={{fontSize:'11px'}}>Method</span><span className="text-white" style={{fontSize:'11px'}}>{autoPayMethod==='wallet'?'TN Wallet':autoPayMethod.toUpperCase()}</span></div>
                <div className="flex justify-between"><span className="text-gray-400" style={{fontSize:'11px'}}>Payment Day</span><span className="text-white" style={{fontSize:'11px'}}>Day {autoPayDay} monthly</span></div>
              </div>
            )}
            <button onClick={()=>{setShowAutoPay(false);setAutoPaySaved(false);}} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Done</button>
          </div>
        )}
      </Modal>

      {/* SCHEDULE MODAL */}
      <Modal isOpen={showSchedule} onClose={() => setShowSchedule(false)} title="Bill Cycle & Schedule" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
            <div className="text-green-400 mb-1" style={{fontSize:'12px'}}>Current Billing Cycle: May–June 2026</div>
            <div className="text-gray-400" style={{fontSize:'11px'}}>Tariff Zone: Anna Nagar HT • Single Phase</div>
          </div>
          <h4 className="text-white" style={{fontSize:'13px'}}>Upcoming Cycle Dates</h4>
          <div className="space-y-3">
            {billCycle.map((item,i)=>(
              <div key={i} className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${item.warn?'bg-red-500/20':'bg-white/10'}`}>
                  {item.warn?<AlertCircle className="w-4 h-4 text-red-400"/>:<Clock className="w-4 h-4 text-gray-400"/>}
                </div>
                <div className="flex-1 text-white" style={{fontSize:'12px'}}>{item.event}</div>
                <div className={item.warn?'text-red-400':'text-gray-400'} style={{fontSize:'11px'}}>{item.date}</div>
              </div>
            ))}
          </div>
          <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3 space-y-2">
            <p className="text-white mb-1" style={{fontSize:'12px'}}>Tariff Slabs</p>
            {[['0–100 units','₹0 (Free)','text-green-400'],['101–200 units','₹1.50/unit','text-yellow-400'],['201–500 units','₹3.00/unit','text-orange-400'],['Above 500','₹6.00/unit','text-red-400']].map(([r,v,c])=>(
              <div key={r} className="flex justify-between">
                <span className="text-gray-400" style={{fontSize:'11px'}}>{r}</span>
                <span className={c} style={{fontSize:'11px'}}>{v}</span>
              </div>
            ))}
          </div>
          <button onClick={()=>toast.success('Reminder Set ✅',{description:'Notified 5 days before due date.'})}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg py-3 text-white flex items-center justify-center gap-2" style={{fontSize:'12px'}}>
            <Bell className="w-4 h-4" /> Set Due Date Reminder
          </button>
          <button onClick={()=>setShowSchedule(false)} className="w-full bg-white/5 border border-white/10 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Close</button>
        </div>
      </Modal>
    </div>
  );
}
