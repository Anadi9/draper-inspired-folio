import { useEffect, useState, useRef } from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [isScrolling, setIsScrolling] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTop = useRef(0);
  
  const sections = [
    { id: 'hero', component: Hero, name: 'Hero' },
    { id: 'about', component: About, name: 'About' },
    { id: 'projects', component: Projects, name: 'Projects' },
    { id: 'skills', component: Skills, name: 'Skills' },
    { id: 'contact', component: Contact, name: 'Contact' },
    { id: 'footer', component: Footer, name: 'Footer' },
  ];

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      const direction = e.deltaY > 0 ? 'down' : 'up';
      setScrollDirection(direction);
      
      if (direction === 'down' && currentSection < sections.length - 1) {
        setIsScrolling(true);
        setCurrentSection(prev => prev + 1);
      } else if (direction === 'up' && currentSection > 0) {
        setIsScrolling(true);
        setCurrentSection(prev => prev - 1);
      }
      
      setTimeout(() => setIsScrolling(false), 800);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
        setScrollDirection('down');
        setIsScrolling(true);
        setCurrentSection(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 800);
      } else if (e.key === 'ArrowUp' && currentSection > 0) {
        setScrollDirection('up');
        setIsScrolling(true);
        setCurrentSection(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 800);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [currentSection, isScrolling, sections.length]);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden">
      <Navigation currentSection={currentSection} sections={sections} onSectionChange={setCurrentSection} />
      
      {/* Section Indicators */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setScrollDirection(index > currentSection ? 'down' : 'up');
              setCurrentSection(index);
            }}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
              index === currentSection 
                ? 'bg-primary border-primary shadow-glow-primary' 
                : 'border-primary/30 hover:border-primary/60'
            }`}
            aria-label={`Go to ${sections[index].name} section`}
          />
        ))}
      </div>

      {/* Sections Container */}
      <div className="relative w-full h-full">
        {sections.map((section, index) => {
          const Component = section.component;
          const isActive = index === currentSection;
          const isPrev = index === currentSection - 1;
          const isNext = index === currentSection + 1;
          
          let transform = '';
          let opacity = 0;
          let zIndex = 0;
          
          if (isActive) {
            transform = 'translateY(0)';
            opacity = 1;
            zIndex = 10;
          } else if (isPrev) {
            transform = scrollDirection === 'up' ? 'translateY(-20%)' : 'translateY(-100%)';
            opacity = scrollDirection === 'up' ? 0.3 : 0;
            zIndex = 5;
          } else if (isNext) {
            transform = scrollDirection === 'down' ? 'translateY(20%)' : 'translateY(100%)';
            opacity = scrollDirection === 'down' ? 0.3 : 0;
            zIndex = 5;
          } else if (index < currentSection) {
            transform = 'translateY(-100%)';
            opacity = 0;
            zIndex = 1;
          } else {
            transform = 'translateY(100%)';
            opacity = 0;
            zIndex = 1;
          }
          
          return (
            <div
              key={section.id}
              className="absolute inset-0 w-full h-full transition-all duration-800 ease-out"
              style={{
                transform,
                opacity,
                zIndex,
                filter: isActive ? 'none' : 'blur(2px)',
              }}
            >
              <Component 
                isVisible={isActive} 
                scrollDirection={scrollDirection}
                animationTrigger={isActive}
              />
            </div>
          );
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-background/50 z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-800 ease-out"
          style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Index;
