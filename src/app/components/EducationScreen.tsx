import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { GraduationCap, BookOpen, Award, FileText, Calendar, TrendingUp, IndianRupee, Users, Download, CreditCard, Check, CheckCircle, Loader2 } from 'lucide-react';

interface EducationScreenProps {
  onBack?: () => void;
  darkMode?: boolean;
}

export function EducationScreen({ onBack, darkMode = true }: EducationScreenProps = {}) {
  const [showFeePayment, setShowFeePayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  
  const studentStats = [
    { icon: BookOpen, label: 'Attendance', value: '94.5%', color: 'text-green-400' },
    { icon: Award, label: 'Grade', value: 'A+', color: 'text-purple-400' },
    { icon: FileText, label: 'Assignments', value: '8/10', color: 'text-blue-400' },
    { icon: IndianRupee, label: 'Pending Fees', value: '₹2,500', color: 'text-yellow-400', action: () => setShowFeePayment(true) },
  ];

  const exams = [
    { subject: 'Mathematics', score: 95, grade: 'A+', date: 'May 15, 2026' },
    { subject: 'Science', score: 92, grade: 'A+', date: 'May 14, 2026' },
    { subject: 'Tamil', score: 88, grade: 'A', date: 'May 13, 2026' },
    { subject: 'English', score: 90, grade: 'A+', date: 'May 12, 2026' },
    { subject: 'Social Science', score: 87, grade: 'A', date: 'May 11, 2026' },
  ];

  const scholarships = [
    { name: 'Student Excellence Scholarship', amount: '₹1,200/month', status: 'Active', color: 'green' },
    { name: 'Merit Scholarship', amount: '₹800/month', status: 'Eligible', color: 'blue' },
    { name: 'Sports Scholarship', amount: '₹750/month', status: 'Pending', color: 'yellow' },
  ];

  const programs = [
    { title: 'Smart Tablet Scheme', desc: 'Free tablet with AI assistant', status: 'Apply Now' },
    { title: 'AI & Coding Training', desc: 'Free Python, AI courses', status: 'Enroll' },
    { title: 'Career Guidance', desc: 'AI-powered college selection', status: 'Book Session' },
    { title: 'Mock Interview', desc: 'AI-powered practice', status: 'Start' },
  ];

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [programStep, setProgramStep] = useState<1|2>(1);
  const [programForm, setProgramForm] = useState({ name: 'Priya Ramesh', phone: '', address: '', school: 'Govt Higher Secondary School', class: '12', reason: '' });

  const openModal = (program: string) => {
    setSelectedProgram(program); setProgramStep(1); setModalOpen(true);
  };

  const closeModal = () => setModalOpen(false);

  const handleProgramApply = () => {
    setProgramStep(2);
    toast.success(`${selectedProgram} — Application Submitted! 🎓`, {
      description: `Ref: PRG${Math.floor(Math.random()*900000+100000)} • You'll receive SMS within 24 hours`,
      duration: 5000,
    });
  };

  const handlePayment = async () => {
    setPaymentSuccess(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));

    setShowFeePayment(false);
    setPaymentSuccess(false);

    const transactionId = 'EDU' + Math.floor(Math.random() * 1000000);

    toast.success('Fee Payment Successful! 🎓', {
      description: `Transaction ID: ${transactionId}\nAmount: ₹2,500 paid via TN Digital Wallet`,
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
        <GlassCard className="bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-white mb-1">Priya Ramesh</h2>
              <p className="text-gray-400" style={{ fontSize: '12px' }}>
                Class 12 - Government Higher Secondary School
              </p>
              <p className="text-gray-400" style={{ fontSize: '11px' }}>
                Roll No: 12A045 | Student ID: TN12345678
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {studentStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
            >
              <GlassCard>
                <Icon className={`w-5 h-5 ${stat.color} mb-2`} />
                <div className={`mb-1 ${stat.color}`}>{stat.value}</div>
                <div className="text-gray-400" style={{ fontSize: '11px' }}>
                  {stat.label}
                </div>
                {stat.action && (
                  <button
                    onClick={stat.action}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 px-3 py-2 rounded-lg text-white hover:shadow-lg transition-shadow mt-2"
                    style={{ fontSize: '11px' }}
                  >
                    Pay Now
                  </button>
                )}
              </GlassCard>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <h3 className="text-white mb-3">Recent Exam Results</h3>
        <div className="space-y-3">
          {exams.map((exam, idx) => (
            <GlassCard key={idx}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="text-white mb-1">{exam.subject}</h4>
                  <div className="flex items-center gap-2 text-gray-400" style={{ fontSize: '11px' }}>
                    <Calendar className="w-3 h-3" />
                    <span>{exam.date}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl mb-1 ${
                    exam.score >= 90 ? 'text-green-400' :
                    exam.score >= 80 ? 'text-blue-400' :
                    'text-yellow-400'
                  }`}>
                    {exam.score}
                  </div>
                  <div className="text-gray-400" style={{ fontSize: '11px' }}>
                    Grade: {exam.grade}
                  </div>
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${exam.score}%` }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  className={`h-full rounded-full ${
                    exam.score >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                    exam.score >= 80 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                    'bg-gradient-to-r from-yellow-500 to-orange-500'
                  }`}
                />
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-6"
      >
        <h3 className="text-white mb-3">Active Scholarships</h3>
        <div className="space-y-3">
          {scholarships.map((scholarship, idx) => (
            <GlassCard key={idx}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-white mb-1">{scholarship.name}</h4>
                  <div className="flex items-center gap-2 mb-2">
                    <IndianRupee className="w-3 h-3 text-yellow-400" />
                    <span className="text-yellow-400" style={{ fontSize: '12px' }}>
                      {scholarship.amount}
                    </span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full ${
                  scholarship.color === 'green' ? 'bg-green-500/20 text-green-400' :
                  scholarship.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                  'bg-yellow-500/20 text-yellow-400'
                }`} style={{ fontSize: '11px' }}>
                  {scholarship.status}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h3 className="text-white mb-3">Available Programs</h3>
        <div className="grid grid-cols-2 gap-3">
          {programs.map((program, idx) => (
            <GlassCard key={idx}>
              <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>
                {program.title}
              </h4>
              <p className="text-gray-400 mb-3" style={{ fontSize: '11px' }}>
                {program.desc}
              </p>
              <button
                onClick={() => openModal(program.title)}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-3 py-2 rounded-lg text-white hover:shadow-lg transition-shadow"
                style={{ fontSize: '11px' }}
              >
                {program.status}
              </button>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <Modal isOpen={isModalOpen} onClose={closeModal} title={selectedProgram} darkMode={darkMode}>
        {programStep === 1 ? (
          <div className="space-y-4">
            <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-3">
              <p className="text-white mb-1" style={{ fontSize: '12px' }}>{selectedProgram}</p>
              <p className="text-gray-400" style={{ fontSize: '11px' }}>
                {selectedProgram === 'Smart Tablet Scheme' && 'Free AI-powered tablet for Class 9–12 students in government schools'}
                {selectedProgram === 'AI & Coding Training' && '3-month free Python, AI & Data Science bootcamp'}
                {selectedProgram === 'Career Guidance' && 'One-on-one AI-powered college & career counseling session'}
                {selectedProgram === 'Mock Interview' && 'Practice interview with AI — get instant feedback and score'}
              </p>
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Student Name</label>
              <input type="text" value={programForm.name} onChange={e => setProgramForm({...programForm, name: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Phone Number</label>
              <input type="tel" value={programForm.phone} onChange={e => setProgramForm({...programForm, phone: e.target.value})}
                placeholder="+91 9876543210"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>School / Institution</label>
              <input type="text" value={programForm.school} onChange={e => setProgramForm({...programForm, school: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500" />
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Class / Year</label>
              <select value={programForm.class} onChange={e => setProgramForm({...programForm, class: e.target.value})}
                className="w-full bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500" style={{ backgroundColor: '#0a0a1a' }}>
                {['8','9','10','11','12','UG Year 1','UG Year 2','UG Year 3'].map(c => <option key={c} value={c} style={{ backgroundColor: '#0a0a1a' }}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-gray-400 mb-2 block" style={{ fontSize: '11px' }}>Why do you want to apply?</label>
              <textarea value={programForm.reason} onChange={e => setProgramForm({...programForm, reason: e.target.value})}
                rows={2} placeholder="Brief reason..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 resize-none" style={{ fontSize: '12px' }} />
            </div>
            <div className="flex gap-3">
              <button onClick={closeModal} className="flex-1 bg-white/5 border border-white/10 rounded-lg py-3 text-gray-400" style={{ fontSize: '12px' }}>Cancel</button>
              <button onClick={handleProgramApply} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Submit Application</button>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">Application Submitted!</h3>
            <div className="bg-green-500/20 border border-green-500/30 rounded-xl p-4">
              <div className="text-gray-400 mb-1" style={{ fontSize: '11px' }}>Reference ID</div>
              <div className="text-green-400" style={{ fontSize: '20px', fontWeight: 800 }}>PRG{Math.floor(Math.random()*900000+100000)}</div>
            </div>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2">
              <div className="text-gray-400" style={{ fontSize: '11px' }}>✅ Application received</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>📱 SMS will be sent within 24 hours</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>⏱️ Processing: 5–7 working days</div>
            </div>
            <button onClick={closeModal} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>

      {/* Fee Payment Modal */}
      <Modal isOpen={showFeePayment} onClose={() => setShowFeePayment(false)} title="Pay Education Fees" darkMode={darkMode}>
        {!paymentSuccess ? (
          <div className="space-y-4">
            <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-400">Fee Amount</span>
                <span className="text-white text-2xl font-bold">₹2,500</span>
              </div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>
                Student: TN12345678 • Due: May 31, 2026
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
              <button onClick={() => setShowFeePayment(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10 transition-colors">
                Cancel
              </button>
              <button onClick={handlePayment} className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg px-4 py-3 text-white hover:shadow-lg transition-shadow font-medium">
                Pay ₹2,500
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-white mb-2">Payment Successful!</h3>
            <p className="text-gray-400">Processing your payment...</p>
          </div>
        )}
      </Modal>
    </div>
  );
}