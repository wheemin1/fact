
import React, { useState } from 'react';
import { Sparkles, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './ThemeToggle';
import SettingsPanel from './SettingsPanel';

interface AppHeaderProps {
  isDailyMode: boolean;
  facts?: any[];
}

const AppHeader: React.FC<AppHeaderProps> = ({ isDailyMode, facts = [] }) => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <div className="text-center space-y-6 animate-fade-in-up">
        <div className="flex items-center justify-between mb-6">
          <div></div> {/* 왼쪽 공간 */}
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <Sparkles className="h-10 w-10 text-yellow-500 animate-pulse" />
              <div className="absolute inset-0 h-10 w-10 bg-yellow-400 rounded-full opacity-30 animate-ping"></div>
            </div>
            <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-yellow-500 via-purple-500 to-pink-500 bg-clip-text text-transparent tracking-tight">
              FactFact
            </h1>
            <div className="relative">
              <Sparkles className="h-10 w-10 text-purple-500 animate-pulse" />
              <div className="absolute inset-0 h-10 w-10 bg-purple-400 rounded-full opacity-30 animate-ping"></div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setShowSettings(true)} 
              variant="outline" 
              size="icon" 
              className="w-10 h-10"
            >
              <Settings className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 mx-auto max-w-3xl border border-yellow-200 dark:border-gray-700 shadow-xl">
          <p className="text-gray-700 dark:text-gray-300 text-xl md:text-2xl font-medium leading-relaxed">
            {isDailyMode ? "🌅 Discover today's amazing fact and expand your knowledge!" : "🚀 Discover fascinating facts from around the world and boost your brain power!"}
          </p>
        </div>
      </div>
      
      <SettingsPanel 
        facts={facts}
        isVisible={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
};

export default AppHeader;
