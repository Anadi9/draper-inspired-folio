import { Github, Linkedin, Mail, Heart, Star, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface FooterProps {
  isVisible?: boolean;
  scrollDirection?: 'up' | 'down';
  animationTrigger?: boolean;
}

const Footer = ({ isVisible = true, scrollDirection = 'down', animationTrigger = true }: FooterProps) => {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const socialLinksRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-gray-400' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:text-blue-400' },
    { icon: Mail, href: '#', label: 'Email', color: 'hover:text-red-400' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (animationTrigger && !hasAnimated.current && footerRef.current) {
      hasAnimated.current = true;
      
      const tl = gsap.timeline();
      
      // Animate background
      if (backgroundRef.current) {
        tl.fromTo(backgroundRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
        );
      }
      
      // Animate floating particles
      if (particlesRef.current) {
        const particles = particlesRef.current.children;
        gsap.fromTo(particles,
          { opacity: 0, scale: 0, y: 50, rotation: 0 },
          { 
            opacity: 1, scale: 1, y: 0, rotation: 360, 
            duration: 1.0, 
            stagger: 0.1,
            ease: "back.out(1.7)",
            delay: 0.5
          }
        );
        
        // Add continuous floating animation
        gsap.to(particles, {
          y: -10,
          duration: 3,
          yoyo: true,
          repeat: -1,
          stagger: 0.2,
          ease: "power2.inOut"
        });
      }
      
      // Animate social links
      if (socialLinksRef.current) {
        const links = socialLinksRef.current.querySelectorAll('.social-link');
        tl.fromTo(links,
          { opacity: 0, y: 30, scale: 0.5, rotation: -180 },
          { 
            opacity: 1, y: 0, scale: 1, rotation: 0,
            duration: 0.8, 
            stagger: 0.1,
            ease: "back.out(1.7)" 
          },
          "-=0.5"
        );
      }
      
    } else if (!animationTrigger) {
      hasAnimated.current = false;
    }
  }, [animationTrigger]);

  return (
    <footer ref={footerRef} className="relative py-16 border-t border-border/20 overflow-hidden">
      {/* Animated background */}
      <div ref={backgroundRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
        
        {/* Animated grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
      </div>
      
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${20 + (i * 15) % 60}%`,
              top: `${20 + (i * 10) % 60}%`,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {i % 2 === 0 ? (
              <Star className="w-3 h-3 text-primary/20" />
            ) : (
              <Sparkles className="w-4 h-4 text-accent/25" />
            )}
          </div>
        ))}
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Logo */}
          <div 
            className="text-3xl font-bold tracking-wider mb-6 text-shimmer cursor-pointer inline-block hover-lift transition-all duration-300"
            onClick={scrollToTop}
            onMouseEnter={(e) => {
              gsap.to(e.target, { 
                scale: 1.1, 
                rotation: 2,
                duration: 0.3, 
                ease: "back.out(1.7)" 
              });
            }}
            onMouseLeave={(e) => {
              gsap.to(e.target, { 
                scale: 1, 
                rotation: 0,
                duration: 0.3, 
                ease: "back.out(1.7)" 
              });
            }}
          >
            PORTFOLIO
          </div>

          {/* Navigation */}
          <nav className="mb-8">
            <div className="flex justify-center space-x-8">
              {['About', 'Projects', 'Skills', 'Contact'].map((item, index) => (
                <button
                  key={item}
                  onClick={() => {
                    const element = document.getElementById(item.toLowerCase());
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="text-muted-foreground hover:text-primary transition-all duration-300 relative group hover-lift"
                  onMouseEnter={(e) => {
                    gsap.to(e.target, { y: -3, duration: 0.2, ease: "power2.out" });
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.target, { y: 0, duration: 0.2, ease: "power2.out" });
                  }}
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </div>
          </nav>

          {/* Social Links */}
          <div ref={socialLinksRef} className="flex justify-center space-x-6 mb-8">
            {socialLinks.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                className={`social-link w-12 h-12 bg-card/30 backdrop-blur-sm border border-border/30 rounded-full flex items-center justify-center text-muted-foreground hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 hover-lift relative overflow-hidden group ${social.color}`}
                aria-label={social.label}
                onMouseEnter={(e) => {
                  gsap.to(e.target, { 
                    scale: 1.2, 
                    rotation: 10,
                    duration: 0.3, 
                    ease: "back.out(1.7)" 
                  });
                  
                  // Create ripple effect
                  const ripple = document.createElement('div');
                  ripple.className = 'absolute inset-0 bg-primary/20 rounded-full animate-ping';
                  (e.target as HTMLElement).appendChild(ripple);
                  setTimeout(() => ripple.remove(), 1000);
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.target, { 
                    scale: 1, 
                    rotation: 0,
                    duration: 0.3, 
                    ease: "back.out(1.7)" 
                  });
                }}
              >
                <social.icon size={20} className="group-hover:rotate-12 transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-sm text-muted-foreground">
            <p className="flex items-center justify-center gap-2">
              © {currentYear} Portfolio. Made with 
              <Heart size={16} className="text-red-500 animate-pulse hover:scale-125 transition-transform duration-300 cursor-pointer" />
              using React & TypeScript
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;