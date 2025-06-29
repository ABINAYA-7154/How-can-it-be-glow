import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Scissors, User, Sparkles } from 'lucide-react';

interface RoleCardProps {
  role: 'tailor' | 'customer';
  title: string;
  description: string;
  icon: React.ReactNode;
  onSelect: (role: 'tailor' | 'customer') => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, title, description, icon, onSelect }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Tilt
      tiltMaxAngleX={15}
      tiltMaxAngleY={15}
      perspective={1000}
      transitionSpeed={1000}
      gyroscope={true}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ 
          duration: 0.8, 
          delay: role === 'tailor' ? 0.4 : 0.6,
          type: "spring",
          bounce: 0.4
        }}
        whileHover={{ 
          scale: 1.05,
          rotateY: 5,
          transition: { duration: 0.3 }
        }}
        whileTap={{ 
          scale: 0.95,
          transition: { duration: 0.1 }
        }}
        onTapStart={() => setIsPressed(true)}
        onTap={() => {
          setIsPressed(false);
          onSelect(role);
        }}
        className="relative cursor-pointer"
      >
        <div className={`
          relative p-8 rounded-3xl backdrop-blur-md border-2 transition-all duration-500
          ${isPressed 
            ? 'bg-gradient-to-br from-pink-500/30 to-teal-500/30 border-pink-400 shadow-2xl shadow-pink-400/50' 
            : 'bg-gradient-to-br from-white/10 to-white/5 border-white/20 hover:border-teal-400'
          }
        `}>
          {/* Lightning border effect */}
          <div className="absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 rounded-3xl border-2 border-transparent bg-gradient-to-r from-pink-400 via-purple-500 to-teal-400 bg-clip-border animate-pulse"></div>
          </div>
          
          {/* Sparkle effects */}
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-4 right-4 text-pink-400 opacity-70"
          >
            <Sparkles size={20} />
          </motion.div>

          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-pink-400 to-teal-400 mb-6 mx-auto"
          >
            <div className="text-white text-2xl">
              {icon}
            </div>
          </motion.div>

          {/* Content */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-pink-400 to-teal-400 bg-clip-text text-transparent">
              {title}
            </h3>
            <p className="text-white/80 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Hover ripple effect */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400 to-teal-400"
          />
        </div>
      </motion.div>
    </Tilt>
  );
};

export default RoleCard;