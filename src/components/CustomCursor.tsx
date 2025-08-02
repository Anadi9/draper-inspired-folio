import { useEffect, useState, useRef } from 'react';
import { useCursor } from '@/hooks/use-cursor';

interface CustomCursorProps {
  isVisible?: boolean;
  enableMagnetic?: boolean;
  enableParticles?: boolean;
  enableTrail?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

const CustomCursor = ({ 
  isVisible = true, 
  enableMagnetic = true, 
  enableParticles = true, 
  enableTrail = true 
}: CustomCursorProps) => {
  const { cursorState, isMobile } = useCursor();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<Array<{ x: number; y: number; timestamp: number }>>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const particleIdRef = useRef(0);

  // Particle animation
  useEffect(() => {
    if (!isVisible || isMobile) return;

    const animateParticles = () => {
      setParticles(prev => 
        prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            life: particle.life - 1,
            vx: particle.vx * 0.98,
            vy: particle.vy * 0.98,
          }))
          .filter(particle => particle.life > 0)
      );

      animationRef.current = requestAnimationFrame(animateParticles);
    };

    animationRef.current = requestAnimationFrame(animateParticles);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible || isMobile) return;

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Update trail
      if (enableTrail) {
        setTrail(prev => {
          const newTrail = [...prev, { x: e.clientX, y: e.clientY, timestamp: Date.now() }];
          // Keep only last 8 positions
          return newTrail.slice(-8);
        });
      }
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

      // Magnetic effect for interactive elements
      if (enableMagnetic && isPointerElement) {
        const rect = target.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        
        if (distance < 100) {
          const strength = (100 - distance) / 100;
          setMagneticOffset({
            x: (centerX - e.clientX) * strength * 0.3,
            y: (centerY - e.clientY) * strength * 0.3,
          });
        } else {
          setMagneticOffset({ x: 0, y: 0 });
        }
      } else {
        setMagneticOffset({ x: 0, y: 0 });
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      
      // Create click particles
      if (enableParticles) {
        const newParticles: Particle[] = [];
        for (let i = 0; i < 8; i++) {
          const angle = (Math.PI * 2 * i) / 8;
          const speed = 2 + Math.random() * 3;
          newParticles.push({
            id: particleIdRef.current++,
            x: position.x,
            y: position.y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 30 + Math.random() * 20,
            maxLife: 50,
          });
        }
        setParticles(prev => [...prev, ...newParticles]);
      }
    };

    const handleMouseUp = () => setIsClicking(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousemove', updatePointer);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousemove', updatePointer);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isVisible, position.x, position.y]);

  if (!isVisible || isMobile) return null;

  const cursorX = position.x + magneticOffset.x;
  const cursorY = position.y + magneticOffset.y;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="fixed pointer-events-none z-[9999] transition-all duration-150 ease-out"
        style={{
          left: cursorX - 4,
          top: cursorY - 4,
          transform: `scale(${isClicking ? 0.8 : 1})`,
        }}
      >
        <div
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isPointer 
              ? 'bg-accent scale-150 shadow-glow-accent' 
              : 'bg-primary shadow-glow-primary'
          }`}
        />
      </div>

      {/* Cursor ring */}
      <div
        className="fixed pointer-events-none z-[9998] transition-all duration-300 ease-out"
        style={{
          left: cursorX - 20,
          top: cursorY - 20,
          transform: `scale(${isPointer ? 1.5 : 1})`,
        }}
      >
        <div
          className={`w-10 h-10 rounded-full border-2 transition-all duration-300 ${
            isPointer 
              ? 'border-accent/50 scale-100' 
              : 'border-primary/30 scale-75'
          }`}
        />
      </div>

      {/* Outer glow ring */}
      <div
        className="fixed pointer-events-none z-[9997] transition-all duration-500 ease-out"
        style={{
          left: cursorX - 40,
          top: cursorY - 40,
          transform: `scale(${isPointer ? 1.2 : 0.8})`,
          opacity: isPointer ? 0.4 : 0.2,
        }}
      >
        <div
          className={`w-20 h-20 rounded-full border transition-all duration-300 ${
            isPointer 
              ? 'border-accent/30' 
              : 'border-primary/20'
          }`}
        />
      </div>

      {/* Cursor trail */}
      {enableTrail && trail.slice(0, -1).map((point, index) => {
        const age = Date.now() - point.timestamp;
        const opacity = Math.max(0, 1 - age / 400);
        const scale = Math.max(0.2, 1 - age / 400);
        
        if (opacity <= 0) return null;
        
        return (
          <div
            key={index}
            className="fixed pointer-events-none z-[9996]"
            style={{
              left: point.x - 2,
              top: point.y - 2,
              opacity,
              transform: `scale(${scale})`,
            }}
          >
            <div
              className={`w-1 h-1 rounded-full transition-all duration-100 ${
                isPointer ? 'bg-accent/60' : 'bg-primary/40'
              }`}
            />
          </div>
        );
      })}

      {/* Magnetic effect for interactive elements */}
      <div
        className="fixed pointer-events-none z-[9995] transition-all duration-500 ease-out"
        style={{
          left: cursorX - 30,
          top: cursorY - 30,
          transform: `scale(${isPointer ? 1.2 : 0})`,
          opacity: isPointer ? 0.3 : 0,
        }}
      >
        <div className="w-15 h-15 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 backdrop-blur-sm" />
      </div>

      {/* Particles */}
      {enableParticles && particles.map(particle => (
        <div
          key={particle.id}
          className="fixed pointer-events-none z-[9994]"
          style={{
            left: particle.x - 1,
            top: particle.y - 1,
            opacity: particle.life / particle.maxLife,
            transform: `scale(${particle.life / particle.maxLife})`,
          }}
        >
          <div
            className={`w-1 h-1 rounded-full ${
              isPointer ? 'bg-accent/80' : 'bg-primary/60'
            }`}
          />
        </div>
      ))}

      {/* Hover effect for interactive elements */}
      {isPointer && (
        <div
          className="fixed pointer-events-none z-[9993] transition-all duration-300 ease-out"
          style={{
            left: cursorX - 50,
            top: cursorY - 50,
            transform: 'scale(1)',
            opacity: 0.1,
          }}
        >
          <div className="w-25 h-25 rounded-full bg-gradient-to-r from-accent/30 to-primary/30 backdrop-blur-sm" />
        </div>
      )}
    </>
  );
};

export default CustomCursor; 