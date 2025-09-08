// hooks/useSwitchCards.ts
import { useState, useEffect } from 'react';
import { Project } from "../lib/dataTypes";

export const useSwitchCards = (
  cardData: Project[], 
  initialCount: number = 10, 
  initialInterval: number = 500, 
  rotationInterval: number = 10000
) => {
  const [activeCards, setActiveCards] = useState<Array<{id: number, dataIndex: number, key: number}>>([]);
  const [completingCardIds, setCompletingCardIds] = useState<number[]>([]);
  const [rotationCounter, setRotationCounter] = useState(0);

  useEffect(() => {
    if (cardData.length === 0) return;

    // Initial phase: add cards until reaching initialCount
    if (activeCards.length < initialCount) {
      const timer = setTimeout(() => {
        const newDataIndex = activeCards.length % cardData.length;
        setActiveCards(prev => [
          ...prev,
          {
            id: Date.now() + Math.random(),
            dataIndex: newDataIndex,
            key: Date.now()
          }
        ]);
      }, initialInterval);

      return () => clearTimeout(timer);
    }

    // Rotation phase: start replacing cards
    const rotationTimer = setInterval(() => {
      if (activeCards.length === 0) return;

      // Get the oldest card to remove
      const oldestCard = activeCards[0];
      
      // Mark card for completion animation
      setCompletingCardIds(prev => [...prev, oldestCard.id]);
      
      // After animation, replace with new card
      setTimeout(() => {
        const newDataIndex = (rotationCounter + initialCount) % cardData.length;
        
        setActiveCards(prev => {
          const newCards = prev.slice(1); // Remove oldest
          return [
            ...newCards,
            {
              id: Date.now() + Math.random(),
              dataIndex: newDataIndex,
              key: Date.now()
            }
          ];
        });
        
        // Remove from completing list
        setCompletingCardIds(prev => prev.filter(id => id !== oldestCard.id));
        
        // Update rotation counter
        setRotationCounter(prev => prev + 1);
      }, 1000);
      
    }, rotationInterval);

    return () => clearInterval(rotationTimer);
  }, [activeCards, cardData, initialCount, initialInterval, rotationInterval, rotationCounter]);

  return { activeCards, completingCardIds };
};