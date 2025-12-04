import { useState, useEffect, useCallback, useRef } from 'react';
import { Project } from "../lib/dataTypes";

export const useSwitchCards = (
  cardData: Project[], 
  initialCount: number = 10, 
  initialInterval: number = 500, 
  rotationInterval: number = 10000
) => {
  const [activeCards, setActiveCards] = useState<Array<{id: string, dataIndex: number, key: string}>>([]);
  const [completingCardIds, setCompletingCardIds] = useState<string[]>([]);
  const [rotationCounter, setRotationCounter] = useState(0);
  const [usedIndices, setUsedIndices] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  const idCounter = useRef(0);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    setActiveCards([]);
    setCompletingCardIds([]);
    setRotationCounter(0);
    setUsedIndices([]);
  }, [cardData]);

  const getRandomUnusedIndex = useCallback(() => {
    if (usedIndices.length >= cardData.length) {
      setUsedIndices([]);
      return Math.floor(Math.random() * cardData.length);
    }
    
    const availableIndices = cardData
      .map((_, index) => index)
      .filter(index => !usedIndices.includes(index));
    
    if (availableIndices.length === 0) {
      return Math.floor(Math.random() * cardData.length);
    }
    
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    return availableIndices[randomIndex];
  }, [cardData, usedIndices]);

  useEffect(() => {
    if (!isClient || cardData.length === 0) return;

    if (activeCards.length < initialCount && activeCards.length < cardData.length) {
      const timer = setTimeout(() => {
        const newDataIndex = getRandomUnusedIndex();
        idCounter.current += 1;
        
        setActiveCards(prev => [
          ...prev,
          {
            id: `card-${idCounter.current}`,
            dataIndex: newDataIndex,
            key: `key-${idCounter.current}`
          }
        ]);
        
        setUsedIndices(prev => [...prev, newDataIndex]);
      }, initialInterval);

      return () => clearTimeout(timer);
    }

    const rotationTimer = setInterval(() => {
      if (activeCards.length === 0) return;

      const oldestCard = activeCards[0];
      
      setCompletingCardIds(prev => [...prev, oldestCard.id]);
      
      setTimeout(() => {
        const newDataIndex = getRandomUnusedIndex();
        idCounter.current += 1;
        
        setActiveCards(prev => {
          const newCards = prev.slice(1); 
          return [
            ...newCards,
            {
              id: `card-${idCounter.current}`,
              dataIndex: newDataIndex,
              key: `key-${idCounter.current}`
            }
          ];
        });
        
        setUsedIndices(prev => {
          const filtered = prev.filter(index => index !== oldestCard.dataIndex);
          return [...filtered, newDataIndex];
        });
        
        setCompletingCardIds(prev => prev.filter(id => id !== oldestCard.id));
        
        setRotationCounter(prev => prev + 1);
      }, 1000);
      
    }, rotationInterval);

    return () => clearInterval(rotationTimer);
  }, [
    activeCards, 
    cardData, 
    initialCount, 
    initialInterval, 
    rotationInterval, 
    rotationCounter, 
    getRandomUnusedIndex,
    isClient 
  ]);

  return isClient ? { activeCards, completingCardIds } : { activeCards: [], completingCardIds: [] };
};