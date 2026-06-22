import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { toast } from 'sonner';
import { Gift, Users, GraduationCap, Home, Briefcase, Heart, DollarSign, ChevronRight, CheckCircle, Download, FileText, User, Phone, MapPin, Loader2 } from 'lucide-react';

interface SchemesScreenProps {
  onBack?: () => void;
  darkMode?: boolean;
}

export function SchemesScreen({ onBack, darkMode = true }: SchemesScreenProps = {}) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState<any>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [formData, setFormData] = useState({
    name: 'karthick',
    phone: '+91 98765 43210',
    address: 'Anna Nagar, Chennai',
    aadhaar: '',
  });

  const categories = [
    { id: 'all', label: 'All', labelTa: 'அனைத்தும்', icon: Gift },
    { id: 'women', label: 'Women', labelTa: 'பெண்கள்', icon: Users },
    { id: 'student', label: 'Student', labelTa: 'மாணவர்கள்', icon: GraduationCap },
    { id: 'farmer', label: 'Farmer', labelTa: 'விவசாயிகள்', icon: Home },
    { id: 'job', label: 'Jobs', labelTa: 'வேலைகள்', icon: Briefcase },
    { id: 'health', label: 'Health', labelTa: 'மருத்துவம்', icon: Heart },
  ];

  const schemes = [
    {
      name: 'Monthly Women Assistance Scheme',
      nameTa: 'மாதாந்திர பெண்கள் உதவித் திட்டம்',
      amount: '₹1,500/month',
      category: 'women',
      beneficiaries: '1.2 Cr',
      eligible: true,
      desc: 'Monthly financial support for women',
    },
    {
      name: 'Women Entrepreneur Loan',
      nameTa: 'பெண் தொழில் முனைவோர் கடன்',
      amount: 'Interest-free',
      category: 'women',
      beneficiaries: '45 Lakh',
      eligible: true,
      desc: 'Interest-free loans for women entrepreneurs',
    },
    {
      name: 'Free Sanitary Products',
      nameTa: 'இலவச சுகாதார பொருட்கள்',
      amount: 'Free',
      category: 'women',
      beneficiaries: '82 Lakh',
      eligible: true,
      desc: 'Free sanitary products for all women',
    },
    {
      name: 'Smart Tablet for Students',
      nameTa: 'மாணவர்களுக்கு ஸ்மார்ட் டேப்லெட்',
      amount: 'Free Tablet',
      category: 'student',
      beneficiaries: '25 Lakh',
      eligible: true,
      desc: 'Smart tablets with AI learning assistants',
    },
    {
      name: 'Free Government Exam Coaching',
      nameTa: 'இலவச அரசு தேர்வு பயிற்சி',
      amount: 'Free',
      category: 'student',
      beneficiaries: '8.5 Lakh',
      eligible: true,
      desc: 'Free coaching for competitive exams',
    },
    {
      name: 'College Startup Grant',
      nameTa: 'கல்லூரி தொடக்க மானியம்',
      amount: '₹5-25 Lakh',
      category: 'student',
      beneficiaries: '12,500',
      eligible: false,
      desc: 'Innovation grants for college students',
    },
    {
      name: 'AI Crop Advisory System',
      nameTa: 'AI பயிர் ஆலோசனை அமைப்பு',
      amount: 'Free',
      category: 'farmer',
      beneficiaries: '28 Lakh',
      eligible: false,
      desc: 'AI-powered crop guidance and weather alerts',
    },
    {
      name: 'Smart Irrigation Network',
      nameTa: 'ஸ்மார்ட் நீர்ப்பாசன வலைப்பின்னல்',
      amount: 'Subsidized',
      category: 'farmer',
      beneficiaries: '15 Lakh',
      eligible: false,
      desc: 'Modern irrigation with smart monitoring',
    },
    {
      name: 'Mega Job Mission',
      nameTa: 'மெகா வேலைவாய்ப்பு பணி',
      amount: '1 Cr Jobs',
      category: 'job',
      beneficiaries: 'All Youth',
      eligible: true,
      desc: 'Create 1 crore jobs in 5 years',
    },
    {
      name: 'Free AI & Coding Training',
      nameTa: 'இலவச AI & கோடிங் பயிற்சி',
      amount: 'Free',
      category: 'job',
      beneficiaries: '12 Lakh',
      eligible: true,
      desc: 'Government-sponsored AI and coding academies',
    },
    {
      name: 'Startup Incubator Network',
      nameTa: 'ஸ்டார்ட்அப் இன்குபேட்டர் வலைப்பின்னல்',
      amount: '₹10-50 Lakh',
      category: 'job',
      beneficiaries: '5,250',
      eligible: true,
      desc: 'Startup incubators in all districts',
    },
    {
      name: 'Annual Free Health Checkup',
      nameTa: 'ஆண்டு இலவச உடல் பரிசோதனை',
      amount: 'Free',
      category: 'health',
      beneficiaries: '3.2 Cr',
      eligible: true,
      desc: 'Complete health checkup once a year',
    },
    {
      name: 'Mobile Hospital Network',
      nameTa: 'நகரும் மருத்துவமனை வலைப்பின்னல்',
      amount: 'Free',
      category: 'health',
      beneficiaries: '2.8 Cr',
      eligible: true,
      desc: 'Mobile hospitals reaching villages',
    },
    {
      name: 'Mental Health Counseling',
      nameTa: 'மன நல ஆலோசனை',
      amount: 'Free',
      category: 'health',
      beneficiaries: '85 Lakh',
      eligible: true,
      desc: 'Free mental health support centers',
    },
  ];

  const filteredSchemes = selectedCategory === 'all'
    ? schemes
    : schemes.filter(s => s.category === selectedCategory);

  const eligibleCount = schemes.filter(s => s.eligible).length;

  const handleApply = (scheme: any) => {
    setSelectedScheme(scheme);
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = async () => {
    if (!formData.aadhaar || formData.aadhaar.length !== 12) {
      toast.error('Please enter a valid 12-digit Aadhaar number');
      return;
    }

    setIsApplying(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsApplying(false);
    setShowApplicationModal(false);

    const applicationId = 'APP' + Math.floor(Math.random() * 900000 + 100000);

    toast.success(`Application Submitted Successfully! 🎉`, {
      description: `Application ID: ${applicationId}\nYou will receive SMS confirmation shortly.`,
      duration: 5000,
    });

    // Reset form
    setFormData(prev => ({ ...prev, aadhaar: '' }));
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-white mb-1">Government Schemes</h1>
        <p className="text-gray-400">அரசு திட்டங்கள் | People First Programs</p>

        <GlassCard className="mt-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-purple-400 mb-1">You are eligible for</div>
              <div className="text-white">{eligibleCount} schemes</div>
            </div>
            <CheckCircle className="w-12 h-12 text-green-400" />
          </div>
        </GlassCard>
      </motion.div>

      <div className="mb-6 overflow-x-auto pb-2 -mx-4 px-4">
        <div className="flex gap-2 min-w-max">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500 text-white'
                    : 'bg-white/5 border-white/10 text-gray-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="space-y-4">
        {filteredSchemes.map((scheme, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <GlassCard>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-1">
                    <h3 className="text-white">{scheme.name}</h3>
                    {scheme.eligible && (
                      <div className="bg-green-500/20 text-green-400 px-2 py-1 rounded-full" style={{ fontSize: '11px' }}>
                        Eligible
                      </div>
                    )}
                  </div>
                  <p className="text-gray-400 mb-2" style={{ fontSize: '12px' }}>
                    {scheme.nameTa}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
              </div>

              <p className="text-gray-300 mb-3" style={{ fontSize: '13px' }}>
                {scheme.desc}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className="flex-shrink-0">
                    <div className="text-purple-400 text-sm sm:text-base">{scheme.amount}</div>
                    <div className="text-gray-400 text-xs">
                      Benefit
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="text-blue-400 text-sm sm:text-base">{scheme.beneficiaries}</div>
                    <div className="text-gray-400 text-xs">
                      Beneficiaries
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button className="w-9 h-9 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Download className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={() => handleApply(scheme)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-3 sm:px-4 py-2 rounded-lg text-white hover:shadow-lg transition-shadow text-sm whitespace-nowrap"
                  >
                    {scheme.eligible ? 'Apply Now' : 'Check Eligibility'}
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Application Modal */}
      <Modal
        isOpen={showApplicationModal}
        onClose={() => setShowApplicationModal(false)}
        title="Apply for Scheme"
        darkMode={darkMode}
      >
        {selectedScheme && (
          <div className="space-y-4">
            <div className={`rounded-lg p-4 ${darkMode ? 'bg-purple-600/20 border border-purple-600/30' : 'bg-sky-50 border border-sky-200'}`}>
              <h3 className={`mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{selectedScheme.name}</h3>
              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`} style={{ fontSize: '12px' }}>
                {selectedScheme.nameTa}
              </p>
              <p className={`mt-2 ${darkMode ? 'text-purple-400' : 'text-sky-500'}`}>
                Benefit: {selectedScheme.amount}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '12px' }}>
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`w-full rounded-lg px-4 py-3 outline-none ${
                    darkMode
                      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-purple-500'
                      : 'bg-white border border-sky-200 text-gray-900 placeholder-gray-500 focus:border-sky-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '12px' }}>
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={`w-full rounded-lg px-4 py-3 outline-none ${
                    darkMode
                      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-purple-500'
                      : 'bg-white border border-sky-200 text-gray-900 placeholder-gray-500 focus:border-sky-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '12px' }}>
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Address
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  rows={2}
                  className={`w-full rounded-lg px-4 py-3 outline-none resize-none ${
                    darkMode
                      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-purple-500'
                      : 'bg-white border border-sky-200 text-gray-900 placeholder-gray-500 focus:border-sky-400'
                  }`}
                />
              </div>

              <div>
                <label className={`block mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`} style={{ fontSize: '12px' }}>
                  <FileText className="w-4 h-4 inline mr-1" />
                  Aadhaar Number *
                </label>
                <input
                  type="text"
                  value={formData.aadhaar}
                  onChange={(e) => setFormData({ ...formData, aadhaar: e.target.value.replace(/\D/g, '').slice(0, 12) })}
                  placeholder="Enter 12-digit Aadhaar number"
                  className={`w-full rounded-lg px-4 py-3 outline-none ${
                    darkMode
                      ? 'bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-purple-500'
                      : 'bg-white border border-sky-200 text-gray-900 placeholder-gray-500 focus:border-sky-400'
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowApplicationModal(false)}
                disabled={isApplying}
                className={`flex-1 rounded-lg px-4 py-3 transition-colors ${
                  darkMode
                    ? 'bg-white/5 border border-white/10 text-white hover:bg-white/10'
                    : 'bg-gray-100 border border-sky-200 text-gray-900 hover:bg-gray-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitApplication}
                disabled={isApplying}
                className={`flex-1 rounded-lg px-4 py-3 text-white transition-shadow flex items-center justify-center gap-2 ${
                  darkMode
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-lg'
                    : 'bg-sky-500 hover:shadow-lg'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isApplying ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
