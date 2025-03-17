
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedLogo from './AnimatedLogo';

const Header: React.FC = () => {
  return (
    <header className="w-full py-4 px-6 glass z-50 sticky top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <AnimatedLogo />
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl font-semibold tracking-tight"
          >
            SkeletonSnapper
          </motion.div>
        </Link>
        
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center space-x-6"
        >
          <Link 
            to="/" 
            className="text-sm font-medium opacity-90 hover:opacity-100 transition-opacity"
          >
            Home
          </Link>
          <Link 
            to="/instructions" 
            className="text-sm font-medium opacity-90 hover:opacity-100 transition-opacity"
          >
            Instructions
          </Link>
          <a 
            href="https://github.com/username/skeleton-snapper" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm font-medium opacity-90 hover:opacity-100 transition-opacity"
          >
            GitHub
          </a>
        </motion.nav>
      </div>
    </header>
  );
};

export default Header;
