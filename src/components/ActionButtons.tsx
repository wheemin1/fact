
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import SuggestFactButton from './SuggestFactButton';

interface ActionButtonsProps {
  onDailyFact: () => void;
  onRandomFact: () => void;
  isDailyMode: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ 
  onDailyFact, 
  onRandomFact, 
  isDailyMode 
}) => {
  return (
    <div className="flex gap-6 items-center justify-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
      <Button
        onClick={onDailyFact}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-lg group"
        size="lg"
      >
        <Calendar className="mr-3 h-6 w-6 group-hover:rotate-12 transition-transform" />
        Today's Special
      </Button>

      <Button
        onClick={() => {
          console.log('Next Fact button clicked - ActionButtons');
          onRandomFact();
        }}
        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white px-10 py-5 rounded-2xl font-bold transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 text-lg group"
        size="lg"
      >
        <ArrowRight className="mr-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
        Next Fact
      </Button>

      <SuggestFactButton />
    </div>
  );
};

export default ActionButtons;
