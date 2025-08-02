import { useEffect, useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Star, Sparkles, Zap, Code, Rocket } from 'lucide-react';
import { gsap } from 'gsap';
import zeissImage from '@/assets/eiss.png';
import iotiImage from '@/assets/ioti.png';
import lapteImage from '@/assets/laccpt.png';
import appwalkerImage from '@/assets/appwalker.png';

interface ProjectsProps {
  isVisible?: boolean;
  scrollDirection?: 'up' | 'down';
  animationTrigger?: boolean;
}

const Projects = ({ isVisible = true, scrollDirection = 'down', animationTrigger = true }: ProjectsProps) => {
  const [animationsVisible, setAnimationsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const projectCardsRef = useRef<HTMLDivElement>(null);
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
          y: -20,
          duration: 3,
          yoyo: true,
          repeat: -1,
          stagger: 0.3,
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
            stagger: 0.03,
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
      
      // Animate project cards with 3D effects
      if (projectCardsRef.current) {
        const cards = projectCardsRef.current.querySelectorAll('.project-card');
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
      
    } else if (!animationTrigger) {
      setAnimationsVisible(false);
      hasAnimated.current = false;
    }
  }, [animationTrigger]);

  const projects = [
    {
      title: 'ZEISS Microscopy– Scientific Light Microscope Product Platform',
      description: 'As a leading manufacturer of microscopes ZEISS offers inspiring solutions and services for your life sciences and materials research, teaching and clinical routine. Reliable ZEISS systems are used for manufacturing and assembly in high tech industries as well as exploration and processing of raw materials worldwide.',
      technologies: ['React', 'TypeScript', 'AEM', 'Zustand'],
      thumbnail: zeissImage,
      liveUrl: 'https://www.zeiss.com/microscopy/us/products/light-microscopes.html',
      gradient: 'from-blue-500/20 to-purple-500/20'
    },
    {
      title: 'IOTIndustry',
      description: 'Discover ioti — a Johor, Malaysia-based leader in Industry 4.0, offering smart factory IoT systems, robotics automation, real-time monitoring & digital integration. An IOT based React built online portal for managing machine data in factories, providing valuable insights for factory managers.',
      technologies: ['TypeScript', 'React.js', 'Node.js', 'GCP', 'Balena Cloud' ],
      thumbnail: iotiImage,
      liveUrl: 'https://ioti.io/',
      gradient: 'from-green-500/20 to-blue-500/20'
    },
    {
      title: 'LA-PTE',
      description: 'The all-in-one PTE Academic & PTE Core preparation app trusted by over 500,000 learners worldwide ￼. Whether you\'re aiming for university admission, immigration to Australia, or professional certification, this app provides everything you need to succeed in the Pearson Test of English.',
      technologies: ['React Native', 'Android Studio', 'Typescript', 'Redux'],
      thumbnail: lapteImage,
      liveUrl: 'https://play.google.com/store/apps/details?id=com.languageacademy&pcampaignid=web_share&pli=1',
      gradient: 'from-orange-500/20 to-red-500/20'
    },
    {
      title: 'AppWalker – Recipe Sharing & Culinary Community Platform',
      description: 'Platform for food enthusiasts to create, share, and explore unique recipes. Features include recipe posting with step-by-step instructions, ingredient management, user contributions, and a vibrant community for culinary collaboration.',
      technologies: ['React.js', 'Node.js', 'Redux', 'TypeScript'],
      thumbnail: appwalkerImage,
      liveUrl: 'https://www.appwalker-technology.com/',
      gradient: 'from-purple-500/20 to-pink-500/20'
    }
  ];

  return (
    <section ref={containerRef} id="projects" className="py-24 relative min-h-screen overflow-hidden">
      {/* Subtle overlay effects */}
      <div ref={backgroundRef} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-white/2"></div>
      </div>
      
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${15 + (i * 8) % 70}%`,
              top: `${25 + (i * 13) % 50}%`,
              animationDelay: `${i * 0.3}s`
            }}
          >
            {i % 4 === 0 ? (
              <Code className="w-5 h-5 text-primary/40" />
            ) : i % 4 === 1 ? (
              <Rocket className="w-4 h-4 text-accent/50" />
            ) : i % 4 === 2 ? (
              <Star className="w-3 h-3 text-primary/30" />
            ) : (
              <Sparkles className="w-4 h-4 text-accent/40" />
            )}
          </div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Featured</span>
            <span className="text-glow bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"> Projects</span>
          </h2>
          <p ref={subtitleRef} className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of innovative solutions and creative implementations
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectCardsRef} className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className="project-card card-glass p-8 group hover-lift transition-all duration-500 hover:shadow-glow-primary relative overflow-hidden"
              onMouseEnter={() => {
                setHoveredProject(index);
                const card = document.querySelector(`[data-project-index="${index}"]`);
                if (card) {
                  gsap.to(card, { 
                    rotationY: 5, 
                    rotationX: 5,
                    scale: 1.02, 
                    duration: 0.4, 
                    ease: "power2.out" 
                  });
                }
              }}
              onMouseLeave={() => {
                setHoveredProject(null);
                const card = document.querySelector(`[data-project-index="${index}"]`);
                if (card) {
                  gsap.to(card, { 
                    rotationY: 0, 
                    rotationX: 0,
                    scale: 1, 
                    duration: 0.4, 
                    ease: "power2.out" 
                  });
                }
              }}
              data-project-index={index}
            >
              {/* Project Visual */}
              <div className={`h-56 bg-gradient-to-br ${project.gradient} rounded-lg mb-6 relative overflow-hidden group-hover:shadow-glow-primary transition-all duration-500`}>
                <div className="absolute inset-0 bg-gradient-radial opacity-30"></div>
                {project.thumbnail && (
                  <img 
                    src={project.thumbnail} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-110"
                  />
                )}
                
                {/* Hover overlay with sparkle effect */}
                {hoveredProject === index && (
                  <div className="absolute inset-0 bg-primary/10 animate-fade-in-up">
                    <div className="absolute top-4 right-4">
                      <Star className="w-6 h-6 text-primary animate-pulse" />
                    </div>
                    <div className="absolute bottom-4 left-4" style={{ animationDelay: '0.2s' }}>
                      <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                    </div>
                  </div>
                )}
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%]"></div>
              </div>

              {/* Project Info */}
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="group border-glow hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-glow-primary relative overflow-hidden"
                    asChild
                    onMouseEnter={(e) => {
                      gsap.to(e.currentTarget, { scale: 1.05, duration: 0.2, ease: "power2.out" });
                    }}
                    onMouseLeave={(e) => {
                      gsap.to(e.currentTarget, { scale: 1, duration: 0.2, ease: "power2.out" });
                    }}
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="mr-2 group-hover:animate-pulse" />
                      <span className="relative z-10">Live Demo</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        {/* <div className={`text-center mt-12 transition-all duration-1000 delay-1000 ${animationsVisible ? 'animate-elastic-in-dynamic' : 'animate-elastic-out-dynamic'}`}>
          <Button
            variant="outline"
            size="lg"
            className="border-glow px-8 py-3 text-lg hover:scale-105 transition-all duration-300"
          >
            View All Projects
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default Projects;