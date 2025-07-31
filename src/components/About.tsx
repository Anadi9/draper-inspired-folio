import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Code2, Palette, Zap } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('about');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: Code2,
      title: 'Full-Stack Development',
      description: 'Expertise in modern frameworks and technologies to build scalable applications'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Creating beautiful, intuitive interfaces that provide exceptional user experiences'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Delivering lightning-fast applications with optimal performance and efficiency'
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
              About Me
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Passionate developer with a keen eye for design and a drive for innovation
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Text Content */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h3 className="text-2xl font-semibold mb-6 text-primary">
                Crafting Digital Excellence
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                I'm a creative developer who combines technical expertise with design sensibility 
                to create memorable digital experiences. My journey spans across modern web technologies, 
                user interface design, and system architecture.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Whether it's building responsive web applications, optimizing performance, 
                or designing intuitive user interfaces, I approach every project with passion 
                and attention to detail.
              </p>
            </div>

            {/* Visual Element */}
            <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <div className="card-glass rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-radial opacity-50"></div>
                <div className="relative z-10">
                  <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Code2 size={40} className="text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold text-center mb-4">5+ Years Experience</h4>
                  <p className="text-muted-foreground text-center">
                    Building innovative solutions across various industries and technologies
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className={`card-glass p-6 text-center hover:scale-105 transition-all duration-500 hover:shadow-glow-primary ${
                  isVisible ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${700 + index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <feature.icon size={32} className="text-primary" />
                </div>
                <h4 className="text-xl font-semibold mb-3">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;