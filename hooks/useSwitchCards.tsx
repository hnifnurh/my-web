// hooks/useSwitchCards.ts
import { useState, useEffect } from 'react';
import { Project } from "../lib/dataTypes";

export const useSwitchCards = (cardData: Project[], initialCount: number = 10, initialInterval: number = 500, rotationInterval: number = 10000) => {
    const [activeCards, setActiveCards] = useState<Array<{id: number, dataIndex: number, key: number}>>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [completingCardIds, setCompletingCardIds] = useState<number[]>([]);
    const [isInitialPhase, setIsInitialPhase] = useState(true);

    useEffect(() => {
        if (cardData.length === 0) return;

        const interval = setInterval(() => {
            if (isInitialPhase) {
                // Initial phase: add cards one by one up to the initialCount
                if (activeCards.length < initialCount) {
                    const newDataIndex = activeCards.length % cardData.length;
                    
                    setActiveCards(prev => [
                        ...prev,
                        {
                            id: Date.now() + Math.random(),
                            dataIndex: newDataIndex,
                            key: Date.now()
                        }
                    ]);
                    
                    // Jika sudah mencapai initialCount, masuk ke rotation phase
                    if (activeCards.length + 1 === initialCount) {
                        setIsInitialPhase(false);
                    }
                }
            } else {
                // Rotation phase: replace the oldest card with a new one
                if (activeCards.length > 0) {
                    const oldestCard = activeCards[0];
                    const newDataIndex = (currentIndex + 1) % cardData.length;
                    
                    // Tandai kartu yang akan dihilangkan
                    setCompletingCardIds(prev => [...prev, oldestCard.id]);
                    
                    // Setelah animasi selesai, ganti dengan kartu baru
                    setTimeout(() => {
                        setActiveCards(current => {
                            const filtered = current.filter(card => card.id !== oldestCard.id);
                            return [
                                ...filtered,
                                {
                                    id: Date.now() + Math.random(),
                                    dataIndex: newDataIndex,
                                    key: Date.now()
                                }
                            ];
                        });
                        
                        // Hapus dari completingCardIds setelah selesai
                        setCompletingCardIds(prev => prev.filter(id => id !== oldestCard.id));
                        
                        // Update current index untuk kartu berikutnya
                        setCurrentIndex(prev => (prev + 1) % cardData.length);
                    }, 1000);
                }
            }
        }, isInitialPhase ? initialInterval : rotationInterval);

        return () => clearInterval(interval);
    }, [isInitialPhase, activeCards, currentIndex, cardData, initialCount, initialInterval, rotationInterval]);

    return { activeCards, completingCardIds };
};