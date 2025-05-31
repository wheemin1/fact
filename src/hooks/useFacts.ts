import { useState, useEffect, useCallback } from 'react';
import { Fact, FactState } from '@/types';
import { API_ENDPOINTS } from '@/constants';

export const useFacts = () => {
  const [state, setState] = useState<FactState>({
    facts: [],
    currentFact: null,
    selectedCategory: 'All',
    isLoading: true,
    isNewFact: false,
    isDailyMode: false
  });
  // 일일 Fact 계산 (상태에서 직접 참조하지 않음)
  const getDailyFact = useCallback((facts: Fact[]): Fact | null => {
    if (facts.length === 0) return null;
    
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 
      (1000 * 60 * 60 * 24)
    );
    const dailyFactIndex = dayOfYear % facts.length;
    
    return facts[dailyFactIndex];
  }, []);

  // Facts 로드
  const loadFacts = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, isLoading: true }));
      
      const response = await fetch(API_ENDPOINTS.FACTS);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const facts: Fact[] = data.facts || [];

      setState(prev => ({
        ...prev,
        facts,
        isLoading: false
      }));

      return facts;
    } catch (error) {
      console.error('Error loading facts:', error);
      setState(prev => ({ 
        ...prev, 
        isLoading: false,
        facts: [] 
      }));
      throw error;
    }
  }, []);  // 랜덤 Fact 가져오기
  const getRandomFact = useCallback((category?: string) => {
    console.log('getRandomFact called with category:', category);
    
    setState(prev => {
      console.log('Current state.facts.length:', prev.facts.length);
      console.log('Current fact:', prev.currentFact?.id);
      
      if (prev.facts.length === 0) {
        console.log('No facts available');
        return prev;
      }

      let availableFacts = prev.facts;
      const filterCategory = category || prev.selectedCategory;

      if (filterCategory && 
          filterCategory !== 'All' && 
          filterCategory !== 'Random' && 
          filterCategory !== 'Daily') {
        availableFacts = prev.facts.filter(fact => fact.category === filterCategory);
        console.log('Filtered facts for category', filterCategory, ':', availableFacts.length);
      }

      if (availableFacts.length === 0) {
        availableFacts = prev.facts;
        console.log('No facts in category, using all facts:', availableFacts.length);
      }

      // 현재 fact와 다른 fact 선택하기 (가능한 경우)
      let randomFact;
      if (availableFacts.length === 1) {
        randomFact = availableFacts[0];
      } else {
        // 현재 fact와 다른 fact를 선택
        let attempts = 0;
        do {
          randomFact = availableFacts[Math.floor(Math.random() * availableFacts.length)];
          attempts++;
        } while (randomFact.id === prev.currentFact?.id && attempts < 10);
      }
      
      console.log('Selected fact:', randomFact.id, randomFact.text.substring(0, 50));
      
      // URL 업데이트
      const newUrl = `${window.location.pathname}?fact=${randomFact.id}`;
      window.history.replaceState({}, '', newUrl);
      
      const newState = {
        ...prev,
        currentFact: randomFact,
        selectedCategory: category === 'Daily' ? 'Random' : (category || prev.selectedCategory),
        isNewFact: true,
        isDailyMode: false
      };
      
      console.log('New state currentFact:', newState.currentFact?.id);
      return newState;
    });

    // 애니메이션 리셋
    setTimeout(() => {
      setState(prev => ({ ...prev, isNewFact: false }));
    }, 600);

    console.log('getRandomFact completed');
  }, []);
  // 일일 Fact 처리
  const handleDailyFact = useCallback(() => {
    setState(prev => {
      if (prev.facts.length === 0) return prev;

      // 오늘의 fact 계산
      const today = new Date();
      const dayOfYear = Math.floor(
        (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 
        (1000 * 60 * 60 * 24)
      );
      const dailyFactIndex = dayOfYear % prev.facts.length;
      const dailyFact = prev.facts[dailyFactIndex];

      // URL 업데이트
      const newUrl = `${window.location.pathname}?daily=true`;
      window.history.replaceState({}, '', newUrl);

      return {
        ...prev,
        currentFact: dailyFact,
        isDailyMode: true,
        selectedCategory: 'Daily',
        isNewFact: true
      };
    });

    // 애니메이션 리셋
    setTimeout(() => {
      setState(prev => ({ ...prev, isNewFact: false }));
    }, 600);
  }, []);  // 카테고리 변경
  const handleCategoryChange = useCallback((category: string) => {
    if (category === 'Daily') {
      // handleDailyFact 로직을 직접 실행
      setState(prev => {
        if (prev.facts.length === 0) return prev;

        // 오늘의 fact 계산
        const today = new Date();
        const dayOfYear = Math.floor(
          (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 
          (1000 * 60 * 60 * 24)
        );
        const dailyFactIndex = dayOfYear % prev.facts.length;
        const dailyFact = prev.facts[dailyFactIndex];

        // URL 업데이트
        const newUrl = `${window.location.pathname}?daily=true`;
        window.history.replaceState({}, '', newUrl);

        return {
          ...prev,
          currentFact: dailyFact,
          isDailyMode: true,
          selectedCategory: 'Daily',
          isNewFact: true
        };
      });

      // 애니메이션 리셋
      setTimeout(() => {
        setState(prev => ({ ...prev, isNewFact: false }));
      }, 600);
      return;
    }

    setState(prev => ({
      ...prev,
      isDailyMode: false,
      selectedCategory: category
    }));

    // 카테고리가 변경되면 새로운 랜덤 Fact 가져오기
    setTimeout(() => {
      // getRandomFact 로직을 직접 실행
      setState(prev => {
        if (prev.facts.length === 0) return prev;

        let availableFacts = prev.facts;
        const filterCategory = category || prev.selectedCategory;

        if (filterCategory && 
            filterCategory !== 'All' && 
            filterCategory !== 'Random' && 
            filterCategory !== 'Daily') {
          availableFacts = prev.facts.filter(fact => fact.category === filterCategory);
        }

        if (availableFacts.length === 0) {
          availableFacts = prev.facts;
        }

        // 현재 fact와 다른 fact 선택하기 (가능한 경우)
        let randomFact;
        if (availableFacts.length === 1) {
          randomFact = availableFacts[0];
        } else {
          // 현재 fact와 다른 fact를 선택
          let attempts = 0;
          do {
            randomFact = availableFacts[Math.floor(Math.random() * availableFacts.length)];
            attempts++;
          } while (randomFact.id === prev.currentFact?.id && attempts < 10);
        }
        
        // URL 업데이트
        const newUrl = `${window.location.pathname}?fact=${randomFact.id}`;
        window.history.replaceState({}, '', newUrl);
        
        return {
          ...prev,
          currentFact: randomFact,
          selectedCategory: category === 'Daily' ? 'Random' : (category || prev.selectedCategory),
          isNewFact: true,
          isDailyMode: false
        };
      });

      // 애니메이션 리셋
      setTimeout(() => {
        setState(prev => ({ ...prev, isNewFact: false }));
      }, 600);
    }, 50);
  }, []);
  // 특정 Fact 설정
  const setSpecificFact = useCallback((factId: number) => {
    setState(prev => {
      const fact = prev.facts.find(f => f.id === factId);
      if (!fact) return prev;

      return {
        ...prev,
        currentFact: fact,
        selectedCategory: fact.category,
        isDailyMode: false,
        isNewFact: true
      };
    });

    setTimeout(() => {
      setState(prev => ({ ...prev, isNewFact: false }));
    }, 600);
  }, []);

  // 초기 로드
  useEffect(() => {
    const initializeFacts = async () => {
      try {
        const facts = await loadFacts();
        
        if (facts.length > 0) {
          // URL 파라미터 확인
          const urlParams = new URLSearchParams(window.location.search);
          const factId = urlParams.get('fact');
          const dailyMode = urlParams.get('daily') === 'true';

          if (dailyMode) {
            setState(prev => ({
              ...prev,
              isDailyMode: true,
              selectedCategory: 'Daily'
            }));
            // getDailyFact 실행은 facts가 로드된 후 별도 useEffect에서 처리
          } else if (factId) {
            const specificFact = facts.find(f => f.id === parseInt(factId));
            if (specificFact) {
              setState(prev => ({
                ...prev,
                currentFact: specificFact,
                selectedCategory: specificFact.category
              }));
            } else {
              setState(prev => ({
                ...prev,
                currentFact: facts[Math.floor(Math.random() * facts.length)]
              }));
            }
          } else {
            setState(prev => ({
              ...prev,
              currentFact: facts[Math.floor(Math.random() * facts.length)]
            }));
          }
        }
      } catch (error) {
        console.error('Failed to initialize facts:', error);
      }
    };

    initializeFacts();
  }, [loadFacts]);
  // 일일 모드에서 facts 로드 후 일일 fact 설정
  useEffect(() => {
    if (state.isDailyMode && state.facts.length > 0 && !state.currentFact) {
      const dailyFact = getDailyFact(state.facts);
      if (dailyFact) {
        setState(prev => ({ ...prev, currentFact: dailyFact }));
      }
    }
  }, [state.facts, state.isDailyMode, state.currentFact, getDailyFact]);

  return {
    ...state,
    loadFacts,
    getRandomFact,
    handleDailyFact,
    handleCategoryChange,
    setSpecificFact,
    getDailyFact
  };
};
