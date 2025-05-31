// 공통 타입 정의
export interface Fact {
  id: number;
  text: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
  verified?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  description: string;
  color: string;
}

export interface FactState {
  facts: Fact[];
  currentFact: Fact | null;
  selectedCategory: string;
  isLoading: boolean;
  isNewFact: boolean;
  isDailyMode: boolean;
}

export interface FactFormData {
  text: string;
  category: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  tags?: string[];
}

export type CategoryFilterType = 'All' | 'Daily' | 'Random' | string;
