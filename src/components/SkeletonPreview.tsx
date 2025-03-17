
import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonPreviewProps {
  htmlStructure: string;
}

const SkeletonPreview: React.FC<SkeletonPreviewProps> = ({ htmlStructure }) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    if (!containerRef.current || !htmlStructure) return;
    
    // Convert HTML structure to skeleton
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlStructure;
    
    const skeletonize = (element: HTMLElement) => {
      // Remove all content text nodes
      Array.from(element.childNodes).forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.textContent = '';
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          
          // Special handling for images
          if (el.tagName.toLowerCase() === 'img') {
            el.classList.add('skeleton-loading');
            el.removeAttribute('src');
            el.removeAttribute('srcset');
          }
          
          // Handle input, button, and other interactive elements
          if (['input', 'button', 'textarea', 'select'].includes(el.tagName.toLowerCase())) {
            el.classList.add('skeleton-loading');
            if (el.tagName.toLowerCase() === 'input' || el.tagName.toLowerCase() === 'textarea') {
              (el as HTMLInputElement).value = '';
              (el as HTMLInputElement).placeholder = '';
            } else {
              el.textContent = '';
            }
          }
          
          // Add skeleton class to elements with text but no children
          if (el.childNodes.length === 0 || 
              (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE)) {
            el.classList.add('skeleton-loading');
            el.style.borderRadius = '4px';
            
            // Preserve original dimensions
            const computedStyle = window.getComputedStyle(el);
            if (computedStyle.display === 'inline' || computedStyle.display === 'inline-block') {
              el.style.width = '80px';
              el.style.height = '16px';
            }
          }
          
          skeletonize(el);
        }
      });
    };
    
    skeletonize(tempDiv);
    
    // Update the container with the skeletonized version
    containerRef.current.innerHTML = '';
    containerRef.current.appendChild(tempDiv);
    
  }, [htmlStructure]);
  
  return (
    <motion.div 
      className="w-full h-full overflow-auto rounded-lg border p-4 bg-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div ref={containerRef} className="skeleton-preview" />
    </motion.div>
  );
};

export default SkeletonPreview;
