import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Code, Eye, MousePointer, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import FeatureCard from '@/components/FeatureCard';
import GlassButton from '@/components/GlassButton';
import SkeletonPreview from '@/components/SkeletonPreview';
import CodeBlock from '@/components/CodeBlock';
import ElementSelector from '@/components/ElementSelector';

const Index = () => {
  const [step, setStep] = React.useState(1);
  const [selectedHtml, setSelectedHtml] = React.useState('');
  const [generatedCode, setGeneratedCode] = React.useState('');
  const [isDemoActive, setIsDemoActive] = React.useState(false);

  const sampleHtml = `
<div class="user-card">
  <div class="user-header">
    <img src="avatar.jpg" alt="User Avatar" class="avatar" />
    <div class="user-info">
      <h3 class="user-name">John Doe</h3>
      <p class="user-title">Product Designer</p>
    </div>
  </div>
  <div class="user-stats">
    <div class="stat">
      <span class="stat-value">142</span>
      <span class="stat-label">Posts</span>
    </div>
    <div class="stat">
      <span class="stat-value">2.8k</span>
      <span class="stat-label">Followers</span>
    </div>
    <div class="stat">
      <span class="stat-value">286</span>
      <span class="stat-label">Following</span>
    </div>
  </div>
  <button class="follow-button">Follow</button>
</div>
  `;

  const sampleGeneratedCode = `
// HTML for the skeleton loader
<div class="user-card skeleton-wrapper">
  <div class="user-header">
    <div class="avatar skeleton-loading"></div>
    <div class="user-info">
      <div class="user-name skeleton-loading" style="width: 120px; height: 20px; border-radius: 4px;"></div>
      <div class="user-title skeleton-loading" style="width: 100px; height: 16px; border-radius: 4px; margin-top: 8px;"></div>
    </div>
  </div>
  <div class="user-stats">
    <div class="stat">
      <div class="stat-value skeleton-loading" style="width: 40px; height: 18px; border-radius: 4px;"></div>
      <div class="stat-label skeleton-loading" style="width: 60px; height: 14px; border-radius: 4px; margin-top: 4px;"></div>
    </div>
    <div class="stat">
      <div class="stat-value skeleton-loading" style="width: 40px; height: 18px; border-radius: 4px;"></div>
      <div class="stat-label skeleton-loading" style="width: 60px; height: 14px; border-radius: 4px; margin-top: 4px;"></div>
    </div>
    <div class="stat">
      <div class="stat-value skeleton-loading" style="width: 40px; height: 18px; border-radius: 4px;"></div>
      <div class="stat-label skeleton-loading" style="width: 60px; height: 14px; border-radius: 4px; margin-top: 4px;"></div>
    </div>
  </div>
  <div class="follow-button skeleton-loading" style="width: 100%; height: 40px; border-radius: 4px;"></div>
</div>

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
}
  `;

  const handleSelectionComplete = (html: string, skeletonCode: string) => {
    setSelectedHtml(html);
    setGeneratedCode(skeletonCode);
    setStep(2);
    toast.success('Element selected and skeleton generated!');
  };

  const handleGenerateSkeleton = () => {
    setSelectedHtml(sampleHtml);
    setGeneratedCode(sampleGeneratedCode);
    setIsDemoActive(true);
    
    setTimeout(() => {
      setStep(2);
      toast.success('Skeleton generated successfully!');
    }, 500);
  };

  const features = [
    {
      title: 'Select & Capture',
      description: 'Select any element on a webpage to capture its structure.',
      icon: <MousePointer className="h-5 w-5 text-primary" />,
      delay: 1
    },
    {
      title: 'Generate Skeleton',
      description: 'Convert HTML structure into elegant skeleton loaders.',
      icon: <Wand2 className="h-5 w-5 text-primary" />,
      delay: 2
    },
    {
      title: 'Preview',
      description: 'See how your skeleton loader will look in real-time.',
      icon: <Eye className="h-5 w-5 text-primary" />,
      delay: 3
    },
    {
      title: 'Copy Code',
      description: 'Get clean, optimized code ready to use in your project.',
      icon: <Code className="h-5 w-5 text-primary" />,
      delay: 4
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 overflow-hidden">
      <Header />
      
      <main className="container px-4 pt-8 pb-16 max-w-6xl">
        {/* Hero section */}
        <section className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6"
          >
            <span className="inline-block text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full mb-4">
              Chrome Extension
            </span>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
              Generate pixel-perfect skeleton loaders
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select any element on a webpage and instantly generate matching skeleton loaders. 
              Perfect for creating elegant loading states that mirror your content structure.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex gap-4 justify-center"
          >
            <GlassButton 
              size="lg" 
              variant="primary"
              onClick={handleGenerateSkeleton}
            >
              Try Demo
            </GlassButton>
            <Link to="/instructions">
              <GlassButton 
                size="lg" 
                variant="outline"
              >
                How to Install
                <ArrowRight className="ml-2 h-4 w-4" />
              </GlassButton>
            </Link>
            <Link to="/test">
              <GlassButton 
                size="lg" 
                variant="ghost"
              >
                Test Selector
                <ArrowRight className="ml-2 h-4 w-4" />
              </GlassButton>
            </Link>
          </motion.div>
        </section>
        
        {/* Features section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              delay={feature.delay}
            />
          ))}
        </section>
        
        {/* Element selection demo */}
        {isDemoActive && !selectedHtml && (
          <ElementSelector onSelectionComplete={handleSelectionComplete} />
        )}
        
        {/* Generated skeleton section */}
        <AnimatePresence mode="wait">
          {step === 2 && (
            <motion.section 
              className="rounded-xl overflow-hidden border shadow-sm mb-16"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-muted/30 p-4 border-b flex justify-between items-center">
                <h2 className="font-semibold">Generated Skeleton</h2>
                <GlassButton 
                  size="sm" 
                  variant="outline"
                  onClick={() => {
                    setStep(1);
                    setIsDemoActive(false);
                    setSelectedHtml('');
                    setGeneratedCode('');
                  }}
                >
                  Reset
                </GlassButton>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                <div className="p-6 border-r">
                  <h3 className="text-sm font-medium mb-3">Original Structure</h3>
                  <div className="rounded-lg border overflow-hidden bg-white p-4">
                    <div className="user-card">
                      <div className="user-header flex items-center mb-4">
                        <div className="avatar bg-muted w-12 h-12 rounded-full"></div>
                        <div className="user-info ml-3">
                          <h3 className="user-name text-base font-semibold">John Doe</h3>
                          <p className="user-title text-sm text-muted-foreground">Product Designer</p>
                        </div>
                      </div>
                      <div className="user-stats flex justify-between mb-4">
                        <div className="stat text-center">
                          <span className="stat-value block font-semibold">142</span>
                          <span className="stat-label text-xs text-muted-foreground">Posts</span>
                        </div>
                        <div className="stat text-center">
                          <span className="stat-value block font-semibold">2.8k</span>
                          <span className="stat-label text-xs text-muted-foreground">Followers</span>
                        </div>
                        <div className="stat text-center">
                          <span className="stat-value block font-semibold">286</span>
                          <span className="stat-label text-xs text-muted-foreground">Following</span>
                        </div>
                      </div>
                      <button className="follow-button w-full py-2 bg-primary text-white rounded-md">Follow</button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-sm font-medium mb-3">Skeleton Preview</h3>
                  <div className="user-card">
                    <div className="user-header flex items-center mb-4">
                      <div className="avatar w-12 h-12 rounded-full skeleton-loading"></div>
                      <div className="user-info ml-3">
                        <div className="user-name skeleton-loading" style={{width: '120px', height: '20px', borderRadius: '4px'}}></div>
                        <div className="user-title skeleton-loading" style={{width: '100px', height: '16px', borderRadius: '4px', marginTop: '8px'}}></div>
                      </div>
                    </div>
                    <div className="user-stats flex justify-between mb-4">
                      <div className="stat text-center">
                        <div className="stat-value skeleton-loading mx-auto" style={{width: '40px', height: '18px', borderRadius: '4px'}}></div>
                        <div className="stat-label skeleton-loading mx-auto" style={{width: '60px', height: '14px', borderRadius: '4px', marginTop: '4px'}}></div>
                      </div>
                      <div className="stat text-center">
                        <div className="stat-value skeleton-loading mx-auto" style={{width: '40px', height: '18px', borderRadius: '4px'}}></div>
                        <div className="stat-label skeleton-loading mx-auto" style={{width: '60px', height: '14px', borderRadius: '4px', marginTop: '4px'}}></div>
                      </div>
                      <div className="stat text-center">
                        <div className="stat-value skeleton-loading mx-auto" style={{width: '40px', height: '18px', borderRadius: '4px'}}></div>
                        <div className="stat-label skeleton-loading mx-auto" style={{width: '60px', height: '14px', borderRadius: '4px', marginTop: '4px'}}></div>
                      </div>
                    </div>
                    <div className="follow-button skeleton-loading" style={{width: '100%', height: '40px', borderRadius: '4px'}}></div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t">
                <h3 className="text-sm font-medium mb-3">Generated Code</h3>
                <CodeBlock code={generatedCode} />
              </div>
            </motion.section>
          )}
        </AnimatePresence>
        
        {/* Call to action section */}
        <section className="glass rounded-xl p-8 text-center max-w-3xl mx-auto">
          <motion.h2 
            className="text-2xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Ready to enhance your loading experience?
          </motion.h2>
          <motion.p 
            className="text-muted-foreground mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Install the Chrome extension today and start creating beautiful skeleton loaders for your web applications.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Link to="/instructions">
              <GlassButton variant="primary">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </GlassButton>
            </Link>
          </motion.div>
        </section>
      </main>
      
      {/* Footer */}
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

export default Index;
