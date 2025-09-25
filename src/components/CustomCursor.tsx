import { useEffect, useState } from 'react';
import { useCursor } from '@/hooks/use-cursor';

interface CustomCursorProps {
  isVisible?: boolean;
  themeColor?: string;
  currentSection?: number;
}

const CustomCursor = ({ 
  isVisible = true,
  themeColor = 'from-red-600 to-orange-600',
  currentSection = 0
}: CustomCursorProps) => {
  const { isMobile } = useCursor();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if (!isVisible || isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updatePointer = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isPointerElement = 
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.style.cursor === 'pointer' ||
        getComputedStyle(target).cursor === 'pointer';
      
      setIsPointer(Boolean(isPointerElement));
    };

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousemove', updatePointer);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousemove', updatePointer);
    };
  }, [isVisible, isMobile]);

  if (!isVisible || isMobile) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] transition-transform duration-100 ease-out"
        style={{
          left: position.x - 4,
          top: position.y - 4,
          transform: `scale(${isPointer ? 1.5 : 1})`,
        }}
      >
        <div
          className={`w-2 h-2 rounded-full transition-all duration-100 ${
            isPointer 
              ? `bg-gradient-to-r ${themeColor}` 
              : 'bg-white'
          }`}
          style={{
            boxShadow: isPointer 
              ? `0 0 8px ${themeColor.includes('red') ? '#ef4444' : themeColor.includes('blue') ? '#3b82f6' : themeColor.includes('purple') ? '#8b5cf6' : themeColor.includes('green') ? '#10b981' : '#6366f1'}`
              : '0 0 4px rgba(255, 255, 255, 0.8)'
          }}
        />
      </div>

      {/* Cursor ring */}
      <div
        className="fixed pointer-events-none z-[9998] transition-transform duration-150 ease-out"
        style={{
          left: position.x - 12,
          top: position.y - 12,
          transform: `scale(${isPointer ? 1.3 : 1})`,
        }}
      >
        <div
          className={`w-6 h-6 rounded-full border transition-all duration-150 ${
            isPointer 
              ? `border-gradient-to-r ${themeColor} opacity-60` 
              : 'border-white/30 opacity-40'
          }`}
          style={{
            borderColor: isPointer 
              ? (themeColor.includes('red') ? '#ef4444' : themeColor.includes('blue') ? '#3b82f6' : themeColor.includes('purple') ? '#8b5cf6' : themeColor.includes('green') ? '#10b981' : '#6366f1')
              : 'rgba(255, 255, 255, 0.3)'
          }}
        />
      </div>

      {/* Interactive glow */}
      {isPointer && (
        <div
          className="fixed pointer-events-none z-[9997] transition-all duration-100 ease-out"
          style={{
            left: position.x - 20,
            top: position.y - 20,
            transform: 'scale(1)',
            opacity: 0.3,
          }}
        >
          <div
            className="w-10 h-10 rounded-full"
            style={{
              background: `radial-gradient(circle, ${themeColor.includes('red') ? '#ef4444' : themeColor.includes('blue') ? '#3b82f6' : themeColor.includes('purple') ? '#8b5cf6' : themeColor.includes('green') ? '#10b981' : '#6366f1'}20, transparent 70%)`
            }}
          />
        </div>
      )}
    </>
  );
};

export default CustomCursor; 