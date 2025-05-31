
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight } from 'lucide-react';
import SuggestFactButton from './SuggestFactButton';

interface MobileActionButtonsProps {
  onDailyFact: () => void;
  onRandomFact: () => void;
}

const MobileActionButtons: React.FC<MobileActionButtonsProps> = ({ 
  onDailyFact, 
  onRandomFact 
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t-2 border-yellow-200 p-4 shadow-2xl">
      <div className="flex gap-3 max-w-md mx-auto">
        <Button
          onClick={onDailyFact}
          className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-5 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-base group"
          size="lg"
        >
          <Calendar className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          Today's
        </Button>

        <Button
          onClick={() => {
            console.log('Mobile Next Fact button clicked - MobileActionButtons');
            onRandomFact();
          }}
          className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white py-5 rounded-2xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl text-base group"
          size="lg"
        >
          <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          Next
        </Button>

        <SuggestFactButton />
      </div>
    </div>
  );
};

export default MobileActionButtons;
