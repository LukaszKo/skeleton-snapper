
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Chrome, Download, Settings, Monitor, Code, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import GlassButton from '@/components/GlassButton';

const Instructions = () => {
  const steps = [
    {
      title: 'Download the Extension',
      description: 'Download the SkeletonSnapper extension from the Chrome Web Store.',
      icon: <Download className="h-5 w-5 text-primary" />,
      delay: 1
    },
    {
      title: 'Install in Chrome',
      description: 'Click "Add to Chrome" and confirm the installation in the dialog.',
      icon: <Chrome className="h-5 w-5 text-primary" />,
      delay: 2
    },
    {
      title: 'Configure Settings',
      description: 'Optional: Configure the extension settings to match your preferences.',
      icon: <Settings className="h-5 w-5 text-primary" />,
      delay: 3
    },
    {
      title: 'Browse Any Website',
      description: 'Navigate to any website where you want to create skeleton loaders.',
      icon: <Monitor className="h-5 w-5 text-primary" />,
      delay: 4
    },
    {
      title: 'Select Elements',
      description: 'Click the extension icon and use the selector to highlight elements.',
      icon: <Code className="h-5 w-5 text-primary" />,
      delay: 5
    },
    {
      title: 'Generate & Copy',
      description: 'Generate the skeleton code and copy it to your clipboard.',
      icon: <CheckCircle2 className="h-5 w-5 text-primary" />,
      delay: 6
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="container px-4 pt-8 pb-16 max-w-4xl">
        <div className="mb-10">
          <Link to="/">
            <GlassButton variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </GlassButton>
          </Link>
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8">
            How to Install and Use SkeletonSnapper
          </h1>
          
          <div className="glass rounded-xl p-8 mb-10">
            <h2 className="text-xl font-semibold mb-6">Installation Guide</h2>
            
            <div className="space-y-6">
              {steps.map((step, index) => (
                <motion.div 
                  key={index}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-medium mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="glass rounded-xl p-8 mb-10">
            <h2 className="text-xl font-semibold mb-6">Usage Tips</h2>
            
            <ul className="space-y-4 text-sm">
              <motion.li 
                className="flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>For best results, select the parent container of the content you want to skeletonize.</span>
              </motion.li>
              <motion.li 
                className="flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>The generated code includes both HTML structure and CSS for the animation effect.</span>
              </motion.li>
              <motion.li 
                className="flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>You can customize the animation speed and colors in the extension settings.</span>
              </motion.li>
              <motion.li 
                className="flex gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                <span>For complex layouts, you may need to make minor adjustments to the generated code.</span>
              </motion.li>
            </ul>
          </div>
          
          <div className="glass rounded-xl p-8 text-center">
            <motion.h2 
              className="text-xl font-semibold mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              Ready to get started?
            </motion.h2>
            <motion.p 
              className="text-muted-foreground mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Download the extension today and enhance your web applications with elegant loading states.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <GlassButton variant="primary">
                Download Extension
                <Download className="ml-2 h-4 w-4" />
              </GlassButton>
            </motion.div>
          </div>
        </motion.div>
      </main>
      
      <footer className="py-6 border-t">
        <div className="container px-4 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>© 2023 SkeletonSnapper. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
            <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            <a href="#" className="hover:text-foreground transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Instructions;
