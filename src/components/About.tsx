import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { gsap } from 'gsap';
import { 
  Code, 
  Palette, 
  Zap, 
  Globe, 
  Smartphone, 
  Database,
  Award,
  Users,
  Clock,
  Target
} from 'lucide-react';

interface AboutProps {
  isActive: boolean;
  sectionIndex: number;
  animationTrigger?: boolean;
}

const About = ({ isActive, sectionIndex, animationTrigger = false }: AboutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (animationTrigger && !hasAnimated.current && containerRef.current) {
      hasAnimated.current = true;
      
      const tl = gsap.timeline();
      
      // Simple fade in for title
      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
        );
      }
      
      // Fade in subtitle
      if (subtitleRef.current) {
        tl.fromTo(subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
          "-=0.4"
        );
      }
      
      // Animate stats cards with simple stagger
      if (statsRef.current) {
        const statCards = statsRef.current.querySelectorAll('.stat-card');
        tl.fromTo(statCards,
          { opacity: 0, y: 30 },
          { 
            opacity: 1, y: 0,
            duration: 0.6, 
            stagger: 0.1,
            ease: "power2.out" 
          },
          "-=0.2"
        );
      }
      
      // Animate skills with simple fade in
      if (skillsRef.current) {
        const skillItems = skillsRef.current.querySelectorAll('.skill-item');
        tl.fromTo(skillItems,
          { opacity: 0, x: -30 },
          { 
            opacity: 1, x: 0,
            duration: 0.6, 
            stagger: 0.1,
            ease: "power2.out" 
          },
          "-=0.3"
        );
        
        // Animate skill progress bars
        const progressBars = skillsRef.current.querySelectorAll('.skill-progress');
        tl.fromTo(progressBars,
          { width: '0%' },
          { 
            width: (i, target) => target.getAttribute('data-level') + '%',
            duration: 1.2, 
            stagger: 0.1,
            ease: "power2.out" 
          },
          "-=0.4"
        );
      }
    } else if (!animationTrigger) {
      hasAnimated.current = false;
    }
  }, [animationTrigger]);

  useEffect(() => {
    if (!isActive) {
      hasAnimated.current = false;
    }
  }, [isActive]);

  const stats = [
    { icon: Award, label: "Years Experience", value: "5+" },
    { icon: Users, label: "Happy Clients", value: "50+" },
    { icon: Clock, label: "Projects Completed", value: "100+" },
    { icon: Target, label: "Success Rate", value: "98%" }
  ];

  const skills = [
    { name: "Frontend", icon: Code, level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "Backend", icon: Database, level: 90, color: "from-green-500 to-emerald-500" },
    { name: "Mobile", icon: Smartphone, level: 85, color: "from-purple-500 to-pink-500" },
    { name: "Design", icon: Palette, level: 80, color: "from-orange-500 to-red-500" },
    { name: "DevOps", icon: Zap, level: 85, color: "from-indigo-500 to-purple-500" },
    { name: "Cloud", icon: Globe, level: 90, color: "from-teal-500 to-blue-500" }
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden flex items-center justify-center">
      {/* Subtle overlay effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-white/2"></div>
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 ref={titleRef} className="flex items-center justify-center text-5xl md:text-6xl font-bold mb-6">
              <span className="block text-foreground">About</span>
              <span className="block text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <p ref={subtitleRef} className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Passionate full-stack developer with expertise in modern web technologies, 
              creating innovative solutions that drive business growth and user engagement.
            </p>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="stat-card bg-card/50 backdrop-blur-sm border border-border/30 hover:border-primary/50 transition-all duration-300 hover-lift">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Skills */}
          <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">Technical Skills</h3>
              {skills.slice(0, 3).map((skill, index) => (
                <div key={skill.name} className="skill-item">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <skill.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`skill-progress h-2 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      data-level={skill.level}
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground mb-6">Additional Skills</h3>
              {skills.slice(3).map((skill, index) => (
                <div key={skill.name} className="skill-item">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <skill.icon className="w-5 h-5 text-primary" />
                      <span className="font-medium text-foreground">{skill.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className={`skill-progress h-2 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out`}
                      data-level={skill.level}
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-semibold transition-all duration-300 hover-scale"
            >
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;