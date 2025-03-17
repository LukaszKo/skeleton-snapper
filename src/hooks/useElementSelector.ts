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
  onComplete,
}: UseElementSelectorProps = {}) {
  const [isSelecting, setIsSelecting] = useState(false);
  const [selection, setSelection] = useState<ElementSelection>({
    selectedElement: null,
    selectedHtml: '',
    skeletonCode: '',
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
  const generateSkeletonCode = useCallback(
    (htmlElement: HTMLElement): string => {
      // Clone the element to avoid modifying the original
      const clonedElement = htmlElement.cloneNode(true) as HTMLElement;
      
      // Add the skeleton-container class to the root element only
      clonedElement.classList.add('skeleton-container');

      // Simple function to preserve dimensions from original elements
      const preserveDimensions = (el: HTMLElement, originalEl: HTMLElement) => {
        // Get computed style
        const computedStyle = window.getComputedStyle(originalEl);
        
        // Preserve width and height
        if (computedStyle.width !== 'auto' && computedStyle.width !== '0px') {
          el.style.width = computedStyle.width;
        }
        if (computedStyle.height !== 'auto' && computedStyle.height !== '0px') {
          el.style.height = computedStyle.height;
        }
        
        // Preserve margin and padding
        el.style.margin = computedStyle.margin;
        el.style.padding = computedStyle.padding;
        
        // Preserve border radius
        el.style.borderRadius = computedStyle.borderRadius;
      };

      // Apply skeleton-loading class only to elements with real content
      const applySkeletonToChildren = (parentElement: HTMLElement) => {
        // Get all child elements (not including the parent)
        const allChildren = parentElement.querySelectorAll('*');
        
        // Add skeleton-loading class only to elements with content
        allChildren.forEach(child => {
          const el = child as HTMLElement;
          const tagName = el.tagName.toLowerCase();
          
          // Check if element has content that should be skeletonized
          const hasContent = 
            // Images
            tagName === 'img' || 
            // Form elements
            ['button', 'input', 'textarea', 'select'].includes(tagName) ||
            // Elements with text content
            (el.textContent && el.textContent.trim().length > 0 && 
             // Only direct text nodes, not text from children
             Array.from(el.childNodes).some(node => 
               node.nodeType === Node.TEXT_NODE && node.textContent && node.textContent.trim().length > 0
             )) ||
            // Elements that typically contain content
            ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'a', 'li', 'td', 'th'].includes(tagName);
          
          if (hasContent) {
            el.classList.add('skeleton-loading');
            
            // Handle specific element types
            if (tagName === 'img') {
              // First, ensure dimensions are preserved
              const rect = el.getBoundingClientRect();
              if (rect.width > 0 && rect.height > 0) {
                el.style.width = `${rect.width}px`;
                el.style.height = `${rect.height}px`;
              }
              
              // Add a placeholder background
              el.style.backgroundColor = '#f0f0f0';
              
              // Then remove all image sources
              el.removeAttribute('src');
              el.removeAttribute('srcset');
              el.removeAttribute('data-src'); // For lazy loading
              el.removeAttribute('data-srcset');
            } else if (['input', 'textarea'].includes(tagName)) {
              (el as HTMLInputElement).value = '';
              (el as HTMLInputElement).placeholder = '';
            } else if (tagName === 'button' || tagName === 'a') {
              // Keep structure but make text transparent
              el.style.color = 'transparent';
            } else if (el.textContent && el.textContent.trim().length > 0) {
              // For text elements, keep structure but make text transparent
              el.style.color = 'transparent';
            }
          }
        });
      };
      
      // Preserve dimensions of the root element
      preserveDimensions(clonedElement, htmlElement);
      
      // Apply skeleton-loading to all children
      applySkeletonToChildren(clonedElement);
      
      // Generate HTML and CSS for skeleton
      const skeletonHtml = clonedElement.outerHTML;

      // Create a complete HTML document with the skeleton CSS embedded
      const skeletonCode = `
<!-- Skeleton HTML -->
${skeletonHtml}

<!-- Skeleton CSS -->
<style>
/* CSS for the skeleton animation */
.skeleton-container {
  position: relative;
}

.skeleton-loading {
  position: relative;
  color: transparent !important;
  background-color: transparent !important;
  border-color: rgba(0, 0, 0, 0.11) !important;
  overflow: hidden;
}

.skeleton-loading::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, #eeeeee 25%, #f9f9f9 50%, #eeeeee 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: inherit;
  z-index: 1;
}

.skeleton-loading img {
  opacity: 0 !important;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}
</style>`;

      return skeletonCode;
    },
    []
  );

  // Process the selection when an element is selected
  const processSelection = useCallback(
    (element: HTMLElement) => {
      const originalHtml = element.outerHTML;
      const skeletonCode = generateSkeletonCode(element);

      setSelection({
        selectedElement: element,
        selectedHtml: originalHtml,
        skeletonCode: skeletonCode,
      });

      if (onComplete) {
        onComplete(originalHtml, skeletonCode);
      }

      setIsSelecting(false);
    },
    [generateSkeletonCode, onComplete]
  );

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
