
import React from 'react';
import { Share2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Fact } from '@/types';

interface ShareButtonProps {
  fact: Fact;
}

const ShareButton: React.FC<ShareButtonProps> = ({ fact }) => {
  const { toast } = useToast();

  const handleShare = async () => {
    const shareData = {
      title: 'FactFact - Amazing Fact!',
      text: `${fact.text} - Category: ${fact.category}`,
      url: `${window.location.origin}?fact=${fact.id}`
    };

    try {
      if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
        await navigator.share(shareData);
        console.log('Fact shared successfully via Web Share API');
      } else {
        // Fallback: Copy to clipboard
        const shareText = `${fact.text}\n\nCategory: ${fact.category}\n\nShared from FactFact: ${window.location.origin}?fact=${fact.id}`;
        await navigator.clipboard.writeText(shareText);
        toast({
          title: "📋 Copied to clipboard!",
          description: "The fact has been copied and ready to share.",
          duration: 3000,
        });
        console.log('Fact copied to clipboard');
      }
    } catch (error) {
      console.error('Error sharing fact:', error);
      toast({
        title: "Share failed",
        description: "Unable to share the fact. Please try again.",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <Button
      onClick={handleShare}
      variant="outline"
      size="lg"
      className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border-3 border-blue-300 text-blue-700 hover:text-blue-800 transition-all duration-300 hover:scale-105 rounded-xl py-4 px-8 font-bold shadow-lg hover:shadow-xl text-lg group"
    >
      <Share2 size={20} className="group-hover:rotate-12 transition-transform" />
      <span className="font-bold">Share This Fact</span>
    </Button>
  );
};

export default ShareButton;
