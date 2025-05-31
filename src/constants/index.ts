import { Category } from '@/types';

// 카테고리 상수
export const CATEGORIES: Category[] = [
  {
    id: 'all',
    name: 'All',
    icon: '🌟',
    description: 'All categories',
    color: 'bg-gray-100 text-gray-700 border-gray-300'
  },
  {
    id: 'daily',
    name: 'Daily',
    icon: '🌅',
    description: 'Today\'s special fact',
    color: 'bg-purple-100 text-purple-700 border-purple-300'
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    description: 'Discover the wonders of scientific knowledge',
    color: 'bg-blue-100 text-blue-700 border-blue-300'
  },
  {
    id: 'history',
    name: 'History',
    icon: '📜',
    description: 'Explore fascinating events from the past',
    color: 'bg-amber-100 text-amber-700 border-amber-300'
  },
  {
    id: 'human-body',
    name: 'Human Body',
    icon: '🫀',
    description: 'Learn about our incredible bodies',
    color: 'bg-red-100 text-red-700 border-red-300'
  },
  {
    id: 'animals',
    name: 'Animals',
    icon: '🐾',
    description: 'Uncover secrets from the animal kingdom',
    color: 'bg-green-100 text-green-700 border-green-300'
  },
  {
    id: 'food',
    name: 'Food',
    icon: '🍲',
    description: 'Interesting facts about culinary culture',
    color: 'bg-orange-100 text-orange-700 border-orange-300'
  },
  {
    id: 'random',
    name: 'Random',
    icon: '🎲',
    description: 'Surprise me!',
    color: 'bg-indigo-100 text-indigo-700 border-indigo-300'
  }
];

// 카테고리 헬퍼 함수
export const getCategoryById = (id: string): Category | undefined => {
  return CATEGORIES.find(cat => cat.id === id);
};

export const getCategoryByName = (name: string): Category | undefined => {
  return CATEGORIES.find(cat => cat.name === name);
};

export const getFactCategories = (): Category[] => {
  return CATEGORIES.filter(cat => !['all', 'daily', 'random'].includes(cat.id));
};

// API 엔드포인트
export const API_ENDPOINTS = {
  FACTS: '/facts-enhanced.json',
  SUBMIT_FACT: 'https://forms.google.com/your-fact-suggestion-form'
};

// 애니메이션 지연
export const ANIMATION_DELAYS = {
  HEADER: '0.1s',
  FILTER: '0.2s',
  ACTIONS: '0.2s',
  CARD: '0.4s',
  STATS: '0.6s'
};

// 로컬 스토리지 키
export const STORAGE_KEYS = {
  FAVORITE_FACTS: 'favoriteFactIds',
  VIEWED_FACTS: 'viewedFactIds',
  USER_PREFERENCES: 'userPreferences'
};
