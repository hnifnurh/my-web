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
  const [dimensions, setDimensions] = useState({ width: 256, height: 320 }); // Default size
  const cardRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  
  // Gunakan ref untuk velocity agar bisa diakses di animation frame
  const velocityRef = useRef({ x: 0, y: 0 });
  const positionRef = useRef({ x: 0, y: 0 });
  
  // Fungsi untuk mendapatkan ukuran kartu
  const updateDimensions = useCallback(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({ width: rect.width, height: rect.height });
      }
    }
  }, []);

  // Fungsi untuk mendapatkan posisi acak yang tidak overlap
  const getRandomNonOverlappingPosition = useCallback(() => {
    const maxAttempts = 50;
    let attempts = 0;
    
    while (attempts < maxAttempts) {
      const x = Math.random() * (window.innerWidth - dimensions.width - 40) + 20;
      const y = Math.random() * (window.innerHeight - dimensions.height - 40) + 20;
      
      const isOverlap = activeCardPositions.some(otherCard => 
        x < otherCard.x + otherCard.width &&
        x + dimensions.width > otherCard.x &&
        y < otherCard.y + otherCard.height &&
        y + dimensions.height > otherCard.y
      );
      
      if (!isOverlap) return { x, y };
      attempts++;
    }
    
    // Fallback jika tidak menemukan posisi yang tidak overlap
    return {
      x: Math.random() * (window.innerWidth - dimensions.width),
      y: Math.random() * (window.innerHeight - dimensions.height)
    };
  }, [dimensions.width, dimensions.height]);

  // Animation loop dengan requestAnimationFrame
  const animate = useCallback(() => {
    if (dimensions.width === 0 || dimensions.height === 0) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    // Update position dengan velocity terbaru
    setPosition(prev => {
      let newX = prev.x + velocityRef.current.x;
      let newY = prev.y + velocityRef.current.y;

      // Update ref position
      positionRef.current = { x: newX, y: newY };

      // Boundary check dengan viewport
      if (newX <= 0) {
        velocityRef.current.x = Math.abs(velocityRef.current.x) * 0.8;
        newX = 0;
      } else if (newX >= window.innerWidth - dimensions.width) {
        velocityRef.current.x = -Math.abs(velocityRef.current.x) * 0.8;
        newX = window.innerWidth - dimensions.width;
      }
      
      if (newY <= 0) {
        velocityRef.current.y = Math.abs(velocityRef.current.y) * 0.8;
        newY = 0;
      } else if (newY >= window.innerHeight - dimensions.height) {
        velocityRef.current.y = -Math.abs(velocityRef.current.y) * 0.8;
        newY = window.innerHeight - dimensions.height;
      }

      return { x: newX, y: newY };
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [dimensions.width, dimensions.height]);

  // Efek gravitasi ke tengah
  const applyGravity = useCallback(() => {
    const centerX = window.innerWidth / 2 - dimensions.width / 2;
    const centerY = window.innerHeight / 2 - dimensions.height / 2;
    
    const distanceX = centerX - positionRef.current.x;
    const distanceY = centerY - positionRef.current.y;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    const gravityStrength = 0.00005;
    const forceX = (distanceX / (distance || 1)) * gravityStrength;
    const forceY = (distanceY / (distance || 1)) * gravityStrength;
    
    velocityRef.current.x += forceX;
    velocityRef.current.y += forceY;
    
    // Batasi kecepatan maksimum
    const maxSpeed = 5;
    const speed = Math.sqrt(velocityRef.current.x * velocityRef.current.x + velocityRef.current.y * velocityRef.current.y);
    if (speed > maxSpeed) {
      velocityRef.current.x = (velocityRef.current.x / speed) * maxSpeed;
      velocityRef.current.y = (velocityRef.current.y / speed) * maxSpeed;
    }
  }, [dimensions.width, dimensions.height]);

  useEffect(() => {
    // Setup ResizeObserver untuk memantau perubahan ukuran
    if (cardRef.current) {
      resizeObserverRef.current = new ResizeObserver(entries => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          if (width > 0 && height > 0) {
            setDimensions({ width, height });
          }
        }
      });
      
      resizeObserverRef.current.observe(cardRef.current);
    }
    
    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  useEffect(() => {
    // Inisialisasi posisi setelah kita memiliki dimensi
    if (dimensions.width === 0 || dimensions.height === 0) return;
    
    const { x: initialX, y: initialY } = getRandomNonOverlappingPosition();
    
    setPosition({ x: initialX, y: initialY });
    positionRef.current = { x: initialX, y: initialY };
    
    // Tambahkan ke daftar aktif
    activeCardPositions.push({ 
      x: initialX, 
      y: initialY, 
      width: dimensions.width, 
      height: dimensions.height 
    });
    
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
  }, [getRandomNonOverlappingPosition, animate, applyGravity, dimensions]);

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
      className="absolute"
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