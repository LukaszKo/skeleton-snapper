
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedLogo: React.FC = () => {
  return (
    <motion.div 
      className="w-12 h-12 relative"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="absolute inset-0 bg-primary rounded-lg"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute inset-0 flex items-center justify-center"
        animate={{ rotate: [0, 5, 0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-8 h-1.5 bg-white rounded-full mb-1" />
        <div className="w-6 h-1.5 bg-white rounded-full mb-1" />
        <div className="w-4 h-1.5 bg-white rounded-full" />
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLogo;
