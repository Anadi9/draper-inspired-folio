import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

interface HeroProps {
  isVisible?: boolean;
  scrollDirection?: 'up' | 'down';
  animationTrigger?: boolean;
}

const Hero = ({ isVisible = true, scrollDirection = 'down', animationTrigger = true }: HeroProps) => {
  const [animationsVisible, setAnimationsVisible] = useState(false);

  useEffect(() => {
    if (animationTrigger) {
      setAnimationsVisible(true);
    } else {
      setAnimationsVisible(false);
    }
  }, [animationTrigger]);


  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Radial gradient background */}
      <div className="absolute inset-0 bg-gradient-radial animate-glow-pulse"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary/30 rounded-full animate-float`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className={`transition-all duration-1000 ${animationsVisible ? 'animate-slide-in-dynamic' : 'animate-slide-out-dynamic'}`}>
          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="block text-foreground">Creative</span>
            <span className="block text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Developer
            </span>
          </h1>
          
          {/* Subtitle */}
          <p className={`text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${animationsVisible ? 'animate-scale-in-dynamic' : 'animate-scale-out-dynamic'}`}>
            Building extraordinary digital experiences with cutting-edge technology and innovative design
          </p>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-500 ${animationsVisible ? 'animate-bounce-in-dynamic' : 'animate-bounce-out-dynamic'}`}>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/80 text-primary-foreground px-8 py-3 text-lg transition-all duration-300 hover:scale-105 hover:shadow-glow-primary"
              
            >
              View My Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-glow px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
              
            >
              Let's Connect
            </Button>
          </div>

          {/* Social Links */}
          <div className={`flex justify-center space-x-6 mb-12 transition-all duration-1000 delay-700 ${animationsVisible ? 'animate-rotate-in-dynamic' : 'animate-rotate-out-dynamic'}`}>
            {[
              { icon: Github, href: '#', label: 'GitHub' },
              { icon: Linkedin, href: '#', label: 'LinkedIn' },
              { icon: Mail, href: '#', label: 'Email' }
            ].map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                className="w-12 h-12 bg-card/50 backdrop-blur-sm border border-border/30 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-primary"
                aria-label={social.label}
              >
                <social.icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${animationsVisible ? 'animate-bounce' : 'opacity-0'}`}>
          <div className="w-10 h-10 border border-primary/50 rounded-full flex items-center justify-center text-primary">
            <ArrowDown size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;