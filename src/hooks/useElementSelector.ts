
import { useState, useEffect, useCallback } from 'react';

interface UseElementSelectorProps {
  isActive?: boolean;
  onComplete?: (selectedHtml: string, skeletonCode: string) => void;
}

interface ElementSelection {
  selectedElement: HTMLElement | null;
  selectedHtml: string;
  skeletonCode: string;
}

export function useElementSelector({ 
  isActive = false, 
  onComplete 
}: UseElementSelectorProps = {}) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState<ElementSelection>({
    selectedElement: null,
    selectedHtml: '',
    skeletonCode: ''
  });

  // Start selection mode
  const startSelection = useCallback(() => {
    setIsSelecting(true);
  }, []);

  // Stop selection mode
  const stopSelection = useCallback(() => {
    setIsSelecting(false);
  }, []);

  // Generate skeleton code from HTML
  const generateSkeletonCode = useCallback((htmlElement: HTMLElement): string => {
    // Clone the element to avoid modifying the original
    const clonedElement = htmlElement.cloneNode(true) as HTMLElement;
    
    // Function to transform elements into skeletons
    const skeletonize = (element: HTMLElement) => {
      // Process all child nodes
      Array.from(element.childNodes).forEach(node => {
        // Handle text nodes by removing them
        if (node.nodeType === Node.TEXT_NODE) {
          if (node.textContent?.trim()) {
            node.textContent = '';
          }
        } 
        // Handle element nodes
        else if (node.nodeType === Node.ELEMENT_NODE) {
          const el = node as HTMLElement;
          
          // Special handling for images
          if (el.tagName.toLowerCase() === 'img') {
            el.classList.add('skeleton-loading');
            el.removeAttribute('src');
            el.removeAttribute('srcset');
          }
          
          // Handle input elements
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
              (el.childNodes.length === 1 && el.childNodes[0].nodeType === Node.TEXT_NODE && el.childNodes[0].textContent?.trim())) {
            el.classList.add('skeleton-loading');
            el.style.borderRadius = '4px';
          }
          
          // Continue processing children recursively
          skeletonize(el);
        }
      });
    };
    
    skeletonize(clonedElement);
    
    // Generate HTML and CSS for skeleton
    const skeletonHtml = clonedElement.outerHTML;
    
    const skeletonCss = `
// CSS for the skeleton animation
.skeleton-loading {
  background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}`;
    
    return `${skeletonHtml}\n\n${skeletonCss}`;
  }, []);

  // Process the selection when an element is selected
  const processSelection = useCallback((element: HTMLElement) => {
    const originalHtml = element.outerHTML;
    const skeletonCode = generateSkeletonCode(element);
    
    setSelection({
      selectedElement: element,
      selectedHtml: originalHtml,
      skeletonCode: skeletonCode
    });
    
    if (onComplete) {
      onComplete(originalHtml, skeletonCode);
    }
    
    setIsSelecting(false);
  }, [generateSkeletonCode, onComplete]);

  // Set up event listeners for selection
  useEffect(() => {
    if (!isActive || !isSelecting) return;
    
    let currentHighlightedElement: HTMLElement | null = null;
    
    // Highlight elements on hover
    const handleMouseOver = (e: MouseEvent) => {
      // Remove previous highlight
      if (currentHighlightedElement) {
        currentHighlightedElement.style.outline = '';
      }
      
      // Add new highlight
      const target = e.target as HTMLElement;
      target.style.outline = '2px solid #7c3aed';
      currentHighlightedElement = target;
      
      // Prevent other events
      e.stopPropagation();
    };
    
    // Select element on click
    const handleClick = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      
      const target = e.target as HTMLElement;
      processSelection(target);
      
      // Clean up highlight
      if (currentHighlightedElement) {
        currentHighlightedElement.style.outline = '';
      }
    };
    
    // Add listeners to document
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('click', handleClick, true);
    
    // CSS cursor change to indicate selection mode
    document.body.style.cursor = 'crosshair';
    
    // Cleanup on unmount
    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('click', handleClick, true);
      
      // Reset any highlighted element
      if (currentHighlightedElement) {
        currentHighlightedElement.style.outline = '';
      }
      
      // Reset cursor
      document.body.style.cursor = '';
    };
  }, [isActive, isSelecting, processSelection]);

  return {
    startSelection,
    stopSelection,
    isSelecting,
    selectedElement: selection.selectedElement,
    selectedHtml: selection.selectedHtml,
    skeletonCode: selection.skeletonCode,
  };
}
