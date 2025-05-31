
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Lightbulb, Sparkles } from 'lucide-react';
import ShareButton from './ShareButton';
import FactActions from './FactActions';
import { Fact } from '@/types';
import { getCategoryByName } from '@/constants';

interface FactCardProps {
  fact: Fact;
  isNew: boolean;
  isDailyFact?: boolean;
}

const FactCard: React.FC<FactCardProps> = ({ fact, isNew, isDailyFact = false }) => {
  const getCategoryColor = (category: string) => {
    const categoryData = getCategoryByName(category);
    return categoryData?.color || 'bg-gray-100 text-gray-700 border-gray-300';
  };

  const getFactDescription = (category: string) => {
    const categoryData = getCategoryByName(category);
    return categoryData?.description || 'Expand your knowledge with fascinating facts';
  };

  return (
    <Card 
      className={`w-full max-w-5xl mx-auto shadow-2xl border-0 ${
        isDailyFact 
          ? 'bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-yellow-900/30'
          : 'bg-gradient-to-br from-white via-yellow-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900'
      } ${isNew ? 'animate-bounce-in' : 'animate-fade-in-up'} hover:shadow-3xl transition-all duration-500`}
    >
      <CardContent className="p-10 md:p-16 space-y-10">
        <div className="flex justify-between items-start gap-6">
          <div className="flex items-center gap-4">
            {isDailyFact && (
              <Badge 
                variant="outline" 
                className="text-base font-bold border-3 px-6 py-3 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-300 rounded-xl shadow-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Today's Special Fact
              </Badge>
            )}
            <Badge 
              variant="outline" 
              className={`text-base font-bold border-3 px-6 py-3 rounded-xl shadow-lg ${getCategoryColor(fact.category)}`}
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              {fact.category}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <FactActions fact={fact} />
            <ShareButton fact={fact} />
          </div>
        </div>
        
        <div className="space-y-8">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <Sparkles className="w-6 h-6 text-yellow-500" />
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 font-semibold">
                {getFactDescription(fact.category)}
              </p>
              <Sparkles className="w-6 h-6 text-purple-500" />
            </div>
            <div className="w-24 h-2 bg-gradient-to-r from-yellow-400 via-purple-400 to-pink-400 rounded-full mx-auto"></div>
          </div>
          
          <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 md:p-12 border-2 border-yellow-200 dark:border-gray-600 shadow-xl">
            <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-gray-800 dark:text-gray-200 font-semibold text-center">
              {fact.text}
            </p>
          </div>
          
          <div className="text-center bg-gradient-to-r from-yellow-100 to-purple-100 dark:from-yellow-900/30 dark:to-purple-900/30 rounded-2xl p-6">
            <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
              💡 Did you know? Knowledge is power!
            </p>
          </div>

          {/* Tags */}
          {fact.tags && fact.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {fact.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="text-xs px-3 py-1 bg-white/50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
                >
                  #{tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FactCard;
