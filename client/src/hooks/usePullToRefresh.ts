import { useEffect, useRef, useState } from 'react';

interface UsePullToRefreshOptions {
  onRefresh: () => Promise<void> | void;
  threshold?: number;
  resistance?: number;
  enabled?: boolean;
}

export function usePullToRefresh({ 
  onRefresh, 
  threshold = 80, 
  resistance = 2.5,
  enabled = true 
}: UsePullToRefreshOptions) {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isPulling, setIsPulling] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number>(0);
  const currentY = useRef<number>(0);
  const isDragging = useRef<boolean>(false);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    let rafId: number;

    const handleTouchStart = (e: TouchEvent) => {
      if (container.scrollTop > 0) return;
      
      startY.current = e.touches[0].clientY;
      isDragging.current = true;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || container.scrollTop > 0) return;

      currentY.current = e.touches[0].clientY;
      const deltaY = currentY.current - startY.current;

      if (deltaY > 0) {
        e.preventDefault();
        setIsPulling(true);
        
        // Apply resistance for rubber band effect
        const newDistance = Math.min(deltaY / resistance, threshold * 1.5);
        
        rafId = requestAnimationFrame(() => {
          setPullDistance(newDistance);
        });
      }
    };

    const handleTouchEnd = async () => {
      if (!isDragging.current) return;

      isDragging.current = false;
      setIsPulling(false);

      if (pullDistance >= threshold && !isRefreshing) {
        setIsRefreshing(true);
        
        try {
          await onRefresh();
        } catch (error) {
          console.error('Refresh failed:', error);
        } finally {
          setTimeout(() => {
            setIsRefreshing(false);
            setPullDistance(0);
          }, 500);
        }
      } else {
        // Animate back to 0
        const startDistance = pullDistance;
        const startTime = performance.now();
        const duration = 200;
        
        const animate = (currentTime: number) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          
          // Ease out animation
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const newDistance = startDistance * (1 - easeOut);
          
          setPullDistance(newDistance);
          
          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };
        
        requestAnimationFrame(animate);
      }
    };

    // Add passive listeners for better performance
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [enabled, threshold, resistance, pullDistance, isRefreshing, onRefresh]);

  const pullToRefreshProps = {
    ref: containerRef,
    style: {
      transform: `translateY(${pullDistance}px)`,
      transition: isDragging.current ? 'none' : 'transform 0.2s ease-out',
      overscrollBehavior: 'none' as const,
    },
  };

  const indicatorProps = {
    style: {
      opacity: isPulling ? Math.min(pullDistance / threshold, 1) : 0,
      transform: `translateY(${Math.max(pullDistance - 20, 0)}px) scale(${Math.min(pullDistance / threshold, 1)})`,
      transition: isDragging.current ? 'none' : 'all 0.2s ease-out',
    },
  };

  return {
    pullToRefreshProps,
    indicatorProps,
    isPulling,
    isRefreshing,
    pullDistance,
    isOverThreshold: pullDistance >= threshold,
  };
}