import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { gsap } from 'gsap';
import { 
  Code2, 
  Database, 
  Server, 
  Star, 
  Sparkles, 
  Zap, 
  Globe,
  Cpu,
  Palette
} from 'lucide-react';

interface SkillsProps {
  isVisible?: boolean;
  scrollDirection?: 'up' | 'down';
  animationTrigger?: boolean;
}

const Skills = ({ isVisible = true, scrollDirection = 'down', animationTrigger = true }: SkillsProps) => {
  const [animationsVisible, setAnimationsVisible] = useState(false);
  const [skillCounters, setSkillCounters] = useState<{[key: string]: number}>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const skillCardsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (animationTrigger && !hasAnimated.current && containerRef.current) {
      hasAnimated.current = true;
      setAnimationsVisible(true);
      
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
          { opacity: 0, scale: 0, y: 100, rotation: 0 },
          { 
            opacity: 1, scale: 1, y: 0, rotation: 360, 
            duration: 1.2, 
            stagger: 0.2,
            ease: "back.out(1.7)",
            delay: 0.3
          }
        );
        
        // Add continuous floating animation
        gsap.to(particles, {
          y: -15,
          duration: 4,
          yoyo: true,
          repeat: -1,
          stagger: 0.2,
          ease: "power2.inOut"
        });
      }
      
      // Animate title with character reveal
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || '';
        titleRef.current.innerHTML = '';
        
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
            stagger: 0.04,
            ease: "back.out(1.7)" 
          },
          "-=1"
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
      
      // Animate skill cards with 3D effects
      if (skillCardsRef.current) {
        const cards = skillCardsRef.current.querySelectorAll('.skill-card');
        tl.fromTo(cards,
          { opacity: 0, y: 100, rotationY: -90, scale: 0.5 },
          { 
            opacity: 1, y: 0, rotationY: 0, scale: 1,
            duration: 1.0, 
            stagger: 0.2,
            ease: "back.out(1.7)" 
          },
          "-=0.5"
        );
      }
      
      // Animate skill counters
      const animateCounters = () => {
        skillCategories.forEach(category => {
          category.skills.forEach(skill => {
            let count = 0;
            const target = skill.level;
            const increment = target / 30;
            
            const timer = setInterval(() => {
              count += increment;
              if (count >= target) {
                count = target;
                clearInterval(timer);
              }
              setSkillCounters(prev => ({
                ...prev,
                [skill.name]: Math.floor(count)
              }));
            }, 50);
          });
        });
      };
      
      setTimeout(animateCounters, 1000);
      
    } else if (!animationTrigger) {
      setAnimationsVisible(false);
      hasAnimated.current = false;
      setSkillCounters({});
    }
  }, [animationTrigger]);

  const skillCategories = [
    {
      title: 'Frontend',
      icon: Code2,
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 80 },
        { name: 'GSAP/Framer Motion', level: 70 },
        { name: 'React Native', level: 80 },
        { name: 'Tailwind CSS', level: 90 },
        { name: 'Redux', level: 80 },
        { name: 'Zustand', level: 80 },
      ]
    },
    {
      title: 'Backend',
      icon: Database,
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 80 },
        { name: 'Express', level: 85 },
        { name: 'PostgreSQL', level: 60 },
        { name: 'MongoDB', level: 78 },
        { name: 'GraphQL', level: 80 }
      ]
    },
    {
      title: 'DevOps & Tools',
      icon: Server,
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'GCP', level: 80 },
        { name: 'Docker', level: 80 },
        { name: 'Version Control', level: 90 },
        { name: 'Git', level: 95 },
        { name: 'CI/CD', level: 82 }
      ]
    }
  ];

  return (
    <section ref={containerRef} id="skills" className="py-24 relative min-h-screen overflow-hidden">
      {/* Subtle overlay effects */}
      <div ref={backgroundRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-white/2"></div>
      </div>
      
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${20 + (i * 10) % 60}%`,
              top: `${30 + (i * 15) % 40}%`,
              animationDelay: `${i * 0.4}s`
            }}
          >
            {i % 4 === 0 ? (
              <Code2 className="w-6 h-6 text-primary/40" />
            ) : i % 4 === 1 ? (
              <Database className="w-5 h-5 text-accent/50" />
            ) : i % 4 === 2 ? (
              <Server className="w-4 h-4 text-primary/30" />
            ) : (
              <Cpu className="w-5 h-5 text-accent/40" />
            )}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Technical</span>
            <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Skills</span>
          </h2>
          <p ref={subtitleRef} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={skillCardsRef} className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => {
            const CategoryIcon = category.icon;
            return (
              <Card
                key={category.title}
                className="skill-card card-glass p-8 hover-lift transition-all duration-500 hover:shadow-glow-primary relative overflow-hidden"
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, { 
                    rotationY: 5, 
                    scale: 1.02, 
                    duration: 0.3, 
                    ease: "power2.out" 
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, { 
                    rotationY: 0, 
                    scale: 1, 
                    duration: 0.3, 
                    ease: "power2.out" 
                  });
                }}
              >
                <div className="text-center mb-6">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${category.color} mb-4`}>
                    <CategoryIcon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold text-glow">
                    {category.title}
                  </h3>
                </div>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2 hover-lift">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {skillCounters[skill.name] || 0}%
                      </span>
                    </div>
                    
                    {/* Enhanced Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-3 overflow-hidden relative">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-accent rounded-full relative overflow-hidden"
                        style={{
                          width: animationsVisible ? `${skill.level}%` : '0%',
                          transition: 'width 2s ease-out',
                          transitionDelay: `${1000 + categoryIndex * 200 + skillIndex * 100}ms`
                        }}
                      >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
                      </div>
                      
                      {/* Skill level indicator */}
                      <div 
                        className="absolute top-0 h-full w-1 bg-white/60 rounded-full transition-all duration-2000 ease-out"
                        style={{
                          left: animationsVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${1000 + categoryIndex * 200 + skillIndex * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            );
          })}
        </div>

        {/* Additional Info with decorative elements */}
        <div className="text-center mt-16 relative">
          <div className="relative inline-block">
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              I'm constantly learning and adapting to new technologies. My expertise spans across 
              the full development lifecycle, from initial concept to deployment and maintenance.
            </p>
            
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6">
              <Star className="w-5 h-5 text-primary/40 animate-pulse" />
            </div>
            <div className="absolute -bottom-6 -right-6" style={{ animationDelay: '1s' }}>
              <Sparkles className="w-5 h-5 text-accent/40 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;