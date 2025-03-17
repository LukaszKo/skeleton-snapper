import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import Header from '@/components/Header';
import GlassButton from '@/components/GlassButton';
import CodeBlock from '@/components/CodeBlock';
import SkeletonPreview from '@/components/SkeletonPreview';
import { useElementSelector } from '@/hooks/useElementSelector';

const TestPage = () => {
  const [isActive, setIsActive] = useState(false);
  const [selectedHtml, setSelectedHtml] = useState('');
  const [skeletonCode, setSkeletonCode] = useState('');
  
  const { 
    startSelection, 
    stopSelection, 
    isSelecting 
  } = useElementSelector({
    isActive,
    onComplete: (html, skeleton) => {
      setSelectedHtml(html);
      setSkeletonCode(skeleton);
      toast.success('Element selected successfully!');
    }
  });
  
  const handleStartSelection = () => {
    setIsActive(true);
    startSelection();
  };
  
  const handleCancelSelection = () => {
    stopSelection();
    setIsActive(false);
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Header />
      
      <main className="container px-4 py-8 max-w-6xl">
        <div className="mb-6 flex items-center">
          <Link to="/" className="mr-4">
            <GlassButton variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </GlassButton>
          </Link>
          <h1 className="text-2xl font-bold">Element Selector Test</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left side: Test controls */}
          <div className="space-y-6">
            <div className="glass p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Selection Controls</h2>
              <div className="space-y-4">
                {isSelecting ? (
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 border shadow-sm">
                    <p className="text-sm mb-3">Click on any element in the test area to select it</p>
                    <GlassButton 
                      variant="destructive"
                      onClick={handleCancelSelection}
                    >
                      Cancel Selection
                    </GlassButton>
                  </div>
                ) : (
                  <GlassButton
                    variant="primary"
                    onClick={handleStartSelection}
                  >
                    Start Element Selection
                  </GlassButton>
                )}
              </div>
            </div>
            
            {/* Selected element info */}
            {selectedHtml && (
              <div className="glass p-6 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Selected Element</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">HTML Structure</h3>
                    <div className="max-h-[200px] overflow-auto">
                      <CodeBlock code={selectedHtml} />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Generated Skeleton</h3>
                    <div className="max-h-[300px] overflow-auto">
                      <CodeBlock code={skeletonCode} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Right side: Test area with sample HTML */}
          <div className="space-y-6">
            <div className="glass p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Test Area</h2>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                {/* User card */}
                <div className="border rounded-lg p-4 mb-6 max-w-md mx-auto">
                  <div className="flex items-center gap-4 mb-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/44.jpg" 
                      alt="User avatar" 
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                    <div>
                      <h3 className="font-bold text-lg">Sarah Johnson</h3>
                      <p className="text-muted-foreground text-sm">Senior Product Designer</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full">Pro Member</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between border-t border-b py-3 mb-4">
                    <div className="text-center">
                      <div className="font-bold">128</div>
                      <div className="text-xs text-muted-foreground">Posts</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">5.3K</div>
                      <div className="text-xs text-muted-foreground">Followers</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold">476</div>
                      <div className="text-xs text-muted-foreground">Following</div>
                    </div>
                  </div>
                  <button className="w-full bg-primary text-white py-2 rounded-md font-medium">
                    Follow
                  </button>
                </div>
                
                {/* List item */}
                <div className="border rounded-lg overflow-hidden max-w-md mx-auto">
                  <div className="divide-y">
                    <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary p-2 rounded-full">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 22V12H15V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Dashboard</div>
                          <div className="text-xs text-muted-foreground">View your dashboard</div>
                        </div>
                      </div>
                      <span className="text-muted-foreground">→</span>
                    </div>
                    
                    <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary p-2 rounded-full">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Team Members</div>
                          <div className="text-xs text-muted-foreground">Manage your team</div>
                        </div>
                      </div>
                      <span className="text-muted-foreground">→</span>
                    </div>
                    
                    <div className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 text-primary p-2 rounded-full">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                        <div>
                          <div className="font-medium">Projects</div>
                          <div className="text-xs text-muted-foreground">View all projects</div>
                        </div>
                      </div>
                      <span className="text-muted-foreground">→</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Skeleton Preview */}
            <div className="glass p-6 rounded-lg">
              <h2 className="text-lg font-semibold mb-4">Skeleton Preview</h2>
              <div className="bg-white rounded-lg min-h-60 shadow-sm overflow-hidden">
                <SkeletonPreview skeletonCode={skeletonCode} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestPage;
