
import React from 'react';
import { Sparkles } from 'lucide-react';

interface FactStatsProps {
  totalFacts: number;
  selectedCategory: string;
}

const FactStats: React.FC<FactStatsProps> = ({ totalFacts, selectedCategory }) => {
  // 방어적 프로그래밍: selectedCategory가 문자열이 아닌 경우 처리
  const categoryDisplay = typeof selectedCategory === 'string' ? selectedCategory : 'All';
  
  return (
    <div className="text-center text-sm text-gray-500 dark:text-gray-400 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl px-8 py-4 inline-block border border-gray-200 dark:border-gray-700 shadow-lg">
        <p className="flex items-center gap-3 justify-center text-base font-medium">
          <Sparkles className="h-5 w-5 text-yellow-500" />
          {totalFacts} amazing facts available • Category: {categoryDisplay}
          <Sparkles className="h-5 w-5 text-purple-500" />
        </p>
      </div>
    </div>
  );
};

export default FactStats;
