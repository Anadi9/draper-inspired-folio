import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [hasUserScrolled, setHasUserScrolled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement>(null);
  const sectionContentsRef = useRef<(HTMLDivElement | null)[]>([]);
  const scrollTweenRef = useRef<gsap.core.Tween | null>(null);

  const sections = [
    { 
      id: 'hero', 
      component: Hero, 
      name: 'Hero',
      bgColor: 'from-gray-950 via-slate-950 to-gray-950',
      accentColor: 'from-blue-500 to-purple-500'
    },
    { 
      id: 'about', 
      component: About, 
      name: 'About',
      bgColor: 'from-slate-950 via-gray-900 to-slate-950',
      accentColor: 'from-emerald-400 to-teal-400'
    },
    { 
      id: 'projects', 
      component: Projects, 
      name: 'Projects',
      bgColor: 'from-zinc-950 via-slate-900 to-zinc-950',
      accentColor: 'from-orange-400 to-red-400'
    },
    { 
      id: 'skills', 
      component: Skills, 
      name: 'Skills',
      bgColor: 'from-gray-950 via-zinc-900 to-gray-950',
      accentColor: 'from-indigo-400 to-blue-400'
    },
    { 
      id: 'contact', 
      component: Contact, 
      name: 'Contact',
      bgColor: 'from-slate-950 via-zinc-950 to-slate-950',
      accentColor: 'from-violet-400 to-pink-400'
    },
  ];

  // Smooth scroll content using GSAP
  const smoothScrollContent = (element: HTMLDivElement, delta: number) => {
    if (scrollTweenRef.current) scrollTweenRef.current.kill();
    
    const startScroll = element.scrollTop;
    const targetScroll = Math.max(
      0,
      Math.min(element.scrollHeight - element.clientHeight, startScroll + delta)
    );
    
    scrollTweenRef.current = gsap.to(element, {
      scrollTop: targetScroll,
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => {
        scrollTweenRef.current = null;
      }
    });
  };

  // Check if content is scrollable and if user is at top/bottom
  const canScrollSection = (direction: 'up' | 'down') => {
    const currentContent = sectionContentsRef.current[currentSection];
    if (!currentContent) return true;
    
    // Check if content is scrollable
    const isScrollable = currentContent.scrollHeight > currentContent.clientHeight;
    
    if (!isScrollable) return true;
    
    if (direction === 'down') {
      // Check if already at bottom (with small threshold)
      return currentContent.scrollTop + currentContent.clientHeight >= currentContent.scrollHeight - 5;
    } else {
      // Check if already at top (with small threshold)
      return currentContent.scrollTop <= 5;
    }
  };

  // Smooth section transition
  const goToSection = (targetIndex: number) => {
    if (isScrolling || targetIndex === currentSection) return;
    
    // Mark that user has scrolled
    if (!hasUserScrolled) {
      setHasUserScrolled(true);
    }
    
    setIsScrolling(true);
    const direction = targetIndex > currentSection ? 'down' : 'up';
    
    // Kill any existing animations
    if (sectionsRef.current) {
      gsap.killTweensOf(sectionsRef.current.children);
    }
    
    const tl = gsap.timeline({
      onComplete: () => setIsScrolling(false)
    });
    
    // Exit current section
    const currentElement = sectionsRef.current?.children[currentSection];
    if (currentElement) {
      tl.to(currentElement, {
        opacity: 0,
        y: direction === 'down' ? -50 : 50,
        scale: 0.95,
        duration: 0.6,
        ease: "power2.inOut"
      });
    }
    
    // Enter target section
    const targetElement = sectionsRef.current?.children[targetIndex];
    if (targetElement) {
      tl.fromTo(targetElement,
        {
          opacity: 0,
          y: direction === 'down' ? 50 : -50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out"
        },
        "-=0.3"
      );
    }
    
    setCurrentSection(targetIndex);
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isScrolling) return;
      
      // Mark that user has scrolled
      if (!hasUserScrolled) {
        setHasUserScrolled(true);
      }
      
      const direction = e.deltaY > 0 ? 'down' : 'up';
      const currentContent = sectionContentsRef.current[currentSection];
      
      if (currentContent) {
        // Check if we should scroll content or change section
        if (
          (direction === 'down' && !canScrollSection('down')) ||
          (direction === 'up' && !canScrollSection('up'))
        ) {
          // Smooth scroll the content using GSAP with fixed values like keyboard
          smoothScrollContent(currentContent, direction === 'down' ? 100 : -100);
          e.preventDefault();
          return;
        }
      }
      
      // If we can't scroll content further, change section
      if (direction === 'down' && currentSection < sections.length - 1) {
        goToSection(currentSection + 1);
        e.preventDefault();
      } else if (direction === 'up' && currentSection > 0) {
        goToSection(currentSection - 1);
        e.preventDefault();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isScrolling) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        // Mark that user has scrolled
        if (!hasUserScrolled) {
          setHasUserScrolled(true);
        }
        
        const direction = e.key === 'ArrowDown' ? 'down' : 'up';
        const currentContent = sectionContentsRef.current[currentSection];
        
        if (currentContent) {
          // Check if we should scroll content or change section
          if (
            (direction === 'down' && !canScrollSection('down')) ||
            (direction === 'up' && !canScrollSection('up'))
          ) {
            // Smooth scroll the content using GSAP
            smoothScrollContent(currentContent, direction === 'down' ? 100 : -100);
            e.preventDefault();
            return;
          }
        }
        
        // If we can't scroll content further, change section
        if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
          goToSection(currentSection + 1);
          e.preventDefault();
        } else if (e.key === 'ArrowUp' && currentSection > 0) {
          goToSection(currentSection - 1);
          e.preventDefault();
        }
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
      if (scrollTweenRef.current) scrollTweenRef.current.kill();
    };
  }, [currentSection, isScrolling, sections.length]);

  // Initialize sections
  useEffect(() => {
    if (sectionsRef.current) {
      const sectionElements = sectionsRef.current.children;
      
      // Set initial states
      gsap.set(sectionElements, {
        opacity: 0,
        y: 50,
        scale: 0.95
      });
      
      // Show first section
      if (sectionElements[0]) {
        gsap.set(sectionElements[0], {
          opacity: 1,
          y: 0,
          scale: 1
        });
      }
    }
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden custom-cursor-active">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${sections[currentSection].bgColor} transition-all duration-1000 ease-in-out`}
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-r ${sections[currentSection].accentColor} opacity-5 transition-all duration-1000 ease-in-out`}
        />
        {/* Subtle dot pattern */}
        <div className="absolute inset-0 opacity-3">
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: '80px 80px',
              color: sections[currentSection].accentColor.includes('blue') ? '#6366f1' : 
                     sections[currentSection].accentColor.includes('emerald') ? '#34d399' :
                     sections[currentSection].accentColor.includes('orange') ? '#fb923c' :
                     sections[currentSection].accentColor.includes('indigo') ? '#818cf8' : '#c084fc'
            }}
          />
        </div>
      </div>

      <CustomCursor 
        isVisible={true} 
        enableMagnetic={true}
        enableParticles={true}
        enableTrail={true}
      />
      
      <Navigation currentSection={currentSection} sections={sections} onSectionChange={goToSection} />
      
      {/* Section Indicators */}
      <div className="fixed right-8 top-[95%] transform -translate-y-1/2 z-50 space-y-3">
        {sections.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSection(index)}
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
      <div ref={sectionsRef} className="relative w-full h-full z-10">
        {sections.map((section, index) => {
          const Component = section.component;
          
          return (
            <div
              key={section.id}
              className="absolute inset-0 w-full h-full"
              style={{
                zIndex: index === currentSection ? 10 : 1
              }}
            >
              <div 
                ref={el => sectionContentsRef.current[index] = el}
                className="h-full w-full overflow-y-auto scrollbar-hide bg-transparent"
              >
                <Component 
                  isActive={index === currentSection}
                  sectionIndex={index}
                  animationTrigger={hasUserScrolled && index === currentSection}
                />
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Progress Bar */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gray-950/50 z-50">
        <div 
          className={`h-full bg-gradient-to-r ${sections[currentSection].accentColor} transition-all duration-1000 ease-out shadow-sm`}
          style={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Index;