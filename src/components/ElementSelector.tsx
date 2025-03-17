
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Wand2 } from 'lucide-react';
import { useElementSelector } from '@/hooks/useElementSelector';
import GlassButton from './GlassButton';

interface ElementSelectorProps {
  onSelectionComplete?: (htmlStructure: string, skeletonCode: string) => void;
}

const ElementSelector = ({ onSelectionComplete }: ElementSelectorProps) => {
  const [isActive, setIsActive] = useState(false);
  
  const { 
    startSelection, 
    stopSelection, 
    isSelecting, 
    selectedHtml, 
    skeletonCode 
  } = useElementSelector({
    isActive,
    onComplete: (html, skeleton) => {
      if (onSelectionComplete) {
        onSelectionComplete(html, skeleton);
      }
    }
  });
  
  // Effect to handle cancellation with ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSelecting) {
        stopSelection();
        setIsActive(false);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSelecting, stopSelection]);
  
  const handleStartSelection = () => {
    setIsActive(true);
    startSelection();
  };
  
  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isSelecting ? (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium mb-2">Click to select an element or ESC to cancel</p>
          <GlassButton 
            size="sm" 
            variant="destructive" 
            onClick={() => {
              stopSelection();
              setIsActive(false);
            }}
          >
            Cancel Selection
          </GlassButton>
        </div>
      ) : (
        <GlassButton
          onClick={handleStartSelection}
          variant="primary"
        >
          <Wand2 className="mr-2 h-4 w-4" />
          Select Element
        </GlassButton>
      )}
    </motion.div>
  );
};

export default ElementSelector;
