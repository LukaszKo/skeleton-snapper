
import React from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  code, 
  language = 'html',
  className 
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success('Code copied to clipboard');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error('Failed to copy code');
      console.error('Failed to copy code: ', err);
    }
  };

  return (
    <motion.div 
      className={cn(
        "relative overflow-hidden rounded-lg border", 
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50">
        <span className="text-xs font-medium text-muted-foreground">
          {language.toUpperCase()}
        </span>
        <button
          onClick={copyToClipboard}
          className="p-1 rounded hover:bg-muted transition-colors"
          aria-label="Copy code"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Copy className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      </div>
      <pre className="p-4 text-sm overflow-auto bg-card">
        <code className="font-mono">{code}</code>
      </pre>
    </motion.div>
  );
};

export default CodeBlock;
