import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';

interface NavigationProps {
  currentSection: number;
  sections: Array<{ id: string; name: string }>;
  onSectionChange: (index: number) => void;
}

const Navigation = ({ currentSection, sections, onSectionChange }: NavigationProps) => {
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Filter out Hero section (index 0) and only show navigation items for other sections
  const navigationSections = sections.filter((_, index) => index !== 0);

  useEffect(() => {
    if (!hasAnimated.current && navRef.current) {
      hasAnimated.current = true;
      
      const tl = gsap.timeline();
      
      // Animate logo
      if (logoRef.current) {
        tl.fromTo(logoRef.current,
          { opacity: 0, x: -50, scale: 0.8 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" }
        );
      }
      
      // Animate nav links with stagger
      if (navLinksRef.current) {
        const links = navLinksRef.current.querySelectorAll('button');
        tl.fromTo(links,
          { opacity: 0, y: -30, scale: 0.8 },
          { 
            opacity: 1, y: 0, scale: 1, 
            duration: 0.6, 
            stagger: 0.1,
            ease: "back.out(1.7)" 
          },
          "-=0.4"
        );
      }
      
      // Animate CTA button
      if (ctaRef.current) {
        tl.fromTo(ctaRef.current,
          { opacity: 0, x: 50, scale: 0.8 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.6"
        );
      }
    }
  }, []);

  // Animate active nav link
  useEffect(() => {
    if (navLinksRef.current) {
      const links = navLinksRef.current.querySelectorAll('button');
      links.forEach((link, index) => {
        // Adjust index to account for filtered sections (add 1 since we filtered out Hero)
        const actualSectionIndex = index + 1;
        if (actualSectionIndex === currentSection) {
          gsap.to(link, {
            scale: 1.1,
            duration: 0.3,
            ease: "power2.out"
          });
        } else {
          gsap.to(link, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
          });
        }
      });
    }
  }, [currentSection]);

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 p-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <div ref={logoRef} className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <span className="text-xl font-bold text-white">Anadi</span>
        </div>

        {/* Navigation Links */}
        <div ref={navLinksRef} className="hidden md:flex items-center space-x-8">
          {navigationSections.map((section, index) => {
            // Adjust index to account for filtered sections (add 1 since we filtered out Hero)
            const actualSectionIndex = index + 1;
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(actualSectionIndex)}
                className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 hover:text-red-400 group ${
                  actualSectionIndex === currentSection ? 'text-red-400' : 'text-gray-300'
                }`}
              >
                {section.name}
                <div className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-red-500 to-orange-500 transition-all duration-300 ${
                  actualSectionIndex === currentSection ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`}></div>
              </button>
            );
          })}
        </div>

        {/* CTA Button */}
        <div ref={ctaRef}>
          <Button
            size="sm"
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-6 py-2 font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;