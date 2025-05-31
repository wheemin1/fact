
import React from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Heart } from 'lucide-react';

const SuggestFactButton: React.FC = () => {
  const handleSuggestFact = () => {
    // You can replace this URL with your actual Notion or Google Form link
    window.open('https://forms.google.com/your-fact-suggestion-form', '_blank');
  };

  return (
    <Button
      onClick={handleSuggestFact}
      variant="outline"
      className="bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-3 border-green-300 text-green-700 hover:text-green-800 transition-all duration-300 hover:scale-105 shadow-xl py-5 px-8 rounded-2xl font-bold md:text-lg group"
    >
      <Plus size={20} className="mr-2 group-hover:rotate-90 transition-transform" />
      <Heart size={16} className="mr-1 group-hover:scale-110 transition-transform" />
      Share Fact
    </Button>
  );
};

export default SuggestFactButton;
