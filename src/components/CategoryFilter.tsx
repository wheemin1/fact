
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package } from 'lucide-react';
import { CATEGORIES } from '@/constants';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="w-full max-w-sm">
      <Select value={selectedCategory} onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full bg-gradient-to-r from-white to-yellow-50 backdrop-blur-sm border-3 border-yellow-300 focus:border-yellow-500 transition-all duration-300 py-5 px-6 text-gray-700 shadow-xl rounded-2xl hover:shadow-2xl font-bold text-lg">
          <div className="flex items-center gap-3">
            <Package className="h-5 w-5 text-yellow-600" />
            <SelectValue placeholder="Select category" />
          </div>
        </SelectTrigger>
        <SelectContent className="bg-white/95 backdrop-blur-sm border-yellow-300 shadow-2xl rounded-xl">
          {CATEGORIES.map((category) => (
            <SelectItem 
              key={category.id} 
              value={category.name}
              className="hover:bg-yellow-50 focus:bg-yellow-50 cursor-pointer py-4 text-gray-700 font-medium text-base"
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{category.icon}</span> 
                <span>{category.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default CategoryFilter;
