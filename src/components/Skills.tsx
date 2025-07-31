import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface SkillsProps {
  isVisible?: boolean;
  scrollDirection?: 'up' | 'down';
  animationTrigger?: boolean;
}

const Skills = ({ isVisible = true, scrollDirection = 'down', animationTrigger = true }: SkillsProps) => {
  const [animationsVisible, setAnimationsVisible] = useState(false);

  useEffect(() => {
    if (animationTrigger) {
      setAnimationsVisible(true);
    } else {
      setAnimationsVisible(false);
    }
  }, [animationTrigger]);

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'TypeScript', level: 90 },
        { name: 'Next.js', level: 85 },
        { name: 'Vue.js', level: 80 },
        { name: 'Tailwind CSS', level: 92 }
      ]
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 88 },
        { name: 'Python', level: 85 },
        { name: 'PostgreSQL', level: 82 },
        { name: 'MongoDB', level: 78 },
        { name: 'GraphQL', level: 80 }
      ]
    },
    {
      title: 'DevOps & Tools',
      skills: [
        { name: 'AWS', level: 83 },
        { name: 'Docker', level: 86 },
        { name: 'Kubernetes', level: 75 },
        { name: 'Git', level: 95 },
        { name: 'CI/CD', level: 82 }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${animationsVisible ? 'animate-wave-in-dynamic' : 'animate-wave-out-dynamic'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            Technical Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, categoryIndex) => (
            <Card
              key={category.title}
              className={`card-glass p-8 transition-all duration-1000 hover:scale-105 hover:shadow-glow-primary ${
                animationsVisible ? 'animate-morph-in-dynamic' : 'animate-morph-out-dynamic'
              }`}
              style={{ animationDelay: `${300 + categoryIndex * 200}ms` }}
            >
              <h3 className="text-2xl font-semibold mb-6 text-center text-primary">
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out ${
                          isVisible ? 'animate-glow-pulse' : ''
                        }`}
                        style={{
                          width: animationsVisible ? `${skill.level}%` : '0%',
                          transitionDelay: `${500 + categoryIndex * 200 + skillIndex * 100}ms`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-1000 ${animationsVisible ? 'animate-pulse-in-dynamic' : 'animate-pulse-out-dynamic'}`}>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I'm constantly learning and adapting to new technologies. My expertise spans across 
            the full development lifecycle, from initial concept to deployment and maintenance.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Skills;