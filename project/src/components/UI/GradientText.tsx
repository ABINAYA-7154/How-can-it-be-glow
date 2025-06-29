import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GradientTextProps {
  text: string;
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ text, className = '' }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`relative ${className}`}
    >
      <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-pink-400 via-purple-500 to-teal-400 bg-clip-text text-transparent leading-tight">
        {displayText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
          className="text-pink-400"
        >
          |
        </motion.span>
      </h1>
      
      {/* Glow effect */}
      <div className="absolute inset-0 text-6xl md:text-8xl font-bold text-pink-400 opacity-20 blur-sm">
        {displayText}
      </div>
    </motion.div>
  );
};

export default GradientText;