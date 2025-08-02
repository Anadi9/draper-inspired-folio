import { useState, useEffect } from 'react';

interface CursorState {
  isVisible: boolean;
  isPointer: boolean;
  isClicking: boolean;
  position: { x: number; y: number };
}

export const useCursor = () => {
  const [cursorState, setCursorState] = useState<CursorState>({
    isVisible: true,
    isPointer: false,
    isClicking: false,
    position: { x: 0, y: 0 },
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      const isMobileDevice = 
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setIsMobile(isMobileDevice);
      setCursorState(prev => ({
        ...prev,
        isVisible: !isMobileDevice,
      }));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const updateCursorPosition = (x: number, y: number) => {
    setCursorState(prev => ({
      ...prev,
      position: { x, y },
    }));
  };

  const setCursorPointer = (isPointer: boolean) => {
    setCursorState(prev => ({
      ...prev,
      isPointer,
    }));
  };

  const setCursorClicking = (isClicking: boolean) => {
    setCursorState(prev => ({
      ...prev,
      isClicking,
    }));
  };

  const hideCursor = () => {
    setCursorState(prev => ({
      ...prev,
      isVisible: false,
    }));
  };

  const showCursor = () => {
    setCursorState(prev => ({
      ...prev,
      isVisible: true,
    }));
  };

  return {
    cursorState,
    isMobile,
    updateCursorPosition,
    setCursorPointer,
    setCursorClicking,
    hideCursor,
    showCursor,
  };
}; 