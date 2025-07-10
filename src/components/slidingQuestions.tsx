import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  "Being tired of trying to look good?",
  "Unable to find the best fit for you?",
  "Struggling to know your skin type?",
  "Want to boost your confidence instantly?",
  "Not sure which hairstyle suits you?",
  "Wondering what colors match your vibe?",
  "Need help defining your personal style?",
  "Curious how others perceive your look?",
  "Looking to enhance your first impression?",
  "Ready to unlock your best self?"
];

export default function SlidingQuestions() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % questions.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-xl h-24 flex items-center justify-center bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl mx-auto overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -80, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-violet-300 text-center px-6"
        >
          {questions[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
