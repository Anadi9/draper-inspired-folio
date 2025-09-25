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
  Download,
  ArrowRight
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
  const skillsRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (animationTrigger && !hasAnimated.current && containerRef.current) {
      hasAnimated.current = true;
      
      const tl = gsap.timeline();
      
      // Animate title with enhanced effect
      if (titleRef.current) {
        tl.fromTo(titleRef.current,
          { opacity: 0, y: 50, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "backOut" }
        );
      }
      
      // Animate subtitle with stagger
      if (subtitleRef.current) {
        const words = subtitleRef.current.textContent?.split(' ') || [];
        subtitleRef.current.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
        const wordSpans = subtitleRef.current.querySelectorAll('.word');
        
        tl.fromTo(wordSpans,
          { opacity: 0, y: 20, rotateX: -90 },
          { 
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.6, 
            stagger: 0.05,
            ease: "power2.out" 
          },
          "-=0.5"
        );
      }
      

      
      // Animate skills with enhanced effects
      if (skillsRef.current) {
        const skillItems = skillsRef.current.querySelectorAll('.skill-item');
        tl.fromTo(skillItems,
          { opacity: 0, x: -50, scale: 0.9 },
          { 
            opacity: 1, x: 0, scale: 1,
            duration: 0.8, 
            stagger: 0.1,
            ease: "backOut" 
          },
          "-=0.4"
        );
        
        // Animate skill progress bars with enhanced timing
        const progressBars = skillsRef.current.querySelectorAll('.skill-progress');
        tl.fromTo(progressBars,
          { width: '0%', scaleX: 0 },
          { 
            width: (i, target) => target.getAttribute('data-level') + '%',
            scaleX: 1,
            duration: 1.5, 
            stagger: 0.1,
            ease: "power2.out" 
          },
          "-=0.6"
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



  const skills = [
    { name: "Frontend Development", icon: Code, level: 95, color: "from-blue-500 to-cyan-500", description: "React, Vue, Angular, TypeScript" },
    { name: "Backend Development", icon: Database, level: 90, color: "from-purple-500 to-pink-500", description: "Node.js, Python, Java, SQL" },
    { name: "Mobile Development", icon: Smartphone, level: 85, color: "from-green-500 to-emerald-500", description: "React Native, Flutter, iOS" },
    { name: "UI/UX Design", icon: Palette, level: 80, color: "from-orange-500 to-red-500", description: "Figma, Adobe XD, Prototyping" },
    { name: "DevOps & CI/CD", icon: Zap, level: 85, color: "from-indigo-500 to-blue-500", description: "Docker, Kubernetes, AWS" },
    { name: "Cloud Services", icon: Globe, level: 90, color: "from-teal-500 to-green-500", description: "AWS, Azure, Google Cloud" }
  ];

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden flex items-center justify-center">
      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <h2 ref={titleRef} className="text-6xl md:text-7xl font-black mb-8">
              <span className="text-white">About</span>
              <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Me
              </span>
            </h2>
            <p ref={subtitleRef} className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Passionate full-stack developer with expertise in modern web technologies, 
              creating innovative solutions that drive business growth and user engagement.
            </p>
          </div>



          {/* Enhanced Skills Section */}
          <div ref={skillsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                Technical Expertise
              </h3>
              {skills.slice(0, 3).map((skill, index) => (
                <div key={skill.name} className="skill-item group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${skill.color} p-2.5 shadow-lg`}>
                        <skill.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-white text-lg">{skill.name}</span>
                        <div className="text-gray-400 text-sm">{skill.description}</div>
                      </div>
                    </div>
                    <span className={`text-lg font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800/50 rounded-full h-3 backdrop-blur-sm">
                    <div 
                      className={`skill-progress h-3 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                      data-level={skill.level}
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-8">
              <h3 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                Additional Skills
              </h3>
              {skills.slice(3).map((skill, index) => (
                <div key={skill.name} className="skill-item group">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-r ${skill.color} p-2.5 shadow-lg`}>
                        <skill.icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-white text-lg">{skill.name}</span>
                        <div className="text-gray-400 text-sm">{skill.description}</div>
                      </div>
                    </div>
                    <span className={`text-lg font-bold bg-gradient-to-r ${skill.color} bg-clip-text text-transparent`}>
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800/50 rounded-full h-3 backdrop-blur-sm">
                    <div 
                      className={`skill-progress h-3 bg-gradient-to-r ${skill.color} rounded-full transition-all duration-1000 ease-out shadow-lg`}
                      data-level={skill.level}
                      style={{ width: '0%' }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced CTA */}
          <div className="text-center">
            <Button
              size="lg"
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-10 py-4 text-lg font-semibold transition-all duration-500 hover:scale-105 hover:shadow-2xl rounded-2xl"
            >
              <Download className="w-5 h-5 mr-3 group-hover:animate-bounce" />
              Download Resume
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;