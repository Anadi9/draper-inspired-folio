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
import { motion } from 'framer-motion';

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
      bgColor: 'from-gray-900 via-zinc-900 to-black',
      accentColor: 'from-red-600 to-orange-600'
    },
    { 
      id: 'about', 
      component: About, 
      name: 'About',
      bgColor: 'from-gray-900 via-zinc-900 to-black',
      accentColor: 'from-blue-600 to-cyan-500'
    },
    { 
      id: 'projects', 
      component: Projects, 
      name: 'Projects',
      bgColor: 'from-gray-900 via-zinc-900 to-black',
      accentColor: 'from-purple-600 to-pink-500'
    },
    { 
      id: 'skills', 
      component: Skills, 
      name: 'Skills',
      bgColor: 'from-gray-900 via-zinc-900 to-black',
      accentColor: 'from-green-600 to-emerald-500'
    },
    { 
      id: 'contact', 
      component: Contact, 
      name: 'Contact',
      bgColor: 'from-gray-900 via-zinc-900 to-black',
      accentColor: 'from-indigo-600 to-blue-500'
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
      {/* Fixed Background for entire portfolio */}
      <div className="fixed inset-0 z-0">
        <div 
          className={`absolute inset-0 bg-gradient-to-br ${sections[currentSection].bgColor} transition-all duration-1000 ease-in-out`}
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-r ${sections[currentSection].accentColor} opacity-5 transition-all duration-1000 ease-in-out`}
        />
        {/* Fixed background pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `
            radial-gradient(circle at 20% 20%, rgba(220, 38, 38, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(245, 101, 101, 0.3) 0%, transparent 50%),
            linear-gradient(45deg, transparent 49%, rgba(220, 38, 38, 0.1) 50%, transparent 51%),
            linear-gradient(-45deg, transparent 49%, rgba(245, 101, 101, 0.1) 50%, transparent 51%)
          `,
          backgroundSize: '100px 100px, 150px 150px, 50px 50px, 50px 50px'
        }}></div>
        {/* Fixed gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        {/* Floating Code Elements with Glow - Fixed */}
        {currentSection === 0 && (
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-red-400/30 font-mono text-sm drop-shadow-glow"
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  opacity: 0 
                }}
                animate={{ 
                  y: [null, -150],
                  opacity: [0, 1, 0],
                  scale: [0.8, 1, 0.8]
                }}
                transition={{
                  duration: 10 + Math.random() * 5,
                  repeat: Infinity,
                  delay: i * 1.5,
                  ease: "easeInOut"
                }}
              >
                {['const', 'function', 'return', 'async', 'await', 'export', 'class', 'interface'][i]}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <CustomCursor 
        isVisible={true}
        themeColor={sections[currentSection].accentColor}
        currentSection={currentSection}
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