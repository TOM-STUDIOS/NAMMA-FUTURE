import { motion } from 'motion/react';
import { Sparkles, Mic } from 'lucide-react';

export function AIAssistant() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="fixed bottom-24 right-6 z-50"
    >
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl"
        style={{
          boxShadow: '0 0 40px rgba(139, 92, 246, 0.6), 0 0 80px rgba(139, 92, 246, 0.3)',
        }}
      >
        <motion.div
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Sparkles className="w-8 h-8 text-white" />
        </motion.div>
      </motion.button>

      <motion.div
        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center"
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
      >
        <Mic className="w-3 h-3 text-white" />
      </motion.div>
    </motion.div>
  );
}
