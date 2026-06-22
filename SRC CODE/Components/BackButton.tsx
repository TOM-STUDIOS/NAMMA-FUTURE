import { ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface BackButtonProps {
  onBack: () => void;
  label?: string;
}

export function BackButton({ onBack, label = 'Back' }: BackButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      onClick={onBack}
      className="lm-back-btn flex items-center gap-2 mb-4 transition-colors"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>{label}</span>
    </motion.button>
  );
}
