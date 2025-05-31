import React from 'react';
import { Button } from '@/components/ui/button';
import { Heart, Star, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useUserPreferences } from '@/hooks/useUserPreferences';
import { Fact } from '@/types';

interface FactActionsProps {
  fact: Fact;
  className?: string;
}

const FactActions: React.FC<FactActionsProps> = ({ fact, className }) => {
  const { 
    toggleFavoriteFact, 
    markFactAsViewed, 
    isFavoriteFact, 
    isViewedFact 
  } = useUserPreferences();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavoriteFact(fact.id);
  };

  const handleMarkAsViewed = () => {
    markFactAsViewed(fact.id);
  };

  React.useEffect(() => {
    // 현재 Fact를 조회했다고 표시
    handleMarkAsViewed();
  }, [fact.id]);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Button
        onClick={handleToggleFavorite}
        variant="ghost"
        size="sm"
        className={cn(
          "transition-all duration-200",
          isFavoriteFact(fact.id) 
            ? "text-red-500 hover:text-red-600" 
            : "text-gray-400 hover:text-red-500"
        )}
      >
        <Heart 
          className={cn(
            "w-4 h-4",
            isFavoriteFact(fact.id) && "fill-current"
          )} 
        />
      </Button>

      {fact.difficulty && (
        <div className="flex items-center gap-1">
          {Array.from({ length: 3 }).map((_, index) => (
            <Star
              key={index}
              className={cn(
                "w-3 h-3",
                index < (fact.difficulty === 'easy' ? 1 : fact.difficulty === 'medium' ? 2 : 3)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              )}
            />
          ))}
        </div>
      )}

      {isViewedFact(fact.id) && (
        <Eye className="w-4 h-4 text-green-500" />
      )}
    </div>
  );
};

export default FactActions;
