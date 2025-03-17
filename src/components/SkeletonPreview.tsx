
import React from 'react';
import { motion } from 'framer-motion';
import { Skeleton } from './ui/skeleton';

interface SkeletonPreviewProps {
  skeletonCode: string;
}

const SkeletonPreview: React.FC<SkeletonPreviewProps> = ({ skeletonCode }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (!containerRef.current || !skeletonCode) return;
    
    // Extract HTML from skeleton code (remove the CSS part)
    const htmlPart = skeletonCode.split('\n\n')[0] || '';
    
    // Create skeleton elements
    containerRef.current.innerHTML = htmlPart;
    
    // Apply skeleton class to elements
    const elements = containerRef.current.querySelectorAll('.skeleton-loading');
    elements.forEach(element => {
      if (element instanceof HTMLElement) {
        // Apply skeleton styling
        element.style.backgroundColor = 'transparent';
        element.classList.add('animate-pulse');
      }
    });
    
  }, [skeletonCode]);
  
  if (!skeletonCode) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground text-sm">Select an element to generate skeleton preview</p>
      </div>
    );
  }
  
  return (
    <motion.div 
      className="w-full overflow-auto rounded-lg border p-4 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={containerRef} className="skeleton-preview" />
    </motion.div>
  );
};

export default SkeletonPreview;
