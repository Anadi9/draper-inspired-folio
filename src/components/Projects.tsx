import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';

const Projects = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('projects');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A modern, scalable e-commerce solution built with React, Node.js, and PostgreSQL. Features include real-time inventory management, payment processing, and advanced analytics.',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      githubUrl: '#',
      liveUrl: '#',
      gradient: 'from-blue-500/20 to-purple-500/20'
    },
    {
      title: 'AI-Powered Dashboard',
      description: 'An intelligent dashboard that leverages machine learning to provide actionable insights. Built with TypeScript, Python, and modern visualization libraries.',
      technologies: ['TypeScript', 'Python', 'D3.js', 'TensorFlow'],
      githubUrl: '#',
      liveUrl: '#',
      gradient: 'from-green-500/20 to-blue-500/20'
    },
    {
      title: 'Mobile App Suite',
      description: 'Cross-platform mobile application with real-time synchronization, offline capabilities, and seamless user experience across iOS and Android.',
      technologies: ['React Native', 'Firebase', 'Redux', 'TypeScript'],
      githubUrl: '#',
      liveUrl: '#',
      gradient: 'from-purple-500/20 to-pink-500/20'
    },
    {
      title: 'DevOps Automation Tool',
      description: 'Streamlined deployment pipeline and infrastructure management tool that reduces deployment time by 80% and ensures zero-downtime releases.',
      technologies: ['Docker', 'Kubernetes', 'AWS', 'Terraform'],
      githubUrl: '#',
      liveUrl: '#',
      gradient: 'from-orange-500/20 to-red-500/20'
    }
  ];

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of innovative solutions and creative implementations
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={`card-glass p-8 group hover:scale-[1.02] transition-all duration-500 hover:shadow-glow-primary ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${300 + index * 200}ms` }}
            >
              {/* Project Visual */}
              <div className={`h-48 bg-gradient-to-br ${project.gradient} rounded-lg mb-6 relative overflow-hidden`}>
                <div className="absolute inset-0 bg-gradient-radial opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <ExternalLink size={32} className="text-white" />
                  </div>
                </div>
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
                    className="border-glow hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github size={16} className="mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="bg-primary hover:bg-primary/80 transition-all duration-300"
                    asChild
                  >
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} className="mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View More Button */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-1000 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <Button
            variant="outline"
            size="lg"
            className="border-glow px-8 py-3 text-lg hover:scale-105 transition-all duration-300"
          >
            View All Projects
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;