import { ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  darkMode?: boolean;
}

export function Modal({ isOpen, onClose, title, children, darkMode = true }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className={`fixed inset-0 backdrop-blur-sm z-50 ${darkMode ? 'bg-black/80' : 'bg-black/40'}`}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-4 sm:inset-8 z-50 flex items-center justify-center p-4 sm:p-0"
          >
            <div className={`w-full max-w-lg max-h-[85vh] sm:max-h-[90vh] overflow-y-auto backdrop-blur-xl rounded-2xl shadow-2xl ${
              darkMode
                ? 'bg-[#0a0a0f]/95 border border-white/10'
                : 'bg-white border border-sky-200'
            }`}>
              <div className={`sticky top-0 backdrop-blur-xl p-3 sm:p-4 flex items-center justify-between ${
                darkMode
                  ? 'bg-[#0a0a0f]/80 border-b border-white/10'
                  : 'bg-white/80 border-b border-sky-200'
              }`}>
                <h2 className={`text-base sm:text-lg ${darkMode ? 'text-white' : 'text-gray-900'}`}>{title}</h2>
                <button
                  onClick={onClose}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    darkMode
                      ? 'bg-white/5 hover:bg-white/10'
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  <X className={`w-5 h-5 ${darkMode ? 'text-white' : 'text-gray-900'}`} />
                </button>
              </div>
              <div className="p-3 sm:p-4">
                {children}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
