
import React from 'react';
import FactCard from '@/components/FactCard';
import CategoryFilter from '@/components/CategoryFilter';
import ActionButtons from '@/components/ActionButtons';
import MobileActionButtons from '@/components/MobileActionButtons';
import AppHeader from '@/components/AppHeader';
import FactStats from '@/components/FactStats';
import AdSense from '@/components/AdSense';
import FactFooter from '@/components/FactFooter';
import SEO from '@/components/SEO';
import AdminPanel from '@/components/AdminPanel';
import FAQSection from '@/components/FAQSection';
import KeyboardShortcutsHelp from '@/components/KeyboardShortcutsHelp';
import { Sparkles } from 'lucide-react';
import { useFacts } from '@/hooks/useFacts';
import { useKeyboardShortcuts, KeyboardShortcut } from '@/hooks/useKeyboardShortcuts';
import { useTheme } from '@/hooks/useTheme';
import { ANIMATION_DELAYS } from '@/constants';

const Index = () => {
  const {
    facts,
    currentFact,
    selectedCategory,
    isLoading,
    isNewFact,
    isDailyMode,
    getRandomFact,
    handleDailyFact,
    handleCategoryChange
  } = useFacts();

  const { toggleTheme } = useTheme();

  // 키보드 단축키 정의
  const shortcuts: KeyboardShortcut[] = [
    {
      key: ' ',
      action: () => getRandomFact(),
      description: '랜덤 Fact 보기'
    },
    {
      key: 'd',
      action: () => handleDailyFact(),
      description: '오늘의 Fact 보기'
    },
    {
      key: 't',
      ctrl: true,
      action: () => toggleTheme(),
      description: '테마 변경'
    },
    {
      key: 'r',
      action: () => window.location.reload(),
      description: '페이지 새로고침'
    }
  ];

  useKeyboardShortcuts({ shortcuts });

  const getDynamicTitle = () => {
    if (currentFact) {
      const prefix = isDailyMode ? "Today's Fact: " : "";
      return `${prefix}${currentFact.text.substring(0, 60)}... - FactFact`;
    }
    return "FactFact - Amazing Facts at Your Fingertips";
  };

  if (isLoading) {
    return (
      <>
        <SEO />
        <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-yellow-200 dark:border-gray-600 border-t-yellow-500 dark:border-t-yellow-400 mx-auto"></div>
              <Sparkles className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="space-y-3">
              <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">Loading amazing facts...</p>
              <p className="text-lg text-gray-500 dark:text-gray-400">Preparing knowledge for you ✨</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO 
        title={getDynamicTitle()}
        description={currentFact ? `${currentFact.text} - Category: ${currentFact.category}` : undefined}
        url={currentFact ? `${window.location.origin}?fact=${currentFact.id}` : undefined}
      />
      
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pb-32 md:pb-8">
        {/* Main Content */}
        <div className="container mx-auto max-w-6xl px-4 pt-8 space-y-10">
          {/* Header */}
          <AppHeader isDailyMode={isDailyMode} facts={facts} />

          {/* Category Filter - Mobile Only at Top */}
          <div className="md:hidden animate-fade-in-up" style={{ animationDelay: ANIMATION_DELAYS.FILTER }}>
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Desktop Controls */}
          <div className="hidden md:flex gap-6 items-center justify-center animate-fade-in-up" style={{ animationDelay: ANIMATION_DELAYS.ACTIONS }}>
            <CategoryFilter 
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            
            <ActionButtons 
              onDailyFact={handleDailyFact}
              onRandomFact={getRandomFact}
              isDailyMode={isDailyMode}
            />
          </div>

          {/* Fact Card - Large and Centered */}
          <div className="animate-fade-in-up" style={{ animationDelay: ANIMATION_DELAYS.CARD }}>
            {currentFact && (
              <FactCard 
                fact={currentFact} 
                isNew={isNewFact}
                isDailyFact={isDailyMode}
              />
            )}
          </div>

          {/* AdSense Banner */}
          <AdSense />

          {/* Fact Footer */}
          {currentFact && (
            <FactFooter factId={currentFact.id} category={currentFact.category} />
          )}

          {/* Stats */}
          <FactStats totalFacts={facts.length} selectedCategory={selectedCategory} />

          {/* FAQ Section */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <FAQSection />
          </div>
        </div>

        {/* Fixed Bottom Controls - Mobile Only */}
        <MobileActionButtons 
          onDailyFact={handleDailyFact}
          onRandomFact={getRandomFact}
        />

        {/* Admin Panel */}
        <AdminPanel facts={facts} />

        {/* Keyboard Shortcuts Help */}
        <KeyboardShortcutsHelp shortcuts={shortcuts} />
      </div>
    </>
  );
};

export default Index;
