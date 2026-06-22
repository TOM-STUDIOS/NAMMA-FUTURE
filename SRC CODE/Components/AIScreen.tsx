import { useState } from 'react';
import { GlassCard } from './GlassCard';
import { motion } from 'motion/react';
import { Send, Mic, Sparkles, MapPin, IndianRupee, FileText, Calendar } from 'lucide-react';

interface AIScreenProps {
  darkMode?: boolean;
}

export function AIScreen({ darkMode = true }: AIScreenProps = {}) {
  const [messages, setMessages] = useState([
    {
      type: 'ai',
      text: 'வணக்கம்! நான் TN AI. உங்களுக்கு எப்படி உதவ முடியும்?',
      textEn: 'Hello! I am TN AI - Your Future Tamil Nadu Assistant. How can I help you?',
    },
  ]);
  const [input, setInput] = useState('');

  const quickQuestions = [
    { icon: MapPin, text: 'When will road work finish?', textTa: 'சாலை வேலை எப்போது முடியும்?' },
    { icon: IndianRupee, text: 'Show my EB bill', textTa: 'எனது EB பில் காட்டு' },
    { icon: FileText, text: 'Apply for scholarship', textTa: 'உதவித்தொகைக்கு விண்ணப்பிக்க' },
    { icon: Calendar, text: 'Government schemes for me', textTa: 'எனக்கான அரசு திட்டங்கள்' },
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { type: 'user', text: input },
      {
        type: 'ai',
        text: `I understand you're asking about: "${input}". This is a demo response. In production, this would connect to a real AI model to provide accurate information about Tamil Nadu government services.`,
        textEn: 'Demo AI Response',
      },
    ]);
    setInput('');
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <div className="flex flex-col h-full pb-24">
      <div className={`p-4 backdrop-blur-xl border-b ${darkMode ? 'bg-black/50 border-white/10' : 'bg-white/90 border-sky-200'}`}>
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className={darkMode ? 'w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center' : 'w-12 h-12 rounded-full flex items-center justify-center'}
            style={!darkMode ? { backgroundColor: '#38bdf8' } : {}}
          >
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h2 className={`${darkMode ? 'text-white' : 'text-gray-900'} text-sm sm:text-base truncate`}>TN AI Assistant</h2>
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-xs hidden sm:block`}>
              Ask me anything | என்னிடம் கேளுங்கள்
            </p>
          </div>
          <div className="ml-auto">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className="max-w-[80%] rounded-2xl p-4"
              style={
                message.type === 'user'
                  ? { background: darkMode ? 'linear-gradient(135deg,#a855f7,#ec4899)' : '#0ea5e9', color: '#fff' }
                  : darkMode
                    ? { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)', color: '#fff' }
                    : { background: '#ffffff', border: '1px solid #bae6fd', color: '#0c1a2e', boxShadow: '0 2px 8px rgba(14,165,233,0.08)' }
              }
            >
              <p className="text-sm sm:text-base break-words">{message.text}</p>
              {message.textEn && (
                <p className={`mt-2 text-xs sm:text-sm ${message.type === 'user' ? (darkMode ? 'text-white/80' : 'text-white/90') : (darkMode ? 'text-gray-300' : 'text-gray-600')}`}>
                  {message.textEn}
                </p>
              )}
            </div>
          </motion.div>
        ))}

        <div className="space-y-2">
          <p className={`px-2 text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Quick questions:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickQuestions.map((q, idx) => {
              const Icon = q.icon;
              return (
                <GlassCard
                  key={idx}
                  onClick={() => handleQuickQuestion(q.text)}
                  className="cursor-pointer"
                >
                  <div className="flex items-start gap-2">
                    <Icon className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-white" style={{ fontSize: '12px' }}>
                        {q.text}
                      </p>
                      <p className="text-gray-400 mt-1" style={{ fontSize: '11px' }}>
                        {q.textTa}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`p-4 border-t ${darkMode ? 'bg-black/50 border-white/10' : 'bg-white border-sky-200'}`}
        style={!darkMode ? { boxShadow: '0 -2px 16px rgba(14,165,233,0.08)' } : {}}
      >
        <div className="flex items-center gap-2">
          <div
            className="flex-1 flex items-center gap-2 rounded-full px-4 py-3"
            style={darkMode
              ? { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.10)' }
              : { background: '#f0f9ff', border: '1px solid #bae6fd' }
            }
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your question..."
              className="flex-1 outline-none"
              style={{
                color: darkMode ? '#ffffff' : '#0c1a2e',
                background: 'transparent',
                border: 'none',
                boxShadow: 'none',
                padding: 0,
              }}
            />
            <button
              onClick={handleSend}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: darkMode ? 'linear-gradient(135deg,#a855f7,#ec4899)' : '#0ea5e9' }}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
          <button
            className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: darkMode ? 'linear-gradient(135deg,#dc2626,#ec4899)' : '#ef4444' }}
          >
            <Mic className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}