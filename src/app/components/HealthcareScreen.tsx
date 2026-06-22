import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import {
  Heart, Calendar, Pill, Activity, MapPin, Phone, Clock, Users,
  Ambulance, CheckCircle, Star, FileText, Download, Thermometer,
  Droplet, Wind, TrendingUp, FlaskConical, ChevronRight,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area,
} from 'recharts';

interface Props { onBack?: () => void; darkMode?: boolean; }

const hospitals = [
  { name: 'Govt General Hospital', distance: '2.3 km', queue: '45 mins', beds: '12 Available', emergency: true, departments: ['General Medicine','Cardiology','Orthopedics','Gynecology','Pediatrics','ENT'] },
  { name: 'Stanley Medical College', distance: '3.8 km', queue: '30 mins', beds: '8 Available', emergency: true, departments: ['General Medicine','Neurology','Oncology','Dermatology','Urology'] },
  { name: 'Rajiv Gandhi GH', distance: '5.1 km', queue: '60 mins', beds: '5 Available', emergency: true, departments: ['General Medicine','Cardiology','Psychiatry','Orthopedics'] },
  { name: 'Kilpauk Medical College', distance: '4.2 km', queue: '40 mins', beds: '10 Available', emergency: true, departments: ['General Medicine','Gynecology','Pediatrics','Surgery'] },
];
const doctorsByDept: Record<string, { name: string; qual: string; exp: string }[]> = {
  'General Medicine': [{name:'Dr. Rajesh Kumar',qual:'MBBS, MD',exp:'12 yrs'},{name:'Dr. Kavitha S.',qual:'MBBS, MD',exp:'8 yrs'}],
  'Cardiology':       [{name:'Dr. Priya Sharma',qual:'MBBS, DM',exp:'15 yrs'},{name:'Dr. Arun M.',qual:'MBBS, DNB',exp:'10 yrs'}],
  'Orthopedics':      [{name:'Dr. Senthil K.',qual:'MBBS, MS',exp:'14 yrs'},{name:'Dr. Anand R.',qual:'MBBS, MS',exp:'9 yrs'}],
  'Gynecology':       [{name:'Dr. Meena L.',qual:'MBBS, DGO',exp:'18 yrs'},{name:'Dr. Sudha P.',qual:'MBBS, MD',exp:'11 yrs'}],
  'Pediatrics':       [{name:'Dr. Kumar T.',qual:'MBBS, DCH',exp:'16 yrs'},{name:'Dr. Nisha V.',qual:'MBBS, MD',exp:'7 yrs'}],
  default:            [{name:'Dr. Ravi N.',qual:'MBBS, MD',exp:'10 yrs'},{name:'Dr. Siva K.',qual:'MBBS, MS',exp:'8 yrs'}],
};
const TIME_SLOTS = ['9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM','2:00 PM','2:30 PM','3:00 PM','3:30 PM','4:00 PM'];

const bpData = [
  {day:'Mon',sys:118,dia:76},{day:'Tue',sys:122,dia:80},{day:'Wed',sys:115,dia:74},
  {day:'Thu',sys:120,dia:78},{day:'Fri',sys:125,dia:82},{day:'Sat',sys:117,dia:75},{day:'Sun',sys:119,dia:77},
];
const weightData = [
  {week:'W1',kg:72.4},{week:'W2',kg:72.1},{week:'W3',kg:71.8},{week:'W4',kg:71.5},
];

const ttStyle = { background:'rgba(10,10,20,0.95)', border:'1px solid rgba(168,85,247,0.3)', borderRadius:'8px', color:'#fff', fontSize:'12px' };

const LAB_TESTS = [
  {name:'Complete Blood Count (CBC)', price:'Free', duration:'Same day'},
  {name:'Blood Sugar (Fasting)',       price:'Free', duration:'2 hours'},
  {name:'Lipid Profile',               price:'Free', duration:'Same day'},
  {name:'Kidney Function Test',        price:'Free', duration:'Same day'},
];

export function HealthcareScreen({ onBack, darkMode = true }: Props = {}) {
  const [tab, setTab]                   = useState<'overview'|'appointments'|'vitals'|'hospitals'>('overview');
  const [showBooking, setShowBooking]   = useState(false);
  const [showRecords, setShowRecords]   = useState(false);
  const [showMedOrder, setShowMedOrder] = useState(false);
  const [showInsurance, setShowInsurance] = useState(false);
  const [showLabBook, setShowLabBook]   = useState(false);
  const [bookStep, setBookStep]         = useState<1|2|3|4|5>(1);
  const [selHospital, setSelHospital]   = useState<typeof hospitals[0]|null>(null);
  const [selDept, setSelDept]           = useState('');
  const [selDoctor, setSelDoctor]       = useState('');
  const [selDate, setSelDate]           = useState('');
  const [selTime, setSelTime]           = useState('');
  const [reason, setReason]             = useState('');
  const [bookingToken, setBookingToken] = useState('');
  const [selLab, setSelLab]             = useState('');
  const [labDate, setLabDate]           = useState('');
  const [appointments, setAppointments] = useState([
    {id:1, doctor:'Dr. Rajesh Kumar', specialty:'General Physician', hospital:'GH Chennai', date:'Jun 20, 2026', time:'10:00 AM', token:'A12'},
    {id:2, doctor:'Dr. Priya Sharma', specialty:'Cardiologist', hospital:'Stanley Medical', date:'Jun 25, 2026', time:'2:30 PM', token:'B05'},
  ]);

  const doctors = doctorsByDept[selDept] || doctorsByDept.default;

  const openBooking = (h: typeof hospitals[0]) => {
    setSelHospital(h); setSelDept(''); setSelDoctor(''); setSelDate(''); setSelTime(''); setReason('');
    setBookStep(1); setShowBooking(true);
  };
  const handleConfirmBooking = () => {
    const token = String.fromCharCode(65+Math.floor(Math.random()*5))+(Math.floor(Math.random()*90)+10);
    setBookingToken(token); setBookStep(5);
    setAppointments(prev=>[...prev,{id:Date.now(),doctor:selDoctor,specialty:selDept,hospital:selHospital!.name,date:selDate||'Jun 20, 2026',time:selTime,token}]);
  };
  const handleLabBook = () => {
    if (!selLab||!labDate) { toast.error('Select test and date'); return; }
    toast.success('Lab Test Booked ✅', { description: `${selLab} • ${labDate} • Report by evening` });
    setShowLabBook(false); setSelLab(''); setLabDate('');
  };

  const TABS = [
    { id: 'overview',      label: 'Overview'      },
    { id: 'appointments',  label: 'Appointments'  },
    { id: 'vitals',        label: 'Vitals'        },
    { id: 'hospitals',     label: 'Hospitals'     },
  ] as const;

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div initial={{opacity:0,y:-20}} animate={{opacity:1,y:0}} className="mb-4">
        <h1 className="text-white mb-1">Healthcare Portal</h1>
        <p className="text-gray-400">மருத்துவ சேவைகள் | Patient ID: TN987654</p>
      </motion.div>

      {/* Quick action buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
        {[
          { label:'Book Appointment', color:'from-purple-600 to-pink-600',   action:()=>{setSelHospital(hospitals[0]);setSelDept('');setSelDoctor('');setSelDate('');setSelTime('');setReason('');setBookStep(1);setShowBooking(true);} },
          { label:'Medical Records',  color:'from-blue-600 to-cyan-600',     action:()=>setShowRecords(true)  },
          { label:'Book Lab Test',    color:'from-teal-600 to-emerald-600',  action:()=>setShowLabBook(true)  },
          { label:'Health Insurance', color:'from-orange-600 to-red-600',    action:()=>setShowInsurance(true)},
        ].map((a,i)=>(
          <motion.button key={a.label} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{delay:i*0.07}}
            onClick={a.action}
            className={`bg-gradient-to-br ${a.color} rounded-xl p-3 text-left hover:shadow-lg transition-shadow`}>
            <div className="text-white" style={{fontSize:'12px',fontWeight:600}}>{a.label}</div>
          </motion.button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5 overflow-x-auto pb-1">
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all flex-shrink-0 ${tab===t.id?'bg-gradient-to-r from-purple-600 to-pink-600 text-white':'bg-white/5 text-gray-400 hover:bg-white/10'}`}
            style={{fontSize:'12px'}}>
            {t.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW TAB */}
      {tab==='overview' && (
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="space-y-4">
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {icon:Activity, label:'Health Score', value:'92/100', color:'text-green-400'},
              {icon:Pill,     label:'Medications',  value:'2 Active', color:'text-blue-400'},
              {icon:Calendar, label:'Next Visit',   value:'Jun 20',  color:'text-purple-400'},
              {icon:Heart,    label:'Insurance',    value:'₹5L',     color:'text-red-400'},
            ].map(({icon:Icon,label,value,color},i)=>(
              <motion.div key={label} initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}} transition={{delay:i*0.08}}>
                <GlassCard><Icon className={`w-5 h-5 ${color} mb-2`}/><div className={`mb-1 ${color}`}>{value}</div><div className="text-gray-400" style={{fontSize:'11px'}}>{label}</div></GlassCard>
              </motion.div>
            ))}
          </div>

          {/* Active medications */}
          <GlassCard>
            <h3 className="text-white mb-3">Active Medications</h3>
            <div className="space-y-3">
              {[
                {name:'Metformin 500mg',   dosage:'1 tablet daily',    stock:'15 days left', reminder:'9:00 AM'},
                {name:'Atorvastatin 10mg', dosage:'1 tablet at night', stock:'20 days left', reminder:'10:00 PM'},
              ].map((m,i)=>(
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white mb-1" style={{fontSize:'13px'}}>{m.name}</div>
                    <div className="text-gray-400" style={{fontSize:'11px'}}>{m.dosage} • ⏰ {m.reminder}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-yellow-400" style={{fontSize:'11px'}}>{m.stock}</div>
                    <button onClick={()=>setShowMedOrder(true)} className="text-purple-400 hover:text-purple-300 transition-colors mt-1" style={{fontSize:'10px'}}>Reorder →</button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Emergency */}
          <GlassCard>
            <h3 className="text-white mb-3">Emergency Services</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                {icon:Ambulance, title:'108 Ambulance',    btn:'Call Now', urgent:true},
                {icon:Heart,     title:'104 Health Line',  btn:'Call 104', urgent:false},
                {icon:Users,     title:'Mobile Hospital',  btn:'Book Now', urgent:false},
                {icon:Pill,      title:'Free Medicines',   btn:'Locate',   urgent:false},
              ].map(s=>{const Icon=s.icon;return(
                <div key={s.title} className="bg-white/5 border border-white/10 rounded-xl p-3">
                  <Icon className={`w-6 h-6 mb-2 ${s.urgent?'text-red-400':'text-purple-400'}`}/>
                  <div className="text-white mb-1" style={{fontSize:'11px'}}>{s.title}</div>
                  <button onClick={()=>toast.success(`${s.title} Alerted`,{description:'Help is on the way!',duration:4000})}
                    className={`w-full px-2 py-1.5 rounded-lg text-white ${s.urgent?'bg-red-600 animate-pulse':'bg-purple-600'}`}
                    style={{fontSize:'10px'}}>{s.btn}</button>
                </div>
              );})}
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* APPOINTMENTS TAB */}
      {tab==='appointments' && (
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="space-y-3">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-white">Upcoming Appointments</h3>
            <button onClick={()=>{setSelHospital(hospitals[0]);setSelDept('');setSelDoctor('');setSelDate('');setSelTime('');setReason('');setBookStep(1);setShowBooking(true);}}
              className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1" style={{fontSize:'12px'}}>
              + Book New <ChevronRight className="w-3 h-3"/>
            </button>
          </div>
          {appointments.map(apt=>(
            <GlassCard key={apt.id} className="bg-gradient-to-r from-purple-600/10 to-pink-600/10">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white mb-1">{apt.doctor}</h4>
                  <p className="text-purple-400 mb-1" style={{fontSize:'12px'}}>{apt.specialty}</p>
                  <div className="flex items-center gap-2 text-gray-400 mb-1"><MapPin className="w-3 h-3"/><span style={{fontSize:'11px'}}>{apt.hospital}</span></div>
                  <div className="flex items-center gap-2 text-gray-400"><Calendar className="w-3 h-3"/><span style={{fontSize:'11px'}}>{apt.date} at {apt.time}</span></div>
                </div>
                <div className="bg-green-500/20 text-green-400 px-3 py-2 rounded-lg text-center">
                  <div style={{fontSize:'9px'}}>Token</div>
                  <div style={{fontWeight:700}}>{apt.token}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 rounded-lg text-white" style={{fontSize:'11px'}}>View Details</button>
                <button onClick={()=>toast.info('Reschedule requested')} className="flex-1 bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-white" style={{fontSize:'11px'}}>Reschedule</button>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      )}

      {/* VITALS TAB */}
      {tab==='vitals' && (
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="space-y-4">
          {/* Vitals cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {icon:Heart,       label:'Blood Pressure',  value:'119/77',  unit:'mmHg', color:'text-red-400',    status:'Normal'},
              {icon:Activity,    label:'Heart Rate',      value:'72',      unit:'bpm',  color:'text-pink-400',   status:'Normal'},
              {icon:Thermometer, label:'Temperature',     value:'98.6',    unit:'°F',   color:'text-orange-400', status:'Normal'},
              {icon:Wind,        label:'SpO2',            value:'98%',     unit:'',     color:'text-blue-400',   status:'Good'},
            ].map(({icon:Icon,label,value,unit,color,status})=>(
              <GlassCard key={label}>
                <Icon className={`w-5 h-5 ${color} mb-2`}/>
                <div className={`mb-0.5 ${color}`} style={{fontWeight:700}}>{value}<span className="text-gray-500" style={{fontSize:'10px'}}> {unit}</span></div>
                <div className="text-gray-400" style={{fontSize:'10px'}}>{label}</div>
                <div className="text-green-400 mt-1" style={{fontSize:'9px'}}>✓ {status}</div>
              </GlassCard>
            ))}
          </div>

          {/* BP chart */}
          <GlassCard>
            <h3 className="text-white mb-3">Blood Pressure — Last 7 Days</h3>
            <ResponsiveContainer width="100%" height={150}>
              <LineChart data={bpData} margin={{top:4,right:4,left:-12,bottom:0}}>
                <XAxis dataKey="day" stroke="#9ca3af" style={{fontSize:'10px'}}/>
                <YAxis stroke="#9ca3af" style={{fontSize:'10px'}} domain={[60,140]}/>
                <Tooltip contentStyle={ttStyle} itemStyle={{color:'#fff'}} labelStyle={{color:'#e2e8f0'}}/>
                <Line type="monotone" dataKey="sys" stroke="#ef4444" strokeWidth={2} dot={{fill:'#ef4444'}} name="Systolic"/>
                <Line type="monotone" dataKey="dia" stroke="#3b82f6" strokeWidth={2} dot={{fill:'#3b82f6'}} name="Diastolic"/>
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-1"><div className="w-3 h-1 rounded bg-red-400"/><span className="text-gray-400" style={{fontSize:'10px'}}>Systolic</span></div>
              <div className="flex items-center gap-1"><div className="w-3 h-1 rounded bg-blue-400"/><span className="text-gray-400" style={{fontSize:'10px'}}>Diastolic</span></div>
            </div>
          </GlassCard>

          {/* Weight trend */}
          <GlassCard>
            <h3 className="text-white mb-3">Weight Trend (kg)</h3>
            <ResponsiveContainer width="100%" height={120}>
              <AreaChart data={weightData} margin={{top:4,right:4,left:-12,bottom:0}}>
                <XAxis dataKey="week" stroke="#9ca3af" style={{fontSize:'10px'}}/>
                <YAxis stroke="#9ca3af" style={{fontSize:'10px'}} domain={[70,75]}/>
                <Tooltip contentStyle={ttStyle} itemStyle={{color:'#fff'}} labelStyle={{color:'#e2e8f0'}} formatter={(v:number)=>[`${v} kg`,'Weight']}/>
                <Area type="monotone" dataKey="kg" stroke="#a855f7" fill="rgba(168,85,247,0.15)" strokeWidth={2} name="Weight"/>
              </AreaChart>
            </ResponsiveContainer>
            <p className="text-green-400 mt-2" style={{fontSize:'11px'}}>↓ 0.9 kg this month — on track!</p>
          </GlassCard>

          {/* Lab tests */}
          <GlassCard>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white">Lab Tests</h3>
              <button onClick={()=>setShowLabBook(true)} className="bg-gradient-to-r from-teal-600 to-emerald-600 px-3 py-1.5 rounded-lg text-white flex items-center gap-1" style={{fontSize:'11px'}}>
                <FlaskConical className="w-3 h-3"/> Book Test
              </button>
            </div>
            <div className="space-y-2">
              {[
                {test:'Blood Sugar',    date:'May 15, 2026', result:'105 mg/dL', status:'Normal'},
                {test:'Cholesterol',    date:'Apr 20, 2026', result:'185 mg/dL', status:'Normal'},
                {test:'HbA1c',          date:'Mar 10, 2026', result:'5.8%',      status:'Pre-diabetic'},
              ].map((r,i)=>(
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                  <div>
                    <div className="text-white" style={{fontSize:'12px'}}>{r.test}</div>
                    <div className="text-gray-400" style={{fontSize:'10px'}}>{r.date}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-white" style={{fontSize:'12px'}}>{r.result}</div>
                    <div className={r.status==='Normal'?'text-green-400':'text-yellow-400'} style={{fontSize:'10px'}}>{r.status}</div>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      )}

      {/* HOSPITALS TAB */}
      {tab==='hospitals' && (
        <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="space-y-3">
          {hospitals.map(h=>(
            <GlassCard key={h.name}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-white">{h.name}</h4>
                    {h.emergency && <div className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full" style={{fontSize:'9px'}}>24/7</div>}
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 mb-1"><MapPin className="w-3 h-3"/><span style={{fontSize:'11px'}}>{h.distance}</span></div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1"><Clock className="w-3 h-3 text-yellow-400"/><span className="text-yellow-400" style={{fontSize:'11px'}}>{h.queue}</span></div>
                    <div className="flex items-center gap-1"><Activity className="w-3 h-3 text-green-400"/><span className="text-green-400" style={{fontSize:'11px'}}>{h.beds}</span></div>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-1 mb-3">
                {h.departments.slice(0,4).map(d=>(
                  <span key={d} className="px-2 py-0.5 bg-purple-600/20 text-purple-400 rounded-full" style={{fontSize:'9px'}}>{d}</span>
                ))}
                {h.departments.length>4 && <span className="px-2 py-0.5 bg-white/10 text-gray-400 rounded-full" style={{fontSize:'9px'}}>+{h.departments.length-4} more</span>}
              </div>
              <div className="flex gap-2">
                <button onClick={()=>openBooking(h)} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 px-3 py-2 rounded-lg text-white" style={{fontSize:'11px'}}>Book Appointment</button>
                <button onClick={()=>toast.success(`Calling ${h.name}...`)} className="w-12 h-9 bg-green-500/20 border border-green-500/30 rounded-lg flex items-center justify-center">
                  <Phone className="w-4 h-4 text-green-400"/>
                </button>
              </div>
            </GlassCard>
          ))}
        </motion.div>
      )}

      {/* BOOK APPOINTMENT MODAL */}
      <Modal isOpen={showBooking} onClose={()=>setShowBooking(false)} title="Book Appointment" darkMode={darkMode}>
        {bookStep===1 && (
          <div className="space-y-3">
            <p className="text-gray-400" style={{fontSize:'12px'}}>Step 1 of 4 — Select Hospital</p>
            {hospitals.map(h=>(
              <button key={h.name} onClick={()=>{setSelHospital(h);setBookStep(2);}}
                className={`w-full text-left p-3 rounded-lg border transition-all ${selHospital?.name===h.name?'border-purple-500 bg-purple-600/20':'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                <div className="text-white mb-1" style={{fontSize:'13px'}}>{h.name}</div>
                <div className="flex gap-3" style={{fontSize:'11px'}}>
                  <span className="text-gray-400">{h.distance}</span>
                  <span className="text-yellow-400">{h.queue} wait</span>
                  <span className="text-green-400">{h.beds}</span>
                </div>
              </button>
            ))}
          </div>
        )}
        {bookStep===2 && selHospital && (
          <div className="space-y-3">
            <p className="text-gray-400" style={{fontSize:'12px'}}>Step 2 of 4 — Select Department</p>
            <p className="text-white" style={{fontSize:'12px'}}>{selHospital.name}</p>
            <div className="grid grid-cols-2 gap-2">
              {selHospital.departments.map(d=>(
                <button key={d} onClick={()=>{setSelDept(d);setSelDoctor('');setBookStep(3);}}
                  className={`p-3 rounded-lg border text-left transition-all ${selDept===d?'border-purple-500 bg-purple-600/20':'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                  <span className="text-white" style={{fontSize:'12px'}}>{d}</span>
                </button>
              ))}
            </div>
            <button onClick={()=>setBookStep(1)} className="w-full bg-white/5 border border-white/10 rounded-lg py-2 text-gray-400" style={{fontSize:'12px'}}>← Back</button>
          </div>
        )}
        {bookStep===3 && (
          <div className="space-y-3">
            <p className="text-gray-400" style={{fontSize:'12px'}}>Step 3 of 4 — Doctor & Time</p>
            {doctors.map(d=>(
              <button key={d.name} onClick={()=>setSelDoctor(d.name)}
                className={`w-full text-left p-3 rounded-lg border transition-all ${selDoctor===d.name?'border-purple-500 bg-purple-600/20':'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                <div className="text-white mb-1" style={{fontSize:'13px'}}>{d.name}</div>
                <div className="text-gray-400" style={{fontSize:'11px'}}>{d.qual} • {d.exp}</div>
              </button>
            ))}
            {selDoctor && (
              <>
                <div>
                  <label className="text-gray-400 mb-2 block" style={{fontSize:'11px'}}>Date</label>
                  <input type="date" value={selDate} onChange={e=>setSelDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"/>
                </div>
                <div>
                  <label className="text-gray-400 mb-2 block" style={{fontSize:'11px'}}>Time Slot</label>
                  <div className="grid grid-cols-3 gap-2">
                    {TIME_SLOTS.map(t=>(
                      <button key={t} onClick={()=>setSelTime(t)}
                        className={`py-2 rounded-lg text-center transition-all ${selTime===t?'bg-purple-600 text-white':'bg-white/5 text-gray-400 hover:bg-white/10'}`}
                        style={{fontSize:'11px'}}>{t}</button>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div>
              <label className="text-gray-400 mb-2 block" style={{fontSize:'11px'}}>Reason</label>
              <textarea value={reason} onChange={e=>setReason(e.target.value)} rows={2} placeholder="Describe symptoms..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 resize-none" style={{fontSize:'12px'}}/>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>setBookStep(2)} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-gray-400" style={{fontSize:'12px'}}>← Back</button>
              <button onClick={()=>{if(selDoctor&&selDate&&selTime)setBookStep(4);else toast.error('Fill all fields');}} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Review →</button>
            </div>
          </div>
        )}
        {bookStep===4 && (
          <div className="space-y-3">
            <p className="text-gray-400" style={{fontSize:'12px'}}>Step 4 of 4 — Confirm</p>
            <div className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-2">
              {[['Hospital',selHospital?.name],['Department',selDept],['Doctor',selDoctor],['Date',selDate],['Time',selTime],['Reason',reason||'General Checkup']].map(([l,v])=>(
                <div key={l} className="flex justify-between"><span className="text-gray-400" style={{fontSize:'11px'}}>{l}</span><span className="text-white" style={{fontSize:'11px'}}>{v}</span></div>
              ))}
            </div>
            <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-3 text-center">
              <p className="text-purple-400" style={{fontSize:'11px'}}>Free consultation at government hospitals</p>
            </div>
            <div className="flex gap-3">
              <button onClick={()=>setBookStep(3)} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-gray-400" style={{fontSize:'12px'}}>← Edit</button>
              <button onClick={handleConfirmBooking} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Confirm</button>
            </div>
          </div>
        )}
        {bookStep===5 && (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto"/>
            <h3 className="text-white">Appointment Confirmed!</h3>
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="text-gray-400 mb-1" style={{fontSize:'11px'}}>Token Number</div>
              <div className="text-green-400" style={{fontSize:'32px',fontWeight:800}}>{bookingToken}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2">
              {[['Doctor',selDoctor],['Date & Time',`${selDate} ${selTime}`],['Hospital',selHospital?.name]].map(([l,v])=>(
                <div key={l} className="flex justify-between"><span className="text-gray-400" style={{fontSize:'11px'}}>{l}</span><span className="text-white" style={{fontSize:'11px'}}>{v}</span></div>
              ))}
            </div>
            <p className="text-gray-400" style={{fontSize:'11px'}}>SMS confirmation sent to registered mobile</p>
            <button onClick={()=>setShowBooking(false)} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Done</button>
          </div>
        )}
      </Modal>

      {/* MEDICAL RECORDS MODAL */}
      <Modal isOpen={showRecords} onClose={()=>setShowRecords(false)} title="Medical Records" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-3">
            <p className="text-white" style={{fontSize:'12px'}}>Patient ID: TN987654 • Aadhaar Linked ✓</p>
            <p className="text-gray-400" style={{fontSize:'11px'}}>All records encrypted and secure</p>
          </div>
          {[{title:'Blood Report',date:'May 15, 2026',type:'Lab',size:'1.2 MB'},{title:'ECG Report',date:'Apr 20, 2026',type:'Cardiology',size:'0.8 MB'},{title:'X-Ray Chest',date:'Mar 10, 2026',type:'Radiology',size:'3.5 MB'},{title:'Discharge Summary',date:'Feb 2, 2026',type:'General',size:'0.4 MB'}].map((r,i)=>(
            <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-blue-400"/>
                <div><div className="text-white" style={{fontSize:'13px'}}>{r.title}</div><div className="text-gray-400" style={{fontSize:'10px'}}>{r.type} • {r.date} • {r.size}</div></div>
              </div>
              <button onClick={()=>toast.success(`Downloading ${r.title}`)} className="w-9 h-9 bg-purple-600/20 rounded-lg flex items-center justify-center hover:bg-purple-600/40 transition-colors">
                <Download className="w-4 h-4 text-purple-400"/>
              </button>
            </div>
          ))}
          <button onClick={()=>{setShowRecords(false);toast.info('Request sent',{description:'Health history will be compiled.'});}}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Request Full Health History</button>
        </div>
      </Modal>

      {/* ORDER MEDICINE MODAL */}
      <Modal isOpen={showMedOrder} onClose={()=>setShowMedOrder(false)} title="Order Medicine" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-3">
            <p className="text-green-400" style={{fontSize:'12px'}}>Free medicines at govt hospitals with prescription</p>
          </div>
          {[{name:'Metformin 500mg (30 tabs)',stock:'In Stock',delivery:'2 days'},{name:'Atorvastatin 10mg (30 tabs)',stock:'In Stock',delivery:'2 days'},{name:'Amlodipine 5mg (30 tabs)',stock:'Low Stock',delivery:'3 days'}].map((m,i)=>(
            <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-lg">
              <div><div className="text-white mb-1" style={{fontSize:'12px'}}>{m.name}</div>
              <div className="flex gap-3"><span className="text-green-400" style={{fontSize:'10px'}}>{m.stock}</span><span className="text-gray-400" style={{fontSize:'10px'}}>Delivery: {m.delivery}</span></div></div>
              <button onClick={()=>toast.success(`${m.name} added`)} className="bg-purple-600/20 text-purple-400 px-3 py-1 rounded-lg" style={{fontSize:'11px'}}>Add</button>
            </div>
          ))}
          <button onClick={()=>{setShowMedOrder(false);toast.success('Order Placed! 💊',{description:'Medicines delivered in 2 days.'});}}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Place Order (Free Delivery)</button>
        </div>
      </Modal>

      {/* INSURANCE MODAL */}
      <Modal isOpen={showInsurance} onClose={()=>setShowInsurance(false)} title="Health Insurance" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-600/30 rounded-xl p-4">
            <div className="text-gray-400 mb-1" style={{fontSize:'11px'}}>Coverage Amount</div>
            <div className="text-white" style={{fontSize:'28px',fontWeight:800}}>₹5,00,000</div>
            <div className="text-green-400" style={{fontSize:'11px'}}>Chief Minister's Comprehensive Health Insurance</div>
          </div>
          {[['Policy Number','CMCHI-TN-9876543'],['Valid Until','March 31, 2027'],['Empanelled Hospitals','1,240+'],['Claims This Year','₹0 (No claims)']].map(([l,v])=>(
            <div key={l} className="flex justify-between p-3 bg-white/5 rounded-lg">
              <span className="text-gray-400" style={{fontSize:'12px'}}>{l}</span>
              <span className="text-white" style={{fontSize:'12px'}}>{v}</span>
            </div>
          ))}
          <button onClick={()=>{setShowInsurance(false);toast.success('Claim Registered',{description:'Ref: CLM-2026-'+Math.floor(Math.random()*90000+10000)});}}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>File Insurance Claim</button>
        </div>
      </Modal>

      {/* LAB TEST MODAL */}
      <Modal isOpen={showLabBook} onClose={()=>setShowLabBook(false)} title="Book Lab Test" darkMode={darkMode}>
        <div className="space-y-4">
          <div className="bg-teal-600/20 border border-teal-600/30 rounded-lg p-3">
            <p className="text-teal-400" style={{fontSize:'12px'}}>All lab tests free at government hospitals with doctor's request</p>
          </div>
          <div>
            <label className="text-gray-400 mb-2 block" style={{fontSize:'11px'}}>Select Test</label>
            <div className="space-y-2">
              {LAB_TESTS.map(t=>(
                <button key={t.name} onClick={()=>setSelLab(t.name)}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${selLab===t.name?'border-teal-500 bg-teal-600/20':'border-white/10 bg-white/5 hover:bg-white/10'}`}>
                  <div className="flex justify-between">
                    <span className="text-white" style={{fontSize:'12px'}}>{t.name}</span>
                    <span className="text-green-400" style={{fontSize:'11px'}}>{t.price}</span>
                  </div>
                  <div className="text-gray-400" style={{fontSize:'10px'}}>Result: {t.duration}</div>
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-gray-400 mb-2 block" style={{fontSize:'11px'}}>Preferred Date</label>
            <input type="date" value={labDate} onChange={e=>setLabDate(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-teal-500"/>
          </div>
          <div className="flex gap-3">
            <button onClick={()=>setShowLabBook(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Cancel</button>
            <button onClick={handleLabBook} className="flex-1 bg-gradient-to-r from-teal-600 to-emerald-600 rounded-lg py-3 text-white" style={{fontSize:'12px'}}>Confirm Booking</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
