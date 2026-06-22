import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { BackButton } from './BackButton';
import { Modal } from './Modal';
import { motion } from 'motion/react';
import { Phone, MessageCircle, HelpCircle, Clock, Check, Send, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

interface HelpdeskScreenProps {
  darkMode?: boolean;
  onBack?: () => void;
}

export function HelpdeskScreen({ onBack, darkMode = true }: HelpdeskScreenProps = {}) {
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [category, setCategory] = useState('');
  const [issue, setIssue] = useState('');
  const [success, setSuccess] = useState(false);

  const myTickets = [
    { id: 'TKT12345', subject: 'Ration card update', status: 'In Progress', date: 'May 12', priority: 'Medium' },
    { id: 'TKT12344', subject: 'EB bill query', status: 'Resolved', date: 'May 8', priority: 'Low' },
  ];

  const faqs = [
    { q: 'How to download my ration card?', a: 'Go to Ration Services → Download Card' },
    { q: 'Where to pay electricity bill?', a: 'Electricity Services → Pay Bill option' },
    { q: 'How to apply for schemes?', a: 'Schemes → Select scheme → Apply Now' },
  ];

  const handleCreateTicket = () => {
    if (!category || !issue) { toast.error('Please fill all fields'); return; }
    const ticketId = 'TKT' + Math.floor(Math.random() * 90000 + 10000);
    setSuccess(true);
    toast.success(`Ticket #${ticketId} Created!`, {
      description: `Category: ${category} • Response within 24–48 hrs • Email notification sent`,
      duration: 5000,
    });
  };

  return (
    <div className="pb-24 pt-4 sm:pt-6 px-3 sm:px-4 overflow-y-auto h-full">
      {onBack && <BackButton onBack={onBack} />}

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-white mb-1">Citizen Helpdesk</h1>
        <p className="text-gray-400">குடிமக்கள் உதவி மையம் | 24/7 Support</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
        <GlassCard className="bg-gradient-to-r from-purple-600/20 to-pink-600/20">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-purple-400 mb-1">24/7</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Available</div>
            </div>
            <div>
              <div className="text-green-400 mb-1">&lt; 2h</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Avg Response</div>
            </div>
            <div>
              <div className="text-yellow-400 mb-1">95%</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>Satisfaction</div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
        <h3 className="text-white mb-3">Contact Support</h3>
        <div className="grid grid-cols-2 gap-3">
          <GlassCard onClick={() => toast.success('Calling 1800-XXX-XXXX', { description: 'Connecting to TN Citizen Helpline... Available 24/7' })} className="cursor-pointer hover:bg-white/10 transition-colors">
            <Phone className="w-8 h-8 text-blue-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>Call Support</h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>1800-XXX-XXXX</p>
          </GlassCard>

          <GlassCard onClick={() => setShowTicketModal(true)} className="cursor-pointer hover:bg-white/10 transition-colors">
            <MessageCircle className="w-8 h-8 text-purple-400 mb-2" />
            <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>Raise Ticket</h4>
            <p className="text-gray-400" style={{ fontSize: '11px' }}>Online support</p>
          </GlassCard>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-6">
        <h3 className="text-white mb-3">My Support Tickets</h3>
        <div className="space-y-3">
          {myTickets.map((ticket, idx) => (
            <GlassCard key={idx}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="text-white mb-1">{ticket.subject}</h4>
                  <div className="flex items-center gap-2 text-gray-400" style={{ fontSize: '11px' }}>
                    <Clock className="w-3 h-3" />
                    <span>{ticket.date}</span>
                  </div>
                </div>
                <div className={`px-2 py-1 rounded-full ${ticket.status === 'Resolved' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`} style={{ fontSize: '11px' }}>
                  {ticket.status}
                </div>
              </div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>
                ID: {ticket.id} • Priority: {ticket.priority}
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 className="text-white mb-3">Frequently Asked Questions</h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <GlassCard key={idx}>
              <div className="flex items-start gap-3">
                <HelpCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white mb-1" style={{ fontSize: '13px' }}>{faq.q}</h4>
                  <p className="text-gray-400" style={{ fontSize: '11px' }}>{faq.a}</p>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </motion.div>

      {/* Create Ticket Modal */}
      <Modal isOpen={showTicketModal} onClose={() => setShowTicketModal(false)} title="Raise Support Ticket">
        {!success ? (
          <div className="space-y-4">
            <div className="bg-purple-600/20 border border-purple-600/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-white mb-2">
                <MessageCircle className="w-5 h-5 text-purple-400" />
                <span className="font-medium">Submit Your Issue</span>
              </div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>
                Our support team will respond within 24-48 hours
              </div>
            </div>

            <div>
              <label className="text-white mb-2 block">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
              >
                <option value="">Select category</option>
                <option value="Technical Issue">Technical Issue</option>
                <option value="Bill Payment">Bill Payment</option>
                <option value="Document Query">Document Query</option>
                <option value="Scheme Application">Scheme Application</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="text-white mb-2 block">Describe Your Issue</label>
              <textarea
                value={issue}
                onChange={(e) => setIssue(e.target.value)}
                placeholder="Please provide details..."
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-400 outline-none focus:border-purple-500 h-24 resize-none"
              />
            </div>

            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3">
              <p className="text-white mb-1" style={{ fontSize: '12px' }}>What to expect:</p>
              <ul className="text-gray-400 space-y-1" style={{ fontSize: '11px' }}>
                <li>• Ticket assigned immediately</li>
                <li>• Response in 24-48 hours</li>
                <li>• Email & SMS updates</li>
                <li>• Track status anytime</li>
              </ul>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={() => setShowTicketModal(false)} className="flex-1 bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white hover:bg-white/10">
                Cancel
              </button>
              <button onClick={handleCreateTicket} className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg px-4 py-3 text-white hover:shadow-lg font-medium flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Submit Ticket
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-12 h-12 text-white" />
            </motion.div>
            <h3 className="text-white mb-2">Ticket Created!</h3>
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-2 mt-2">
              <div className="text-gray-400" style={{ fontSize: '11px' }}>✅ Assigned to support team</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>⏱️ Response within 24–48 hours</div>
              <div className="text-gray-400" style={{ fontSize: '11px' }}>📱 Email notification sent</div>
            </div>
            <button onClick={() => { setShowTicketModal(false); setSuccess(false); setCategory(''); setIssue(''); }} className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg py-3 text-white" style={{ fontSize: '12px' }}>Done</button>
          </div>
        )}
      </Modal>
    </div>
  );
}
