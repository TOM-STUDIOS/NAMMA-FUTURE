import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { Briefcase, MapPin, DollarSign, Clock, Check, Upload, FileText, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface JobsScreenProps {
  darkMode?: boolean;
  onBack?: () => void;
}

export function JobsScreen({ onBack, darkMode = true }: JobsScreenProps = {}) {
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [success, setSuccess] = useState(false);

  const jobs = [
    { title: 'Junior Engineer', dept: 'TN PWD', location: 'Chennai', salary: '₹35,000/month', type: 'Government', vacancies: 45 },
    { title: 'Staff Nurse', dept: 'TN Health Dept', location: 'Various', salary: '₹32,000/month', type: 'Government', vacancies: 120 },
    { title: 'Data Analyst', dept: 'Smart Cities Mission', location: 'Chennai', salary: '₹40,000/month', type: 'Contract', vacancies: 15 },
    { title: 'Teacher', dept: 'TN Education Board', location: 'Anna Nagar', salary: '₹38,000/month', type: 'Government', vacancies: 30 },
  ];

  const handleApply = () => {
    if (!resumeUploaded) {
      toast.error('Please upload your resume first');
      return;
    }
    setSuccess(true);
    const appId = 'JOB' + Math.floor(Math.random() * 90000 + 10000);
    toast.success('Application Submitted! 🎉', {
      description: `ID: ${appId} • ${selectedJob?.title} at ${selectedJob?.dept} • Interview call in 7–15 days`,
      duration: 5000,
    });
  };

  const handleCloseSuccess = () => {
    setShowApplyModal(false);
    setSuccess(false);
    setSelectedJob(null);
    setResumeUploaded(false);
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-white mb-1">Job Portal</h1>
        <p className="text-gray-400">வேலைவாய்ப்பு போர்டல் | TN Employment</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
        <GlassCard className="bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-purple-400 mb-1">{jobs.length}+</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Open Positions</div>
            </div>
            <div>
              <div className="text-green-400 mb-1">{jobs.reduce((sum, j) => sum + j.vacancies, 0)}</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Vacancies</div>
            </div>
            <div>
              <div className="text-yellow-400 mb-1">New</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>This Week</div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
        <h3 className="text-white mb-3">Available Jobs</h3>
        <div className="space-y-3">
          {jobs.map((job, idx) => (
            <GlassCard key={idx}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="text-white mb-1">{job.title}</h4>
                  <p className="text-purple-400 mb-2" style={{ fontSize: '12px' }}>{job.dept}</p>
                  <div className="flex items-center gap-3 mb-1">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-400" style={{ fontSize: '11px' }}>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-green-400" />
                      <span className="text-green-400" style={{ fontSize: '11px' }}>{job.salary}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`px-2 py-1 rounded-full ${job.type === 'Government' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'}`} style={{ fontSize: '11px' }}>
                      {job.type}
                    </div>
                    <span className="text-gray-400" style={{ fontSize: '11px' }}>{job.vacancies} vacancies</span>
                  </div>
                </div>
                <Briefcase className="w-8 h-8 text-purple-400" />
              </div>
              <button
                onClick={() => { setSelectedJob(job); setShowApplyModal(true); }}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 rounded-lg text-white hover:shadow-lg transition-shadow"
                style={{ fontSize: '12px' }}
              >
                Apply Now
              </button>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <Modal isOpen={showApplyModal} onClose={() => setShowApplyModal(false)} title="Apply for Job">
        {!success ? (
          <div className="space-y-4">
            {selectedJob && (
              <>
                <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
                  <h3 className="text-white mb-1">{selectedJob.title}</h3>
                  <p className="text-gray-400 mb-2" style={{ fontSize: '12px' }}>{selectedJob.dept}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400">{selectedJob.salary}</span>
                    <span className="text-gray-400" style={{ fontSize: '11px' }}>• {selectedJob.location}</span>
                  </div>
                </div>

                <div>
                  <label className="text-white mb-2 block">Upload Resume (PDF)</label>
                  <button
                    onClick={() => setResumeUploaded(true)}
                    className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg border ${
                      resumeUploaded ? 'bg-green-600/20 border-green-500 text-green-400' : 'bg-white/5 border-white/10 text-white'
                    }`}
                  >
                    {resumeUploaded ? <Check className="w-4 h-4" /> : <Upload className="w-4 h-4" />}
                    {resumeUploaded ? 'Resume Uploaded' : 'Upload Resume'}
                  </button>
                </div>

                <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3">
                  <p className="text-white mb-1" style={{ fontSize: '12px' }}>Application Process:</p>
                  <ul className="text-gray-400 space-y-1" style={{ fontSize: '11px' }}>
                    <li>• Submit online application</li>
                    <li>• Resume screening (7 days)</li>
                    <li>• Interview call (if shortlisted)</li>
                    <li>• Final selection & offer</li>
                  </ul>
                </div>

                <div className="flex gap-3 pt-2">
                  <button onClick={() => setShowApplyModal(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10">
                    Cancel
                  </button>
                  <button onClick={handleApply} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-4 py-3 text-white hover:shadow-lg font-medium">
                    Submit Application
                  </button>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="text-center py-4 space-y-4">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
            <h3 className="text-white">Application Submitted!</h3>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2">
              <div className="text-gray-400" style={{ fontSize: '11px' }}>✅ Resume uploaded</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>📱 SMS confirmation sent</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>⏱️ Interview call in 7–15 days</div>
            </div>
            <button onClick={handleCloseSuccess} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>
    </div>
  );
}
