import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  currentSection: number;
  sections: Array<{ id: string; name: string }>;
  onSectionChange: (index: number) => void;
}

const Navigation = ({ currentSection, sections, onSectionChange }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'backdrop-blur-elegant bg-background/80 border-b border-border/50'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="text-2xl font-bold tracking-wider cursor-pointer text-glow"
            onClick={() => onSectionChange(0)}
          >
            PORTFOLIO
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {sections.slice(1, -1).map((section, index) => (
              <button
                key={section.id}
                onClick={() => onSectionChange(index + 1)}
                className={`transition-all duration-300 relative group ${
                  currentSection === index + 1
                    ? 'text-primary' 
                    : 'text-foreground/80 hover:text-primary'
                }`}
              >
                {section.name}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                  currentSection === index + 1 ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <Button 
            variant="outline" 
            className="border-glow hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={() => onSectionChange(sections.length - 2)}
          >
            Get In Touch
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;