"use client";
import { motion } from "framer-motion";
import { useEffect, useState, useRef, useCallback } from "react";

// Simpan posisi semua kartu yang aktif untuk menghindari tumpang-tindih
const activeCardPositions: Array<{x: number, y: number, width: number, height: number}> = [];

function FloatingCard({ 
  children, 
  onComplete, 
  cardId,
  shouldComplete = false
}: { 
  children: React.ReactNode;
  onComplete: () => void;
  cardId: number;
  shouldComplete?: boolean;
}) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  
  // Gunakan ref untuk velocity agar bisa diakses di animation frame
  const velocityRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  
  const cardWidth = 256;
  const cardHeight = 320;

  // Fungsi untuk mendapatkan posisi acak yang tidak overlap
  const getRandomNonOverlappingPosition = useCallback(() => {
    const maxAttempts = 50;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const x = Math.random() * (window.innerWidth - cardWidth - 40) + 20;
      const y = Math.random() * (window.innerHeight - cardHeight - 40) + 20;
      
      const isOverlap = activeCardPositions.some(otherCard => 
        x < otherCard.x + otherCard.width &&
        x + cardWidth > otherCard.x &&
        y < otherCard.y + otherCard.height &&
        y + cardHeight > otherCard.y
      );
      
      if (!isOverlap) return { x, y };
      attempts++;
    }
    
    return {
      x: Math.random() * (window.innerWidth - cardWidth),
      y: Math.random() * (window.innerHeight - cardHeight)
    };
  }, [cardWidth, cardHeight]);

  // Animation loop dengan requestAnimationFrame
  const animate = useCallback(() => {
    // Update position dengan velocity terbaru
    setPosition(prev => {
      let newX = prev.x + velocityRef.current.x;
      let newY = prev.y + velocityRef.current.y;

      // Update ref position
      positionRef.current = { x: newX, y: newY };

      // Bounce off edges
      if (newX <= 20 || newX >= window.innerWidth - cardWidth - 20) {
        velocityRef.current.x = -velocityRef.current.x * 0.8;
        newX = Math.max(20, Math.min(window.innerWidth - cardWidth - 20, newX));
      }
      if (newY <= 20 || newY >= window.innerHeight - cardHeight - 20) {
        velocityRef.current.y = -velocityRef.current.y * 0.8;
        newY = Math.max(20, Math.min(window.innerHeight - cardHeight - 20, newY));
      }

      return { x: newX, y: newY };
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [cardWidth, cardHeight]);

  // Efek gravitasi ke tengah
  const applyGravity = useCallback(() => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const distanceX = centerX - positionRef.current.x;
    const distanceY = centerY - positionRef.current.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    const gravityStrength = 0.00005;
    const forceX = (distanceX / (distance || 1)) * gravityStrength;
    const forceY = (distanceY / (distance || 1)) * gravityStrength;
    
    velocityRef.current.x += forceX;
    velocityRef.current.y += forceY;
    
    // Batasi kecepatan maksimum
    const maxSpeed = 0.2;
    const speed = Math.sqrt(velocityRef.current.x * velocityRef.current.x + velocityRef.current.y * velocityRef.current.y);
    if (speed > maxSpeed) {
      velocityRef.current.x = (velocityRef.current.x / speed) * maxSpeed;
      velocityRef.current.y = (velocityRef.current.y / speed) * maxSpeed;
    }
  }, []);

  useEffect(() => {
    // Inisialisasi posisi
    const { x: initialX, y: initialY } = getRandomNonOverlappingPosition();
    
    setPosition({ x: initialX, y: initialY });
    positionRef.current = { x: initialX, y: initialY };
    
    // Tambahkan ke daftar aktif
    activeCardPositions.push({ x: initialX, y: initialY, width: cardWidth, height: cardHeight });
    
    // Velocity awal random
    velocityRef.current = {
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5
    };

    // Mulai animasi
    animationRef.current = requestAnimationFrame(animate);

    // Efek gravitasi (lebih jarang update untuk performa)
    const gravityInterval = setInterval(applyGravity, 50);

    return () => {
      cancelAnimationFrame(animationRef.current);
      clearInterval(gravityInterval);
      
      // Hapus dari daftar aktif
      const index = activeCardPositions.findIndex(pos => 
        Math.abs(pos.x - positionRef.current.x) < 10 && 
        Math.abs(pos.y - positionRef.current.y) < 10
      );
      if (index > -1) activeCardPositions.splice(index, 1);
    };
  }, [getRandomNonOverlappingPosition, animate, applyGravity, cardWidth, cardHeight]);

  // Handle completion
  useEffect(() => {
    if (shouldComplete) {
      setIsVisible(false);
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [shouldComplete, onComplete]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0.5,
        x: position.x,
        y: position.y
      }}
      transition={{
        opacity: { duration: 1, ease: "easeOut" },
        scale: { duration: 1, ease: "easeOut" },
        x: { duration: 0 },
        y: { duration: 0 }
      }}
      className="absolute w-64 h-80"
      style={{
        left: 0,
        top: 0,
        willChange: 'transform'
      }}
    >
      {children}
    </motion.div>
  );
}

export default FloatingCard;