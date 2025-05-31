import { useState, useEffect } from 'react';
import { STORAGE_KEYS } from '@/constants';

export interface UserPreferences {
  favoriteCategories: string[];
  viewedFacts: number[];
  favoriteFacts: number[];
  darkMode: boolean;
  autoplay: boolean;
  animationsEnabled: boolean;
}

const defaultPreferences: UserPreferences = {
  favoriteCategories: [],
  viewedFacts: [],
  favoriteFacts: [],
  darkMode: false,
  autoplay: false,
  animationsEnabled: true
};

export const useUserPreferences = () => {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);

  // 로컬 스토리지에서 설정 로드
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER_PREFERENCES);
      if (saved) {
        const parsed = JSON.parse(saved);
        setPreferences({ ...defaultPreferences, ...parsed });
      }
    } catch (error) {
      console.error('Failed to load user preferences:', error);
    }
  }, []);

  // 설정 저장
  const savePreferences = (newPreferences: Partial<UserPreferences>) => {
    const updated = { ...preferences, ...newPreferences };
    setPreferences(updated);
    
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updated));
    } catch (error) {
      console.error('Failed to save user preferences:', error);
    }
  };

  // Fact 즐겨찾기 토글
  const toggleFavoriteFact = (factId: number) => {
    const newFavorites = preferences.favoriteFacts.includes(factId)
      ? preferences.favoriteFacts.filter(id => id !== factId)
      : [...preferences.favoriteFacts, factId];
    
    savePreferences({ favoriteFacts: newFavorites });
  };

  // Fact 조회 기록 추가
  const markFactAsViewed = (factId: number) => {
    if (!preferences.viewedFacts.includes(factId)) {
      const newViewed = [...preferences.viewedFacts, factId];
      savePreferences({ viewedFacts: newViewed });
    }
  };

  // 카테고리 즐겨찾기 토글
  const toggleFavoriteCategory = (category: string) => {
    const newCategories = preferences.favoriteCategories.includes(category)
      ? preferences.favoriteCategories.filter(cat => cat !== category)
      : [...preferences.favoriteCategories, category];
    
    savePreferences({ favoriteCategories: newCategories });
  };
  // 설정 리셋
  const resetPreferences = () => {
    setPreferences(defaultPreferences);
    localStorage.removeItem(STORAGE_KEYS.USER_PREFERENCES);
  };

  // 즐겨찾기 모두 삭제
  const clearFavorites = () => {
    savePreferences({ favoriteFacts: [] });
  };

  // 조회 기록 모두 삭제
  const clearViewHistory = () => {
    savePreferences({ viewedFacts: [] });
  };

  // 사용자 데이터 내보내기
  const exportUserData = () => {
    return {
      preferences,
      exportDate: new Date().toISOString(),
      version: '1.0'
    };
  };

  // 사용자 데이터 가져오기
  const importUserData = (data: any) => {
    if (data.preferences) {
      setPreferences(data.preferences);
      localStorage.setItem(STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(data.preferences));
    }
  };

  return {
    preferences,
    savePreferences,
    toggleFavoriteFact,
    markFactAsViewed,
    toggleFavoriteCategory,
    resetPreferences,
    clearFavorites,
    clearViewHistory,
    exportUserData,
    importUserData,
    isFavoriteFact: (factId: number) => preferences.favoriteFacts.includes(factId),
    isViewedFact: (factId: number) => preferences.viewedFacts.includes(factId),
    isFavoriteCategory: (category: string) => preferences.favoriteCategories.includes(category),
    // 편의를 위한 별칭들
    favorites: preferences.favoriteFacts,
    viewHistory: preferences.viewedFacts
  };
};
