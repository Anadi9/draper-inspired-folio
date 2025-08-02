import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Zap, Star } from 'lucide-react';
import { gsap } from 'gsap';

interface HeroProps {
  isActive: boolean;
  sectionIndex: number;
}

const Hero = ({ isActive, sectionIndex }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isActive && !hasAnimated.current && containerRef.current) {
      hasAnimated.current = true;
      
      // Kill any existing animations
      gsap.killTweensOf(containerRef.current);
      
      const tl = gsap.timeline();
      
      // Animate background elements
      tl.fromTo(backgroundRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
      );
      
      // Animate title with text reveal effect
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || '';
        titleRef.current.innerHTML = '';
        
        // Create individual spans for each character
        titleText.split('').forEach((char, index) => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char;
          span.style.opacity = '0';
          span.style.transform = 'translateY(50px)';
          titleRef.current?.appendChild(span);
        });
        
        const titleSpans = titleRef.current.querySelectorAll('span');
        tl.fromTo(titleSpans,
          { opacity: 0, y: 50, rotationX: -90 },
          { 
            opacity: 1, y: 0, rotationX: 0, 
            duration: 0.8, 
            stagger: 0.05,
            ease: "back.out(1.7)" 
          },
          "-=0.5"
        );
      }
      
      // Animate subtitle
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { opacity: 0, y: 30, scale: 0.8 },
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.7)" },
          "-=0.3"
        );
      }
      
      // Animate buttons with stagger
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll('button');
        tl.fromTo(buttons,
          { opacity: 0, y: 40, scale: 0.5 },
          { 
            opacity: 1, y: 0, scale: 1, 
            duration: 0.6, 
            stagger: 0.1,
            ease: "back.out(1.7)" 
          },
          "-=0.2"
        );
      }
      
      // Animate social links with rotation
      if (socialRef.current) {
        const socialLinks = socialRef.current.querySelectorAll('a');
        tl.fromTo(socialLinks,
          { opacity: 0, rotation: -180, scale: 0, y: 20 },
          { 
            opacity: 1, rotation: 0, scale: 1, y: 0, 
            duration: 0.8, 
            stagger: 0.1,
            ease: "back.out(1.7)" 
          },
          "-=0.1"
        );
      }
      
      // Animate floating particles
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        gsap.fromTo(particles,
          { opacity: 0, scale: 0, y: 100, rotation: 0 },
          { 
            opacity: 1, scale: 1, y: 0, rotation: 360, 
            duration: 1.2, 
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 0.5
          }
        );
        
        // Add floating animation to particles
        gsap.to(particles, {
          y: -20,
          duration: 3,
          yoyo: true,
          repeat: -1,
          stagger: 0.3,
          ease: "power2.inOut"
        });
      }
      
      // Animate scroll indicator
      if (scrollIndicatorRef.current) {
        tl.fromTo(scrollIndicatorRef.current,
          { opacity: 0, y: 30, scale: 0.5 },
          { 
            opacity: 1, y: 0, scale: 1, 
            duration: 0.8, 
            ease: "back.out(1.7)",
            delay: 1
          }
        );
        
        // Add floating animation
        gsap.to(scrollIndicatorRef.current, {
          y: -15,
          duration: 2,
          yoyo: true,
          repeat: -1,
          ease: "power2.inOut",
          delay: 1.5
        });
      }
      
      return () => {
        tl.kill();
      };
    }
  }, [isActive]);

  // Reset animation state when section becomes inactive
  useEffect(() => {
    if (!isActive) {
      hasAnimated.current = false;
    }
  }, [isActive]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center">
      {/* Subtle overlay effects */}
      <div ref={backgroundRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-white/2"></div>
      </div>
      
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${10 + (i * 7) % 80}%`,
              top: `${20 + (i * 11) % 60}%`,
              animationDelay: `${i * 0.2}s`
            }}
          >
            {i % 3 === 0 ? (
              <Sparkles className="w-4 h-4 text-primary/60" />
            ) : i % 3 === 1 ? (
              <Zap className="w-3 h-3 text-accent/50" />
            ) : (
              <Star className="w-2 h-2 text-primary/40" />
            )}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Main heading with animated text */}
        <h1 ref={titleRef} className="flex items-center justify-center text-6xl md:text-8xl font-bold mt-20 mb-8 tracking-tight">
          <span className="block text-foreground">Creative</span>
          <span className="block text-glow bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Developer
          </span>
        </h1>
        
        {/* Subtitle */}
        <p ref={subtitleRef} className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          Crafting extraordinary digital experiences with cutting-edge technology and innovative design
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <Button
            size="lg"
            className="group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow-primary relative overflow-hidden"
          >
            <span className="relative z-10">View My Work</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="group border-glow px-10 py-4 text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-glow-accent relative overflow-hidden"
          >
            <span className="relative z-10">Let's Connect</span>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </div>

        {/* Social Links */}
        <div ref={socialRef} className="flex justify-center space-x-8 mb-16">
          {[
            { icon: Github, href: '#', label: 'GitHub' },
            { icon: Linkedin, href: '#', label: 'LinkedIn' },
            { icon: Mail, href: '#', label: 'Email' }
          ].map((social, index) => (
            <a
              key={social.label}
              href={social.href}
              className="group w-16 h-16 bg-card/30 backdrop-blur-sm border border-border/30 rounded-2xl flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 hover:scale-110 hover:shadow-glow-primary hover:rotate-3"
              aria-label={social.label}
            >
              <social.icon size={24} className="group-hover:scale-110 transition-transform duration-300" />
            </a>
          ))}
        </div>

        {/* Scroll indicator */}
        {/* <div ref={scrollIndicatorRef} className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
          <div className="w-12 h-12 border-2 border-primary/50 rounded-full flex items-center justify-center text-primary hover:border-primary hover:scale-110 transition-all duration-300 cursor-pointer">
            <ArrowDown size={24} />
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;